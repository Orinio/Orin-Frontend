interface SkillBadgeProps {
  skill: string;
  size?: 'sm' | 'md';
}

export default function SkillBadge({ skill, size = 'sm' }: SkillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5'
      }`}
      style={{
        backgroundColor: 'var(--color-bloom)',
        color: '#FFFFFF',
      }}
    >
      {skill}
    </span>
  );
}
