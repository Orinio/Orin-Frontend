interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md';
}

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  github: {
    color: 'var(--color-ink)',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  kaggle: {
    color: 'var(--color-ember)',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.8 2H5.2C3.4 2 2 3.4 2 5.2v13.6C2 20.6 3.4 22 5.2 22h13.6c1.8 0 3.2-1.4 3.2-3.2V5.2C22 3.4 20.6 2 18.8 2zM12 18.5l-5.5-7.5h3.5v-5h4v5h3.5l-5.5 7.5z" />
      </svg>
    ),
  },
  certificate: {
    color: 'var(--color-spark)',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  hackathon: {
    color: 'var(--color-pulse)',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
      </svg>
    ),
  },
  project: {
    color: 'var(--color-bloom)',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
};

export default function TypeBadge({ type, size = 'sm' }: TypeBadgeProps) {
  const config = typeConfig[type] || typeConfig.project;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5'
      }`}
      style={{
        backgroundColor: config.color,
        color: '#FFFFFF',
      }}
    >
      {config.icon}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}
