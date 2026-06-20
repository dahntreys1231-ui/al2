import { Answers, ScoreBreakdown } from '@/types/assessment'

function avg(vals: number[]): number {
  const valid = vals.filter((v) => !isNaN(v))
  if (valid.length === 0) return 2
  return valid.reduce((a, b) => a + b, 0) / valid.length
}

function n(answers: Answers, id: string, def = 2): number {
  const v = answers[id]
  return typeof v === 'number' ? v : def
}

// All questions now use a 1–3 scale.
// Value 1 = most concerning / least healthy
// Value 3 = healthiest / most aligned
// q_ignored is naturally ordered (1 = ignored signals = concerning)

export function computeScores(answers: Answers): ScoreBreakdown {
  const accessIds = ['q_space', 'q_available', 'q_access_depth', 'q_earned', 'q_importance']
  const accessScore = avg(accessIds.map((id) => n(answers, id)))

  const evidenceIds = ['q_followthrough', 'q_words_actions', 'q_support', 'q_consistency', 'q_today_vs_hope']
  const evidenceScore = avg(evidenceIds.map((id) => n(answers, id)))

  const alignIds = ['q_feels_right', 'q_effort', 'q_trust_match', 'q_ignored', 'q_repeat']
  const alignmentScore = avg(alignIds.map((id) => n(answers, id)))

  const signatureScore = n(answers, 'q_signature')
  const alignmentGap = accessScore - evidenceScore

  const flags: string[] = []

  if (n(answers, 'q_effort') === 1) flags.push('EFFORT_MISMATCH')
  if (n(answers, 'q_followthrough') === 1 || n(answers, 'q_consistency') === 1) flags.push('CONSISTENCY_ISSUE')
  if (n(answers, 'q_words_actions') === 1) flags.push('WORDS_ACTIONS_GAP')
  if (n(answers, 'q_today_vs_hope') === 1 || n(answers, 'q_honest_admit') === 1) flags.push('BASED_ON_HOPE')
  if (n(answers, 'q_ignored') === 1 || n(answers, 'q_pattern') === 1) flags.push('IGNORED_SIGNALS')
  if (n(answers, 'q_trust_match') === 1) flags.push('OVERTRUSTED')
  if (n(answers, 'q_repeat') === 1 || n(answers, 'q_future') === 1) flags.push('WOULD_NOT_REPEAT')
  if (accessScore >= 2.4 && evidenceScore <= 1.6) flags.push('HIGH_ACCESS_LOW_EVIDENCE')
  if (signatureScore < accessScore - 0.4) flags.push('SIGNATURE_LESS')

  return {
    accessScore,
    evidenceScore,
    alignmentScore,
    signatureScore,
    alignmentGap,
    concernFlags: flags,
    concernCount: flags.length,
  }
}
