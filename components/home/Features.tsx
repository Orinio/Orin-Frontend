export default function Features() {
  return (
    <>
      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4 text-gray-900">
              Everything in one place
            </h2>
            <p className="text-lg text-gray-600">
              Import. Extract. Coach. Share. Opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
                icon: '📦',
                title: 'Import Everything',
                desc: 'Connect GitHub, Kaggle, upload certificates, paste project links. All in one place.',
              },
              {
                icon: '✨',
                title: 'AI Extracts Skills',
                desc: 'Our AI reads your code and work, extracts real skills, structures them as proof cards.',
              },
              {
                icon: '🎯',
                title: 'Daily AI Coach',
                desc: 'Every morning: feedback on progress, gaps you have, one concrete next action.',
              },
              {
                icon: '🔗',
                title: 'Public Proof Profile',
                desc: 'Share one link. Your complete proof story. No more scattered links across platforms.',
              },
              {
                icon: '🚀',
                title: 'Matched Opportunities',
                desc: 'Get internships, projects, first jobs matched to your actual proof, not self-described skills.',
              },
              {
                icon: '📊',
                title: 'Proof Score',
                desc: 'See how strong your proof is. Identify gaps. Real progress metrics that matter.',
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}