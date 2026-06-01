"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const settingsNav = ["Account", "Notifications", "Privacy", "Integrations", "Billing"];

export default function SettingsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-emerald)]">
          Settings
        </h2>
        <nav className="space-y-1 text-sm">
          {settingsNav.map((item) => (
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
          <h1 className="text-3xl font-semibold">Account settings</h1>
          <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
            Control how your profile appears and how ORIN communicates with you.
          </p>
        </header>

        <Card>
          <h2 className="text-lg font-semibold">Profile</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                Full name
              </label>
              <Input id="fullName" placeholder="Aditi Gupta" />
            </div>
            <div>
              <label htmlFor="headline" className="mb-2 block text-sm font-medium">
                Headline
              </label>
              <Input id="headline" placeholder="Frontend engineer · Builder" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="location" className="mb-2 block text-sm font-medium">
                Location
              </label>
              <Input id="location" placeholder="Bengaluru, India" />
            </div>
          </div>
          <Button className="mt-6">Save changes</Button>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Choose when ORIN should reach you.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--color-neutral-text-secondary)]">
            {[
              "Weekly proof summary",
              "New recruiter view alerts",
              "Verification status updates",
            ].map((item) => (
              <label key={item} className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 accent-[var(--color-primary-emerald)]" />
                {item}
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Privacy</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Your profile stays private until you share it.
          </p>
          <div className="mt-4">
            <label htmlFor="publicLink" className="mb-2 block text-sm font-medium">
              Public profile link
            </label>
            <Input id="publicLink" placeholder="orin.app/aditi" />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Danger zone</h2>
          <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
            Deleting your account removes all proof data.
          </p>
          <Button className="mt-4" variant="danger" type="button" onClick={() => setShowDeleteModal(true)}>
            Delete account
          </Button>
        </Card>

        {showDeleteModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Confirm account deletion"
              className="w-full max-w-md rounded-[var(--radius-lg)] bg-[var(--color-neutral-surface)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.2)]"
            >
              <h3 className="text-lg font-semibold">Delete your account?</h3>
              <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
                This action is permanent. All proof cards, analytics, and profile data will be
                removed.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button variant="danger" type="button">
                  Yes, delete
                </Button>
                <Button variant="ghost" type="button" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}