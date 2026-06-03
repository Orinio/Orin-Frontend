const stats = [
  { value: '5,240+', label: 'Active students', color: 'var(--color-bloom)' },
  { value: '18,300', label: 'Proof cards generated', color: 'var(--color-ember)' },
  { value: '88%', label: 'Feel more career-ready', color: 'var(--color-pulse)' },
  { value: '4.9/5', label: 'Student satisfaction', color: 'var(--color-spark)' },
];

export default function Stats() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-ink)' }}>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              className="text-4xl font-bold mb-2 transition-colors"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
