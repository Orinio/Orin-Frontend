'use client';

import Link from 'next/link';
import {
  Lightbulb,
  CalendarDays,
  CalendarRange,
  Trophy,
  Megaphone,
  X,
  ArrowRight,
} from 'lucide-react';
import type { CoachNote as CoachNoteType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CoachNoteProps {
  note: CoachNoteType;
  onDismiss?: (id: string) => void;
}

const typeConfig: Record<
  string,
  { label: string; icon: React.ReactNode; accent: string }
> = {
  daily: {
    label: 'Daily Tip',
    icon: <Lightbulb className="w-3.5 h-3.5" />,
    accent: 'var(--color-bloom)',
  },
  weekly: {
    label: 'Weekly Insight',
    icon: <CalendarRange className="w-3.5 h-3.5" />,
    accent: 'var(--color-ember)',
  },
  milestone: {
    label: 'Milestone',
    icon: <Trophy className="w-3.5 h-3.5" />,
    accent: 'var(--color-spark)',
  },
  ad_hoc: {
    label: 'Coach Note',
    icon: <Megaphone className="w-3.5 h-3.5" />,
    accent: 'var(--color-pulse)',
  },
};

export default function CoachNote({ note, onDismiss }: CoachNoteProps) {
  const config = typeConfig[note.type] || typeConfig.ad_hoc;

  return (
    <div
      className="relative p-5 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-ink) 0%, #1a1a2e 100%)',
      }}
    >
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10"
        style={{ backgroundColor: config.accent }}
      />
      <div
        className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full opacity-10"
        style={{ backgroundColor: config.accent }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: config.accent }}
            >
              <span className="text-white">{config.icon}</span>
            </div>
            <p
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: config.accent }}
            >
              {config.label}
            </p>
          </div>
          {onDismiss && (
            <button
              onClick={() => onDismiss(note.id)}
              className="flex items-center justify-center w-6 h-6 rounded-full transition-colors hover:bg-white/10"
              aria-label="Dismiss note"
            >
              <X className="w-3.5 h-3.5 text-white/50 hover:text-white" />
            </button>
          )}
        </div>

        <p className="text-sm leading-relaxed text-white/90">{note.content}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] text-white/30">
            {note.createdAt.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          {note.actionLabel && note.actionUrl && (
            <Link
              href={note.actionUrl}
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors',
                'bg-white/10 hover:bg-white/20 text-white',
              )}
            >
              {note.actionLabel}
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
