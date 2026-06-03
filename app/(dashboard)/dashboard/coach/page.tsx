'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, RefreshCw, Lightbulb, CalendarRange, Trophy, Megaphone } from 'lucide-react';
import CoachNote, { CoachNoteSkeleton } from '@/components/CoachNote';
import type { CoachNote as CoachNoteType, CoachNoteType as NoteType } from '@/lib/types';
import { cn } from '@/lib/utils';

const noteTypes: { type: NoteType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    type: 'daily',
    label: 'Daily Tip',
    icon: <Lightbulb className="w-4 h-4" />,
    description: 'Get a daily career tip based on your profile',
  },
  {
    type: 'weekly',
    label: 'Weekly Insight',
    icon: <CalendarRange className="w-4 h-4" />,
    description: 'Receive a comprehensive weekly summary',
  },
  {
    type: 'ad_hoc',
    label: 'Ask Coach',
    icon: <Megaphone className="w-4 h-4" />,
    description: 'Get personalized advice on any career topic',
  },
];

export default function CoachPage() {
  const [notes, setNotes] = useState<CoachNoteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState<NoteType>('daily');
  const [userQuery, setUserQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch('/api/coach-notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data.notes || []);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to load coach notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const generateNote = async () => {
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/coach-notes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteType: selectedType,
          userQuery: selectedType === 'ad_hoc' ? userQuery : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate note');
      }

      const data = await response.json();
      if (data.note) {
        const newNote: CoachNoteType = {
          id: data.note.id,
          userId: data.note.user_id,
          content: data.note.content,
          type: data.note.type,
          actionLabel: data.note.action_label,
          actionUrl: data.note.action_url,
          priority: data.note.priority,
          expiresAt: data.note.expires_at ? new Date(data.note.expires_at) : undefined,
          createdAt: new Date(data.note.created_at),
        };
        setNotes((prev) => [newNote, ...prev]);
        setCurrentIndex(0);
      }

      if (selectedType === 'ad_hoc') {
        setUserQuery('');
      }
    } catch (err) {
      console.error('Error generating note:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate note');
    } finally {
      setGenerating(false);
    }
  };

  const dismissNote = async (id: string) => {
    try {
      await fetch(`/api/coach-notes/${id}`, { method: 'DELETE' });
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (currentIndex >= notes.length - 1) {
        setCurrentIndex(Math.max(0, notes.length - 2));
      }
    } catch (err) {
      console.error('Error dismissing note:', err);
    }
  };

  const currentNote = notes[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[var(--color-spark)]" />
          AI Career Coach
        </h1>
        <p className="text-white/60">
          Get personalized career advice based on your proof portfolio and skills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Generate New Note</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {noteTypes.map((nt) => (
                <button
                  key={nt.type}
                  onClick={() => setSelectedType(nt.type)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-[var(--radius-lg)] border transition-all',
                    selectedType === nt.type
                      ? 'border-[var(--color-bloom)] bg-[var(--color-bloom)]/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      selectedType === nt.type
                        ? 'bg-[var(--color-bloom)] text-white'
                        : 'bg-white/10 text-white/60'
                    )}
                  >
                    {nt.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{nt.label}</p>
                    <p className="text-xs text-white/50">{nt.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {selectedType === 'ad_hoc' && (
              <div className="mb-4">
                <textarea
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Ask about career advice, skill gaps, portfolio improvement..."
                  className="w-full p-3 rounded-[var(--radius-md)] bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-bloom)] resize-none"
                  rows={3}
                />
              </div>
            )}

            <button
              onClick={generateNote}
              disabled={generating || (selectedType === 'ad_hoc' && !userQuery.trim())}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] font-medium transition-all',
                generating
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-[var(--color-bloom)] text-white hover:bg-[var(--color-bloom)]/80'
              )}
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Note
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <>
                <CoachNoteSkeleton />
                <CoachNoteSkeleton />
                <CoachNoteSkeleton />
              </>
            ) : notes.length === 0 ? (
              <div className="text-center py-12 text-white/50">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No coach notes yet</p>
                <p className="text-sm">Generate your first note to get personalized career advice.</p>
              </div>
            ) : (
              <>
                {currentNote && (
                  <CoachNote
                    note={currentNote}
                    isLatest={currentIndex === 0}
                    showNavigation={notes.length > 1}
                    onPrevious={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    onNext={() => setCurrentIndex((i) => Math.min(notes.length - 1, i + 1))}
                    hasPrevious={currentIndex > 0}
                    hasNext={currentIndex < notes.length - 1}
                    onDismiss={dismissNote}
                  />
                )}

                {notes.length > 1 && (
                  <div className="flex items-center justify-center gap-2 py-2">
                    {notes.slice(0, Math.min(5, notes.length)).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                          'w-2 h-2 rounded-full transition-all',
                          idx === currentIndex ? 'bg-[var(--color-bloom)] w-4' : 'bg-white/20'
                        )}
                        aria-label={`Go to note ${idx + 1}`}
                      />
                    ))}
                    {notes.length > 5 && (
                      <span className="text-xs text-white/30">+{notes.length - 5} more</span>
                    )}
                  </div>
                )}

                {notes.length > 1 && (
                  <div className="text-center text-xs text-white/30">
                    Showing {currentIndex + 1} of {notes.length} notes
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="p-4 rounded-[var(--radius-lg)] bg-white/5 border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">About AI Coach</h3>
              <ul className="space-y-2 text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-bloom)] mt-0.5">•</span>
                  <span>Analyzes your proof portfolio and skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-ember)] mt-0.5">•</span>
                  <span>Provides personalized, actionable advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-spark)] mt-0.5">•</span>
                  <span>Identifies skill gaps and opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-pulse)] mt-0.5">•</span>
                  <span>Updates daily based on your activity</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-[var(--radius-lg)] bg-white/5 border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">Usage Limits</h3>
              <div className="space-y-2 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>Daily Tips</span>
                  <span className="text-white/40">1 per day</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekly Insights</span>
                  <span className="text-white/40">1 per week</span>
                </div>
                <div className="flex justify-between">
                  <span>Ask Coach</span>
                  <span className="text-white/40">2 per day</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-bloom)]/20 to-[var(--color-spark)]/20 border border-[var(--color-bloom)]/30">
              <h3 className="text-sm font-semibold text-white mb-2">Pro Tip</h3>
              <p className="text-xs text-white/70">
                Add more proofs and skills to get more personalized advice. The AI coach analyzes
                your portfolio to provide tailored recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 p-4 rounded-[var(--radius-lg)] bg-red-500/20 border border-red-500/30 text-red-200 text-sm max-w-md">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-300 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
