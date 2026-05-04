import React from "react";
import { SpringButton } from "../components/atoms/SpringButton";
import { Accordion } from "../components/atoms/Accordion";
import StaggeredListPreview from "../components/atoms/StaggeredListPreview";
import ToasterPreview from "../components/atoms/ToasterPreview";
import { CardSkeleton } from "../components/atoms/CardSkeleton";
import SortableListPreview from "../components/atoms/SortableListPreview";

export type ComponentEntry = {
  id: string;
  name: string;
  component?: React.ReactNode;
  preview: () => React.ReactNode;
  description: string;
  code: string;
  usageExample: string;
};

export const componentList: ComponentEntry[] = [
  {
    id: "1",
    name: "Spring Button",
    preview: () => (
      <SpringButton className="px-8 py-4 border-2 border-text text-base">
        Click me
      </SpringButton>
    ),
    description: "A button that compresses on press and springs back on release. Uses a mass-spring-damper simulation — stiffness controls snap speed, damping controls bounce, mass controls sluggishness. Unlike a CSS transition, the spring carries momentum so the button overshoots and settles like a real physical object. Structural styles like cursor and focus ring are hardcoded as a base; visual styling is passed as a Tailwind string via className, merged with tailwind-merge so consumer classes always win. Requires framer-motion and tailwind-merge.",
    code: `import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export function SpringButton({ children, className, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1 }}
      className={twMerge("cursor-pointer focus:outline-none", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}`,
    usageExample: `import { SpringButton } from "@/components/atoms/SpringButton";

export default function Page() {
  return (
    <SpringButton className="px-8 py-4 border-2 border-text text-base">
      Click me
    </SpringButton>
  );
}`,
  },
  {
    id: "2",
    name: "Smooth Accordion",
    preview: () => (
      <Accordion
        className="w-50"
        triggerClassName=""
        type="single"
        items={[
          { value: "a", title: "What is this?", content: "A smooth animated accordion." },
          { value: "b", title: "How does it work?", content: "It uses Radix UI and CSS transitions." },
        ]}
      />
    ),
    description: "An accordion that smoothly animates panels open and closed. The height animation works by reading the panel's natural content height via Radix's --radix-accordion-content-height CSS variable and transitioning to it — avoiding the height: auto limitation that breaks CSS transitions. Radix handles aria-expanded, aria-controls, keyboard navigation, and open/closed state. The chevron rotates 180° on open using a group-data-[state=open] Tailwind selector. type='single' allows only one open item at a time; type='multiple' lets each item toggle independently. Requires @radix-ui/react-accordion and tailwind-merge.",
    code: `'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { twMerge } from 'tailwind-merge';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface AccordionItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function Accordion({
  items,
  type = 'single',
  className,
  triggerClassName,
  contentClassName,
}: AccordionProps) {
  const rootProps =
    type === 'single'
      ? { type: 'single' as const, collapsible: true }
      : { type: 'multiple' as const };

  return (
    <RadixAccordion.Root
      {...rootProps}
      className={twMerge('w-full divide-y divide-text', className)}
    >
      {items.map((item) => (
        <RadixAccordion.Item key={item.value} value={item.value}>
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className={twMerge(
                'group flex w-full items-center justify-between py-4 text-left text-base font-medium text-text outline-none',
                triggerClassName
              )}
            >
              {item.title}
              <MdOutlineKeyboardArrowDown
                size={16}
                className="shrink-0 text-text transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180"
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>

          <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className={twMerge('pb-4 text-sm text-text leading-relaxed', contentClassName)}>
              {item.content}
            </div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}`,
    usageExample: `import { Accordion } from '@/components/atoms/Accordion';

export default function FaqSection() {
  return (
    <Accordion
      className="max-w-md"
      type="single"
      items={[
        { value: 'a', title: 'What is this?', content: 'A smooth animated accordion.' },
        { value: 'b', title: 'How does it work?', content: 'Radix + height keyed off --radix-accordion-content-height.' },
      ]}
    />
  );
}`,
  },
  {
    id: "3",
    name: "Staggered List",
    preview: () => <StaggeredListPreview />,
    description: "A list where each item fades in and slides up in sequence, one after the other. Framer Motion's staggerChildren staggers the start time of each child's animation by a fixed delay — so item 0 starts immediately, item 1 starts after one delay, item 2 after two delays, and so on. useInView triggers the animation only when the list scrolls into the viewport, with an 80px margin so it fires just before the user reaches it. once=true means it only plays on first entry; set it to false to replay on every scroll-in. The component is generic over T so it works with any data shape via the renderItem render prop. Requires framer-motion and tailwind-merge.",
    code: `'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface StaggeredListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  itemClassName?: string;
}

const containerVariants = (staggerDelay: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay } },
});

const itemVariants = (duration: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.4, 0, 0.2, 1] },
  },
});

export function StaggeredList<T>({
  items,
  renderItem,
  staggerDelay = 0.08,
  duration = 0.3,
  once = true,
  className,
  itemClassName,
}: StaggeredListProps<T>) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.ul
      ref={ref}
      className={twMerge('flex flex-col gap-2 list-none p-0 m-0', className)}
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={itemVariants(duration) as Variants} className={itemClassName}>
          {renderItem(item, i)}
        </motion.li>
      ))}
    </motion.ul>
  );
}`,
    usageExample: `import { StaggeredList } from '@/components/atoms/StaggeredList';

const labels = ['Alpha', 'Bravo', 'Charlie'];

export default function Section() {
  return (
    <StaggeredList
      items={labels}
      staggerDelay={0.08}
      duration={0.3}
      once
      renderItem={(label) => (
        <div className="rounded-xl border border-neutral-200 px-4 py-3 text-sm">{label}</div>
      )}
    />
  );
}`,
  },
  {
    id: "4",
    name: "Toaster",
    preview: () => <ToasterPreview />,
    description: "A toast notification system where each toast fades and scales in from below, then exits upward when dismissed or timed out. AnimatePresence is the key — it keeps exiting items mounted in the DOM long enough to play their exit animation before React removes them, which is something a plain conditional render can't do. mode='popLayout' makes remaining toasts smoothly reflow into position as others leave rather than snapping. Each toast schedules its own removal via setTimeout in a useEffect, cleaned up on unmount to prevent stale state updates. State lives in useToast, kept separate from the rendering so the hook can be called from anywhere in the tree. Requires framer-motion and tailwind-merge.",
    code: `'use client';

import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export type ToastType = 'default' | 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

const borderClass: Record<ToastType, string> = {
  default: 'border-text',
  success: 'border-green',
  error: 'border-red',
  warning: 'border-yellow',
};

export function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
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
        'flex items-start gap-3 px-4 py-3 rounded-xl border w-full max-w-sm',
        borderClass[toast.type]
      )}
    >
      {/* type icon */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-neutral-900 mt-0.5 leading-relaxed">{toast.message}</p>
        )}
      </div>
      <button type="button" onClick={() => onRemove(toast.id)} aria-label="Dismiss">
        ×
      </button>
    </motion.div>
  );
}

export function Toaster({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div aria-live="polite" aria-label="Notifications" className="flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}`,
    usageExample: `'use client';

import { useCallback, useState } from 'react';
import { Toaster } from '@/components/atoms/toast/Toaster';
import type { Toast } from '@/components/atoms/toast/types';

export default function Demo() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = () => {
    const id = crypto.randomUUID();
    setToasts((prev) => [
      ...prev,
      { id, type: 'success', title: 'Saved', message: 'Your changes were applied.' },
    ]);
  };

  return (
    <div>
      <button type="button" onClick={addToast}>
        Show toast
      </button>
      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
}`,
  },
  {
    id: "5",
    name: "Card Skeleton",
    preview: () => <CardSkeleton />,
    description: "A primitive Skeleton component that renders a placeholder shape matching the dimensions of the content it stands in for. Three animations are available: shimmer sweeps a highlight across the surface using a translated gradient pseudo-element, giving the impression of light moving across the UI; pulse fades the whole element in and out; wave subtly scales the element on the Y axis. The skeleton is composable — you build card, list, or page skeletons by arranging multiple instances with widths, heights, and border radii that mirror the real content layout, so the page feels structurally stable while data loads. Requires tailwind-merge.",
    code: `import { twMerge } from 'tailwind-merge';

type Animation = 'shimmer' | 'pulse' | 'wave';

const animationClass: Record<Animation, string> = {
  shimmer: 'skeleton-shimmer',
  pulse: 'animate-pulse',
  wave: 'animate-wave',
};

export function Skeleton({ className, animation = 'wave' }: { className?: string; animation?: Animation }) {
  return (
    <div
      className={twMerge('relative bg-text/50 rounded-md', animationClass[animation], className)}
    />
  );
}

import { Skeleton } from './Skeleton';

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl border border-text w-50">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-3 w-[55%]" />
          <Skeleton className="h-2.5 w-[35%]" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[88%]" />
        <Skeleton className="h-3 w-[72%]" />
      </div>
    </div>
  );
}`,
    usageExample: `import { CardSkeleton } from '@/components/atoms/CardSkeleton';
// or compose primitives:
import { Skeleton } from '@/components/atoms/Skeleton';

export default function LoadingCard() {
  return (
    <>
      <CardSkeleton />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-4 w-24" animation="shimmer" />
        <Skeleton className="h-4 flex-1" animation="pulse" />
      </div>
    </>
  );
}`,
  },
  {
    id: "6",
    name: "Sortable List",
    preview: () => <SortableListPreview />,
    description: "A list where items can be dragged vertically to reorder. Framer Motion's Reorder.Group tracks each item's position and reorders the array in real time as you drag, so surrounding items shuffle into their new slots before you drop — communicating the outcome of the action before it's committed. dragListener is disabled on the item itself so only the explicit grip handle starts a drag, preventing accidental reorders on click. useDragControls threads that pointer event from the handle down to the Reorder.Item. Each item lifts slightly on drag via whileDrag scale and shadow to signal it's the active element being moved. Requires framer-motion and tailwind-merge.",
    code: `'use client';

import { useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { MdOutlineDragHandle } from 'react-icons/md';

interface SortableItem {
  id: string;
  [key: string]: unknown;
}

function SortableRow<T extends SortableItem>({
  item,
  renderItem,
  itemClassName,
}: {
  item: T;
  renderItem: (item: T) => React.ReactNode;
  itemClassName?: string;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className={twMerge(
        'flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-neutral-200 cursor-default select-none',
        itemClassName
      )}
      whileDrag={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
    >
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        className="touch-none cursor-grab active:cursor-grabbing text-neutral-400 hover:text-neutral-600 border-none bg-transparent p-0"
        aria-label="Drag to reorder"
      >
        <MdOutlineDragHandle size={16} />
      </button>
      {renderItem(item)}
    </Reorder.Item>
  );
}

export function SortableList<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  className,
  itemClassName,
}: {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className={twMerge('flex flex-col gap-1.5 list-none p-0 m-0', className)}
    >
      {items.map((item) => (
        <SortableRow key={item.id} item={item} renderItem={renderItem} itemClassName={itemClassName} />
      ))}
    </Reorder.Group>
  );
}`,
    usageExample: `'use client';

import { useState } from 'react';
import { SortableList } from '@/components/atoms/SortableList';

type Row = { id: string; label: string };

const initial: Row[] = [
  { id: '1', label: 'First' },
  { id: '2', label: 'Second' },
  { id: '3', label: 'Third' },
];

export default function ReorderDemo() {
  const [items, setItems] = useState(initial);

  return (
    <SortableList
      items={items}
      onReorder={setItems}
      renderItem={(item) => <span className="text-sm font-medium text-neutral-900">{item.label}</span>}
    />
  );
}`,
  },
];
