import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-paper)' }}
    >
      {/* Subtle accent orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: 'var(--color-spark)' }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: 'var(--color-ember)' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="badge-pulse mb-6">Limited Time</div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: 'var(--color-ink)' }}>
          Stop scattering.{' '}
          <span className="relative inline-block">
            Start proving.
            <span
              className="absolute bottom-1 left-0 w-full h-3 -z-10 rounded-sm"
              style={{ backgroundColor: 'var(--color-spark)', opacity: 0.5 }}
            />
          </span>
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Your work should become your career proof. Not scattered across 5 platforms. One single source of truth.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/signup" className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg">
            Get Started Free
          </Link>
          <button className="btn-outline px-8 py-4 rounded-lg font-semibold text-lg">
            Watch Demo
          </button>
        </div>
        <p className="text-sm mt-8 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="inline-flex items-center gap-2">
            <span className="text-lg">&#127891;</span>
            Special: First 500 students get Pro free for 3 months
          </span>
        </p>
      </div>
    </section>
  );
}
