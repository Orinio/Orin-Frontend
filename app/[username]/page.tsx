import { ProofCard } from "@/components/ProofCard";
import { SkillBadge } from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currentUser, proofs } from "@/lib/mock-data";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;

  return (
    <main id="main-content" className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-8">
      <section className="rounded-[var(--radius-lg)] bg-gradient-to-br from-white to-[var(--color-neutral-surface-alt)] p-6">
        <p className="text-sm text-[var(--color-primary-emerald)]">@{username}</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">{currentUser.fullName}</h1>
        <p className="mt-2 text-[var(--color-neutral-text-secondary)]">
          3rd year CSE @ {currentUser.college}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-neutral-text-secondary)]">
          {currentUser.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary">GitHub</Button>
          <Button variant="secondary">LinkedIn</Button>
          <Button variant="secondary">Email</Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Verified Skills</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {Array.from(new Set(proofs.flatMap((proof) => proof.skillsExtracted)))
            .slice(0, 8)
            .map((skill) => (
              <Card key={skill}>
                <h3 className="text-base font-semibold">{skill}</h3>
                <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                  2 projects verified
                </p>
                <div className="mt-3">
                  <SkillBadge skill="Verified" />
                </div>
              </Card>
            ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">{`${currentUser.fullName}'s Proof (${proofs.length} total)`}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {proofs.slice(0, 4).map((proof) => (
            <ProofCard key={proof.id} proof={proof} />
          ))}
        </div>
      </section>

      <footer className="mt-10 border-t border-[var(--color-neutral-border)] py-6 text-sm text-[var(--color-neutral-text-secondary)]">
        <p>Create your own proof profile on Orin.</p>
      </footer>
    </main>
  );
}