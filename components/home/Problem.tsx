export default function Problem() {
  return (
    <>
      {/* PROBLEM */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900">
              The problem students face
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-3xl">📌</span>
                <div>
                  <strong className="text-gray-900">Scattered proof</strong>
                  <p className="text-gray-600">
                    GitHub, Kaggle, Figma, LinkedIn, Drive. Zero cohesion.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">😕</span>
                <div>
                  <strong className="text-gray-900">No feedback</strong>
                  <p className="text-gray-600">
                    Don&apos;t know if what you built actually matters.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">❌</span>
                <div>
                  <strong className="text-gray-900">Unclear story</strong>
                  <p className="text-gray-600">
                    30 projects. What do they prove? Unknown.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🔍</span>
                <div>
                  <strong className="text-gray-900">Missing guidance</strong>
                  <p className="text-gray-600">
                    No one tells you what to build next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}