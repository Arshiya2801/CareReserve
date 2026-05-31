import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setApiError('');

    if (password.length < 6) {
      setApiError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setApiError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(`${backendUrl}/api/users/reset-password/${token}`, { password });
      if (data.success) {
        toast.success(data.message);
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 pt-20 pb-20">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12 border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Password Reset!</h3>
          <p className="text-gray-500 mb-8">Your password has been changed successfully.</p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 pt-20 pb-20">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12 border border-gray-100">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h3>
          <p className="text-gray-500">Please enter your new password below.</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>{apiError}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all mt-4 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
