# Aligned Access — Assessment Application

A production-ready guided clarity experience built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

Aligned Access helps people evaluate whether the level of access they are giving a person, opportunity, relationship, or decision is aligned with reality. The goal is clarity, not judgment.

## Tech Stack

- **Next.js 15** — App Router
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS v3** — Styling
- **Framer Motion** — Animations
- **Google Fonts** — Playfair Display + Inter (via next/font)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Deploy — no additional configuration needed

Or use the Vercel CLI:

```bash
npx vercel
```

## Project Structure

```
aligned-access-assessment/
├── app/                    Next.js App Router pages
├── components/
│   ├── assessment/         Screen components (flow, questions, results)
│   ├── inputs/             Input types (scale, textarea, multichoice)
│   └── ui/                 Reusable UI primitives
├── lib/                    Data, scoring, and results logic
├── types/                  TypeScript interfaces
└── public/                 Static assets
```

## Assessment Structure

The experience guides users through 34 questions + 1 signature question across 5 sections:

| Section | Questions | Type |
|---|---|---|
| Access Audit | Q1–7 | Scale (custom per question) |
| Reality Audit | Q8–17 | Scale + 1 open text |
| Signature Question | Featured | Scale |
| Alignment Audit | Q18–25 | Scale + 1 open text |
| Reflection Audit | Q26–30 | Open text |
| Final Reflection | Q31–34 | Multiple choice |

## Privacy

All responses are processed entirely in the browser. No data is sent to any server. Results exist only in memory and are cleared on page refresh.
