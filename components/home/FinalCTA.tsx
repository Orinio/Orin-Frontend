import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--color-ink)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.08]" style={{ backgroundColor: 'var(--color-spark)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.06]" style={{ backgroundColor: 'var(--color-ember)' }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-block badge-spark mb-6">Ready?</div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-white">
          Stop collecting certificates.<br />
          <span className="relative inline-block">
            Start collecting proof.
            <span className="absolute bottom-1.5 left-0 w-full h-3 -z-10 rounded-sm" style={{ backgroundColor: 'var(--color-spark)', opacity: 0.5 }} />
          </span>
        </h2>
        <p className="text-lg mb-8 text-white/70 max-w-xl mx-auto">
          Join 5,000+ students who turned scattered work into verified career proof. Free forever.
        </p>
        <Link
          href="/signup"
          className="inline-block btn-primary px-10 py-4 rounded-[var(--radius-md)] text-base font-semibold"
        >
          Build Your Proof — Free
        </Link>
      </div>
    </section>
  );
}
