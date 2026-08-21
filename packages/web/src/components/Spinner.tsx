import React from 'react';
import { cn } from '../lib/utils';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizes: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => (
  <span
    role="status"
    aria-label="loading"
    className={cn(
      'inline-block animate-spin rounded-full border-current border-t-transparent text-primary',
      sizes[size],
      className,
    )}
  />
);
