'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';

const settingsNav = ["Account", "Notifications", "Privacy", "Integrations", "Billing"];

export default function SettingsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!supabase) {
        console.warn('Supabase not configured');
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/signin');
        return;
      }
      setUser(user);
      setFullName(user.user_metadata?.full_name || '');
    };
    fetchUser();
  }, [router]);

  const handleSave = async () => {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        headline,
        location,
      },
    });
    if (!error) {
      alert('Profile updated!');
    }
    setLoading(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-emerald)]">
          Settings
        </h2>
        <nav className="space-y-1 text-sm">
          {settingsNav.map((item: string) => (
            <button
              key={item}
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[var(--color-neutral-text-secondary)] transition hover:bg-[var(--color-neutral-surface-alt)] hover:text-[var(--color-primary-emerald)]"
            >
              {item}
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-orange)]/70" />
            </button>
          ))}
        </nav>
      </aside>

      <section className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-[var(--color-neutral-text)]">Account settings</h1>
          <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
            Control how your profile appears and how ORIN communicates with you.
          </p>
        </header>

        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">Profile</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[var(--color-neutral-text)]">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Aditi Gupta"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
              />
            </div>
            <div>
              <label htmlFor="headline" className="mb-2 block text-sm font-medium text-[var(--color-neutral-text)]">
                Headline
              </label>
              <input
                id="headline"
                type="text"
                placeholder="Frontend engineer · Builder"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="location" className="mb-2 block text-sm font-medium text-[var(--color-neutral-text)]">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Bengaluru, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
              />
            </div>
          </div>
          <button className="btn-green mt-6 rounded-md px-6 py-2 font-semibold text-white" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>

        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">Notifications</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Choose when ORIN should reach you.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--color-neutral-text-secondary)]">
            {[
              "Weekly proof summary",
              "New recruiter view alerts",
              "Verification status updates",
            ].map((item: string) => (
              <label key={item} className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 accent-[var(--color-primary-emerald)]" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">Privacy</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Your profile stays private until you share it.
          </p>
          <div className="mt-4">
            <label htmlFor="publicLink" className="mb-2 block text-sm font-medium text-[var(--color-neutral-text)]">
              Public profile link
            </label>
            <input
              id="publicLink"
              type="text"
              placeholder="orin.app/aditi"
              className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
            />
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">Danger zone</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Deleting your account removes all proof data.
          </p>
          <button className="mt-4 rounded-md bg-[var(--color-danger)] px-4 py-2 font-semibold text-white hover:bg-[var(--color-danger-strong)]" type="button" onClick={() => setShowDeleteModal(true)}>
            Delete account
          </button>
        </div>

        {showDeleteModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Confirm account deletion"
              className="w-full max-w-md rounded-[var(--radius-lg)] bg-[var(--color-neutral-surface)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.2)]"
            >
              <h3 className="text-lg font-semibold text-[var(--color-neutral-text)]">Delete your account?</h3>
              <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
                This action is permanent. All proof cards, analytics, and profile data will be
                removed.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button className="rounded-md bg-[var(--color-danger)] px-4 py-2 font-semibold text-white hover:bg-[var(--color-danger-strong)]" type="button">
                  Yes, delete
                </button>
                <button className="rounded-md px-4 py-2 font-semibold text-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-soft)]" type="button" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}