import { notFound } from 'next/navigation';
import { supabase, Database } from '@/lib/supabase';
import { currentUser as mockUser, proofs as mockProofs } from '@/lib/mock-data';
import ProofCard from '@/components/ProofCard';
import { mapDbProofToProof } from '@/lib/utils';
import type { Proof } from '@/lib/types';

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  
  let user: {
    id: string;
    full_name: string | null;
    email: string;
    college: string | null;
    bio: string | null;
  } | null = null;

  let proofs: Proof[] = [];
  let allSkills: string[] = [];

  if (supabase) {
    try {
      const { data: userDataRaw, error: userError } = await supabase
        .from('users')
        .select('*')
        .or(`email.eq.${username},id.eq.${username}`)
        .maybeSingle();

      const userData = userDataRaw as Database['public']['Tables']['users']['Row'] | null;

      if (userError) {
        throw new Error(userError.message);
      }

      if (userData) {
        user = userData;
        // Fetch proofs
        const { data: proofsDataRaw } = await supabase
          .from('proof_cards')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false });

        const proofsData = proofsDataRaw as Database['public']['Tables']['proof_cards']['Row'][] | null;

        if (proofsData) {
          proofs = proofsData.map(mapDbProofToProof);
          allSkills = Array.from(
            new Set(proofsData.flatMap((s) => s.skills_extracted || []))
          );
        }
      }
    } catch (e) {
      console.warn("Error fetching user profile, falling back to mock user aarav-gupta-cse.", e);
    }
  }

  // Fall back to mock user if username is aarav-gupta-cse or if Supabase is offline/user not found
  if (!user && (username === 'aarav-gupta-cse' || !supabase)) {
    user = {
      id: mockUser.id,
      full_name: mockUser.fullName,
      email: mockUser.email,
      college: mockUser.college,
      bio: mockUser.bio || null,
    };
    proofs = mockProofs;
    allSkills = Array.from(new Set(mockProofs.flatMap((p) => p.skillsExtracted)));
  }

  if (!user) {
    notFound();
  }

  return (
    <main id="main-content" className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-8">
      <section className="rounded-[var(--radius-lg)] bg-gradient-to-br from-white to-[var(--color-neutral-surface-alt)] p-6 border border-[var(--color-neutral-border)]">
        <p className="text-sm text-[var(--color-primary-emerald)]">@{user.email.split('@')[0]}</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl font-serif">{user.full_name || ''}</h1>
        <p className="mt-2 text-[var(--color-neutral-text-secondary)]">
          3rd year CSE @ {user.college || 'College'}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-neutral-text-secondary)]">
          {user.bio || 'No bio yet'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
            GitHub
          </button>
          <button type="button" className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
            LinkedIn
          </button>
          <button type="button" className="rounded-md border-2 border-[var(--color-primary-emerald)] bg-transparent px-4 py-2 font-semibold text-[var(--color-primary-emerald)] transition hover:bg-[var(--color-primary-soft)]">
            Email
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[var(--color-neutral-text)] font-serif">Verified Skills</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {allSkills.slice(0, 8).map((skill) => (
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
        <h2 className="text-2xl font-semibold text-[var(--color-neutral-text)] font-serif">{`${user.full_name || 'User'}'s Proof (${proofs.length} total)`}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {proofs.slice(0, 4).map((proof) => (
            <ProofCard key={proof.id} proof={proof} variant="public" />
          ))}
        </div>
      </section>

      <footer className="mt-10 border-t border-[var(--color-neutral-border)] py-6 text-sm text-[var(--color-neutral-text-secondary)]">
        <p>Create your own proof profile on Orin.</p>
      </footer>
    </main>
  );
}