import React from 'react';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

function initials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'avatar'}
        className={['rounded-full object-cover bg-neutral-100', sizes[size], className].join(' ')}
      />
    );
  }
  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-full bg-brand-primary/10 font-semibold text-brand-primary',
        sizes[size],
        className,
      ].join(' ')}
    >
      {initials(name)}
    </span>
  );
};
