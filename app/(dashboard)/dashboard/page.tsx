import { supabase, Database } from "@/lib/supabase";
import { proofs as mockProofs, opportunities as mockOpps, coachNote as mockCoachNote } from "@/lib/mock-data";
import { mapDbProofToProof, mapDbOpportunityToOpportunity } from "@/lib/utils";
import ProofCard from "@/components/ProofCard";
import CoachNote from "@/components/CoachNote";
import type { Proof, Opportunity, CoachNote as CoachNoteType } from "@/lib/types";

export default async function DashboardPage() {
  let proofs: Proof[] = [];
  let opportunities: Opportunity[] = [];
  let coachNote: CoachNoteType = mockCoachNote;
  let isDemoMode = false;

  if (supabase) {
    try {
      const { data: proofsData, error: proofsError } = await supabase
        .from('proof_cards')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: oppsData, error: oppsError } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (proofsError || oppsError || !proofsData) {
        throw new Error("Supabase query failed or returned no data");
      }

      // Map snake_case rows from DB to camelCase structures
      proofs = proofsData.map(mapDbProofToProof);
      opportunities = oppsData ? oppsData.map(mapDbOpportunityToOpportunity) : [];
      
      const { data: noteDataRaw } = await supabase
        .from('coach_notes')
        .select('*')
        .limit(1)
        .maybeSingle();

      const noteData = noteDataRaw as Database['public']['Tables']['coach_notes']['Row'] | null;

      if (noteData) {
        coachNote = {
          id: noteData.id,
          userId: noteData.user_id,
          content: noteData.content,
          type: "daily",
          actionSuggestion: "Show me what to build",
          createdAt: new Date(noteData.created_at),
        };
      }
    } catch (e) {
      console.warn("Falling back to demo mode due to database query error:", e);
      proofs = mockProofs;
      opportunities = mockOpps;
      isDemoMode = true;
    }
  } else {
    isDemoMode = true;
    proofs = mockProofs;
    opportunities = mockOpps;
  }

  return (
    <div className="space-y-6">
      {isDemoMode && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3.5 text-sm text-amber-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <span>
              <strong>Running in Demo Mode:</strong> Database connection is currently offline or unconfigured. Displaying sandbox proof data.
            </span>
          </div>
        </div>
      )}

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
                icon: "M12 8a4 4 0 100 8 4 4 0 000-8zm8 4l-2 1 1 2-2 2-2-1-1 2h-2l-1-2-2 1-2-2 1-2-2-1V10l2-1-1-2 2-2 2 1 1-2h2l1 2 2-1 2 2-1 2 2 1v2z",
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
          </nav>
        </aside>

        <section id="dashboard-home" className="space-y-6 lg:col-span-7">
          <header className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-emerald)]">
              Dashboard
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl font-semibold md:text-4xl font-serif">Welcome back</h1>
              <button className="btn-green px-4 py-2 rounded-md font-semibold text-white">New proof</button>
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

          <CoachNote note={coachNote.content} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-neutral-text)]">Your proof feed</h2>
              <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                Recent proof cards created from your sources.
              </p>
            </div>
            <button className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
              Publish public profile
            </button>
          </div>

          {proofs.length === 0 ? (
            <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 text-center">
              <h3 className="text-lg font-semibold text-[var(--color-neutral-text)]">No proof yet. Let&apos;s add your first one!</h3>
              <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
                Connect GitHub, upload certificates, or link your competitive programming
                profiles to get started.
              </p>
            </div>
          ) : (
            <div id="my-proof" className="grid gap-4 md:grid-cols-2">
              {proofs.slice(0, 6).map((proof) => (
                <ProofCard key={proof.id} proof={proof} variant="dashboard" />
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
                    {opportunity.title} • {opportunity.matchPercentage}% match
                  </p>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
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
    </div>
  );
}