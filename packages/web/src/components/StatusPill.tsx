import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { toneForStatus, type Tone } from '../tone';

const statusPillVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
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

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  status: string;
  label?: string;
  tone?: Tone;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  tone,
  className,
  ...rest
}) => {
  const resolved: Tone = tone ?? toneForStatus(status);
  return (
    <span className={cn(statusPillVariants({ tone: resolved }), className)} {...rest}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? status}
    </span>
  );
};

export { statusPillVariants };
