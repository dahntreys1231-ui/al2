import { ReactNode, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'dark' | 'gold'
  children: ReactNode
}

export default function Button({ variant = 'dark', children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { y: -1, boxShadow: variant === 'gold' ? '0 6px 20px rgba(200,169,110,0.35)' : '0 6px 20px rgba(37,32,24,0.22)' }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.18 }}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full
        font-sans text-sm font-medium tracking-wide
        transition-colors duration-200 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variant === 'dark'
          ? 'bg-charcoal text-cream hover:bg-charcoal/90'
          : 'bg-gold text-white hover:bg-gold/90'
        }
        ${className}
      `}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </motion.button>
  )
}
