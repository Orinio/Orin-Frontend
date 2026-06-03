const testimonials = [
  {
    quote: 'ORIN turned my messy GitHub into something recruiters actually want to look at. Got my internship offer within a month.',
    name: 'Priya Mehta',
    role: 'CS Sophomore, UIUC',
    color: 'var(--color-bloom)',
  },
  {
    quote: 'The AI coach is like having a career advisor who actually knows my work. "Ship this, fix that" — direct and useful.',
    name: 'James Rodriguez',
    role: 'ML Student, Stanford',
    color: 'var(--color-ember)',
  },
  {
    quote: 'My proof score went from 42 to 88 in three weeks. The daily check-ins kept me accountable.',
    name: 'Aisha Williams',
    role: 'Data Science Junior, MIT',
    color: 'var(--color-pulse)',
  },
  {
    quote: 'I used to send PDF resumes. Now I send one ORIN link. Way more professional, and they can actually verify my projects.',
    name: 'Chen Wei',
    role: 'Full-Stack Developer, UC Berkeley',
    color: 'var(--color-spark)',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="max-w-6xl mx-auto text-center mb-14">
        <div className="inline-block badge-ink mb-6">Testimonials</div>
        <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-ink)' }}>
          Students love{' '}
          <span className="relative inline-block">
            ORIN
            <span className="absolute bottom-1 left-0 w-full h-3 -z-10 rounded-sm" style={{ backgroundColor: 'var(--color-spark)', opacity: 0.4 }} />
          </span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          Join 5,000+ students building verified career proof.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="card-base p-7 hover-lift"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" style={{ color: 'var(--color-spark)' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ))}
            </div>
            <p className="text-sm mb-6 leading-relaxed italic" style={{ color: 'var(--color-text-secondary)' }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: t.color, color: '#fff' }}
              >
                {t.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>{t.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
