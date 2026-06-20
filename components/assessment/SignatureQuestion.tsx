'use client'
import { motion } from 'framer-motion'
import ScaleInput from '@/components/inputs/ScaleInput'
import { SIGNATURE_QUESTION } from '@/lib/questions'

const variants = {
  initial: { opacity: 0, scale: 0.97, y: 28 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.3, ease: 'easeIn' } },
}

interface SignatureQuestionProps {
  value?: number
  onChange: (value: number) => void
  onAutoAdvance: () => void
}

export default function SignatureQuestion({ value, onChange, onAutoAdvance }: SignatureQuestionProps) {
  return (
    <motion.div
      key="signature"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center min-h-screen px-6 py-12"
    >
      <div className="w-full max-w-xl">
        <p className="text-center font-sans text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-6">
          The Cornerstone Question
        </p>

        <div className="glass-card rounded-3xl px-10 sm:px-14 py-14">
          <div className="w-9 h-px bg-gold mx-auto mb-10" />

          <h2 className="font-serif text-3xl sm:text-[38px] font-normal leading-tight text-charcoal text-center mb-12 text-balance">
            {SIGNATURE_QUESTION.question}
          </h2>

          <div className="w-9 h-px bg-gold mx-auto mb-10" />

          <ScaleInput
            options={SIGNATURE_QUESTION.scale!}
            value={value}
            onChange={onChange}
            onAutoAdvance={onAutoAdvance}
          />
        </div>
      </div>
    </motion.div>
  )
}
