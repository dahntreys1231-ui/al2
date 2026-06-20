import { Question, Section } from '@/types/assessment'

export const SECTIONS: Section[] = [
  {
    id: 'access',
    number: '01',
    label: 'Access Audit',
    intro: ["Before we look at what's happening, let's look at where things stand right now."],
  },
  {
    id: 'reality',
    number: '02',
    label: 'Reality Audit',
    intro: ["This next section isn't about potential.", "It's about evidence."],
  },
  {
    id: 'alignment',
    number: '03',
    label: 'Alignment Audit',
    intro: ["This is where things get interesting."],
  },
  {
    id: 'reflection',
    number: '04',
    label: 'Reflection Audit',
    intro: ["Clarity isn't the finish line.", "It's the beginning."],
  },
]

export const SIGNATURE_QUESTION: Question = {
  id: 'q_signature',
  section: 'reality',
  type: 'scale',
  question:
    'If you were meeting this person for the very first time today, knowing only what you know now, how much access would you give them?',
  scale: [
    { label: 'None or very little.', sub: "I wouldn't start here.", value: 1 },
    { label: 'Some.', sub: "I'd be more cautious than I've been.", value: 2 },
    { label: 'The same I give now.', sub: "I'd make the same choices again.", value: 3 },
  ],
}

