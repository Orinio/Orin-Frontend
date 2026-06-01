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
            {/* Floating cartoony mobile mockup */}
            <div className="relative mx-auto w-64 h-96 animate-float-slow">
              <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-2xl border-4 border-emerald-200 overflow-hidden">
                {/* Mobile screen - cartoony style */}
                <div className="p-5 space-y-4 bg-gradient-to-b from-emerald-50/30 to-white">
                  {/* Status bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold grad-emerald">ORIN</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                  
                  {/* Welcome text */}
                  <div className="text-center">
                    <div className="h-3 w-20 mx-auto rounded-full bg-emerald-200"></div>
                    <div className="h-2 w-16 mx-auto rounded-full bg-orange-200 mt-2"></div>
                  </div>
                  
                  {/* Cartoony proof cards */}
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
                  
                  {/* Achievement badge */}
                  <div className="flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-emerald-400 to-orange-400 px-4 py-2 shadow-lg">
                      <div className="h-2 w-16 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cartoony shadows */}
              <div className="absolute -bottom-6 -left-4 w-64 h-12 bg-emerald-200/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-6 w-48 h-10 bg-orange-200/30 rounded-full blur-lg"></div>
            </div>
            
            {/* Brand text */}
            <div className="mt-12 text-center">
              <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">
                Turn scattered work into career proof
              </h2>
              <p className="text-gray-600">
                GitHub commits, Kaggle notebooks, certificates—all become verified proof cards that prove your skills.
              </p>
            </div>
          </div>
        </section>
        
        {/* Right side - Auth forms */}
        <section className="flex items-center justify-center px-6 py-12 bg-white">
          {children}
        </section>
      </main>
    </div>
  );
}