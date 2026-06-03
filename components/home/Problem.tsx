export default function Problem() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="badge-pulse mb-6">The Problem</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Students build. But can&apos;t prove it.
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            You&apos;ve done the work. The repos exist. The projects shipped. But none of it tells a coherent story to recruiters.
          </p>
        </div>

        {/* Right: Pain points */}
        <div className="space-y-5">
          {[
            {
              icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-pulse)' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              ),
              title: 'Scattered proof',
              desc: 'GitHub, Kaggle, Figma, LinkedIn, Drive. Zero cohesion.',
            },
            {
              icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ember)' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              ),
              title: 'No feedback',
              desc: 'Don\'t know if what you built actually matters.',
            },
            {
              icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-pulse)' }}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ),
              title: 'Unclear story',
              desc: '30 projects. What do they prove? Unknown.',
            },
            {
              icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ember)' }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              ),
              title: 'Missing guidance',
              desc: 'No one tells you what to build next.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl transition-all duration-200"
              style={{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-border-light)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}>
                {item.icon}
              </div>
              <div>
                <strong className="block mb-1" style={{ color: 'var(--color-ink)' }}>{item.title}</strong>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
