import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillBadge } from "@/components/SkillBadge";
import { TypeBadge } from "@/components/TypeBadge";
import type { Proof } from "@/lib/types";

interface ProofCardProps {
  proof: Proof;
  variant?: "dashboard" | "public";
  compact?: boolean;
}

const statusMap = {
  verified: {
    label: "✓ Verified",
    className: "bg-[var(--color-accent-green)]/15 text-[var(--color-accent-green)]",
  },
  pending: {
    label: "⏳ Pending",
    className: "bg-[var(--color-accent-gold)]/15 text-[var(--color-accent-gold)]",
  },
  draft: {
    label: "◯ Draft",
    className:
      "bg-[var(--color-neutral-surface-alt)] text-[var(--color-neutral-text-secondary)]",
  },
};

export function ProofCard({
  proof,
  compact,
  variant = "dashboard",
}: ProofCardProps) {
  const status = statusMap[proof.status];

  return (
    <article aria-label={`Proof card: ${proof.title}`}>
      <Card className="hover:scale-[1.01]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-neutral-text)]">
              {proof.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <TypeBadge type={proof.type} />
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${status.className}`}
                aria-label={`Status: ${status.label}`}
              >
                {status.label}
              </span>
            </div>
          </div>
          <span className="text-xs text-[var(--color-neutral-text-secondary)]">
            {proof.viewCount} views
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
          Updated {proof.updatedAt.toLocaleDateString()}
        </p>
        {variant === "dashboard" ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">
              Share
            </Button>
            <Button size="sm" variant="ghost">
              Edit
            </Button>
            <Link href={`/dashboard/proof/${proof.id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-5">
            <Link href={`/dashboard/proof/${proof.id}`}>
              <Button size="sm">View Full Proof</Button>
            </Link>
          </div>
        )}
      </Card>
    </article>
  );
}
