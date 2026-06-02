'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { opportunities as mockOpps } from '@/lib/mock-data';
import type { Opportunity } from '@/lib/types';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('/api/opportunities');
        if (!response.ok) {
          throw new Error('API query failed');
        }
        const data = await response.json();
        setOpportunities(data.opportunities || []);
      } catch (err) {
        console.warn('Opportunities API failed, falling back to mock opportunities.', err);
        setOpportunities(mockOpps);
        setIsDemoMode(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[var(--color-neutral-text)] font-serif">Opportunities</h1>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
          Internships, projects, and jobs matched to your proof.
        </p>
      </header>

      {isDemoMode && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3.5 text-sm text-amber-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <span>
              <strong>Demo Mode:</strong> Disconnect/API offline. Displaying sandbox opportunities.
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className="text-[var(--color-neutral-text-secondary)]">Loading opportunities...</p>
        ) : opportunities.length === 0 ? (
          <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 text-center">
            <p className="text-[var(--color-neutral-text-secondary)]">No opportunities found. Add more proof to get matched!</p>
          </div>
        ) : (
          opportunities.map((opp) => (
            <div key={opp.id} className="rounded-lg border border-[var(--color-neutral-border)] bg-white p-4 transition-all hover:scale-[1.005] hover:shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[var(--color-primary-emerald)] tracking-wider">MATCHED</p>
                  <h3 className="font-semibold text-gray-900 text-lg mt-1">{opp.title}</h3>
                  <p className="text-sm text-[var(--color-neutral-text-secondary)] mt-0.5">{opp.company}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium">
                  {opp.matchPercentage}% match
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={opp.link || "#"} className="btn-green px-4 py-2 rounded-md text-sm font-semibold">
                  Apply
                </Link>
                <button type="button" className="rounded-md border border-[var(--color-neutral-border)] px-4 py-2 text-sm font-semibold text-[var(--color-neutral-text-secondary)] hover:bg-[var(--color-neutral-surface-alt)]">
                  Save
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}