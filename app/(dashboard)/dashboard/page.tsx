import { CoachNote } from "@/components/CoachNote";
import { ProofCard } from "@/components/ProofCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { coachNote, proofs } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <aside className="hidden lg:col-span-2 lg:block">
        <nav className="sticky top-20 space-y-3 text-sm">
          {[
            { label: "Dashboard", href: "#dashboard-home" },
            { label: `My Proof (${proofs.length})`, href: "#my-proof" },
            { label: "Skills Map", href: "#skills-map" },
            { label: "Opportunities", href: "#opportunities" },
            { label: "Settings", href: "#settings" },
            { label: "Help", href: "#help" },
          ].map((item) => (
            <a
              className="block rounded px-3 py-2 text-[var(--color-neutral-text-secondary)] hover:bg-white"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <section id="dashboard-home" className="space-y-6 lg:col-span-7">
        <CoachNote note={coachNote} />

        <div id="my-proof" className="grid gap-4 md:grid-cols-2">
          {proofs.map((proof) => (
            <ProofCard key={proof.id} proof={proof} compact />
          ))}
        </div>

        <Card className="border-dashed">
          <h2 className="text-xl font-semibold">+ Add Proof Source</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Connect GitHub, upload certificate, link Kaggle/Codeforces, or paste
            custom proof URL.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary">Connect GitHub</Button>
            <Button variant="secondary">Upload Certificate/PDF</Button>
            <Button variant="secondary">Link Kaggle/Codeforces</Button>
          </div>
        </Card>
      </section>

      <aside id="skills-map" className="space-y-4 lg:col-span-3">
        <Card>
          <h2 className="text-base font-semibold">Skill Summary</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Node.js, Express, PostgreSQL, System Design, DSA
          </p>
        </Card>
        <Card id="opportunities">
          <h2 className="text-base font-semibold">Proof Completion</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            3/5 proof types complete
          </p>
          <div className="mt-3 h-2 rounded bg-gray-100">
            <div className="h-2 w-3/5 rounded bg-[var(--color-primary-teal)]" />
          </div>
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
