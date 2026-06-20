'use client'
import { useReducer, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import AmbientBackground from '@/components/ui/AmbientBackground'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionDots from '@/components/ui/SectionDots'
import WelcomeScreen from './WelcomeScreen'
import SectionIntro from './SectionIntro'
import SignatureQuestion from './SignatureQuestion'
import QuestionCard from './QuestionCard'
import LoadingScreen from './LoadingScreen'
import ResultsScreen from './ResultsScreen'
import { AssessmentState, AssessmentAction } from '@/types/assessment'
import { buildFlow, progressPercent, activeSectionId } from '@/lib/flow'
import { QUESTION_MAP, SECTION_MAP, SIGNATURE_QUESTION } from '@/lib/questions'
import { generateResults } from '@/lib/results'

const INITIAL_FLOW = buildFlow()

const initialState: AssessmentState = {
  stepIndex: 0,
  flow: INITIAL_FLOW,
  answers: {},
  results: null,
}

function reducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      }
    case 'ADVANCE':
      return {
        ...state,
        stepIndex: Math.min(state.stepIndex + 1, state.flow.length - 1),
      }
    case 'BACK':
      return {
        ...state,
        stepIndex: Math.max(state.stepIndex - 1, 0),
      }
    case 'SET_RESULTS':
      return { ...state, results: action.results }
    case 'RESTART':
      return { ...initialState, flow: buildFlow() }
    default:
      return state
  }
}

export default function AssessmentFlow() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { stepIndex, flow, answers, results } = state

  const currentStep = flow[stepIndex]
  const progress = progressPercent(stepIndex, flow.length)
  const activeSection = activeSectionId(flow, stepIndex)

  const showChrome =
    currentStep.type !== 'welcome' &&
    currentStep.type !== 'loading' &&
    currentStep.type !== 'results'

  // Generate results when loading screen mounts
  useEffect(() => {
    if (currentStep.type === 'loading') {
      const timer = setTimeout(() => {
        const r = generateResults(answers)
        dispatch({ type: 'SET_RESULTS', results: r })
        dispatch({ type: 'ADVANCE' })
      }, 3200)
      return () => clearTimeout(timer)
    }
  }, [currentStep.type, answers])

  const advance = useCallback(() => dispatch({ type: 'ADVANCE' }), [])
  const goBack = useCallback(() => dispatch({ type: 'BACK' }), [])

  function renderStep() {
    switch (currentStep.type) {
      case 'welcome':
        return <WelcomeScreen key="welcome" onStart={advance} />

      case 'section-intro': {
        const section = SECTION_MAP[currentStep.sectionId]
        return <SectionIntro key={`intro-${currentStep.sectionId}`} section={section} onBegin={advance} />
      }

      case 'signature':
        return (
          <SignatureQuestion
            key="signature"
            value={typeof answers[SIGNATURE_QUESTION.id] === 'number' ? answers[SIGNATURE_QUESTION.id] as number : undefined}
            onChange={(v) => dispatch({ type: 'ANSWER', questionId: SIGNATURE_QUESTION.id, value: v })}
            onAutoAdvance={advance}
          />
        )

      case 'question': {
        const question = QUESTION_MAP[currentStep.questionId]
        if (!question) return null
        const isLast = stepIndex === flow.length - 3 // last question before loading
        return (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id]}
            isLast={isLast}
            onAnswer={(v) => dispatch({ type: 'ANSWER', questionId: question.id, value: v })}
            onContinue={advance}
            onAutoAdvance={advance}
          />
        )
      }

      case 'loading':
        return <LoadingScreen key="loading" />

      case 'results':
        return results ? (
          <ResultsScreen
            key="results"
            results={results}
            onRestart={() => dispatch({ type: 'RESTART' })}
          />
        ) : null

      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen bg-cream">
      <AmbientBackground />

      {showChrome && (
        <>
          <ProgressBar percent={progress} />
          <SectionDots activeSection={activeSection} />
          {stepIndex > 1 && (
            <button
              onClick={goBack}
              className="fixed top-5 left-5 z-50 flex items-center gap-1.5 font-sans text-xs font-light text-charcoal-light hover:text-charcoal transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
          )}
        </>
      )}

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  )
}
