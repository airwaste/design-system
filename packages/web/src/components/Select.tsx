import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={[
            'rounded-md border bg-white px-3 py-2 text-sm text-neutral-900',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary/40',
            error ? 'border-status-error' : 'border-neutral-300',
            className,
          ].join(' ')}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-status-error">{error}</span>}
      </div>
    );
  },
);
Select.displayName = 'Select';
