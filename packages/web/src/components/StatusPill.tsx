import React from 'react';
import { toneForStatus, type Tone } from '@airwaste/design-tokens';

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  // A backend status string (UserStatus, OrderStatus, ...). Display label
  // defaults to the raw value; pass `label` to override.
  status: string;
  label?: string;
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  success: 'bg-status-success/15 text-status-success',
  warning: 'bg-status-warning/15 text-status-warning',
  error: 'bg-status-error/15 text-status-error',
  info: 'bg-status-info/15 text-status-info',
  neutral: 'bg-neutral-100 text-neutral-600',
};

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  tone,
  className = '',
  ...rest
}) => {
  const resolved: Tone = tone ?? toneForStatus(status);
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        toneClasses[resolved],
        className,
      ].join(' ')}
      {...rest}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? status}
    </span>
  );
};
