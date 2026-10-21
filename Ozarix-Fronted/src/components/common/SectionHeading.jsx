import React from 'react';

const SectionHeading = ({
  tag,
  title,
  highlightText = '',
  subtext = '',
  align = 'center',
  className = '',
  invert = false,
}) => {
  const isLeft = align === 'left';

  const parts =
    highlightText && title.includes(highlightText)
      ? title.split(highlightText)
      : [title];

  return (
    <div className={`mb-12 md:mb-16 ${isLeft ? 'text-left' : 'text-center'} ${className}`}>
      {tag && (
        <span className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-md mb-4 ${
          invert 
            ? 'text-blue-300 bg-blue-950/80 border border-blue-500/40 backdrop-blur-sm'
            : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60'
        }`}>
          {tag}
        </span>
      )}

      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
        invert ? 'text-white' : 'text-slate-900 dark:text-white'
      }`}>
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span className={invert ? 'text-blue-400' : 'text-blue-600 dark:text-blue-500'}>{highlightText}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {subtext && (
        <p
          className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
            invert ? 'text-slate-200' : 'text-slate-600 dark:text-slate-400'
          } ${
            isLeft ? '' : 'mx-auto'
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
