import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, title, subtitle, className = '', ...props }) => {
  return (
    <div className={`p-6 border-b border-border-light dark:border-border-dark ${className}`} {...props}>
      {title && <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-border-light dark:border-border-dark ${className}`} {...props}>
      {children}
    </div>
  );
};
