import { FlowStep, SectionId } from '@/types/assessment'
import { QUESTIONS } from './questions'

const bySection = (sectionId: SectionId) =>
  QUESTIONS.filter((q) => q.section === sectionId).map((q) => q.id)

export function buildFlow(): FlowStep[] {
  return [
    { type: 'welcome' },

    { type: 'section-intro', sectionId: 'access' },
    ...bySection('access').map((id) => ({ type: 'question' as const, questionId: id })),

    { type: 'section-intro', sectionId: 'reality' },
    ...bySection('reality').map((id) => ({ type: 'question' as const, questionId: id })),

    { type: 'signature' },

    { type: 'section-intro', sectionId: 'alignment' },
    ...bySection('alignment').map((id) => ({ type: 'question' as const, questionId: id })),

    { type: 'section-intro', sectionId: 'reflection' },
    ...bySection('reflection').map((id) => ({ type: 'question' as const, questionId: id })),

    { type: 'loading' },
    { type: 'results' },
  ]
}

export function progressPercent(stepIndex: number, totalSteps: number): number {
  if (totalSteps <= 1) return 0
  return Math.round((stepIndex / (totalSteps - 1)) * 100)
}

export function activeSectionId(flow: FlowStep[], stepIndex: number): SectionId | null {
  for (let i = stepIndex; i >= 0; i--) {
    const s = flow[i]
    if (s.type === 'section-intro') return s.sectionId
    if (s.type === 'question') {
      const q = QUESTIONS.find((q) => q.id === (s as { type: 'question'; questionId: string }).questionId)
      if (q) return q.section
    }
  }
  return null
}
