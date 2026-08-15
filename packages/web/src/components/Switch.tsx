import React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className = '', id, checked, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
        <span
          className={[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            checked ? 'bg-brand-primary' : 'bg-neutral-300',
            className,
          ].join(' ')}
        >
          <span
            className={[
              'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
              checked ? 'translate-x-5' : 'translate-x-0.5',
            ].join(' ')}
          />
        </span>
        <input ref={ref} id={inputId} type="checkbox" className="sr-only" checked={checked} {...rest} />
        {label && <span>{label}</span>}
      </label>
    );
  },
);
Switch.displayName = 'Switch';
