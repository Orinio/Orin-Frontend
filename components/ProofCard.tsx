import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillBadge } from "@/components/SkillBadge";
import type { Proof } from "@/lib/types";

interface ProofCardProps {
  proof: Proof;
  compact?: boolean;
}

const statusMap = {
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
    className: "bg-gray-100 text-gray-600",
  },
};

export function ProofCard({ proof, compact }: ProofCardProps) {
  const status = statusMap[proof.status];

  return (
    <article aria-label={`Proof card: ${proof.title}`}>
      <Card>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-[var(--color-neutral-text)]">
            {proof.title}
          </h3>
          <span className={`rounded px-2 py-1 text-xs font-medium ${status.className}`}>
            {status.label}
          </span>
        </div>
        {!compact && proof.description ? (
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            {proof.description}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          {proof.skillsExtracted.map((skill) => (
            <SkillBadge key={`${proof.id}-${skill}`} skill={skill} />
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--color-neutral-text-secondary)]">
          {proof.viewCount} views • Updated {proof.updatedAt.toLocaleDateString()}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary">
            Share
          </Button>
          <Button size="sm" variant="tertiary">
            Edit
          </Button>
          <Link href={`/dashboard/proof/${proof.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </Card>
    </article>
  );
}
