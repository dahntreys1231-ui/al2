'use client'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  percent: number
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-earth/20 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-gold to-gold-light"
        animate={{ width: `${percent}%` }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      />
    </div>
  )
}
