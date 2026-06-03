'use client';

import Link from 'next/link';

interface ProofCardProps {
  proof: {
    id: string;
    title: string;
    type: string;
    status: 'pending' | 'verified' | 'draft';
    skillsExtracted: string[];
    description?: string;
    viewCount?: number;
    url: string;
    publicLink: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  variant?: 'dashboard' | 'public';
}

const statusConfig = {
  verified: {
    label: 'Verified',
    bg: 'var(--color-bloom)',
    textColor: '#FFFFFF',
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    ),
  },
  pending: {
    label: 'Pending',
    bg: 'var(--color-ember)',
    textColor: '#FFFFFF',
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  draft: {
    label: 'Draft',
    bg: 'var(--color-mist)',
    textColor: 'var(--color-ink)',
    icon: (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
};

export default function ProofCard({
  proof,
  variant = 'dashboard',
}: ProofCardProps) {
  const { id, title, type: sourceType, status: verificationStatus, skillsExtracted, description, viewCount = 0 } = proof;
  const status = statusConfig[verificationStatus];

  return (
    <div
      className="p-5 rounded-2xl transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border-light)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="font-bold" style={{ color: 'var(--color-ink)' }}>{title}</h3>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: status.bg, color: status.textColor }}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <p className="text-xs font-medium mb-3 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
        {sourceType}
      </p>

      {description && (
        <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
      )}

      {skillsExtracted.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {skillsExtracted.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'var(--color-surface-dim)', color: 'var(--color-text-secondary)' }}
            >
              {skill}
            </span>
          ))}
          {skillsExtracted.length > 5 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: 'var(--color-text-secondary)' }}>
              +{skillsExtracted.length - 5} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--color-border-light)' }}>
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {viewCount} views
        </span>
        {variant === 'dashboard' ? (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/proof/${id}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200" style={{ color: 'var(--color-pulse)' }}>
              View Details
            </Link>
          </div>
        ) : (
          <Link href={`/dashboard/proof/${id}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ color: 'var(--color-bloom)' }}>
            View Full Proof
          </Link>
        )}
      </div>
    </div>
  );
}
