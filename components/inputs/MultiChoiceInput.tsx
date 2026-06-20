'use client'
import { motion } from 'framer-motion'

interface MultiChoiceInputProps {
  choices: string[]
  value?: string
  onChange: (value: string) => void
}

export default function MultiChoiceInput({ choices, value, onChange }: MultiChoiceInputProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {choices.map((choice) => {
        const selected = value === choice
        return (
          <motion.button
            key={choice}
            onClick={() => onChange(choice)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full px-5 py-4 rounded-2xl text-left cursor-pointer
              font-sans text-sm font-light leading-snug
              border transition-all duration-200
              ${selected
                ? 'border-gold bg-gold-pale text-charcoal'
                : 'border-earth bg-cream/40 text-charcoal-mid hover:border-gold-light hover:bg-gold-pale/40 hover:text-charcoal'
              }
            `}
          >
            {choice}
          </motion.button>
        )
      })}
    </div>
  )
}
