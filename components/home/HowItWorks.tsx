export default function HowItWorks() {
  return (
    <>
      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-16 text-gray-900">
            4 steps to proof
          </h2>
          <div className="space-y-8">
            {[
              {
                num: '1',
                title: 'Sign up & import',
                desc: 'Connect GitHub, upload certificates, paste project links. Takes 3 minutes.',
              },
              {
                num: '2',
                title: 'AI extracts your proof',
                desc: 'Our AI reads your work and creates structured proof cards with verified skills. You review & edit.',
              },
              {
                num: '3',
                title: 'Daily coach guides you',
                desc: 'Get one message every morning. It notices gaps, flags what you\'re repeating, suggests one next action.',
              },
              {
                num: '4',
                title: 'Share & get matched',
                desc: 'Publish your proof profile. Get matched to internships, projects, and jobs that fit your actual proof.',
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0 font-serif text-xl">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}