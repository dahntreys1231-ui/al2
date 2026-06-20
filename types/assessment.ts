export type SectionId = 'access' | 'reality' | 'alignment' | 'reflection' | 'final'
export type QuestionType = 'scale' | 'textarea' | 'multichoice'

export interface ScaleOption {
  label: string
  sub?: string
  value: number
}

export interface Question {
  id: string
  section: SectionId
  type: QuestionType
  question: string
  context?: string
  scale?: ScaleOption[]
  choices?: string[]
  placeholder?: string
  optional?: boolean
}

export interface Section {
  id: SectionId
  label: string
  number: string
  intro: string[]
}

export type FlowStep =
  | { type: 'welcome' }
  | { type: 'section-intro'; sectionId: SectionId }
  | { type: 'question'; questionId: string }
  | { type: 'signature' }
  | { type: 'loading' }
  | { type: 'results' }

export type Answers = Record<string, number | string>

export interface ScoreBreakdown {
  accessScore: number
  evidenceScore: number
  alignmentScore: number
  signatureScore: number
  alignmentGap: number
  concernFlags: string[]
  concernCount: number
}

export interface ResultObs {
  headline: string
  body: string
}

export interface GeneratedResults {
  seeing: string
  observations: ResultObs[]
  questions: string[]
  nextStep: string
  scoreBreakdown: ScoreBreakdown
}

export interface AssessmentState {
  stepIndex: number
  flow: FlowStep[]
  answers: Answers
  results: GeneratedResults | null
}

export type AssessmentAction =
  | { type: 'ANSWER'; questionId: string; value: number | string }
  | { type: 'ADVANCE' }
  | { type: 'BACK' }
  | { type: 'SET_RESULTS'; results: GeneratedResults }
  | { type: 'RESTART' }
