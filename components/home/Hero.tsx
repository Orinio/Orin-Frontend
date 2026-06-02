import Link from 'next/link';

export default function Hero() {
  return (
    <>
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              AI Coach For Students
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-gray-900">
              Your scattered work becomes career proof
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              GitHub, Kaggle, certificates, projects, all over the place. ORIN transforms them into verified proof cards, an AI coach who guides you daily, and real opportunities that match your proof.
            </p>
            <div className="flex gap-4 flex-wrap mb-6">
              <Link href="/register" className="btn-green px-6 py-3 rounded-lg font-semibold">
                Start Building Proof
              </Link>
              <button className="border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Free forever tier. No card needed. 5,000+ active students
            </p>
          </div>
          <PhoneMockup />
        </div>
      </section>
      <style>{styles}</style>
    </>
  );
}

const styles = `
  .grad-emerald { background: linear-gradient(135deg, #059669 0%, #d97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .btn-green { background: linear-gradient(135deg, #059669, #10b981); color: white; font-weight: 500; transition: box-shadow 0.3s ease; }
  .btn-green:hover { box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3); }
  .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
  .animate-float-slower { animation: floatSlower 7.5s ease-in-out infinite; }
  @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
  @keyframes floatSlower { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
  @keyframes progressFill { 0% { stroke-dashoffset: 94.2; } 100% { stroke-dashoffset: 11.3; } }
  .progress-ring { animation: progressFill 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .proof-card-anim { opacity: 0; transform: translateX(-12px); animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes slideInLeft { to { opacity: 1; transform: translateX(0); } }
  .pulse-dot { animation: pulseDot 1.8s ease-in-out infinite; }
  @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
  .shine-wrap { position: relative; overflow: hidden; }
  .shine-wrap::after { content: ""; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); transform: skewX(-20deg); animation: shineMove 4s ease-in-out infinite; }
  @keyframes shineMove { 0% { left: -100%; } 70%, 100% { left: 200%; } }
`;

function PhoneMockup() {
  return (
    <div className="relative h-[560px] flex items-center justify-center select-none">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[480px] h-[480px] rounded-full bg-gradient-to-br from-emerald-200/50 via-orange-100/40 to-emerald-100/50 blur-3xl"></div>
      </div>
      <AICoachCard />
      <ProofScoreCard />
      <OpportunityCard />
      <div className="relative z-20 animate-float-slow" style={{ animationDelay: '0.3s' }}>
        <div className="relative w-[268px] h-[540px] rounded-[3rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl shadow-gray-900/40 p-[6px]">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/15 via-transparent to-white/5 pointer-events-none"></div>
          <div className="relative w-full h-full rounded-[2.4rem] bg-white overflow-hidden">
            <PhoneScreen />
          </div>
        </div>
      </div>
    </div>
  );
}

function AICoachCard() {
  return (
    <div className="absolute top-6 -left-2 md:-left-12 z-30 animate-float-slow" style={{ animationDelay: '0.5s' }}>
      <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-900/15 border border-gray-100 p-3.5 max-w-[240px] flex items-start gap-3 backdrop-blur-md">
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/40">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v1H7a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V8a2 2 0 0 0-2-2h-2V5a3 3 0 0 0-3-3z"></path>
            <circle cx="9" cy="14" r="1.3" fill="currentColor"></circle>
            <circle cx="15" cy="14" r="1.3" fill="currentColor"></circle>
            <path d="M9.5 17.5h5"></path>
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">AI Coach</p>
          <p className="text-xs font-semibold text-gray-900 leading-snug">Ship one live deploy this week. You are 80% there</p>
        </div>
      </div>
    </div>
  );
}

