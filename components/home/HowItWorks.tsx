export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Sign up & import',
      desc: 'Connect GitHub, upload certificates, paste project links. Takes 3 minutes.',
      color: 'var(--color-bloom)',
    },
    {
      num: '2',
      title: 'AI extracts your proof',
      desc: 'Our AI reads your work and creates structured proof cards with verified skills. You review & edit.',
      color: 'var(--color-ember)',
    },
    {
      num: '3',
      title: 'Daily coach guides you',
      desc: 'Get one message every morning. It notices gaps, flags what you\'re repeating, suggests one next action.',
      color: 'var(--color-pulse)',
    },
    {
      num: '4',
      title: 'Share & get matched',
      desc: 'Publish your proof profile. Get matched to internships, projects, and jobs that fit your actual proof.',
      color: 'var(--color-spark)',
    },
  ];

  return (
    <section id="how" className="py-24 px-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-ember mb-6">How It Works</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            4 steps to proof
          </h2>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-6 p-6 rounded-2xl transition-all duration-200"
              style={{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-border-light)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold flex-shrink-0 text-xl text-white"
                style={{ backgroundColor: step.color }}
              >
                {step.num}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-ink)' }}>{step.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
