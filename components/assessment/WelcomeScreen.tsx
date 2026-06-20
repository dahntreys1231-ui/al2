'use client'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Wordmark from '@/components/ui/Wordmark'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
}

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      key="welcome"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center min-h-screen px-6 py-12"
    >
      <Card className="w-full max-w-xl text-center">
        <div className="flex justify-center mb-11">
          <Wordmark />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal leading-tight tracking-tight text-charcoal mb-5 text-balance">
          Access should stay<br />
          <em className="text-gold not-italic font-normal italic">aligned with reality.</em>
        </h1>

        <div className="w-9 h-px bg-gold mx-auto my-6" />

        <p className="font-sans text-base font-light leading-relaxed text-charcoal-mid max-w-md mx-auto mb-11 text-balance">
          This assessment helps you slow down, look at the evidence, and decide whether the access you're giving matches what's actually true.
        </p>

        <Button onClick={onStart} variant="dark">
          Let's Take A Look
        </Button>

        <p className="mt-5 font-sans text-xs font-light text-charcoal-light">
          About 15–20 minutes&nbsp;&nbsp;·&nbsp;&nbsp;Your answers are never stored or shared
        </p>
      </Card>
    </motion.div>
  )
}
