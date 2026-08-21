import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { toneForStatus, type Tone } from '../tone';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      tone: {
        success: 'bg-success/15 text-success',
        warning: 'bg-warning/15 text-warning',
        error: 'bg-destructive/15 text-destructive',
        info: 'bg-info/15 text-info',
        neutral: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  tone?: Tone;
  status?: string;
}

export const Badge: React.FC<BadgeProps> = ({ tone, status, className, children, ...rest }) => {
  const resolved: Tone = tone ?? (status ? toneForStatus(status) : 'neutral');
  return (
    <span className={cn(badgeVariants({ tone: resolved }), className)} {...rest}>
      {children}
    </span>
  );
};

export { badgeVariants };
