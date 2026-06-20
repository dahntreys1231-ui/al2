'use client'
import { motion } from 'framer-motion'
import { SectionId } from '@/types/assessment'

const SECTION_ORDER: SectionId[] = ['access', 'reality', 'alignment', 'reflection']

interface SectionDotsProps {
  activeSection: SectionId | null
}

export default function SectionDots({ activeSection }: SectionDotsProps) {
  const activeIdx = activeSection ? SECTION_ORDER.indexOf(activeSection) : -1

  return (
    <div className="fixed top-5 right-6 z-50 flex items-center gap-2">
      {SECTION_ORDER.map((section, i) => {
        const isDone = i < activeIdx
        const isActive = i === activeIdx
        return (
          <motion.div
            key={section}
            animate={{
              width: isActive ? 22 : 6,
              backgroundColor: isActive ? '#C8A96E' : isDone ? '#574E45' : '#C6BAB0',
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="h-1.5 rounded-full"
          />
        )
      })}
    </div>
  )
}
