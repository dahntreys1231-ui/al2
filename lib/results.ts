import { Answers, GeneratedResults, ResultObs } from '@/types/assessment'
import { computeScores } from './scoring'

const OBS_BANK: Record<string, ResultObs> = {
  EFFORT_MISMATCH: {
    headline: 'The effort exchange feels uneven.',
    body: "When the effort coming back is consistently less than what you're giving, the gap between access and reality starts to widen. That's not about keeping score — it's about sustainability. A connection that draws more than it gives will eventually cost more than you intended to spend.",
  },
  CONSISTENCY_ISSUE: {
    headline: 'Consistency is missing from the pattern.',
    body: "Showing up sometimes isn't the same as showing up. What someone does across time — not just in the moments that matter to them — is the most honest signal available. Inconsistency isn't always intentional, but it's always informative.",
  },
  WORDS_ACTIONS_GAP: {
    headline: "Words and actions aren't lining up.",
    body: "Intentions are easy to declare. Actions are the actual data. When what someone does doesn't reliably back what they say — over time, across situations — that gap tells you something important about where you actually stand.",
  },
  BASED_ON_HOPE: {
    headline: 'Some of this may be built on hope more than evidence.',
    body: "Believing in someone's potential isn't a flaw — but access extended on hope alone is a different thing than access earned through consistent, demonstrated behavior. Knowing which foundation you're standing on helps you make clearer decisions.",
  },
  IGNORED_SIGNALS: {
    headline: "You've noticed things you haven't fully addressed.",
    body: "The fact that you've pushed things aside — even once — suggests there are signals asking for attention. That's not a judgment. It's common. But unaddressed signals tend to compound. Naming them is the first step to deciding what to do with them.",
  },
  OVERTRUSTED: {
    headline: 'Trust may have outpaced the evidence.',
    body: "Trust isn't a gift you give all at once — it's something that builds through demonstrated behavior over time. When trust outruns what's actually been shown, the gap can be quietly costly. It doesn't mean trust was wrong. It means it may be worth recalibrating.",
  },
  WOULD_NOT_REPEAT: {
    headline: "You wouldn't make this same choice today.",
    body: "That's worth sitting with. It doesn't necessarily mean the situation is untenable — but it does mean something has shifted between then and now. The question isn't whether you made the right call at the time. It's what you want to do with what you know now.",
  },
  HIGH_ACCESS_LOW_EVIDENCE: {
    headline: 'The access given exceeds what the evidence supports.',
    body: "There's a meaningful gap between how much space this person has in your life and how consistently they've shown up for it. That gap isn't a moral failing — but it is a signal worth taking seriously. Access is one of the most generous things you can give. It deserves to be matched.",
  },
  SIGNATURE_LESS: {
    headline: "Starting fresh today, you'd do this differently.",
    body: "That single answer reveals a lot. When what you'd give someone today is meaningfully less than what they already have, something has changed — in what you've seen, what you know, or what you're willing to accept. That clarity is useful. The question is what you want to do with it.",
  },
}

const Q_BANK: Record<string, string> = {
  EFFORT_MISMATCH: 'If the effort you give were consistently met in kind, what would look different about this?',
  CONSISTENCY_ISSUE: "What would need to be consistently true — not occasionally true — for this to feel right?",
  WORDS_ACTIONS_GAP: 'What would you tell a close friend who described this exact pattern to you?',
  BASED_ON_HOPE: "If you could only use what's actually happened — not what's possible — to describe this, what would you say?",
  IGNORED_SIGNALS: "What's the thing you've been most reluctant to look at directly, and why?",
  OVERTRUSTED: "What would it look like to recalibrate trust based on what's been demonstrated rather than what's been promised?",
  WOULD_NOT_REPEAT: "What's changed between when you first gave this access and how you see things now?",
  HIGH_ACCESS_LOW_EVIDENCE: "Is the access you're giving a reflection of what's been earned, or a gift you're extending in advance?",
  SIGNATURE_LESS: 'What would it take to act on what you already know?',
}

const DEFAULT_QUESTION =
  "What would clarity here make available to you — and what would it require you to let go of?"

