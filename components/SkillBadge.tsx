interface SkillBadgeProps {
  skill: string;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-primary-teal)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary-teal)]">
      {skill}
    </span>
  );
}
