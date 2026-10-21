import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 rounded-xl p-6 relative transition-all duration-200 shadow-sm dark:shadow-none
        ${hoverEffect ? 'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
