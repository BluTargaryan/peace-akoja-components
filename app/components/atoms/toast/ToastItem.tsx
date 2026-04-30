'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Toast } from './types';

const icons = {
  default: (
    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4 shrink-0 mt-0.5 text-red-500" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5L14 13H2L8 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 6.5V9M8 10.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};

const borderClass = {
  default: 'border-text',
  success: 'border-green',
  error:   'border-red',
  warning: 'border-yellow',
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(t);
  }, [toast, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      role="alert"
      className={twMerge(
        'flex items-start gap-3 px-4 py-3 rounded-xl bg-white border w-full max-w-sm',
        borderClass[toast.type]
      )}
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-neutral-400 hover:text-neutral-700 text-base leading-none cursor-pointer border-none bg-none p-0"
        aria-label="Dismiss"
      >
        &times;
      </button>
    </motion.div>
  );
}