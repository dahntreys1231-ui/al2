'use client'
import { motion } from 'framer-motion'
import { ScaleOption } from '@/types/assessment'

interface ScaleInputProps {
  options: ScaleOption[]
  value?: number
  onChange: (value: number) => void
  onAutoAdvance: () => void
}

export default function ScaleInput({ options, value, onChange, onAutoAdvance }: ScaleInputProps) {
  function handleSelect(optionValue: number) {
    onChange(optionValue)
    setTimeout(onAutoAdvance, 420)
  }

  return (
    <div className="flex flex-col gap-2.5">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <motion.button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            whileTap={{ scale: 0.99 }}
            className={`
              w-full px-6 py-5 rounded-2xl text-left cursor-pointer
              border transition-all duration-200
              ${selected
                ? 'border-gold bg-gold-pale/70 shadow-card-gold'
                : 'border-earth bg-cream/50 hover:border-gold-light hover:bg-gold-pale/30'
              }
            `}
          >
            <span
              className={`block font-sans text-[15px] font-medium leading-snug transition-colors duration-200 ${
                selected ? 'text-charcoal' : 'text-charcoal'
              }`}
            >
              {opt.label}
            </span>
            {opt.sub && (
              <span className="block font-sans text-sm font-light text-charcoal-light mt-1.5 leading-snug">
                {opt.sub}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