export const QUESTIONS: Question[] = [

  // ── ACCESS AUDIT ─────────────────────────────────────────────────────────

  {
    id: 'q_space',
    section: 'access',
    type: 'scale',
    question: 'How much space does this person take up in your life?',
    scale: [
      { label: 'Very little.', sub: "They're present, but not taking up much room.", value: 1 },
      { label: 'A noticeable amount.', sub: 'I think about them and make room for them regularly.', value: 2 },
      { label: 'Almost everything.', sub: 'They dominate my attention, time, and energy.', value: 3 },
    ],
  },
  {
    id: 'q_available',
    section: 'access',
    type: 'scale',
    question: 'If they needed you right now, how quickly would you respond?',
    scale: [
      { label: "I'd check my own capacity first.", sub: 'My response would depend on what else was going on.', value: 1 },
      { label: "Probably soon, but not immediately.", sub: "I'd get there when I reasonably could.", value: 2 },
      { label: 'Right away, no question.', sub: 'They move to the front of my attention automatically.', value: 3 },
    ],
  },
  {
    id: 'q_access_depth',
    section: 'access',
    type: 'scale',
    question: "Do they have access to parts of you that most people don't?",
    scale: [
      { label: 'Not really.', sub: "We're close, but not beyond what I share with most.", value: 1 },
      { label: 'In some ways.', sub: "I've let them in more than most, in certain areas.", value: 2 },
      { label: 'Yes, significantly.', sub: 'They know things about me I rarely share with anyone.', value: 3 },
    ],
  },
  {
    id: 'q_earned',
    section: 'access',
    type: 'scale',
    question: 'Does the access they have feel earned, assumed, or somewhere in between?',
    scale: [
      { label: 'Mostly assumed.', sub: 'It developed gradually, without much evaluation on my part.', value: 1 },
      { label: 'Somewhere in between.', sub: "Some of it's earned, some of it just happened.", value: 2 },
      { label: 'Mostly earned.', sub: 'It reflects consistent, demonstrated behavior over time.', value: 3 },
    ],
  },
  {
    id: 'q_importance',
    section: 'access',
    type: 'scale',
    question: 'If someone watched your life from the outside, what role would they say this person plays?',
    scale: [
      { label: 'A peripheral one.', sub: 'Someone who shows up occasionally, but not centrally.', value: 1 },
      { label: 'A significant one.', sub: 'Someone with real influence on how I spend my time.', value: 2 },
      { label: 'A central one.', sub: 'Someone woven into the core of my daily life.', value: 3 },
    ],
  },

  // ── REALITY AUDIT ────────────────────────────────────────────────────────

  {
    id: 'q_followthrough',
    section: 'reality',
    type: 'scale',
    question: "When they say they're going to do something, how often do they follow through?",
    scale: [
      { label: 'Rarely.', sub: 'Follow-through is the exception, not the rule.', value: 1 },
      { label: 'Sometimes.', sub: "It happens, but I can't fully rely on it.", value: 2 },
      { label: 'Consistently.', sub: 'Their actions usually match what they said.', value: 3 },
    ],
  },
  {
    id: 'q_words_actions',
    section: 'reality',
    type: 'scale',
    question: 'Do their actions usually match their words?',
    scale: [
      { label: 'Rarely.', sub: 'What they say and what they do are often different things.', value: 1 },
      { label: 'Sometimes.', sub: "They line up when it's convenient or important to them.", value: 2 },
      { label: 'Almost always.', sub: 'Their behavior consistently reflects what they say.', value: 3 },
    ],
  },
  {
    id: 'q_support',
    section: 'reality',
    type: 'scale',
    question: 'When you need support, can you count on them?',
    scale: [
      { label: 'Not really.', sub: "I've learned not to lean on them when it matters most.", value: 1 },
      { label: 'Sometimes.', sub: 'They show up depending on the situation.', value: 2 },
      { label: 'Yes, consistently.', sub: "They're reliably there when I need them.", value: 3 },
    ],
  },
  {
    id: 'q_consistency',
    section: 'reality',
    type: 'scale',
    question: 'Have they been consistent over time, or has it been a mixed pattern?',
    scale: [
      { label: 'Mostly inconsistent.', sub: 'The unreliability has been a pattern, not a phase.', value: 1 },
      { label: 'A mix.', sub: "Some periods of reliability, some that weren't.", value: 2 },
      { label: 'Very consistent.', sub: "They've shown up steadily across different seasons.", value: 3 },
    ],
  },
  {
    id: 'q_today_vs_hope',
    section: 'reality',
    type: 'scale',
    question: 'Are you responding to who they are today, or who you believe they could become?',
    scale: [
      { label: 'More who they could become.', sub: "I'm weighing potential more than what's actually been shown.", value: 1 },
      { label: 'Both, roughly equally.', sub: "I'm aware of the tension between what is and what could be.", value: 2 },
      { label: 'Who they are today.', sub: "I'm responding to demonstrated reality, not hope.", value: 3 },
    ],
  },

  // ── ALIGNMENT AUDIT ──────────────────────────────────────────────────────

  {
    id: 'q_feels_right',
    section: 'alignment',
    type: 'scale',
    question: "Based on what you've actually experienced, does their current level of access feel right?",
    scale: [
      { label: 'Not really.', sub: "Something feels off — more has been given than the evidence supports.", value: 1 },
      { label: 'Mostly.', sub: 'It feels roughly appropriate, though I have some questions.', value: 2 },
      { label: 'Yes, completely.', sub: "The access reflects what they've actually shown me.", value: 3 },
    ],
  },
  {
    id: 'q_effort',
    section: 'alignment',
    type: 'scale',
    question: 'Does the effort you receive match the effort you give?',
    scale: [
      { label: 'Not even close.', sub: "There's a clear and consistent imbalance.", value: 1 },
      { label: 'Sometimes.', sub: 'It evens out occasionally, but not reliably.', value: 2 },
      { label: 'Yes, it does.', sub: 'The effort feels mutual and proportional.', value: 3 },
    ],
  },
  {
    id: 'q_trust_match',
    section: 'alignment',
    type: 'scale',
    question: "Does the trust you've extended match the trust that's been demonstrated?",
    scale: [
      { label: "I've overtrusted.", sub: "What I've given is ahead of what's actually been earned.", value: 1 },
      { label: 'Somewhat.', sub: "There's a partial match, but also some gaps.", value: 2 },
      { label: 'Yes, completely.', sub: "The trust is proportional to what's been shown.", value: 3 },
    ],
  },
  {
    id: 'q_ignored',
    section: 'alignment',
    type: 'scale',
    question: "Have you ever noticed something that didn't sit right — and looked the other way?",
    scale: [
      { label: 'More than once.', sub: "There are things I've set aside because I didn't want them to be true.", value: 1 },
      { label: 'Maybe.', sub: "I'm not sure I've always been fully honest with myself here.", value: 2 },
      { label: 'No.', sub: "I've looked at things directly, even when it was uncomfortable.", value: 3 },
    ],
  },
  {
    id: 'q_repeat',
    section: 'alignment',
    type: 'scale',
    question: 'If you were starting from zero today, would you give them this same level of access?',
    scale: [
      { label: 'No.', sub: 'Knowing what I know now, I would start more cautiously.', value: 1 },
      { label: "I'm not sure.", sub: "I'm genuinely uncertain about what I'd do differently.", value: 2 },
      { label: 'Yes, without question.', sub: "I'd make the same choices again.", value: 3 },
    ],
  },

  // ── REFLECTION AUDIT ─────────────────────────────────────────────────────

  {
    id: 'q_future',
    section: 'reflection',
    type: 'scale',
    question: 'When you imagine things staying exactly as they are six months from now, how does that feel?',
    scale: [
      { label: 'Unsettling.', sub: 'I know something would need to change for me to be okay with that.', value: 1 },
      { label: 'Uncertain.', sub: 'Some parts feel fine — others I wish were different.', value: 2 },
      { label: 'Fine.', sub: "I'd feel settled if nothing changed.", value: 3 },
    ],
  },
  {
    id: 'q_honest_admit',
    section: 'reflection',
    type: 'scale',
    question: "Is there something here you already know — but haven't fully admitted yet?",
    scale: [
      { label: 'Yes.', sub: "There's something I've been aware of but haven't wanted to face.", value: 1 },
      { label: 'Maybe.', sub: "I'm not sure what I know versus what I'm avoiding.", value: 2 },
      { label: "No.", sub: "I feel like I've been honest with myself.", value: 3 },
    ],
  },
  {
    id: 'q_pattern',
    section: 'reflection',
    type: 'scale',
    question: 'Have you had this same internal conversation about this person before?',
    scale: [
      { label: 'Yes, multiple times.', sub: "This isn't the first time I've questioned whether this is right.", value: 1 },
      { label: 'Once or twice.', sub: "There have been moments of doubt, but nothing sustained.", value: 2 },
      { label: 'No, this is new.', sub: "I haven't had reason to question this before.", value: 3 },
    ],
  },
  {
    id: 'q_deserve',
    section: 'reflection',
    type: 'scale',
    question: "Does this person treat you the way you'd want a close friend to be treated?",
    scale: [
      { label: 'Not consistently.', sub: 'There are ways I wish things were different.', value: 1 },
      { label: 'Mostly.', sub: 'Most of the time, though not always.', value: 2 },
      { label: 'Yes.', sub: 'I feel genuinely well-treated, consistently.', value: 3 },
    ],
  },
  {
    id: 'q_direction',
    section: 'reflection',
    type: 'scale',
    question: "After everything you've reflected on, where are things leaning?",
    scale: [
      { label: 'Something needs to change.', sub: "The evidence is pointing toward a decision or conversation I've been avoiding.", value: 1 },
      { label: 'I need more clarity.', sub: "There are things I want to understand better before I know what to do.", value: 2 },
      { label: 'Things feel aligned.', sub: "This reflection confirmed what I already sensed — things are basically okay.", value: 3 },
    ],
  },
]

export const QUESTION_MAP: Record<string, Question> = Object.fromEntries(
  [...QUESTIONS, SIGNATURE_QUESTION].map((q) => [q.id, q])
)

export const SECTION_MAP: Record<string, Section> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s])
)
