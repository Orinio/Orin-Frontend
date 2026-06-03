"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const options = [
  {
    title: "Connect GitHub",
    description: "Import repositories, stars, and commit history.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-ink)' }}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    title: "Upload Certificate/PDF",
    description: "Add hackathon wins, internships, and course certificates.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ember)' }}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: "Link Kaggle/Codeforces",
    description: "Connect competitive profiles and verified rankings.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-pulse)' }}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Paste custom proof URL",
    description: "Share demo links, blogs, or deployment URLs.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-bloom)' }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export function AddProofSourceCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="border-dashed">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-ink)' }}>+ Add Proof Source</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Connect GitHub, upload certificate, link Kaggle/Codeforces, or paste custom proof URL.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setIsOpen(true)}>
            Add source
          </Button>
        </div>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add proof source"
            className="w-full max-w-lg rounded-2xl p-6 shadow-xl"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--color-ink)' }}>Add proof source</h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Choose a source to turn into verified proof cards.
                </p>
              </div>
              <button
                className="rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200"
                style={{ border: '1px solid var(--color-border-light)', color: 'var(--color-text-secondary)' }}
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {options.map((option) => (
                <div
                  key={option.title}
                  className="rounded-xl p-4 transition-all duration-200 cursor-pointer flex items-start gap-3"
                  style={{ border: '1px solid var(--color-border-light)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-ink)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-light)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-surface-dim)' }}>
                    {option.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{option.title}</p>
                    <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button>Continue</Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Maybe later
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
