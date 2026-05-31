import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const Signup = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(initialRole === 'doctor' ? 'Doctor' : 'Patient');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (token) {
      const savedRole = localStorage.getItem('role');
      if (savedRole === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    }
  }, [token, navigate]);

  // Calculate Password Strength
  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    
    if (pass.length === 0) return { label: '', color: 'bg-gray-200', width: 'w-0' };
    if (strength <= 2) return { label: 'Weak', color: 'bg-red-400', width: 'w-1/3' };
    if (strength <= 4) return { label: 'Medium', color: 'bg-yellow-400', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
  };

  const strengthData = getPasswordStrength(password);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Full Name is required";
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setApiError(''); // Clear previous API errors
    if (!validate()) return;

    try {
      const { data } = await axios.post(backendUrl + '/api/users/register', { name, email, password, gender, role: role.toLowerCase() });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setToken(data.token);
        toast.success("Account created successfully!");
        
        if (data.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.toLowerCase().includes('already exists')) {
        setApiError("An account with this email already exists. Please log in instead.");
      } else {
        setApiError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 -mx-4 md:-mx-8 lg:-mx-12 px-4 py-10 pt-20 pb-20">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row border border-gray-100">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h3>
            <p className="text-gray-500">Join MediQueue to experience premium healthcare.</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <span>{apiError}</span>
              </div>
            )}

            {/* Role Selection */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setRole('Patient')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === 'Patient' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setRole('Doctor')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === 'Doctor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Doctor
              </button>
            </div>

            <div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                placeholder="Full Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                  placeholder="Email Address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                  placeholder="Password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary text-sm font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${strengthData.color} ${strengthData.width} transition-all duration-300`}></div>
                  </div>
                  <span className={`text-xs font-semibold ${strengthData.color.replace('bg-', 'text-')}`}>
                    {strengthData.label}
                  </span>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all mt-6"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account? <Link to={`/login?role=${role.toLowerCase()}`} className="text-primary font-bold hover:underline">Login</Link>
            </p>
          </form>
        </div>

        {/* Right Side: Illustration (Mirrored from Login for variety) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-bl from-accent to-primary p-12 flex-col justify-between items-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          <img 
            src={assets.hero_illustration} 
            alt="Healthcare Signup" 
            className="w-full max-w-sm z-10 hover:scale-105 transition-transform duration-500 my-auto" 
          />
        </div>

      </div>
    </div>
  );
};

export default Signup;
