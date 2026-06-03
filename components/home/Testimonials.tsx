export default function Testimonials() {
  const testimonials = [
    {
      quote: 'I had 20 GitHub repos scattered. ORIN turned them into a proof profile. Got 3 internship offers in 2 weeks.',
      author: 'Priya S.',
      org: 'IIT Delhi',
      accent: 'var(--color-bloom)',
    },
    {
      quote: 'The AI coach is like having a mentor. It tells me exactly what I\'m doing wrong and what to fix next.',
      author: 'Arjun M.',
      org: 'Self-taught Dev',
      accent: 'var(--color-ember)',
    },
    {
      quote: 'Instead of tweaking my resume, I focused on building proof. ORIN made sharing it so easy.',
      author: 'Sophia W.',
      org: 'Bootcamp Grad',
      accent: 'var(--color-pulse)',
    },
  ];

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-bloom mb-6">Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Stories from students
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-border-light)',
              }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <svg className="w-8 h-8 opacity-20" viewBox="0 0 24 24" fill="currentColor" style={{ color: t.accent }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed mb-6 italic" style={{ color: 'var(--color-text-secondary)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: t.accent }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-ink)' }}>{t.author}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{t.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
