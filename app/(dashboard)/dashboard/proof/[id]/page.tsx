import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkillBadge } from "@/components/SkillBadge";
import { TypeBadge } from "@/components/TypeBadge";
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

  const statusMeta = {
    verified: {
      label: "✓ Verified",
      className: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
    },
    pending: {
      label: "⏳ Pending",
      className: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
    },
    draft: {
      label: "◯ Draft",
      className:
        "bg-[var(--color-neutral-bg)] text-[var(--color-neutral-text-secondary)]",
    },
  }[proof.status];

  const sharedWith = proof.sharedWith ?? [];

  return (
    <article className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-[var(--color-neutral-text-secondary)]">
          <Link href="/dashboard" className="text-[var(--color-primary-teal)]">
            ← Back
          </Link>
          <span>/</span>
          <span>Proof detail</span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Share</Button>
          <Button variant="tertiary">More</Button>
        </div>
      </header>

      <section className="space-y-3">
        <h1 className="text-3xl font-semibold md:text-4xl">{proof.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-neutral-text-secondary)]">
          <TypeBadge type={proof.type} />
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusMeta.className}`}>
            {statusMeta.label}
          </span>
          <span>• {proof.viewCount} views</span>
          <span>• Updated {proof.updatedAt.toLocaleDateString()}</span>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Card>
            <h2 className="text-xl font-semibold">What it is</h2>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              {proof.description}
            </p>
            <p className="mt-3 text-sm">
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
            <h2 className="text-xl font-semibold">Proof evidence</h2>
            <div className="mt-3 space-y-3 text-sm text-[var(--color-neutral-text-secondary)]">
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] p-3">
                <div>
                  <p className="font-medium text-[var(--color-neutral-text)]">
                    GitHub metadata
                  </p>
                  <p>Primary language: JavaScript · Last commit 14 days ago</p>
                </div>
                <Button variant="tertiary" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] p-3">
                <div>
                  <p className="font-medium text-[var(--color-neutral-text)]">
                    README preview
                  </p>
                  <p>Built a scalable service with caching and monitoring.</p>
                </div>
                <Button variant="tertiary" size="sm">
                  Expand
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] p-3">
                <div>
                  <p className="font-medium text-[var(--color-neutral-text)]">
                    Deployment link
                  </p>
                  <p>demo.orin.app/microservice</p>
                </div>
                <Button variant="tertiary" size="sm">
                  Open
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="text-lg font-semibold">Public visibility</h2>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              Public link: {proof.publicLink}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm">Copy link</Button>
              <Button variant="secondary" size="sm">
                Email recruiter
              </Button>
              <Button variant="tertiary" size="sm">
                Post to LinkedIn
              </Button>
            </div>
            <div className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-neutral-bg)] p-3 text-xs text-[var(--color-neutral-text-secondary)]">
              {proof.isPublic ? "Public profile enabled" : "Private proof (not public)"}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">Shared with</h2>
            {sharedWith.length ? (
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-neutral-text-secondary)]">
                {sharedWith.map((share) => (
                  <li key={share.email}>
                    {share.email} · {share.sharedAt.toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
                No shares yet. Send this proof to a recruiter.
              </p>
            )}
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">View analytics</h2>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              Views per week
            </p>
            <div className="mt-4 space-y-2">
              {[40, 65, 30, 80].map((value, index) => (
                <div key={`bar-${index}`} className="flex items-center gap-3 text-xs">
                  <span className="w-10 text-[var(--color-neutral-text-secondary)]">
                    W{index + 1}
                  </span>
                  <div className="h-2 flex-1 rounded-full bg-[var(--color-neutral-border)]">
                    <div
                      className="h-2 rounded-full bg-[var(--color-primary-teal)]"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </article>
  );
}
