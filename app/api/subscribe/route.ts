import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const ALL_COHORT_TAGS = [
  'Aligned Access — Grounded',
  'Aligned Access — Needs Clarity',
  'Aligned Access — Needs Evidence',
  'Aligned Access — Needs Boundary',
  'Aligned Access — Ready For Action',
]

interface ScoreBreakdown {
  accessScore: number
  evidenceScore: number
  alignmentScore: number
  signatureScore: number
  alignmentGap: number
  concernFlags: string[]
  concernCount: number
}

interface Observation {
  headline: string
  body: string
}

interface ResultsPayload {
  seeing: string
  observations: Observation[]
  questions: string[]
  nextStep: string
}

function getResultType(s: ScoreBreakdown): string {
  const { concernCount, concernFlags, alignmentGap, accessScore, evidenceScore } = s
  if (concernCount === 0 && evidenceScore >= 2.5 && alignmentGap <= 0.2) return 'Ready For Action'
  if (concernCount === 0) return 'Grounded'
  if (
    concernFlags.includes('HIGH_ACCESS_LOW_EVIDENCE') ||
    (alignmentGap > 0.7 && accessScore >= 2.2) ||
    (concernFlags.includes('EFFORT_MISMATCH') && concernCount >= 2)
  ) return 'Needs Boundary'
  if (concernFlags.includes('WORDS_ACTIONS_GAP') || concernFlags.includes('CONSISTENCY_ISSUE'))
    return 'Needs Evidence'
  if (
    concernFlags.includes('BASED_ON_HOPE') ||
    concernFlags.includes('IGNORED_SIGNALS') ||
    concernFlags.includes('OVERTRUSTED') ||
    concernFlags.includes('WOULD_NOT_REPEAT') ||
    concernFlags.includes('SIGNATURE_LESS')
  ) return 'Needs Clarity'
  if (concernCount >= 3) return 'Needs Boundary'
  return 'Needs Clarity'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, results, scoreBreakdown } = body as {
      email: string
      firstName?: string
      results: ResultsPayload
      scoreBreakdown: ScoreBreakdown
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (!results || !scoreBreakdown) {
      return NextResponse.json({ error: 'Missing results data' }, { status: 400 })
    }

    const apiKey = process.env.MAILCHIMP_API_KEY
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX
    const listId = process.env.MAILCHIMP_LIST_ID

    if (!apiKey || !serverPrefix || !listId) {
      console.error('Missing Mailchimp environment variables')
      return NextResponse.json({ error: 'Server is not configured correctly' }, { status: 500 })
    }

    const resultType = getResultType(scoreBreakdown)
    const cohortTag = `Aligned Access — ${resultType}`

    const cap = (str: string, max = 1000) =>
      str.length > max ? str.substring(0, max - 1) + '…' : str

    const outAlign = results.observations
      .map((o: Observation) => `${o.headline}\n${o.body}`)
      .join('\n\n')

    const questions = results.questions
      .map((q: string, i: number) => `${i + 1}. ${q}`)
      .join('\n')

    const subscriberHash = createHash('md5').update(email.toLowerCase()).digest('hex')
    const memberUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`
    const tagsUrl = `${memberUrl}/tags`
    const authHeader = `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`

    const mergeFields: Record<string, string> = {
      RESULT_SUM: cap(results.seeing),
      OUT_ALIGN: cap(outAlign),
      QUESTIONS: cap(questions),
      NEXT_STEP: cap(results.nextStep),
      RESULTTYPE: resultType,
      SOURCE: 'Aligned Access 2',
    }
    if (firstName && typeof firstName === 'string') {
      mergeFields.FNAME = firstName.substring(0, 255)
    }

    const mcResponse = await fetch(memberUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify({ email_address: email, status_if_new: 'subscribed', merge_fields: mergeFields }),
    })
    const mcData = await mcResponse.json()
    if (!mcResponse.ok) {
      console.error('Mailchimp member error:', mcData)
      return NextResponse.json({ error: mcData.detail || 'Mailchimp request failed' }, { status: mcResponse.status })
    }

    await fetch(tagsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify({ tags: [{ name: 'Aligned Access Assessment', status: 'active' }] }),
    })

    await fetch(tagsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify({ tags: ALL_COHORT_TAGS.map(tag => ({ name: tag, status: 'inactive' })) }),
    })

    const tagsResponse = await fetch(tagsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify({ tags: [{ name: cohortTag, status: 'active' }] }),
    })
    if (!tagsResponse.ok) {
      const tagsData = await tagsResponse.json().catch(() => ({}))
      console.error('Mailchimp tags error:', tagsData)
    }

    return NextResponse.json({ success: true, resultType, cohortTag })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong reaching Mailchimp' }, { status: 500 })
  }
}
