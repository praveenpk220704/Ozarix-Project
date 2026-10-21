import React from 'react';

const Badge = ({
  children,
  color = 'blue', // blue, slate, green, amber, purple
  variant = 'soft', // soft, outline, solid
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide transition-colors';

  const styles = {
    blue: {
      soft: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800/60',
      outline: 'border border-blue-600/50 text-blue-600 dark:text-blue-400 bg-transparent',
      solid: 'bg-blue-600 text-white',
    },
    slate: {
      soft: 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800',
      outline: 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-transparent',
      solid: 'bg-slate-800 text-slate-100',
    },
    green: {
      soft: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60',
      outline: 'border border-emerald-600/50 text-emerald-600 dark:text-emerald-400 bg-transparent',
      solid: 'bg-emerald-600 text-white',
    },
    amber: {
      soft: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60',
      outline: 'border border-amber-600/50 text-amber-700 dark:text-amber-400 bg-transparent',
      solid: 'bg-amber-600 text-white',
    },
    purple: {
      soft: 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800/60',
      outline: 'border border-indigo-600/50 text-indigo-600 dark:text-indigo-400 bg-transparent',
      solid: 'bg-indigo-600 text-white',
    },
  };

  const palette = styles[color] || styles.blue;
  const styleClass = palette[variant] || palette.soft;

  return <span className={`${baseStyles} ${styleClass} ${className}`}>{children}</span>;
};

export default Badge;
