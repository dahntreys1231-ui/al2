'use client'
import { useRef, useEffect } from 'react'

interface TextareaInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  optional?: boolean
  autoFocus?: boolean
}

export default function TextareaInput({
  value,
  onChange,
  placeholder = 'Write freely here...',
  optional = false,
  autoFocus = false,
}: TextareaInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && ref.current) {
      setTimeout(() => ref.current?.focus(), 350)
    }
  }, [autoFocus])

  function autoResize() {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  return (
    <div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => { onChange(e.target.value); autoResize() }}
        onInput={autoResize}
        placeholder={placeholder}
        rows={4}
        className="
          w-full resize-none bg-transparent outline-none
          border-b border-earth focus:border-gold
          py-3 font-sans text-base font-light leading-relaxed
          text-charcoal placeholder:text-earth
          transition-colors duration-200
          min-h-[110px] max-h-[280px] overflow-y-auto
        "
        style={{ transition: 'border-color 0.2s' }}
      />
      {optional && (
        <p className="mt-2 text-xs font-light italic text-charcoal-light">
          Feel free to skip if nothing comes up.
        </p>
      )}
    </div>
  )
}
