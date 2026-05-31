import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'patient';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // New UI features
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setApiError(''); // Clear previous API errors
    if (!validate()) return;

    try {
      const { data } = await axios.post(backendUrl + '/api/users/login', { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setToken(data.token);
        toast.success("Logged in successfully!");
        
        if (data.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 -mx-4 md:-mx-8 lg:-mx-12 px-4 py-10 pt-20 pb-20">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-accent to-primary p-12 flex-col justify-between items-center relative overflow-hidden">
          <div className="z-10 text-center text-teal-900 w-full">
            <h2 className="text-4xl font-extrabold mb-4">Welcome to MediQueue</h2>
            <p className="text-lg opacity-90">Your premium healthcare journey starts here.</p>
          </div>
          <img 
            src={assets.login_illustration} 
            alt="Healthcare Login" 
            className="w-full max-w-sm z-10 hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h3>
            <p className="text-gray-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <span>{apiError}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                placeholder="hello@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary text-sm font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300 accent-primary" 
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all mt-4"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account? 
              <Link to={`/signup?role=${role}`} className="text-primary font-bold hover:underline ml-1">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;