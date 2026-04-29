'use client';

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
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

const itemVariants = (duration: number): Variants => ({
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
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
        <motion.li
          key={i}
          variants={itemVariants(duration) as Variants}
          className={itemClassName}
        >
          {renderItem(item, i)}
        </motion.li>
      ))}
    </motion.ul>
  );
}