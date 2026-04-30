import { twMerge } from 'tailwind-merge';

type Animation = 'shimmer' | 'pulse' | 'wave';

interface SkeletonProps {
  className?: string;
  animation?: Animation;
}

const animationClass: Record<Animation, string> = {
  shimmer: 'skeleton-shimmer',  
  pulse:   'animate-pulse',
  wave:    'animate-wave',
};

export function Skeleton({ className, animation = 'wave' }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        'relative bg-text/50 rounded-md',
        animationClass[animation],
        className
      )}
    />
  );
}