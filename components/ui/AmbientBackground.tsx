'use client'

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      <div
        className="absolute rounded-full animate-blob-a"
        style={{
          width: 700,
          height: 700,
          top: -180,
          right: -160,
          background:
            'radial-gradient(circle, rgba(224,204,158,0.55) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute rounded-full animate-blob-b"
        style={{
          width: 580,
          height: 580,
          bottom: -120,
          left: -140,
          background:
            'radial-gradient(circle, rgba(210,188,162,0.45) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute rounded-full animate-blob-c"
        style={{
          width: 420,
          height: 420,
          top: '45%',
          left: '35%',
          background:
            'radial-gradient(circle, rgba(196,176,148,0.35) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  )
}
