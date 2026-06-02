import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Header */}
      <nav className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-orange-500 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <span className="text-base font-bold text-white">O</span>
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-orange-500/30 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
                Orin
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <svg
              className="h-4 w-4 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            <span>Trusted by 10,000+ builders</span>
          </div>
        </div>
      </nav>

      {/* Main split layout */}
      <main
        id="main-content"
        className="grid min-h-[calc(100vh-73px)] lg:grid-cols-2"
      >
        {/* Left side - Brand showcase */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-orange-50 lg:block">
          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-300/40 to-emerald-500/20 blur-3xl" />
            <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-orange-300/40 to-amber-500/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-200/30 to-orange-200/30 blur-3xl" />
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage:
                  'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse at center, black 30%, transparent 70%)',
              }}
            />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
            <div className="space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-emerald-700 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                New: AI-powered proof suggestions
              </div>

              {/* Headline */}
              <div className="space-y-5">
                <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 xl:text-5xl">
                  Turn your work into{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
                      career proof
                    </span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 200 8"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 5C50 2 150 2 198 5"
                        stroke="url(#under)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="under" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>
                <p className="max-w-md text-lg leading-relaxed text-slate-600">
                  GitHub commits, Kaggle notebooks, certificates, design
                  files — all become verified proof cards that prove your
                  skills to recruiters.
                </p>
              </div>

              {/* Feature checklist */}
              <ul className="space-y-3.5">
                {[
                  'Auto-import from GitHub, Kaggle & more',
                  'Beautiful, shareable proof portfolio',
                  'Verified, tamper-proof credentials',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                      <svg
                        className="h-3.5 w-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-[15px]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-300/50 via-orange-200/50 to-amber-300/50 opacity-60 blur-lg" />
              <div className="relative rounded-2xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
                <div className="flex items-start gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                  &ldquo;Orin helped me land 3 interviews in a week. Recruiters
                  could actually <em>see</em> what I&rsquo;d built, not just
                  read about it.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-orange-400 font-semibold text-white">
                    SM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Sarah Mitchell
                    </p>
                    <p className="text-xs text-slate-500">
                      Frontend Engineer @ Vercel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right side - Auth forms */}
        <section className="relative flex items-center justify-center px-6 py-12 sm:px-8">
          {/* Subtle background pattern for mobile */}
          <div className="absolute inset-0 -z-10 overflow-hidden lg:hidden">
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
          </div>
          <div className="w-full max-w-md">{children}</div>
        </section>
      </main>
    </div>
  );
}