export function generateResults(answers: Answers): GeneratedResults {
  const scores = computeScores(answers)
  const { concernCount, concernFlags: flags } = scores

  // ── What You're Seeing ────────────────────────────────────────────────────
  let seeing: string
  if (concernCount >= 4) {
    seeing = `You came into this carrying some real tension — and that probably wasn't an accident. As you look at this situation, there are several places where what you're giving and what you're receiving don't quite line up. That doesn't mean the situation is impossible. It means the picture is clearer than it might have felt before you started.`
  } else if (concernCount >= 2) {
    seeing = `You're sitting with something nuanced. There are parts of this that feel grounded, and there are a few places where the picture gets a little murkier. You noticed them — that matters. Clarity doesn't always mean the answer is obvious. Sometimes it just means you can see things more honestly than you could before.`
  } else {
    seeing = `What you've described sounds largely grounded. The access you're giving seems broadly supported by what you've actually experienced — and that's not nothing. It's worth acknowledging when things are working. At the same time, even well-aligned situations have room for honest attention.`
  }

  // ── What Might Be Out of Alignment ───────────────────────────────────────
  const observations: ResultObs[] = flags
    .slice(0, 4)
    .map((f) => OBS_BANK[f])
    .filter(Boolean)

  if (observations.length === 0) {
    observations.push({
      headline: 'Things appear mostly aligned.',
      body: "Based on what you've described, the access you're giving seems proportional to what you've consistently experienced. If something still feels off, it might be worth asking what isn't making it onto the page — sometimes the most important things are the hardest to name.",
    })
  }

  // ── Questions Worth Sitting With ──────────────────────────────────────────
  const questionPool = [
    ...flags.map((f) => Q_BANK[f]).filter(Boolean),
    DEFAULT_QUESTION,
  ]
  const questions = [...new Set(questionPool)].slice(0, 3)

  // ── A Small Next Step ─────────────────────────────────────────────────────
  const qDirection = typeof answers['q_direction'] === 'number' ? answers['q_direction'] as number : null

  let nextStep: string
  if (qDirection === 1) {
    nextStep = `You said something needs to change. That means the work this week isn't figuring it out — it's deciding to trust what you already see. Pick one small, honest thing you can do differently before the week ends. Not the whole answer. Just the next move.`
  } else if (qDirection === 3) {
    nextStep = `You came out of this feeling largely aligned — and that's worth acknowledging. The next step might simply be noticing what's making it work. What are the conditions that created this? Naming what's healthy helps you recognize when things start to shift.`
  } else if (concernCount >= 3) {
    nextStep = `This week, find one quiet moment and sit with one thing that came up in this reflection. Not to decide anything yet — just to let it be real. Write it down, say it out loud, or just hold it without explaining it away. Awareness before action.`
  } else if (concernCount >= 1) {
    nextStep = `Pick one of the questions above and spend five minutes writing about it — not to arrive at an answer, but to see what surfaces. The goal isn't resolution. It's honesty. What you write might surprise you.`
  } else {
    nextStep = `If things feel mostly aligned, the next step might simply be noticing what's making it work. What are the conditions that created this? Naming what's healthy helps you recognize when things start to shift — and move earlier when they do.`
  }

  return {
    seeing,
    observations,
    questions,
    nextStep,
    scoreBreakdown: scores,
  }
}

export function resultsToEmailText(results: GeneratedResults): string {
  const lines: string[] = [
    'ALIGNED ACCESS — MY REFLECTION',
    '================================',
    '',
    "WHAT YOU'RE SEEING",
    results.seeing,
    '',
    'WHAT MIGHT BE OUT OF ALIGNMENT',
    ...results.observations.map((o) => `${o.headline}\n${o.body}`).join('\n\n').split('\n'),
    '',
    'QUESTIONS WORTH SITTING WITH',
    ...results.questions.map((q, i) => `${i + 1}. ${q}`),
    '',
    'A SMALL NEXT STEP',
    results.nextStep,
    '',
    '================================',
    'alignedaccess.com',
  ]
  return lines.join('\n')
}
