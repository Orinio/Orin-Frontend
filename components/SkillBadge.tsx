interface SkillBadgeProps {
  skill: string;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="rounded px-2 py-1 text-xs font-medium bg-[var(--color-primary-teal)] text-white">
      {skill}
    </span>
  );
}
