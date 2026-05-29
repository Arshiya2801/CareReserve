import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon,
  className = '',
  fullWidth = true,
  ...props
}, ref) => {
  const widthClass = fullWidth ? "w-full" : "";
  const borderClass = error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-slate-600 focus:ring-primary";

  return (
    <div className={`${widthClass} mb-4`}>
      {label && (
        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            ${widthClass} 
            px-4 py-2.5 
            ${icon ? 'pl-10' : ''}
            bg-white dark:bg-slate-800 
            text-text-light dark:text-text-dark
            border ${borderClass} 
            rounded-xl outline-none 
            focus:ring-2 focus:border-transparent 
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 animate-fade-in">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
