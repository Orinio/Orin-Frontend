import type { Proof } from "@/lib/types";

const typeMap = {
  github: { label: "GitHub", icon: "Code" },
  kaggle: { label: "Kaggle", icon: "Chart" },
  certificate: { label: "Certificate", icon: "Badge" },
  hackathon: { label: "Hackathon", icon: "Trophy" },
  custom: { label: "Custom", icon: "Link" },
};

const iconPaths: Record<string, string> = {
  Code: "M14 3l-6 6 6 6M10 3l-6 6 6 6",
  Chart: "M4 18V6m5 12V9m5 9v-4m5 4V8",
  Badge: "M12 2l2.5 4.5L19 7l-3.5 3.5L16 16l-4-2.5L8 16l.5-5.5L5 7l4.5-.5L12 2z",
  Trophy: "M8 4h8v3a4 4 0 01-4 4 4 4 0 01-4-4V4zm-3 0h3v3a4 4 0 01-3-4zm11 0h3a4 4 0 01-3 4V4zM9 15h6v3H9z",
  Link: "M10.5 13.5l3-3m-1-4l2 2a3 3 0 010 4.2l-2.3 2.3a3 3 0 01-4.2 0l-.7-.7m-.3-4.5l-2-2a3 3 0 010-4.2L7 3.3a3 3 0 014.2 0l.8.8",
};

export function TypeBadge({ type }: { type: Proof["type"] }) {
  const meta = typeMap[type];
  const icon = iconPaths[meta.icon];

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-2 py-1 text-xs font-medium text-[var(--color-neutral-text-secondary)]">
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d={icon} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {meta.label}
    </span>
  );
}
