import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkillBadge } from "@/components/SkillBadge";
import { proofs } from "@/lib/mock-data";

interface ProofDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProofDetailPage({ params }: ProofDetailPageProps) {
  const { id } = await params;
  const proof = proofs.find((item) => item.id === id);

  if (!proof) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/dashboard" className="text-sm text-[var(--color-primary-teal)]">
          ← Back
        </Link>
        <div className="flex gap-2">
          <Button variant="secondary">Share</Button>
          <Button variant="tertiary">More</Button>
        </div>
      </header>

      <section>
        <h1 className="text-3xl font-semibold md:text-4xl">{proof.title}</h1>
        <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
          {proof.type.toUpperCase()} • {proof.viewCount} views • Updated{" "}
          {proof.updatedAt.toLocaleDateString()}
        </p>
      </section>

      <Card>
        <h2 className="text-xl font-semibold">What it is</h2>
        <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
          {proof.description}
        </p>
        <p className="mt-2 text-sm">
          <a className="text-[var(--color-primary-teal)]" href={proof.url}>
            {proof.url}
          </a>
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Skills extracted</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {proof.skillsExtracted.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">What this proves</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-neutral-text-secondary)]">
          {proof.whatItProves?.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Sharing & visibility</h2>
        <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
          Public link: {proof.publicLink}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button>Copy link</Button>
          <Button variant="secondary">Email recruiter</Button>
          <Button variant="tertiary">Post to LinkedIn</Button>
        </div>
      </Card>
    </article>
  );
}
