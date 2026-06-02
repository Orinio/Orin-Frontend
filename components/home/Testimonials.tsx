export default function Testimonials() {
  return (
    <>
      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-16 text-gray-900">
            Stories from students
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
                quote:
                  '&ldquo;I had 20 GitHub repos scattered. ORIN turned them into a proof profile. Got 3 internship offers in 2 weeks.&rdquo;',
                author: 'Priya S.',
                org: 'IIT Delhi',
              },
              {
                quote:
                  '&ldquo;The AI coach is like having a mentor. It tells me exactly what I\'m doing wrong and what to fix next.&rdquo;',
                author: 'Arjun M.',
                org: 'Self-taught Dev',
              },
              {
                quote:
                  '&ldquo;Instead of tweaking my resume, I focused on building proof. ORIN made sharing it so easy.&rdquo;',
                author: 'Sophia W.',
                org: 'Bootcamp Grad',
              }
            ].map((testimonial, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-8">
                <p className="text-sm text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <p className="font-semibold text-gray-900">
                  {testimonial.author} • {testimonial.org}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}