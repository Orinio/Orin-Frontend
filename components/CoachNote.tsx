'use client';

interface CoachNoteProps {
  note?: string;
  onDismiss?: () => void;
}

export default function CoachNote({ note = "Today's focus: Ship one live deployment. You're 80% there — the last 20% is what separates proof from potential.", onDismiss }: CoachNoteProps) {
  return (
    <div
      className="p-5 rounded-2xl relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-ink) 0%, #1a1a2e 100%)',
        color: 'var(--color-paper)',
      }}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: 'var(--color-bloom)' }} />
      <div className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: 'var(--color-ember)' }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bloom)' }}>
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a3 3 0 0 0-3 3v1H7a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V8a2 2 0 0 0-2-2h-2V5a3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-bloom)' }}>AI Coach</p>
          <span className="text-[10px] font-medium" style={{ color: 'var(--color-mist)' }}>Today</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-paper)' }}>{note}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="mt-3 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--color-paper)' }}
          >
            Got it
          </button>
        )}
      </div>
    </div>
  );
}
