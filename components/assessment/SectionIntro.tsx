'use client'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Section } from '@/types/assessment'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
}

interface SectionIntroProps {
  section: Section
  onBegin: () => void
}

export default function SectionIntro({ section, onBegin }: SectionIntroProps) {
  return (
    <motion.div
      key={`intro-${section.id}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center min-h-screen px-6 py-12"
    >
      <Card className="w-full max-w-xl text-center">
        <p className="font-sans text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-5">
          {section.number} &mdash; {section.label}
        </p>

        <h2 className="font-serif text-4xl sm:text-[42px] font-normal leading-tight text-charcoal mb-5 text-balance">
          {section.label}
        </h2>

        <div className="space-y-1 mb-10">
          {section.intro.map((line, i) => (
            <p key={i} className="font-sans text-base font-light leading-relaxed text-charcoal-mid">
              {line}
            </p>
          ))}
        </div>

        <Button onClick={onBegin} variant="dark">
          Begin
        </Button>
      </Card>
    </motion.div>
  )
}
