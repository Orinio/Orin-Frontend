import { AddProofSourceCard } from "@/components/AddProofSourceCard";
import { CoachNote } from "@/components/CoachNote";
import { ProofCard } from "@/components/ProofCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { coachNote, opportunities, proofs } from "@/lib/mock-data";

export default function DashboardPage() {
  const isLoading = false;
  const hasError = false;

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
              href: "/settings",
              icon: "M12 8a4 4 0 100 8 4 4 0 000-8zm8 4l-2 1 1 2-2 2-2-1-1 2h-2l-1-2-2 1-2-2 1-2-2-1V10l2-1-1-2 2-2 2 1 1-2h2l1 2 2-1 2 2-1 2 2 1v2z",
            },
            {
              label: "Help",
              href: "#help",
              icon: "M12 18h.01M12 14a3 3 0 10-3-3",
            },
          ].map((item) => (
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 text-[var(--color-neutral-text-secondary)] transition hover:bg-[var(--color-neutral-bg)] hover:text-[var(--color-primary-teal)]"
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
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-teal)]">
            Dashboard
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold md:text-4xl">Welcome back, Aditi</h1>
            <Button>New proof</Button>
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
            <Card key={stat.label}>
              <p className="text-sm text-[var(--color-neutral-text-secondary)]">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-[var(--color-primary-teal)]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-[var(--color-accent-green)]">{stat.delta}</p>
            </Card>
          ))}
        </div>

        <CoachNote note={coachNote} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Your proof feed</h2>
            <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
              Recent proof cards created from your sources.
            </p>
          </div>
          <Button variant="secondary">Publish public profile</Button>
        </div>

        {hasError ? (
          <Card>
            <h3 className="text-base font-semibold">We couldn&apos;t load your proof</h3>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              Please refresh or try again in a minute.
            </p>
          </Card>
        ) : null}

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2" aria-label="Loading proofs">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="animate-pulse">
                <div className="h-4 w-2/3 rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-4 h-3 w-full rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-4 h-3 w-4/5 rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-6 h-8 w-24 rounded bg-[var(--color-neutral-border)]" />
              </Card>
            ))}
          </div>
        ) : (
          <div id="my-proof" className="grid gap-4 md:grid-cols-2">
            {proofs.slice(0, 6).map((proof) => (
              <ProofCard key={proof.id} proof={proof} compact />
            ))}
          </div>
        )}

        {proofs.length === 0 ? (
          <Card>
            <h3 className="text-lg font-semibold">No proof yet. Let&apos;s add your first one!</h3>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              Connect GitHub, upload certificates, or link your competitive programming
              profiles to get started.
            </p>
          </Card>
        ) : null}

        <AddProofSourceCard />
      </section>

      <aside id="skills-map" className="space-y-4 lg:col-span-3">
        <Card>
          <h2 className="text-base font-semibold">Skill Summary</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-full border-[10px] border-[var(--color-primary-teal)]/20">
              <div className="absolute inset-2 rounded-full border-[6px] border-[var(--color-primary-teal)]" />
            </div>
            <div>
              <p className="text-sm font-medium">Top skills</p>
              <p className="text-sm text-[var(--color-neutral-text-secondary)]">
                Node.js, Express, PostgreSQL, System Design, DSA
              </p>
            </div>
          </div>
        </Card>
        <Card id="opportunities">
          <h2 className="text-base font-semibold">Proof Completion</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            3/5 proof types complete
          </p>
          <div className="mt-3 h-2 rounded-full bg-[var(--color-neutral-border)]">
            <div className="h-2 w-3/5 rounded-full bg-[var(--color-primary-teal)]" />
          </div>
        </Card>
        <Card>
          <h2 className="text-base font-semibold">Opportunities matched</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            {opportunities.length} opportunities match your proof.
          </p>
          <div className="mt-3 space-y-2">
            {opportunities.slice(0, 2).map((opportunity) => (
              <div
                key={opportunity.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] p-3"
              >
                <p className="text-sm font-medium">{opportunity.company}</p>
                <p className="text-xs text-[var(--color-neutral-text-secondary)]">
                  {opportunity.title} • {opportunity.matchPercentage}% match
                </p>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full" variant="secondary">
            View opportunities
          </Button>
        </Card>
        <Card>
          <h2 className="text-base font-semibold">Streak</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Logged in 5 days in a row 🔥
          </p>
        </Card>
        <div id="settings" className="sr-only">
          Settings panel coming soon
        </div>
        <div id="help" className="sr-only">
          Help center coming soon
        </div>
      </aside>
    </div>
  );
}
