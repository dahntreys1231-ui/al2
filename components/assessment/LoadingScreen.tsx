'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHRASES = [
  'Sitting with your answers…',
  'Looking at the patterns…',
  "Finding what's true…",
]

const screenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function LoadingScreen() {
  const [phraseIdx, setPhraseIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % PHRASES.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      key="loading"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen gap-8"
      role="status"
      aria-label="Generating your reflection"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={phraseIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.3 } }}
          className="font-serif text-2xl sm:text-3xl font-normal italic text-charcoal"
        >
          {PHRASES[phraseIdx]}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-2.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gold animate-dot-pulse"
            style={{ animationDelay: `${i * 0.22}s` }}
          />
        ))}
      </div>
    </motion.div>
  )
}
