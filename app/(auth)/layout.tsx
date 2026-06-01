import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold grad-emerald">
            ORIN
          </Link>
          <p className="text-sm text-gray-600">
            Turn your work into career proof
          </p>
        </div>
      </nav>
      
      {/* Main split layout */}
      <main id="main-content" className="grid md:grid-cols-2 min-h-[calc(100vh-73px)]">
        {/* Left side - Brand description with floating mobile */}
        <section className="hidden md:flex items-center justify-center bg-gradient-to-br from-emerald-50 to-orange-50 p-12">
          <div className="relative max-w-sm">
            {/* Floating mobile mockup */}
            <div className="relative mx-auto w-64 h-96 animate-float-slow">
              <div className="absolute inset-0 rounded-3xl bg-white shadow-lg-soft border border-gray-200 overflow-hidden">
                {/* Mobile screen content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold grad-emerald">ORIN</span>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 rounded bg-emerald-100"></div>
                    <div className="h-3 w-1/2 rounded bg-orange-100"></div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-12 rounded-lg border-l-4 border-emerald-500 bg-white p-2">
                      <div className="h-2 w-3/4 rounded bg-gray-900"></div>
                      <div className="mt-1 h-1.5 w-1/2 rounded bg-gray-300"></div>
                    </div>
                    <div className="h-12 rounded-lg border-l-4 border-orange-500 bg-white p-2">
                      <div className="h-2 w-2/3 rounded bg-gray-900"></div>
                      <div className="mt-1 h-1.5 w-1/3 rounded bg-gray-300"></div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-500 p-2">
                    <div className="h-2 w-4/5 rounded bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Brand text */}
            <div className="mt-12 text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Turn scattered work into career proof
              </h2>
              <p className="text-gray-600">
                GitHub commits, Kaggle notebooks, certificates—all become verified proof cards that prove your skills.
              </p>
            </div>
          </div>
        </section>
        
        {/* Right side - Auth forms */}
        <section className="flex items-center justify-center px-6 py-12">
          {children}
        </section>
      </main>
    </div>
  );
}