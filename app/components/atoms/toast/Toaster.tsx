'use client';

import { AnimatePresence } from 'framer-motion';
import { Toast } from './types';
import { ToastItem } from './ToastItem';

interface ToasterProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function Toaster({ toasts, onRemove }: ToasterProps) {
  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="flex flex-col gap-2"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}