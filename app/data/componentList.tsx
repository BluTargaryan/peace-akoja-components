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
  description: React.ReactNode;
  code: string;
  usageExample: string;
  cssSnippet?: string;
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
    description: (
      <>
        <p><strong>Why this matters</strong> — Clicks feel weightless. A standard button gives no physical confirmation that a press registered — it either fires an action immediately or does nothing, with no sensation in between. Users have been trained by physical buttons to expect compression and release as a feedback loop. Without it, interactive elements feel flat and untrustworthy, especially on actions that matter like submitting a form or confirming a delete.</p>
        <p><strong>How it&apos;s built</strong> — A mass-spring-damper simulation runs on every frame rather than interpolating between two values at a fixed rate. When you press, the target scale drops to 0.9. When you release, the spring pulls back toward 1 — but because the system carries velocity, it overshoots slightly before settling. That overshoot is what makes it feel physical rather than mechanical. Stiffness controls how hard the spring pulls, damping controls how quickly oscillation dies, and mass controls how much the button resists the spring&apos;s force.</p>
        <p><strong>A way to improve it</strong> — Vary press depth based on hold duration. A quick tap compresses to 0.92, a long press bottoms out to 0.8 — making the duration of the press feel like applied force. You could also add a subtle haptic pulse on mobile via the Vibration API on release.</p>
      </>
    ),
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
    description: (
      <>
        <p><strong>Why this matters</strong> — Content panels that instantly appear and disappear give no sense of where content lives in space. The user clicks a trigger and information materialises from nowhere, which breaks spatial continuity. This is especially disorienting when multiple items are open — there is no sense of the panel belonging to the trigger that opened it.</p>
        <p><strong>How it&apos;s built</strong> — Height animates to the panel&apos;s measured natural height rather than auto, because CSS cannot transition to height: auto — it would snap. Radix exposes the content height as a CSS variable that the keyframe reads at runtime. The chevron rotation reinforces direction of travel — rotating 180 degrees down on open and back on close so the icon always points toward where the content is going. The easing curve is fast-in, slow-out to mirror the feel of something expanding under slight resistance.</p>
        <p><strong>A way to improve it</strong> — Stagger the content inside the panel on open — text lines, images, or child elements cascade in individually rather than the whole block appearing at once. This would make the panel feel like it is revealing content progressively rather than just growing a container.</p>
      </>
    ),
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
    cssSnippet: `/* Add the following to your globals.css */

/* Inside your @theme block */
--animate-accordion-down: accordion-down 0.35s cubic-bezier(0.4, 0, 0.2, 1);
--animate-accordion-up: accordion-up 0.35s cubic-bezier(0.4, 0, 0.2, 1);
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}`,
  },
  {
    id: "3",
    name: "Staggered List",
    preview: () => <StaggeredListPreview />,
    description: (
      <>
        <p><strong>Why this matters</strong> — Lists that render all at once give no visual hierarchy — every item competes for attention simultaneously and the eye has nowhere to start. This is especially pronounced on first load, where a full list appearing instantly can feel like a wall of content rather than a set of individual items worth reading.</p>
        <p><strong>How it&apos;s built</strong> — staggerChildren in Framer Motion offsets each child&apos;s animation start time by a fixed delay, so items arrive in sequence rather than together. The slide-up grounds each item spatially as it arrives — fading in without movement feels ghostly, but combining opacity with a small Y translation gives each item a direction of origin. useInView defers the sequence until the list is actually in the viewport, so items offscreen do not waste their entrance.</p>
        <p><strong>A way to improve it</strong> — As built, this is still closer to atmosphere than information. The real version of this component is the filter animation — when a user searches or filters, matching items stay and reflow, non-matching items exit, and new matches enter. Every motion then has a cause the user initiated, which makes the animation functional rather than decorative.</p>
      </>
    ),
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
    description: (
      <>
        <p><strong>Why this matters</strong> — Feedback messages that appear and disappear instantly are easy to miss and feel jarring when they snap out of existence. Users acting quickly — submitting forms, triggering async operations — need non-blocking confirmation that something happened, and they need time to read it before it leaves.</p>
        <p><strong>How it&apos;s built</strong> — AnimatePresence is the core mechanism. React would normally unmount a component immediately on conditional removal, cutting off any exit animation mid-frame. AnimatePresence keeps the exiting element mounted long enough to complete its exit sequence before React removes it from the DOM. mode=&apos;popLayout&apos; handles the reflow — when a toast exits, remaining toasts animate into their new positions rather than snapping, so the stack always feels like a coherent physical column. Each toast manages its own dismissal timer in a useEffect so the logic stays self-contained.</p>
        <p><strong>A way to improve it</strong> — Add a thin progress bar along the bottom of each toast that depletes over the duration. The user can see exactly how long they have before it auto-dismisses, and hovering to pause the timer gives them control without requiring an explicit close action.</p>
      </>
    ),
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
    description: (
      <>
        <p><strong>Why this matters</strong> — Blank loading states feel broken. A white page with no content gives users no indication of whether the app is working or frozen. Spinners communicate loading but give no sense of the layout that is coming, so the content appearing feels like a surprise rather than a reveal. Users need both a signal that loading is active and a structural preview of what to expect.</p>
        <p><strong>How it&apos;s built</strong> — Shimmer moves a highlight across the surface using a translated gradient pseudo-element, simulating light catching a surface — a physical metaphor for something that is present but not yet filled in. The key detail is that it moves continuously, distinguishing active loading from a static placeholder. Pulse fades the whole element in and out for lower-contrast layouts where a sweeping highlight would be too visually busy. Wave subtly scales on the Y axis for dense list contexts.</p>
        <p><strong>A way to improve it</strong> — Animate the transition from skeleton to real content. A cross-fade or a subtle blur-to-sharp transition on the incoming content would make the reveal feel intentional rather than a hard swap. Right now the skeleton disappears and content appears — bridging that moment would complete the experience.</p>
      </>
    ),
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
    cssSnippet: `/* Add the following to your globals.css */

.skeleton-shimmer {
  overflow: hidden;
}
.skeleton-shimmer::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(to right, transparent, rgb(255 255 255 / 0.1), transparent);
  animation: shimmer 1.4s ease-in-out infinite;
}

/* Inside your @theme block */
--animate-shimmer: shimmer 1.4s ease-in-out infinite;
--animate-wave: wave 1.4s ease-in-out infinite;
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}
@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50%      { transform: scaleY(0.92); }
}`,
  },
  {
    id: "6",
    name: "Sortable List",
    preview: () => <SortableListPreview />,
    description: (
      <>
        <p><strong>Why this matters</strong> — Dropping an item into a reorderable list without live feedback is a guess. The user picks something up, moves it somewhere, and only sees the result after releasing. If the outcome is wrong they have to undo and try again. The interaction requires the user to hold a mental model of the list&apos;s new order entirely in their head during the drag.</p>
        <p><strong>How it&apos;s built</strong> — Reorder.Group continuously remeasures item positions during the drag and updates the array in real time, so surrounding items animate into their new positions as the dragged item moves through them. The user sees the outcome before committing. The dragged item lifts slightly via whileDrag scale and shadow, separating it from the stack spatially so it is clear which element is in motion. dragListener is off on the item itself — only the grip handle starts a drag — preventing accidental reorders on click or text selection.</p>
        <p><strong>A way to improve it</strong> — Add snap zones — as the dragged item hovers over a valid slot, the gap between surrounding items widens slightly to invite the drop, making the target feel magnetic rather than geometric. This would reduce precision required and make the interaction feel more forgiving.</p>
      </>
    ),
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
