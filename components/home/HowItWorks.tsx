const steps = [
  {
    num: '01',
    title: 'Connect your sources',
    desc: 'Link GitHub, Kaggle, certificates, and more. One-time setup, 2 minutes.',
    color: 'var(--color-ember)',
  },
  {
    num: '02',
    title: 'ORIN builds your proof',
    desc: 'AI scans your work, identifies proof points, and generates verified Proof Cards.',
    color: 'var(--color-pulse)',
  },
  {
    num: '03',
    title: 'Get coached daily',
    desc: 'AI coach reviews your progress, suggests next steps, and pushes you toward your goals.',
    color: 'var(--color-bloom)',
  },
  {
    num: '04',
    title: 'Land opportunities',
    desc: 'Get matched to roles that fit YOUR proof. Not random listings — curated fits.',
    color: 'var(--color-spark)',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto text-center mb-14">
        <div className="inline-block badge-ember mb-6">How It Works</div>
        <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-ink)' }}>
          Four steps to{' '}
          <span className="relative inline-block">
            career proof
            <span className="absolute bottom-1 left-0 w-full h-3 -z-10 rounded-sm" style={{ backgroundColor: 'var(--color-ember)', opacity: 0.4 }} />
          </span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          From scattered tabs to verified proof in minutes, not months.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="card-base p-7 hover-lift relative overflow-hidden group"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* Big background number */}
            <span
              className="absolute -top-4 -right-2 text-[100px] font-bold leading-none pointer-events-none select-none transition-opacity group-hover:opacity-20"
              style={{ color: step.color, opacity: 0.06 }}
            >
              {step.num}
            </span>
            <div className="relative">
              <div
                className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center text-sm font-bold mb-4"
                style={{ backgroundColor: step.color, color: '#fff' }}
              >
                {step.num}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-ink)' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
