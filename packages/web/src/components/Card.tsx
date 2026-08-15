import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', className = '', children, ...rest }, ref) => (
    <div
      ref={ref}
      className={['rounded-lg bg-white shadow-card border border-neutral-200', paddings[padding], className].join(' ')}
      {...rest}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';
