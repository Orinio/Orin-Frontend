'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const response = await fetch('/api/opportunities');
      const data = await response.json();
      setOpportunities(data.opportunities || []);
      setLoading(false);
    };
    fetchOpportunities();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[var(--color-neutral-text)]">Opportunities</h1>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
          Internships, projects, and jobs matched to your proof.
        </p>
      </header>

      <div className="space-y-4">
        {loading ? (
          <p className="text-[var(--color-neutral-text-secondary)]">Loading opportunities...</p>
        ) : opportunities.length === 0 ? (
          <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 text-center">
            <p className="text-[var(--color-neutral-text-secondary)]">No opportunities found. Add more proof to get matched!</p>
          </div>
        ) : (
          opportunities.map((opp: any) => (
            <div key={opp.id} className="rounded-lg border border-[var(--color-neutral-border)] bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[var(--color-primary-emerald)]">MATCHED</p>
                  <h3 className="font-semibold text-gray-900">{opp.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">{opp.company}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                  {opp.match_percentage}% match
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="#" className="btn-green px-4 py-2 rounded-md text-sm font-semibold">
                  Apply
                </Link>
                <button className="rounded-md border border-[var(--color-neutral-border)] px-4 py-2 text-sm font-semibold text-[var(--color-neutral-text-secondary)]">
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