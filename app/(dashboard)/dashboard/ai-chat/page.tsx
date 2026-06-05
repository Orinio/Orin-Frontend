'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, User, Sparkles, Loader2, Trash2, Lightbulb } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  tokensUsed?: number;
  timestamp: Date;
}

const SUGGESTIONS = [
  'What skills should I learn next?',
  'How can I improve my GitHub profile?',
  'What certifications should I pursue?',
  'Help me prepare for technical interviews',
  'What projects should I add to my portfolio?',
  'How do I stand out to recruiters?',
];

export default function AIChatPage() {
  return (
    <ErrorBoundary>
      <AIChatContent />
    </ErrorBoundary>
  );
}

function AIChatContent() {
  const { user: authUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showThinking, setShowThinking] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response.content,
        thinking: data.response.thinking,
        tokensUsed: data.response.tokensUsed,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowThinking({});
  };

  const toggleThinking = (id: string) => {
    setShowThinking(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-neutral-text)] font-serif flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[var(--color-primary-emerald)]" />
            AI Assistant
          </h1>
          <p className="text-sm text-[var(--color-neutral-text-secondary)]">
            Ask anything about your career, skills, and portfolio.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-neutral-border)] px-3 py-2 text-sm text-[var(--color-neutral-text-secondary)] hover:bg-[var(--color-neutral-surface)]"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-[var(--color-primary-emerald)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--color-neutral-text)] mb-2">How can I help you?</h2>
            <p className="text-sm text-[var(--color-neutral-text-secondary)] max-w-md mb-6">
              I can analyze your portfolio, suggest skills to learn, recommend certifications, and help with career planning.
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-lg">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] p-3 text-left text-sm text-[var(--color-neutral-text-secondary)] hover:border-[var(--color-primary-emerald)] hover:text-[var(--color-primary-emerald)] transition"
                >
                  <Lightbulb className="h-4 w-4 mb-1 text-[var(--color-primary-emerald)]" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-[var(--color-primary-emerald)]" />
                </div>
            )}
            <div className={`max-w-[75%] rounded-xl p-4 ${
              message.role === 'user'
                ? 'bg-[var(--color-primary-emerald)] text-white'
                : 'bg-[var(--color-neutral-bg)] text-[var(--color-neutral-text)]'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.thinking && (
                <div className="mt-2">
                  <button
                    onClick={() => toggleThinking(message.id)}
                    className="text-xs text-[var(--color-neutral-text-tertiary)] hover:text-[var(--color-neutral-text-secondary)]"
                  >
                    {showThinking[message.id] ? 'Hide reasoning' : 'Show reasoning'}
                  </button>
                  {showThinking[message.id] && (
                    <p className="mt-1 text-xs italic text-[var(--color-neutral-text-tertiary)]">{message.thinking}</p>
                  )}
                </div>
              )}
              {message.tokensUsed && message.tokensUsed > 0 && (
                <p className="mt-1 text-[10px] text-[var(--color-neutral-text-tertiary)]">
                  {message.tokensUsed} tokens
                </p>
              )}
            </div>
            {message.role === 'user' && (
              <div className="h-8 w-8 rounded-full bg-[var(--color-neutral-surface-alt)] flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-[var(--color-neutral-text-secondary)]" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="h-8 w-8 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-4 w-4 text-[var(--color-primary-emerald)]" />
            </div>
            <div className="rounded-xl bg-[var(--color-neutral-bg)] p-4">
              <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-text-secondary)]">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your career, skills, or portfolio..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-4 py-3 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] focus:border-[var(--color-primary-emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)]"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-emerald)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-emerald)]/90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}