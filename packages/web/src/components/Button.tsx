import React from 'react';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-primary/40 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-dark',
  secondary: 'bg-brand-light text-brand-dark hover:bg-brand-green',
  ghost: 'bg-transparent text-brand-primary hover:bg-brand-primary/10',
  danger: 'bg-status-error text-white hover:bg-red-600',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading = false, fullWidth = false, className = '', children, disabled, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      className={[base, variants[variant], sizes[size], fullWidth ? 'w-full' : '', className].join(' ')}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
