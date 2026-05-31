interface SkillBadgeProps {
  skill: string;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-[var(--radius-sm)] bg-[var(--color-primary-teal)] px-2.5 py-1 text-xs font-medium text-white">
      {skill}
    </span>
  );
}
