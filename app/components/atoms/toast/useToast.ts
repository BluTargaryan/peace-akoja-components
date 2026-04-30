import { useState, useCallback } from 'react';
import { Toast, ToastType } from './types';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (title: string, options?: { type?: ToastType; message?: string; duration?: number }) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [
        ...prev,
        { id, title, type: options?.type ?? 'default', message: options?.message, duration: options?.duration ?? 4000 },
      ]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}