import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-spark mb-6">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Free */}
          <div
            className="p-8 rounded-2xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <p className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Free Proof</p>
            <p className="text-4xl font-bold mb-6" style={{ color: 'var(--color-ink)' }}>Free</p>
            <Link href="/signup" className="btn-outline w-full py-3 rounded-lg text-center block mb-8">
              Get Started Free
            </Link>
            <ul className="space-y-3">
              {['5 proof cards', 'Basic coach (3x/week)', 'Public profile', '1 source integration'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-bloom)' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro - Featured */}
          <div
            className="p-8 rounded-2xl relative"
            style={{
              backgroundColor: 'var(--color-ink)',
              border: '2px solid var(--color-ink)',
              transform: 'scale(1.02)',
            }}
          >
            <div
              className="absolute -top-4 left-6 px-4 py-1 rounded-full text-sm font-bold"
              style={{ backgroundColor: 'var(--color-spark)', color: 'var(--color-ink)' }}
            >
              Most Popular
            </div>
            <p className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Pro Proof</p>
            <p className="text-4xl font-bold mb-1" style={{ color: 'var(--color-paper)' }}>
              ₹299
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--color-mist)' }}>/month</p>
            <Link href="/signup" className="btn-primary w-full py-3 rounded-lg text-center block mb-8">
              Start Free Trial
            </Link>
            <ul className="space-y-3">
              {[
                'Unlimited proof cards',
                'Daily AI coach',
                'Unlimited integrations',
                'Opportunity matching',
                'Analytics dashboard',
                'Priority support',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-mist)' }}>
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-spark)' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Institutions */}
          <div
            className="p-8 rounded-2xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <p className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Institutions</p>
            <p className="text-4xl font-bold mb-6" style={{ color: 'var(--color-ink)' }}>Custom</p>
            <Link href="/contact" className="btn-outline w-full py-3 rounded-lg text-center block mb-8">
              Contact Sales
            </Link>
            <ul className="space-y-3">
              {['All Pro features', 'Cohort dashboard', 'Outcome reporting', 'Dedicated support', 'Branded profiles'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-bloom)' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
