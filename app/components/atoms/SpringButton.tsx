'use client';

import { motion, useSpring } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface SpringButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
  pressScale?: number;
}

const baseStyles = 'cursor-pointer outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-400';

export function SpringButton({
  children,
  onClick,
  className,
  stiffness = 300,
  damping = 20,
  mass = 1,
  pressScale = 0.9,
}: SpringButtonProps) {
  const [pressing, setPressing] = useState(false);
  const scaleSpring = useSpring(1, { stiffness, damping, mass });

  const handlePressStart = () => {
    setPressing(true);
    scaleSpring.set(pressScale);
  };

  const handlePressEnd = () => {
    setPressing(false);
    scaleSpring.set(1);
    onClick?.();
  };

  return (
    <motion.button
      style={{ scale: scaleSpring }}
      className={twMerge(baseStyles, className)}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={() => pressing && handlePressEnd()}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      {children}
    </motion.button>
  );
}