'use client';

import { Toaster } from './toast/Toaster';
import { useToast } from './toast/useToast';
import type { ToastType } from './toast/types';

const toastVariants: { type: ToastType; label: string; title: string; message: string }[] = [
  { type: 'default',  label: 'Default',  title: 'Heads up',          message: 'This is a default notification.'         },
  { type: 'success',  label: 'Success',  title: 'Saved',             message: 'Your changes have been saved.'           },
  { type: 'error',    label: 'Error',    title: 'Something went wrong', message: 'Please try again later.'              },
  { type: 'warning',  label: 'Warning',  title: 'Proceed with care', message: 'This action may have side effects.'      },
];

export default function ToasterPreview() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {toastVariants.map(({ type, label, title, message }) => (
          <button
            key={type}
            className="p-4 text-base border-2 border-text"
            onClick={() => addToast(title, { type, message })}
          >
            {label}
          </button>
        ))}
      </div>

      <Toaster toasts={toasts} onRemove={removeToast} />
    </>
  );
}