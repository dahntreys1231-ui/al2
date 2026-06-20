'use client'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import ScaleInput from '@/components/inputs/ScaleInput'
import { Question } from '@/types/assessment'
import { SECTION_MAP } from '@/lib/questions'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: 'easeIn' } },
}

interface QuestionCardProps {
  question: Question
  value: number | string | undefined
  isLast: boolean
  onAnswer: (value: number | string) => void
  onContinue: () => void
  onAutoAdvance: () => void
}

export default function QuestionCard({
  question,
  value,
  onAnswer,
  onAutoAdvance,
}: QuestionCardProps) {
  const section = SECTION_MAP[question.section]

  return (
    <motion.div
      key={question.id}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center min-h-screen px-6 py-12"
    >
      <Card className="w-full max-w-xl">
        <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">
          {section.label}
        </p>

        <h2 className="font-serif text-2xl sm:text-[27px] font-normal leading-snug text-charcoal mb-3 text-balance">
          {question.question}
        </h2>

        {question.context && (
          <p className="font-sans text-sm font-light italic text-charcoal-light mb-6 leading-relaxed">
            {question.context}
          </p>
        )}

        <div className="mt-8">
          {question.type === 'scale' && question.scale && (
            <ScaleInput
              options={question.scale}
              value={typeof value === 'number' ? value : undefined}
              onChange={onAnswer}
              onAutoAdvance={onAutoAdvance}
            />
          )}
        </div>
      </Card>
    </motion.div>
  )
}
