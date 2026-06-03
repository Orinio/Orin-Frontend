'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getOpportunityTypeLabel, getStatusConfig } from '@/lib/utils';
import type { Opportunity, OpportunityType, OpportunityStatus } from '@/lib/types';

const TYPE_FILTERS: OpportunityType[] = ['internship', 'job', 'scholarship', 'mentorship', 'hackathon', 'research'];
const SORT_OPTIONS = [
  { value: 'match', label: 'Best match' },
  { value: 'recent', label: 'Most recent' },
  { value: 'salary', label: 'Salary (high to low)' },
] as const;

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [userOpps, setUserOpps] = useState<Record<string, OpportunityStatus>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<OpportunityType | null>(null);
  const [sortBy, setSortBy] = useState<'match' | 'recent' | 'salary'>('match');

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('/api/opportunities');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        setOpportunities(data.opportunities || []);
      } catch (e) {
        console.warn('Failed to fetch opportunities:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  const filtered = useMemo(() => {
    let result = [...opportunities];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.company.toLowerCase().includes(q) ||
          o.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (typeFilter) {
      result = result.filter((o) => o.type === typeFilter);
    }

    switch (sortBy) {
      case 'match':
        result.sort((a, b) => b.matchPercentage - a.matchPercentage);
        break;
      case 'recent':
        result.sort((a, b) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0));
        break;
      case 'salary':
        result.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
        break;
    }

    return result;
  }, [opportunities, search, typeFilter, sortBy]);

  const handleSave = async (oppId: string) => {
    setUserOpps((prev) => ({ ...prev, [oppId]: 'saved' }));
    try {
      await fetch('/api/opportunities/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunityId: oppId, status: 'saved' }),
      });
    } catch {
      // Demo mode - state already updated
    }
  };

  const handleDismiss = async (oppId: string) => {
    setUserOpps((prev) => ({ ...prev, [oppId]: 'dismissed' }));
    try {
      await fetch('/api/opportunities/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunityId: oppId, status: 'dismissed' }),
      });
    } catch {
      // Demo mode
    }
  };

  const formatSalary = (opp: Opportunity) => {
    if (!opp.salaryMin && !opp.salaryMax) return null;
    const currency = opp.salaryCurrency || '$';
    if (opp.salaryMin && opp.salaryMax) {
      return `${currency}${(opp.salaryMin / 1000).toFixed(0)}k - ${currency}${(opp.salaryMax / 1000).toFixed(0)}k`;
    }
    if (opp.salaryMin) return `From ${currency}${(opp.salaryMin / 1000).toFixed(0)}k`;
    return `Up to ${currency}${(opp.salaryMax! / 1000).toFixed(0)}k`;
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[var(--color-neutral-text)] font-serif">Opportunities</h1>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
          Internships, projects, and jobs matched to your proof.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-neutral-text-tertiary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, company, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] focus:border-[var(--color-primary-emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3 py-2 text-sm text-[var(--color-neutral-text)] focus:border-[var(--color-primary-emerald)] focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTypeFilter(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${!typeFilter ? 'bg-[var(--color-primary-emerald)] text-white' : 'border border-[var(--color-neutral-border)] text-[var(--color-neutral-text-secondary)] hover:border-[var(--color-primary-emerald)] hover:text-[var(--color-primary-emerald)]'}`}
        >
          All
        </button>
        {TYPE_FILTERS.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(typeFilter === type ? null : type)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${typeFilter === type ? 'bg-[var(--color-primary-emerald)] text-white' : 'border border-[var(--color-neutral-border)] text-[var(--color-neutral-text-secondary)] hover:border-[var(--color-primary-emerald)] hover:text-[var(--color-primary-emerald)]'}`}
          >
            {getOpportunityTypeLabel(type)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-5">
                <div className="h-4 w-24 rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-2 h-6 w-48 rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-1 h-4 w-32 rounded bg-[var(--color-neutral-border)]" />
                <div className="mt-4 h-10 rounded bg-[var(--color-neutral-border)]" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 text-center">
            <p className="text-[var(--color-neutral-text-secondary)]">No opportunities found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((opp) => {
              const oppStatus = userOpps[opp.id];
              return (
                <div key={opp.id} className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-5 transition-all hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-neutral-surface-alt)] text-sm font-bold text-[var(--color-neutral-text)]">
                          {opp.company.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[var(--color-primary-emerald)] tracking-wider">{getOpportunityTypeLabel(opp.type)}</p>
                          <h3 className="truncate font-semibold text-[var(--color-neutral-text)] text-lg">{opp.title}</h3>
                          <p className="text-sm text-[var(--color-neutral-text-secondary)]">{opp.company}</p>
                        </div>
                      </div>
                    </div>
                    <span className="ml-3 shrink-0 rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      {opp.matchPercentage}% match
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--color-neutral-text-secondary)]">
                    {opp.location && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {opp.location}
                      </span>
                    )}
                    {opp.isRemote && (
                      <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-blue-600">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Remote
                      </span>
                    )}
                    {formatSalary(opp) && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {formatSalary(opp)}
                      </span>
                    )}
                  </div>

                  {opp.requiredSkills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {opp.requiredSkills.slice(0, 4).map((skill) => (
                        <span key={skill} className="rounded-full bg-[var(--color-primary-soft)] px-2 py-0.5 text-xs font-medium text-[var(--color-primary-emerald)]">
                          {skill}
                        </span>
                      ))}
                      {opp.requiredSkills.length > 4 && (
                        <span className="rounded-full bg-[var(--color-neutral-surface-alt)] px-2 py-0.5 text-xs text-[var(--color-neutral-text-secondary)]">
                          +{opp.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {opp.applyDeadline && (
                    <p className="mt-2 text-xs text-[var(--color-neutral-text-tertiary)]">
                      Deadline: {opp.applyDeadline.toLocaleDateString()}
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <a href={opp.link} target="_blank" rel="noopener noreferrer" className="btn-green px-4 py-2 rounded-md text-sm font-semibold">
                      Apply
                    </a>
                    {oppStatus === 'saved' ? (
                      <span className="rounded-md border border-[var(--color-primary-emerald)] bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-emerald)]">
                        Saved
                      </span>
                    ) : oppStatus === 'dismissed' ? (
                      <span className="rounded-md border border-[var(--color-neutral-border)] px-4 py-2 text-sm font-semibold text-[var(--color-neutral-text-tertiary)]">
                        Dismissed
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave(opp.id)}
                          className="rounded-md border border-[var(--color-neutral-border)] px-4 py-2 text-sm font-semibold text-[var(--color-neutral-text-secondary)] hover:bg-[var(--color-neutral-surface-alt)]"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDismiss(opp.id)}
                          className="rounded-md border border-[var(--color-neutral-border)] px-4 py-2 text-sm font-semibold text-[var(--color-neutral-text-secondary)] hover:bg-[var(--color-neutral-surface-alt)]"
                        >
                          Dismiss
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
