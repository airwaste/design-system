import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { toneForStatus, type Tone } from '../tone';

const alertVariants = cva(
  'rounded-md border px-4 py-3 text-sm transition-colors',
  {
    variants: {
      tone: {
        success: 'bg-success/15 text-success border-success/30',
        warning: 'bg-warning/15 text-warning border-warning/30',
        error: 'bg-destructive/15 text-destructive border-destructive/30',
        info: 'bg-info/15 text-info border-info/30',
        neutral: 'bg-muted text-muted-foreground border-border',
      },
    },
    defaultVariants: {
      tone: 'info',
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  tone?: Tone;
  status?: string;
  title?: string;
}

export const Alert: React.FC<AlertProps> = ({ tone, status, title, className, children, ...rest }) => {
  const resolved: Tone = tone ?? (status ? toneForStatus(status) : 'info');
  return (
    <div
      role="alert"
      className={cn(alertVariants({ tone: resolved }), className)}
      {...rest}
    >
      {title && <p className="font-semibold">{title}</p>}
      {children}
    </div>
  );
};

export { alertVariants };
