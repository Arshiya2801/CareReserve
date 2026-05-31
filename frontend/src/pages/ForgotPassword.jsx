import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoToken, setDemoToken] = useState('');
  const [apiError, setApiError] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setApiError('');
    setDemoToken('');

    if (!email) {
      setApiError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/users/forgot-password`, { email });
      if (data.success) {
        toast.success(data.message);
        if (data.demoToken) {
          setDemoToken(data.demoToken);
        }
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 pt-20 pb-20">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12 border border-gray-100">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h3>
          <p className="text-gray-500">Enter your email address to receive a reset link.</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>{apiError}</span>
            </div>
          )}

          {demoToken && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl text-sm font-medium">
              <p className="mb-2"><strong>Mock Email Sent!</strong></p>
              <p className="mb-3">In a real app, you would receive an email with a link.</p>
              <Link 
                to={`/reset-password/${demoToken}`}
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Click here to reset password (Demo)
              </Link>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="hello@example.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all mt-4 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password? 
            <Link to="/login" className="text-primary font-bold hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
