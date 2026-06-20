export default function Wordmark() {
  return (
    <div className="inline-flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center flex-shrink-0">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="3.5" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="5.05" y1="5.05" x2="7.17" y2="7.17" />
          <line x1="16.83" y1="16.83" x2="18.95" y2="18.95" />
          <line x1="18.95" y1="5.05" x2="16.83" y2="7.17" />
          <line x1="7.17" y1="16.83" x2="5.05" y2="18.95" />
        </svg>
      </div>
      <span className="font-sans text-xs font-semibold tracking-widest uppercase text-charcoal-mid">
        Aligned Access
      </span>
    </div>
  )
}
