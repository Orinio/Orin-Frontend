export default function Stats() {
  const stats = [
    { num: '5K+', label: 'Active students', color: 'var(--color-bloom)' },
    { num: '23K+', label: 'Proof cards created', color: 'var(--color-ember)' },
    { num: '1.2K+', label: 'Matched internships', color: 'var(--color-pulse)' },
    { num: '92%', label: 'Return weekly', color: 'var(--color-spark)' },
  ];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-light)',
              }}
            >
              <p
                className="text-5xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.num}
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
