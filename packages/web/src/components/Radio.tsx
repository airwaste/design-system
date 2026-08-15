import React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className={['h-4 w-4 border-neutral-300 text-brand-primary focus:ring-brand-primary/40', className].join(' ')}
          {...rest}
        />
        {label && <span>{label}</span>}
      </label>
    );
  },
);
Radio.displayName = 'Radio';
