import React from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, footer, className = '' }) => {
  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className={['relative z-10 w-full max-w-md rounded-lg bg-white shadow-floating', className].join(' ')}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="text-neutral-400 hover:text-neutral-700">
              ✕
            </button>
          </div>
        )}
        <div className="px-4 py-4 text-sm text-neutral-700">{children}</div>
        {footer && <div className="border-t border-neutral-200 px-4 py-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
