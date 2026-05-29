import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Signup = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Patient');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (token) {
      navigate('/');
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
    
    if (!phone) {
      newErrors.phone = "Phone Number is required";
    } else if (phone.length < 10) {
      newErrors.phone = "Phone Number is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await axios.post(backendUrl + '/api/users/register', { name, email, password, phone, role: role.toLowerCase() });
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success("Account created successfully!");
        
        if (data.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
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
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                  placeholder="Phone Number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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

            <div className="relative flex items-center py-2 mt-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button 
              type="button" 
              onClick={() => toast.info("Google Authentication coming soon!")}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3.5 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
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
