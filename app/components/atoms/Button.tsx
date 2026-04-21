import React from 'react'

const Button = ({icon, text, className}: {icon: React.ReactNode, text: React.ReactNode, className?: string}) => {
  return (
    <button className={`border-2 border-text flex w-fit items-center justify-center gap-6 
    bg-background hover:bg-accent transition-all duration-300
    ${className}`}>
            {text} {icon} 
    </button>
  )
}

export default Button