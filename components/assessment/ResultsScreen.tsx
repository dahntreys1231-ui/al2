'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Wordmark from '@/components/ui/Wordmark'
import Button from '@/components/ui/Button'
import { GeneratedResults } from '@/types/assessment'
import { resultsToEmailText } from '@/lib/results'

const screenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

const cardVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

interface ResultsScreenProps {
  results: GeneratedResults
  onRestart: () => void
}

export default function ResultsScreen({ results, onRestart }: ResultsScreenProps) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  function sendEmail() {
    const subject = 'My Aligned Access Reflection'
    const body = resultsToEmailText(results)
    let url = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    if (url.length > 8000) {
      url = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.substring(0, 2000) + '\n\n[truncated]')}`
    }
    window.location.href = url
    setEmailSent(true)
  }

  const cards = [
    {
      label: "What You're Seeing",
      content: <p className="font-sans text-sm font-light leading-relaxed text-charcoal-mid">{results.seeing}</p>,
    },
    {
      label: 'What Might Be Out of Alignment',
      content: (
        <div className="space-y-5">
          {results.observations.map((obs, i) => (
            <div key={i}>
              <p className="font-sans text-sm font-medium text-charcoal mb-1">{obs.headline}</p>
              <p className="font-sans text-sm font-light leading-relaxed text-charcoal-mid">{obs.body}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Questions Worth Sitting With',
      content: (
        <ul className="space-y-0 divide-y divide-earth/30">
          {results.questions.map((q, i) => (
            <li key={i} className="py-3 pl-5 relative font-sans text-sm font-light leading-snug text-charcoal-mid">
              <span className="absolute left-0 top-3.5 w-1.5 h-1.5 rounded-full bg-gold" />
              {q}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <motion.div
      key="results"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen overflow-y-auto"
    >
      <div className="max-w-xl mx-auto px-6 py-14 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <Wordmark />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-charcoal mb-3">
            Your Reflection
          </h1>
          <p className="font-sans text-base font-light text-charcoal-mid">
            Here's what came through in your answers.
          </p>
        </div>

        {/* Result cards */}
        <motion.div
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl px-8 sm:px-10 py-9"
            >
              <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                {card.label}
              </p>
              {card.content}
            </motion.div>
          ))}

          {/* Next step — gold tinted */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="rounded-3xl px-8 sm:px-10 py-9 border border-gold/30 shadow-card-gold"
            style={{ background: 'linear-gradient(140deg, rgba(200,169,110,0.13) 0%, rgba(200,169,110,0.04) 100%)' }}
          >
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              A Small Next Step
            </p>
            <p className="font-sans text-sm font-light leading-relaxed text-charcoal-mid">
              {results.nextStep}
            </p>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl px-8 sm:px-10 py-9"
          >
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Send Your Reflection
            </p>
            <h3 className="font-serif text-xl font-normal text-charcoal mb-2">
              Keep this somewhere you'll return to it.
            </h3>
            <p className="font-sans text-sm font-light leading-relaxed text-charcoal-mid mb-6">
              Enter your email and we'll open your mail app with your results ready to send.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-cream/50 border border-earth focus:border-gold outline-none font-sans text-sm font-light text-charcoal placeholder:text-earth transition-colors duration-200"
              />
              <motion.button
                onClick={sendEmail}
                whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(200,169,110,0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 rounded-full bg-gold text-white font-sans text-sm font-medium flex items-center gap-2 justify-center"
              >
                Send
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            </div>
            {emailSent && (
              <p className="mt-3 font-sans text-xs font-light italic text-charcoal-light">
                Your email app should open with your results ready to send.
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Restart */}
        <div className="text-center mt-10">
          <Button onClick={onRestart} variant="dark">
            Start a New Reflection
          </Button>
          <p className="mt-4 font-sans text-xs font-light text-charcoal-light">
            Your answers are never stored or shared.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
