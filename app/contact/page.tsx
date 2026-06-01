'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-[var(--color-neutral-text)] mb-2">Contact Us</h1>
      <p className="text-[var(--color-neutral-text-secondary)] mb-6">
        Have questions? We&apos;re here to help.
      </p>

      {success ? (
        <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
          <p className="text-center text-[var(--color-primary-emerald)]">Thank you! We&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-text)] mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-text)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-neutral-text)] mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full rounded-md border border-[var(--color-neutral-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-emerald)]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-green rounded-md px-6 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}