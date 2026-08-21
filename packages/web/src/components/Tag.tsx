import React from 'react';
import { cn } from '../lib/utils';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string; // any hex; defaults to brand primary
}

export const Tag: React.FC<TagProps> = ({ color = '#15803D', className, children, style, ...rest }) => (
  <span
    className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors', className)}
    style={{ backgroundColor: `${color}1A`, color, ...style }}
    {...rest}
  >
    {children}
  </span>
);