function ProofScoreCard() {
  return (
    <div className="absolute bottom-20 -right-2 md:-right-10 z-30 animate-float-slower" style={{ animationDelay: '1s' }}>
      <div className="bg-white rounded-2xl shadow-2xl shadow-orange-900/15 border border-gray-100 p-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#fef3c7" strokeWidth="3"></circle>
              <circle cx="18" cy="18" r="15" fill="none" stroke="url(#scoreGrad)" strokeWidth="3" strokeDasharray="94.2" strokeDashoffset="94.2" strokeLinecap="round" className="progress-ring"></circle>
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b"></stop>
                  <stop offset="100%" stopColor="#10b981"></stop>
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">88</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Proof Score</p>
            <p className="text-xs font-semibold text-gray-900">Top 8% of peers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpportunityCard() {
  return (
    <div className="absolute top-1/2 -right-2 md:-right-14 z-30 animate-float-slow hidden lg:block" style={{ animationDelay: '1.5s' }}>
      <div className="bg-white rounded-2xl shadow-2xl shadow-gray-900/15 border border-gray-100 p-3 max-w-[200px] backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-base">New</span>
          <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">New Match</span>
        </div>
        <p className="text-[11px] font-semibold text-gray-900 leading-tight">Frontend Intern at Linear</p>
        <p className="text-[9px] text-gray-500 mt-0.5">92% match - 2 days ago</p>
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-24 h-6 bg-gray-900 rounded-full flex items-center justify-end pr-3">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
      </div>
      <div className="flex justify-between items-center px-5 pt-2.5 pb-1 text-[10px] font-semibold text-gray-900">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"></path></svg>
          <div className="w-5 h-2.5 border border-gray-900 rounded-sm relative">
            <div className="absolute inset-0.5 bg-gray-900 rounded-[1px]" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-3 pb-3 h-[calc(100%-28px)] flex flex-col bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <AppHeader />
        <HeroCard />
        <ProofCardItem iconBg="from-emerald-100 to-emerald-50" icon={<svg className="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>} title="AWS Certified" subtitle="Cloud Architect" delay="0.2s" />
        <ProofCardItem iconBg="from-gray-900 to-gray-700" icon={<svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"></path></svg>} title="GitHub: 24 repos" subtitle="React, Node, Python" delay="0.4s" />
        <ProofCardItem iconBg="from-orange-100 to-pink-50" icon={<span className="text-sm">DS</span>} title="Design System" subtitle="12 components shipped" delay="0.6s" />
        <BottomNav />
      </div>
    </>
  );
}

function AppHeader() {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
          <span className="text-[11px] font-bold text-white">O</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-900 leading-none">My Proof</p>
          <p className="text-[8px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"></span>
            Live
          </p>
        </div>
      </div>
      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-3 mb-2.5 shadow-lg shadow-emerald-500/30 overflow-hidden shine-wrap">
      <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/10"></div>
      <div className="absolute -right-8 -bottom-8 w-20 h-20 rounded-full bg-white/5"></div>
      <div className="relative">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-base">Trophy</span>
          <span className="text-[8px] font-bold text-emerald-50 uppercase tracking-wider">Verified</span>
        </div>
        <p className="text-[11px] font-bold text-white leading-tight">Kaggle 1st Place</p>
        <p className="text-[9px] text-emerald-50/90 mt-0.5">ML Competition - Top 0.3%</p>
        <div className="flex gap-1 mt-2">
          <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-white/20 text-white font-semibold backdrop-blur-sm">Python</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-white/20 text-white font-semibold backdrop-blur-sm">ML</span>
        </div>
      </div>
    </div>
  );
}

function ProofCardItem({ iconBg, icon, title, subtitle, delay }: { iconBg: string; icon: React.ReactNode; title: string; subtitle: string; delay: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm flex items-center gap-2.5 proof-card-anim" style={{ animationDelay: delay }}>
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${iconBg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold text-gray-900 leading-tight truncate">{title}</p>
        <p className="text-[8px] text-gray-500 leading-tight">{subtitle}</p>
      </div>
      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-2.5 h-2.5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="mt-2 mx-auto w-fit px-1.5 py-1 rounded-full bg-gray-900/95 flex items-center gap-1 shadow-lg">
      <NavDot active />
      <NavDot />
      <NavDot />
      <NavDot />
    </div>
  );
}

function NavDot({ active }: { active?: boolean }) {
  return (
    <div className={`w-1.5 h-1.5 rounded-full transition-all ${active ? 'w-4 bg-emerald-400' : 'bg-gray-600'}`}></div>
  );
}
