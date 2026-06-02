import Link from 'next/link';

export default function Hero() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              AI Coach For Students
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-gray-900">
              Your scattered work becomes career proof
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              GitHub, Kaggle, certificates, projects—all over the place. ORIN transforms them into verified proof cards, an AI coach who guides you daily, and real opportunities that match your proof.
            </p>
            <div className="flex gap-4 flex-wrap mb-6">
              <Link
                href="/signup"
                className="btn-green px-6 py-3 rounded-lg font-semibold"
              >
                Start Building Proof
              </Link>
              <button className="border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500">
              ✓ Free forever tier • ✓ No card needed • ✓ 5,000+ active students
            </p>
          </div>
          <div>
            <div className="relative mx-auto w-64 h-96 animate-float-slow">
              <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-2xl border-4 border-emerald-200 overflow-hidden">
                <div className="p-5 space-y-4 bg-gradient-to-b from-emerald-50/30 to-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold grad-emerald">ORIN</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h-3 w-20 mx-auto rounded-full bg-emerald-200"></div>
                    <div className="h-2 w-16 mx-auto rounded-full bg-orange-200 mt-2"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-14 rounded-2xl border-l-8 border-emerald-400 bg-white p-3 shadow-md transform rotate-1">
                      <div className="h-2 w-3/4 rounded bg-gray-900 mb-1"></div>
                      <div className="h-1.5 w-1/2 rounded bg-gray-300"></div>
                    </div>
                    <div className="h-14 rounded-2xl border-l-8 border-orange-400 bg-white p-3 shadow-md transform -rotate-1">
                      <div className="h-2 w-2/3 rounded bg-gray-900 mb-1"></div>
                      <div className="h-1.5 w-2/5 rounded bg-gray-300"></div>
                    </div>
                    <div className="h-12 rounded-2xl border-l-8 border-emerald-400 bg-white p-3 shadow-md transform rotate-1">
                      <div className="h-2 w-3/5 rounded bg-gray-900"></div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-emerald-400 to-orange-400 px-4 py-2 shadow-lg">
                      <div className="h-2 w-16 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 w-64 h-12 bg-emerald-200/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-6 w-48 h-10 bg-orange-200/30 rounded-full blur-lg"></div>
            </div>
          </div>
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

        .btn-green {
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
          font-weight: 500;
          transition: box-shadow 0.3s ease;
        }

        .btn-green:hover {
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
        }

        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </>
  );
}