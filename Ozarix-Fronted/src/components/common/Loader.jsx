import React from 'react';

const Loader = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-5 w-5 border-2',
    medium: 'h-10 w-10 border-2',
    large: 'h-16 w-16 border-3',
  };

  const ringSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div
        className={`rounded-full border-blue-500 border-t-transparent animate-spin ${ringSize}`}
      ></div>
      {size === 'large' && (
        <span className="text-xs font-mono text-slate-400 tracking-wider">
          LOADING OZARIX
        </span>
      )}
    </div>
  );
};

export default Loader;
