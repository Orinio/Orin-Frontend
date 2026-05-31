"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const options = [
  {
    title: "Connect GitHub",
    description: "Import repositories, stars, and commit history.",
  },
  {
    title: "Upload Certificate/PDF",
    description: "Add hackathon wins, internships, and course certificates.",
  },
  {
    title: "Link Kaggle/Codeforces",
    description: "Connect competitive profiles and verified rankings.",
  },
  {
    title: "Paste custom proof URL",
    description: "Share demo links, blogs, or deployment URLs.",
  },
];

export function AddProofSourceCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="border-dashed bg-[var(--color-neutral-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">+ Add Proof Source</h2>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              Connect GitHub, upload certificate, link Kaggle/Codeforces, or paste custom
              proof URL.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setIsOpen(true)}>
            Add source
          </Button>
        </div>
      </Card>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add proof source"
            className="w-full max-w-lg rounded-[var(--radius-lg)] bg-[var(--color-neutral-surface)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.2)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Add proof source</h3>
                <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                  Choose a source to turn into verified proof cards.
                </p>
              </div>
              <button
                className="rounded-full border border-[var(--color-neutral-border)] px-3 py-1 text-sm text-[var(--color-neutral-text-secondary)]"
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
                  className="rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] p-4"
                >
                  <p className="text-sm font-semibold">{option.title}</p>
                  <p className="mt-1 text-xs text-[var(--color-neutral-text-secondary)]">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button>Continue</Button>
              <Button variant="tertiary" onClick={() => setIsOpen(false)}>
                Maybe later
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
