'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const sourceTypes = ['github', 'kaggle', 'certificate', 'project'];

export default function AddProofSourcePage() {
  const [sourceType, setSourceType] = useState('github');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setError('You must be logged in to add a source');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        source_type: sourceType,
        source_url: sourceUrl,
        source_name: sourceName || sourceUrl,
      }),
    });

    if (response.ok) {
      router.push('/dashboard');
    } else {
      const data = await response.json();
      setError(data.error || 'Failed to add source');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-[var(--color-neutral-text)] mb-2">Add Proof Source</h1>
      <p className="text-[var(--color-neutral-text-secondary)] mb-6">
        Connect your GitHub, Kaggle, certificates, or other proof sources.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-text)] mb-2">
            Source Type
          </label>
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
          >
            {sourceTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-text)] mb-2">
            Source URL
          </label>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            required
            className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-text)] mb-2">
            Display Name (optional)
          </label>
          <input
            type="text"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            placeholder="My Project Name"
            className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
          />
        </div>

        {error && (
          <p className="text-sm text-[var(--color-danger)]">{error}</p>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-green rounded-md px-6 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Adding...' : 'Add Source'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-[var(--color-neutral-border)] px-6 py-2 font-semibold text-[var(--color-neutral-text)]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}