import Link from "next/link";
import { supabase, Database } from "@/lib/supabase";
import { proofs as mockProofs, opportunities as mockOpps, coachNote as mockCoachNote, currentUser as mockUser } from "@/lib/mock-data";
import { mapDbProofToProof, mapDbOpportunityToOpportunity, mapDbCoachNoteToCoachNote, formatNumber, getProofTypeColor } from "@/lib/utils";
import ProofCard from "@/components/ProofCard";
import CoachNote from "@/components/CoachNote";
import type { Proof, Opportunity, CoachNote as CoachNoteType, User } from "@/lib/types";

export default async function DashboardPage() {
  let proofs: Proof[] = [];
  let opportunities: Opportunity[] = [];
  let coachNote: CoachNoteType = mockCoachNote;
  let user: User = mockUser;
  let isDemoMode = false;

  if (supabase) {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        throw new Error("No authenticated user");
      }

      const { data: userDataRaw } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', authUser.id)
        .maybeSingle();

      if (userDataRaw) {
        user = {
          id: userDataRaw.id,
          authUserId: userDataRaw.auth_user_id ?? undefined,
          email: userDataRaw.email,
          username: userDataRaw.username,
          fullName: userDataRaw.full_name ?? undefined,
          avatarUrl: userDataRaw.avatar_url ?? undefined,
          college: userDataRaw.college ?? undefined,
          year: userDataRaw.year ?? undefined,
          bio: userDataRaw.bio ?? undefined,
          headline: userDataRaw.headline ?? undefined,
          location: userDataRaw.location ?? undefined,
          websiteUrl: userDataRaw.website_url ?? undefined,
          githubUrl: userDataRaw.github_url ?? undefined,
          linkedinUrl: userDataRaw.linkedin_url ?? undefined,
          twitterUrl: userDataRaw.twitter_url ?? undefined,
          role: userDataRaw.role,
          accountStatus: userDataRaw.account_status,
          isProfilePublic: userDataRaw.is_profile_public,
          hideEmail: userDataRaw.hide_email,
          emailVerified: userDataRaw.email_verified,
          authProvider: userDataRaw.auth_provider,
          lastLoginAt: userDataRaw.last_login_at ? new Date(userDataRaw.last_login_at) : undefined,
          createdAt: new Date(userDataRaw.created_at),
          updatedAt: new Date(userDataRaw.updated_at),
        };

        const { data: proofsData, error: proofsError } = await supabase
          .from('proof_cards')
          .select('*')
          .eq('user_id', userDataRaw.id)
          .is('deleted_at', null)
          .order('created_at', { ascending: false });

        const { data: oppsData } = await supabase
          .from('opportunities')
          .select('*')
          .eq('is_active', true)
          .is('deleted_at', null)
          .order('created_at', { ascending: false });

        if (proofsError) {
          throw new Error("Supabase query failed");
        }

        proofs = proofsData ? proofsData.map(mapDbProofToProof) : [];
        opportunities = oppsData ? oppsData.map(mapDbOpportunityToOpportunity) : [];

        const { data: noteDataRaw } = await supabase
          .from('coach_notes')
          .select('*')
          .eq('user_id', userDataRaw.id)
          .is('deleted_at', null)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (noteDataRaw) {
          coachNote = mapDbCoachNoteToCoachNote(noteDataRaw as Database['public']['Tables']['coach_notes']['Row']);
        }
      }
    } catch (e) {
      console.warn("Falling back to demo mode:", e);
      proofs = mockProofs;
      opportunities = mockOpps;
      isDemoMode = true;
    }
  } else {
    isDemoMode = true;
    proofs = mockProofs;
    opportunities = mockOpps;
  }

  const totalViews = proofs.reduce((sum, p) => sum + p.viewCount, 0);
  const verifiedCount = proofs.filter((p) => p.verificationStatus === 'verified').length;
  const allSkills = Array.from(new Set(proofs.flatMap((p) => [...p.skillsExtracted, ...p.skillsUserAdded])));
  const skillCounts = allSkills.map((skill) => ({
    name: skill,
    count: proofs.filter((p) => p.skillsExtracted.includes(skill) || p.skillsUserAdded.includes(skill)).length,
  })).sort((a, b) => b.count - a.count);

  const sourceTypeCounts = proofs.reduce((acc, p) => {
    acc[p.sourceType] = (acc[p.sourceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
              <strong>Running in Demo Mode:</strong> Database connection is currently offline. Displaying sandbox data.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="hidden lg:col-span-2 lg:block">
          <nav className="sticky top-20 space-y-2 text-sm" aria-label="Dashboard navigation">
            {[
              { label: "Dashboard", href: "#dashboard-home", icon: "M4 12h6v8H4zM14 4h6v16h-6zM4 4h6v6H4z" },
              { label: `My Proofs (${proofs.length})`, href: "#my-proof", icon: "M4 5h16v4H4zM4 13h16v6H4z" },
              { label: "Skills Map", href: "#skills-map", icon: "M4 20V6m5 14V9m5 11v-5m5 5V8" },
              { label: "Opportunities", href: "#opportunities", icon: "M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" },
              { label: "Settings", href: "/dashboard/settings", icon: "M12 8a4 4 0 100 8 4 4 0 000-8zm8 4l-2 1 1 2-2 2-2-1-1 2h-2l-1-2-2 1-2-2 1-2-2-1V10l2-1-1-2 2-2 2 1 1-2h2l1 2 2-1 2 2-1 2 2 1v2z" },
            ].map((item) => (
              <a
                className="flex items-center gap-2 rounded-md px-3 py-2 text-[var(--color-neutral-text-secondary)] transition hover:bg-[var(--color-neutral-bg)] hover:text-[var(--color-primary-emerald)]"
                href={item.href}
                key={item.label}
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
              <h1 className="text-3xl font-semibold md:text-4xl font-serif">
                Welcome back{user.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}
              </h1>
              <div className="flex gap-2">
                <Link
                  href="/dashboard/sources/new"
                  className="btn-green px-4 py-2 rounded-md font-semibold text-white text-sm inline-flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Add Source
                </Link>
                <Link
                  href={`/${user.username}`}
                  className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)] text-sm"
                >
                  View Profile
                </Link>
              </div>
            </div>
            <p className="text-sm text-[var(--color-neutral-text-secondary)]">
              Track verified proof and stay on top of your next opportunity.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Proof cards", value: proofs.length, delta: `${verifiedCount} verified`, color: "var(--color-primary-emerald)" },
              { label: "Total skills", value: allSkills.length, delta: `${skillCounts.length} unique`, color: "var(--color-primary-emerald)" },
              { label: "Profile views", value: formatNumber(totalViews), delta: "across all proofs", color: "var(--color-primary-emerald)" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
                <p className="text-sm text-[var(--color-neutral-text-secondary)]">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold" style={{ color: stat.color }}>
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
            <Link
              href={`/${user.username}`}
              className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)] text-sm"
            >
              Publish public profile
            </Link>
          </div>

          {proofs.length === 0 ? (
            <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 text-center">
              <h3 className="text-lg font-semibold text-[var(--color-neutral-text)]">No proof yet. Let&apos;s add your first one!</h3>
              <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
                Connect GitHub, upload certificates, or link your competitive programming profiles to get started.
              </p>
              <Link
                href="/dashboard/sources/new"
                className="mt-4 inline-flex items-center gap-2 btn-green rounded-md px-4 py-2 font-semibold text-white text-sm"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Add your first source
              </Link>
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
                <p className="text-sm font-medium text-[var(--color-neutral-text)]">{allSkills.length} skills</p>
                <p className="text-sm text-[var(--color-neutral-text-secondary)]">
                  {skillCounts.slice(0, 3).map((s) => s.name).join(', ') || 'No skills yet'}
                </p>
              </div>
            </div>
            {skillCounts.length > 0 && (
              <div className="mt-4 space-y-2">
                {skillCounts.slice(0, 5).map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-neutral-text)]">{skill.name}</span>
                    <span className="text-xs text-[var(--color-neutral-text-secondary)]">{skill.count} proof{skill.count !== 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
            <h2 className="text-base font-semibold text-[var(--color-neutral-text)]">Proof by Type</h2>
            <div className="mt-3 space-y-2">
              {Object.entries(sourceTypeCounts).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getProofTypeColor(type) }} />
                    <span className="text-[var(--color-neutral-text)] capitalize">{type}</span>
                  </div>
                  <span className="text-xs text-[var(--color-neutral-text-secondary)]">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="opportunities" className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
            <h2 className="text-base font-semibold text-[var(--color-neutral-text)]">Opportunities matched</h2>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              {opportunities.length} opportunities match your proof.
            </p>
            <div className="mt-3 space-y-2">
              {opportunities.slice(0, 2).map((opportunity) => (
                <div key={opportunity.id} className="rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] p-3">
                  <p className="text-sm font-medium text-[var(--color-neutral-text)]">{opportunity.company}</p>
                  <p className="text-xs text-[var(--color-neutral-text-secondary)]">
                    {opportunity.title} &middot; {opportunity.matchPercentage}% match
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/opportunities"
              className="mt-4 block w-full rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 text-center font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)] text-sm"
            >
              View opportunities
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
