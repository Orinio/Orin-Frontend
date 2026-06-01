'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  college: string | null;
  bio: string | null;
}

interface Proof {
  id: string;
  title: string;
  description: string | null;
  source_type: string;
  skills_extracted: string[];
  verification_status: string;
}

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const resolvedParams = await params;
      const username = resolvedParams.username;
      
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();
      
      if (data.user) {
        setUser(data.user);
        setProofs(data.proofs || []);
        setSkills(data.skills || []);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-neutral-text-secondary)]">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-neutral-text-secondary)]">User not found</p>
      </div>
    );
  }

  return (
    <main id="main-content" className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-8">
      <section className="rounded-[var(--radius-lg)] bg-gradient-to-br from-white to-[var(--color-neutral-surface-alt)] p-6">
        <p className="text-sm text-[var(--color-primary-emerald)]">@{user.email?.split('@')[0]}</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">{user.full_name}</h1>
        <p className="mt-2 text-[var(--color-neutral-text-secondary)]">
          3rd year CSE @ {user.college || 'College'}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-neutral-text-secondary)]">
          {user.bio || 'No bio yet'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
            GitHub
          </button>
          <button className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
            LinkedIn
          </button>
          <button className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
            Email
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[var(--color-neutral-text)]">Verified Skills</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {skills.slice(0, 8).map((skill) => (
            <div key={skill} className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4">
              <h3 className="text-base font-semibold text-[var(--color-neutral-text)]">{skill}</h3>
              <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                2 projects verified
              </p>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[var(--color-neutral-text)]">{`${user.full_name || 'User'}'s Proof (${proofs.length} total)`}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {proofs.slice(0, 4).map((proof) => (
            <div key={proof.id} className="rounded-lg border border-[var(--color-neutral-border)] bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[var(--color-primary-emerald)]">{proof.source_type.toUpperCase()}</p>
                  <h3 className="font-semibold text-gray-900">{proof.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                    {proof.description || 'No description'}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  proof.verification_status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                  proof.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {proof.verification_status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {proof.skills_extracted?.slice(0, 3).map((skill) => (
                  <span key={skill} className="text-xs bg-[var(--color-neutral-surface-alt)] px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 border-t border-[var(--color-neutral-border)] py-6 text-sm text-[var(--color-neutral-text-secondary)]">
        <p>Create your own proof profile on Orin.</p>
      </footer>
    </main>
  );
}