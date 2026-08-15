import React from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, className = '', id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={[
            'rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary/40',
            error ? 'border-status-error' : 'border-neutral-300',
            className,
          ].join(' ')}
          {...rest}
        />
        {error ? (
          <span className="text-xs text-status-error">{error}</span>
        ) : hint ? (
          <span className="text-xs text-neutral-500">{hint}</span>
        ) : null}
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
