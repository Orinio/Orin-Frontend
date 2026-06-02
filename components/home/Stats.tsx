export default function Stats() {
  return (
    <>
      {/* STATS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[{
              num: '5K+',
              label: 'Active students'
            },
            {
              num: '23K+',
              label: 'Proof cards created'
            },
            {
              num: '1.2K+',
              label: 'Matched internships'
            },
            {
              num: '92%',
              label: 'Return weekly'
            }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-5xl font-serif font-bold grad-emerald">{stat.num}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STYLES */}
      <style>{`
        .grad-emerald {
          background: linear-gradient(135deg, #059669 0%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </>
  );
}