export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ember)' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      title: 'Import Everything',
      desc: 'Connect GitHub, Kaggle, upload certificates, paste project links. All in one place.',
      accent: 'var(--color-ember)',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-spark)' }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: 'AI Extracts Skills',
      desc: 'Our AI reads your code and work, extracts real skills, structures them as proof cards.',
      accent: 'var(--color-spark)',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-pulse)' }}>
          <path d="M12 2a3 3 0 0 0-3 3v1H7a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V8a2 2 0 0 0-2-2h-2V5a3 3 0 0 0-3-3z" />
        </svg>
      ),
      title: 'Daily AI Coach',
      desc: 'Every morning: feedback on progress, gaps you have, one concrete next action.',
      accent: 'var(--color-pulse)',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-bloom)' }}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      title: 'Public Proof Profile',
      desc: 'Share one link. Your complete proof story. No more scattered links across platforms.',
      accent: 'var(--color-bloom)',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ember)' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: 'Matched Opportunities',
      desc: 'Get internships, projects, first jobs matched to your actual proof, not self-described skills.',
      accent: 'var(--color-ember)',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-pulse)' }}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      title: 'Proof Score',
      desc: 'See how strong your proof is. Identify gaps. Real progress metrics that matter.',
      accent: 'var(--color-pulse)',
    },
  ];

  return (
    <section id="features" className="py-24 px-6" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-spark mb-6">Features</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Everything in one place
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Import. Extract. Coach. Share. Opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl transition-all duration-300 group cursor-default"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-light)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${feature.accent}30`;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${feature.accent}12` }}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-ink)' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
