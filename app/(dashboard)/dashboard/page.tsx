'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type ProofCard = Database['public']['Tables']['proof_cards']['Row'];
type Opportunity = Database['public']['Tables']['opportunities']['Row'];

export default function DashboardPage() {
  const [proofs, setProofs] = useState<ProofCard[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [coachNote, setCoachNote] = useState<string>("You need one live deployment. Ship it this week.");
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/signin');
        return;
      }
      setUser(user);
      
      // Fetch proofs
      const { data: proofsData } = await supabase
        .from('proof_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setProofs(proofsData || []);

      // Fetch opportunities
      const { data: oppsData } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });
      
      setOpportunities(oppsData || []);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/auth/signin');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/signin');
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <aside className="hidden lg:col-span-2 lg:block">
        <nav className="sticky top-20 space-y-2 text-sm" aria-label="Dashboard navigation">
          {[
            {
              label: "Dashboard",
              href: "#dashboard-home",
              icon: "M4 12h6v8H4zM14 4h6v16h-6zM4 4h6v6H4z",
            },
            {
              label: `My Proof (${proofs.length})`,
              href: "#my-proof",
              icon: "M4 5h16v4H4zM4 13h16v6H4z",
            },
            {
              label: "Skills Map",
              href: "#skills-map",
              icon: "M4 20V6m5 14V9m5 11v-5m5 5V8",
            },
            {
              label: "Opportunities",
              href: "#opportunities",
              icon: "M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z",
            },
            {
              label: "Settings",
              href: "/dashboard/settings",
              icon: "M12 8a4 4 0 100 8 4 4 0 000-8zm8 4l-2 1 1 2-2 2-2-1-1 2h-2l-1-2-2 1-2-2 1-2-2-1V10l2-1-1-2 2-2 2 1 1-2h2l1 2 2-1 2-2-1 2 2 1v2z",
            },
            {
              label: "Help",
              href: "#help",
              icon: "M12 18h.01M12 14a3 3 0 10-3-3",
            },
          ].map((item) => (
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 text-[var(--color-neutral-text-secondary)] transition hover:bg-[var(--color-neutral-bg)] hover:text-[var(--color-primary-emerald)]"
              href={item.href}
              key={item.label}
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item.label}
            </a>
          ))}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[var(--color-neutral-text-secondary)] transition hover:bg-[var(--color-neutral-bg)] hover:text-[var(--color-danger)]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sign Out
          </button>
        </nav>
      </aside>

      <section id="dashboard-home" className="space-y-6 lg:col-span-7">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-emerald)]">
            Dashboard
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold md:text-4xl">Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}</h1>
            <button className="btn-green px-4 py-2 rounded-lg font-semibold text-white" onClick={() => router.push('/dashboard/proofs/new')}>
              New proof
            </button>
          </div>
          <p className="text-sm text-[var(--color-neutral-text-secondary)]">
            Track verified proof and stay on top of your next opportunity.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Proof cards", value: proofs.length, delta: "+3 this week" },
            { label: "Skills verified", value: 18, delta: "+5 new skills" },
            { label: "Profile views", value: "1.4k", delta: "+18% growth" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
              <p className="text-sm text-[var(--color-neutral-text-secondary)]">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-[var(--color-primary-emerald)]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-[var(--color-accent-green)]">{stat.delta}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
          <p className="text-sm text-[var(--color-neutral-text-secondary)]">AI Coach Message:</p>
          <p className="font-semibold text-sm text-[var(--color-neutral-text)]">
            &ldquo;{coachNote}&rdquo;
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Your proof feed</h2>
            <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
              Recent proof cards created from your sources.
            </p>
          </div>
          <button className="rounded-md border-2 border-[var(--color-primary-emerald)] px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]" onClick={() => {}}>
            Publish public profile
          </button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2" aria-label="Loading proofs">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
                <div className="h-4 w-2/3 rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-4 h-3 w-full rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-4 h-3 w-4/5 rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-6 h-8 w-24 rounded bg-[var(--color-neutral-border)]" />
              </div>
            ))}
          </div>
        ) : proofs.length === 0 ? (
          <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 text-center">
            <h3 className="text-lg font-semibold text-[var(--color-neutral-text)]">No proof yet. Let&apos;s add your first one!</h3>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              Connect GitHub, upload certificates, or link your competitive programming
              profiles to get started.
            </p>
            <button className="btn-green mt-4 px-6 py-3 rounded-lg font-semibold" onClick={() => router.push('/dashboard/sources/new')}>
              Add Proof Source
            </button>
          </div>
        ) : (
          <div id="my-proof" className="grid gap-4 md:grid-cols-2">
            {proofs.slice(0, 6).map((proof) => (
              <div key={proof.id} className="rounded-lg border border-[var(--color-neutral-border)] bg-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-primary-emerald)]">{proof.source_type.toUpperCase()}</p>
                    <h3 className="font-semibold text-gray-900">{proof.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                      {proof.description || 'No description'}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    proof.verification_status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                    proof.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {proof.verification_status}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {proof.skills_extracted?.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs bg-[var(--color-neutral-surface-alt)] px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <aside id="skills-map" className="space-y-4 lg:col-span-3">
        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
          <h2 className="text-base font-semibold text-[var(--color-neutral-text)]">Skill Summary</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-full border-[10px] border-[var(--color-primary-emerald)]/20">
              <div className="absolute inset-2 rounded-full border-[6px] border-[var(--color-primary-emerald)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-neutral-text)]">Top skills</p>
              <p className="text-sm text-[var(--color-neutral-text-secondary)]">
                Node.js, Express, PostgreSQL, System Design, DSA
              </p>
            </div>
          </div>
        </div>
        <div id="opportunities" className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
          <h2 className="text-base font-semibold text-[var(--color-neutral-text)]">Proof Completion</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            3/5 proof types complete
          </p>
          <div className="mt-3 h-2 rounded-full bg-[var(--color-neutral-border)]">
            <div className="h-2 w-3/5 rounded-full bg-[var(--color-primary-emerald)]" />
          </div>
        </div>
        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
          <h2 className="text-base font-semibold text-[var(--color-neutral-text)]">Opportunities matched</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            {opportunities.length} opportunities match your proof.
          </p>
          <div className="mt-3 space-y-2">
            {opportunities.slice(0, 2).map((opportunity) => (
              <div
                key={opportunity.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] p-3"
              >
                <p className="text-sm font-medium text-[var(--color-neutral-text)]">{opportunity.company}</p>
                <p className="text-xs text-[var(--color-neutral-text-secondary)]">
                  {opportunity.title} • {opportunity.match_percentage}% match
                </p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-md border-2 border-[var(--color-primary-emerald)] px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]" onClick={() => router.push('/dashboard/opportunities')}>
            View opportunities
          </button>
        </div>
        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
          <h2 className="text-base font-semibold text-[var(--color-neutral-text)]">Streak</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Logged in 5 days in a row 🔥
          </p>
        </div>
      </aside>
    </div>
  );
}