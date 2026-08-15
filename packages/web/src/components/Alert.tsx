import React from 'react';
import { toneForStatus, type Tone } from '@airwaste/design-tokens';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  status?: string;
  title?: string;
}

const toneClasses: Record<Tone, string> = {
  success: 'bg-status-success/10 text-status-success border-status-success/30',
  warning: 'bg-status-warning/10 text-status-warning border-status-warning/30',
  error: 'bg-status-error/10 text-status-error border-status-error/30',
  info: 'bg-status-info/10 text-status-info border-status-info/30',
  neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
};

export const Alert: React.FC<AlertProps> = ({ tone, status, title, className = '', children, ...rest }) => {
  const resolved: Tone = tone ?? (status ? toneForStatus(status) : 'info');
  return (
    <div
      role="alert"
      className={['rounded-md border px-4 py-3 text-sm', toneClasses[resolved], className].join(' ')}
      {...rest}
    >
      {title && <p className="font-semibold">{title}</p>}
      {children}
    </div>
  );
};
