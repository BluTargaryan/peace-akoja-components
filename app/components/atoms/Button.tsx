import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({
  content,
  className,
  onClick,
}: {
  content: React.ReactNode
  className?: string
  onClick?: () => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(`border-2 border-text flex w-fit items-center justify-center gap-6 
    bg-background hover:bg-accent transition-all duration-300`, className)}
    >
            {content} 
    </button>
  )
}

export default Button