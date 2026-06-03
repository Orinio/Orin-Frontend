import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Everything you need to start building proof.',
    color: 'var(--color-bloom)',
    features: ['3 proof cards', 'AI coach (basic)', 'Public profile', 'Job board access'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    desc: 'For students serious about standing out.',
    color: 'var(--color-pulse)',
    features: ['Unlimited proof cards', 'AI coach (advanced)', 'Priority matching', 'Custom profile themes', 'Proof analytics', 'Export to PDF'],
    cta: 'Go Pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    desc: 'For student orgs and bootcamps.',
    color: 'var(--color-ember)',
    features: ['Everything in Pro', 'Team dashboard', 'Bulk proof generation', 'Branded profiles', 'API access', 'Dedicated support'],
    cta: 'Contact Us',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto text-center mb-14">
        <div className="inline-block badge-ember mb-6">Pricing</div>
        <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-ink)' }}>
          Simple,{' '}
          <span className="relative inline-block">
            student-friendly
            <span className="absolute bottom-1 left-0 w-full h-3 -z-10 rounded-sm" style={{ backgroundColor: 'var(--color-ember)', opacity: 0.4 }} />
          </span>{' '}
          pricing
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          Start free. Upgrade when you are ready.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`relative p-7 rounded-[var(--radius-xl)] hover-lift ${
              plan.highlighted ? 'ring-2 shadow-lg' : 'card-base'
            }`}
            style={{
              animationDelay: `${i * 0.1}s`,
              ...(plan.highlighted && {
                borderColor: 'var(--color-pulse)',
                ringColor: 'var(--color-pulse)',
              }),
            }}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-pulse text-xs">Most Popular</div>
            )}
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-ink)' }}>{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-bold" style={{ color: 'var(--color-ink)' }}>{plan.price}</span>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{plan.period}</span>
            </div>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{plan.desc}</p>
            <ul className="space-y-2 mb-7">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-ink)' }}>
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-bloom)' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className={`block text-center py-3 rounded-[var(--radius-md)] text-sm font-semibold transition-all ${
                plan.highlighted ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
