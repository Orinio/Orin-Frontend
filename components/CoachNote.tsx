import type { CoachNote as CoachNoteType } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface CoachNoteProps {
  note: CoachNoteType;
}

export function CoachNote({ note }: CoachNoteProps) {
  return (
    <section
      aria-label="Today's coach note"
      className="sticky top-20 z-20 rounded-[var(--radius-lg)] bg-gradient-to-r from-[var(--color-primary-teal)] to-[var(--color-primary-blue)] p-6 text-white shadow-[0_16px_32px_rgba(14,165,233,0.25)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
            Today&apos;s coach note
          </p>
          <h2 className="mt-2 text-lg font-semibold">
            You&apos;re building proof every day 🎯
          </h2>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
          {note.type}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/90">{note.content}</p>
      <Button
        variant="ghost"
        className="mt-4 border border-white/60 text-white hover:bg-white/15"
      >
        {note.actionSuggestion}
      </Button>
    </section>
  );
}
