import React from 'react';
import { toneForStatus, type Tone } from '@airwaste/design-tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  // convenience: derive tone from a backend status string
  status?: string;
}

const toneClasses: Record<Tone, string> = {
  success: 'bg-status-success/15 text-status-success',
  warning: 'bg-status-warning/15 text-status-warning',
  error: 'bg-status-error/15 text-status-error',
  info: 'bg-status-info/15 text-status-info',
  neutral: 'bg-neutral-100 text-neutral-600',
};

export const Badge: React.FC<BadgeProps> = ({ tone, status, className = '', children, ...rest }) => {
  const resolved: Tone = tone ?? (status ? toneForStatus(status) : 'neutral');
  return (
    <span
      className={['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', toneClasses[resolved], className].join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
};
