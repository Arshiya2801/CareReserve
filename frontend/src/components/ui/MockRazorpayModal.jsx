import React from 'react';
import Button from './Button';
import { CreditCard, XCircle, CheckCircle, X } from 'lucide-react';

const MockRazorpayModal = ({ isOpen, onClose, onSuccess, onFailed, amount, currencySymbol = "₹" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-lg">
              R
            </div>
            <span className="font-bold tracking-wide">Razorpay (Mock Test)</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">Amount to Pay</h2>
          <div className="text-4xl font-black text-gray-900 dark:text-white mb-8">
            {currencySymbol}{amount}
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 px-4">
              This is a simulated payment gateway for demonstration purposes. Choose an outcome below to test the application flow.
            </p>

            <button
              onClick={onSuccess}
              className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
                <span className="font-bold text-green-700 dark:text-green-400">Simulate Success</span>
              </div>
              <span className="text-green-600 dark:text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>

            <button
              onClick={onFailed}
              className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                <span className="font-bold text-red-700 dark:text-red-400">Simulate Failure</span>
              </div>
              <span className="text-red-600 dark:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-slate-900/50 p-4 border-t border-gray-100 dark:border-slate-700 text-center">
          <button 
            onClick={onClose}
            className="text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Cancel Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockRazorpayModal;
