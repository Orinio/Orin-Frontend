import Link from 'next/link';

export default function FinalCTA() {
  return (
    <>
      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif font-bold mb-6 text-gray-900">
            Stop scattering. Start proving.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your work should become your career proof. Not scattered across 5 platforms. One single source of truth.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/signup"
              className="btn-green px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Get Started Free
            </Link>
            <button className="border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50">
              Watch Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-8">
            🎓 Special: First 500 students get Pro free for 3 months
          </p>
        </div>
      </section>

      {/* STYLES */}
      <style>{`
        .btn-green {
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
          font-weight: 500;
          transition: box-shadow 0.3s ease;
        }

        .btn-green:hover {
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
        }
      `}</style>
    </>
  );
}