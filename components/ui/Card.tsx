import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  gold?: boolean
}

export default function Card({ children, className = '', gold = false }: CardProps) {
  return (
    <div
      className={`
        glass-card rounded-3xl px-12 py-12
        ${gold ? 'border-gold/30 shadow-card-gold' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
