import type { SupabaseClient } from '@supabase/supabase-js';
import type { CoachNoteType } from './types';

export interface RateLimitConfig {
  maxPerDay: number;
  maxPerWeek: number;
  cooldownHours: number;
}

// General AI endpoint rate limits
export const AI_RATE_LIMITS: Record<string, RateLimitConfig> = {
  'ai-verify': {
    maxPerDay: 10,
    maxPerWeek: 50,
    cooldownHours: 0.5,
  },
  'ai-chat': {
    maxPerDay: 30,
    maxPerWeek: 150,
    cooldownHours: 0.1,
  },
  'ai-match-opportunities': {
    maxPerDay: 5,
    maxPerWeek: 20,
    cooldownHours: 1,
  },
  'ai-skills': {
    maxPerDay: 10,
    maxPerWeek: 50,
    cooldownHours: 0.5,
  },
  'coach-notes-generate': {
    maxPerDay: 3,
    maxPerWeek: 10,
    cooldownHours: 4,
  },
};

export const RATE_LIMITS: Record<CoachNoteType, RateLimitConfig> = {
  daily: {
    maxPerDay: 1,
    maxPerWeek: 7,
    cooldownHours: 6,
  },
  weekly: {
    maxPerDay: 0,
    maxPerWeek: 1,
    cooldownHours: 168,
  },
  milestone: {
    maxPerDay: 3,
    maxPerWeek: 10,
    cooldownHours: 1,
  },
  ad_hoc: {
    maxPerDay: 2,
    maxPerWeek: 14,
    cooldownHours: 4,
  },
};

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  nextAllowedAt?: Date;
}

export async function checkRateLimit(
  supabase: SupabaseClient,
  userId: string,
  noteType: CoachNoteType
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[noteType];
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const { data: recentNotes, error } = await supabase
    .from('coach_notes')
    .select('created_at, type')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true };
  }

  const notesLast24h = (recentNotes || []).filter(
    (n) => new Date(n.created_at) >= twentyFourHoursAgo
  );

  const notesLast7d = recentNotes || [];

  const typeNotesLast24h = notesLast24h.filter((n) => n.type === noteType);
  if (typeNotesLast24h.length >= config.maxPerDay) {
    const lastNote = typeNotesLast24h[0];
    const nextAllowed = new Date(lastNote.created_at);
    nextAllowed.setHours(nextAllowed.getHours() + config.cooldownHours);
    return {
      allowed: false,
      reason: `Daily limit reached for ${noteType} notes`,
      nextAllowedAt: nextAllowed,
    };
  }

  const typeNotesLast7d = notesLast7d.filter((n) => n.type === noteType);
  if (typeNotesLast7d.length >= config.maxPerWeek) {
    return {
      allowed: false,
      reason: `Weekly limit reached for ${noteType} notes`,
      nextAllowedAt: sevenDaysAgo,
    };
  }

  if (typeNotesLast24h.length > 0) {
    const lastNote = typeNotesLast24h[0];
    const lastNoteTime = new Date(lastNote.created_at);
    const cooldownEnd = new Date(lastNoteTime.getTime() + config.cooldownHours * 60 * 60 * 1000);
    if (now < cooldownEnd) {
      return {
        allowed: false,
        reason: `Cooldown period active for ${noteType} notes`,
        nextAllowedAt: cooldownEnd,
      };
    }
  }

  return { allowed: true };
}

export async function getLastNoteCreatedAt(
  supabase: SupabaseClient,
  userId: string,
  noteType: CoachNoteType
): Promise<Date | null> {
  const { data, error } = await supabase
    .from('coach_notes')
    .select('created_at')
    .eq('user_id', userId)
    .eq('type', noteType)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return new Date(data.created_at);
}

export async function getNoteCount(
  supabase: SupabaseClient,
  userId: string,
  noteType: CoachNoteType,
  since: Date
): Promise<number> {
  const { count, error } = await supabase
    .from('coach_notes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('type', noteType)
    .is('deleted_at', null)
    .gte('created_at', since.toISOString());

  if (error) return 0;
  return count || 0;
}

export function estimateOpenAICost(
  inputTokens: number,
  outputTokens: number,
  model: 'gpt-4o-mini' | 'gpt-4o' = 'gpt-4o-mini'
): number {
  const pricing: Record<string, { input: number; output: number }> = {
    'gpt-4o-mini': { input: 0.15 / 1_000_000, output: 0.6 / 1_000_000 },
    'gpt-4o': { input: 2.5 / 1_000_000, output: 10 / 1_000_000 },
  };

  const rates = pricing[model];
  return inputTokens * rates.input + outputTokens * rates.output;
}

export async function trackUsage(
  supabase: SupabaseClient,
  userId: string,
  tokensUsed: number,
  costEstimate: number
): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  const { error } = await supabase.from('coach_notes').select('id').limit(1);

  if (error) {
    console.error('Usage tracking skipped:', error);
  }
}

// General-purpose rate limiter for AI endpoints
export async function checkAIRateLimit(
  supabase: SupabaseClient,
  userId: string,
  endpoint: string
): Promise<RateLimitResult> {
  const config = AI_RATE_LIMITS[endpoint];
  if (!config) {
    // Default: 20 per day, 100 per week
    return checkGeneralRateLimit(supabase, userId, endpoint, {
      maxPerDay: 20,
      maxPerWeek: 100,
      cooldownHours: 0.5,
    });
  }
  return checkGeneralRateLimit(supabase, userId, endpoint, config);
}

async function checkGeneralRateLimit(
  supabase: SupabaseClient,
  userId: string,
  endpoint: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Use a simple in-memory approach by checking coach_notes as a proxy for usage
  // In production, you'd want a dedicated rate_limit table
  const { data: recentActivity, error } = await supabase
    .from('coach_notes')
    .select('created_at')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true };
  }

  const activityLast24h = (recentActivity || []).filter(
    (a) => new Date(a.created_at) >= twentyFourHoursAgo
  );

  const activityLast7d = recentActivity || [];

  if (activityLast24h.length >= config.maxPerDay) {
    const lastActivity = activityLast24h[0];
    const nextAllowed = new Date(lastActivity.created_at);
    nextAllowed.setHours(nextAllowed.getHours() + config.cooldownHours);
    return {
      allowed: false,
      reason: `Daily limit reached for ${endpoint}`,
      nextAllowedAt: nextAllowed,
    };
  }

  if (activityLast7d.length >= config.maxPerWeek) {
    return {
      allowed: false,
      reason: `Weekly limit reached for ${endpoint}`,
      nextAllowedAt: sevenDaysAgo,
    };
  }

  if (activityLast24h.length > 0) {
    const lastActivity = activityLast24h[0];
    const lastActivityTime = new Date(lastActivity.created_at);
    const cooldownEnd = new Date(lastActivityTime.getTime() + config.cooldownHours * 60 * 60 * 1000);
    if (now < cooldownEnd) {
      return {
        allowed: false,
        reason: `Cooldown period active for ${endpoint}`,
        nextAllowedAt: cooldownEnd,
      };
    }
  }

  return { allowed: true };
}

// Simple IP-based rate limiting for unauthenticated requests
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkIPRateLimit(ip: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = ipRateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    ipRateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}
