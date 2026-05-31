import type { CoachNote as CoachNoteType } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface CoachNoteProps {
  note: CoachNoteType;
}

export function CoachNote({ note }: CoachNoteProps) {
  return (
    <section
      aria-label="Today's coach note"
      className="sticky top-16 z-20 rounded-[var(--radius-lg)] bg-[var(--color-primary-teal)] p-6 text-white"
    >
      <h2 className="text-lg font-semibold">Today&apos;s Coach Note</h2>
      <p className="mt-2 text-sm leading-6">{note.content}</p>
      <Button
        variant="secondary"
        className="mt-4 border-white bg-transparent text-white hover:bg-white/10"
      >
        {note.actionSuggestion}
      </Button>
    </section>
  );
}
