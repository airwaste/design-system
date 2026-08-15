import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={['h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/40', className].join(' ')}
          {...rest}
        />
        {label && <span>{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';
