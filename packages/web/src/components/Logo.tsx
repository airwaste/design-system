import React from 'react';
import { cn } from '../lib/utils';

export interface LogoProps {
  variant?: 'full' | 'icon';
  height?: number;
  className?: string;
  title?: string;
}

// Inlined AirWaste brand SVG (canonical copy in assets/airwaste-logo.svg).
// `full` renders the wordmark + icon; `icon` renders the bin/recycle mark only.
export const Logo: React.FC<LogoProps> = ({ variant = 'full', height = 40, className, title = 'AirWaste' }) => {
  if (variant === 'icon') {
    return (
      <svg
        className={cn(className)}
        height={height}
        width={height}
        viewBox="0 0 512 512"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="awIconBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="45%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>
        <ellipse cx="256" cy="436" rx="112" ry="12" fill="#15803D" opacity="0.18" />
        <rect x="232" y="84" width="48" height="16" rx="8" fill="#4ADE80" />
        <rect x="146" y="100" width="220" height="34" rx="16" fill="#15803D" />
        <path
          fill="url(#awIconBody)"
          d="M 160 158 L 178 400 Q 181 418 199 418 L 313 418 Q 331 418 334 400 L 352 158 Q 352 146 340 146 L 172 146 Q 160 146 160 158 Z"
        />
        <rect x="174" y="168" width="16" height="226" rx="8" fill="#FFFFFF" opacity="0.22" />
        <g fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 275 262.9 L 305 314.9" fill="none" />
          <path d="M 280.4 338 L 220.4 338" fill="none" />
          <path d="M 212.6 305.1 L 242.6 253.1" fill="none" />
          <path d="M 304 338 L 320 328 L 320 348 Z" fill="#FFFFFF" stroke="none" />
          <path d="M 199.6 327.6 L 201.9 341.6 L 186.3 332.6 Z" fill="#FFFFFF" stroke="none" />
          <path d="M 262 240.4 L 264.3 226.4 L 248.7 235.4 Z" fill="#FFFFFF" stroke="none" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className={cn(className)}
      height={height}
      viewBox="0 0 640 200"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="awLogoBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="45%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <g transform="translate(36 34) scale(0.24)">
        <ellipse cx="256" cy="436" rx="112" ry="12" fill="#15803D" opacity="0.18" />
        <rect x="232" y="84" width="48" height="16" rx="8" fill="#4ADE80" />
        <rect x="146" y="100" width="220" height="34" rx="16" fill="#15803D" />
        <path
          fill="url(#awLogoBody)"
          d="M 160 158 L 178 400 Q 181 418 199 418 L 313 418 Q 331 418 334 400 L 352 158 Q 352 146 340 146 L 172 146 Q 160 146 160 158 Z"
        />
        <rect x="174" y="168" width="16" height="226" rx="8" fill="#FFFFFF" opacity="0.22" />
        <g fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 275 262.9 L 305 314.9" fill="none" />
          <path d="M 280.4 338 L 220.4 338" fill="none" />
          <path d="M 212.6 305.1 L 242.6 253.1" fill="none" />
          <path d="M 304 338 L 320 328 L 320 348 Z" fill="#FFFFFF" stroke="none" />
          <path d="M 199.6 327.6 L 201.9 341.6 L 186.3 332.6 Z" fill="#FFFFFF" stroke="none" />
          <path d="M 262 240.4 L 264.3 226.4 L 248.7 235.4 Z" fill="#FFFFFF" stroke="none" />
        </g>
      </g>
      <text x="184" y="132" fontFamily="Inter, 'Segoe UI', Arial, sans-serif" fontWeight="800" fontSize="88" letterSpacing="-2">
        <tspan fill="#15803D">Air</tspan>
        <tspan fill="#22C55E">Waste</tspan>
      </text>
      <text x="186" y="160" fontFamily="Inter, 'Segoe UI', Arial, sans-serif" fontWeight="700" fontSize="19" letterSpacing="7" fill="#166534">
        GO GREEN
      </text>
    </svg>
  );
};
