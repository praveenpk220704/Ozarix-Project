import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, danger, ghost, link
  size = 'md', // sm, md, lg
  className = '',
  to,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-sm shadow-blue-600/20',
    secondary:
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:active:bg-slate-900 dark:text-slate-100 dark:border-slate-800',
    outline:
      'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600',
    ghost:
      'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60',
    danger:
      'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-800/80 dark:text-rose-300 dark:hover:bg-rose-900/50',
    link:
      'bg-transparent text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-4 hover:underline p-0 border-none',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const currentStyles = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (to) {
    return (
      <Link to={to} className={currentStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={currentStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
