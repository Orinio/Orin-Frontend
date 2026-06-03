import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeSkills, getSkillRecommendations } from '@/lib/skills';
import { buildSystemPrompt, getPromptForNoteType, parseCoachResponse } from '@/lib/prompts';
import { checkRateLimit, estimateOpenAICost } from '@/lib/rate-limit';
import type { CoachNoteType } from '@/lib/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const nvidiaApiKey = process.env.NVIDIA_API_KEY!;
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const NIM_MODEL = 'meta/llama-3.3-70b-instruct';

interface GenerateRequest {
  noteType: CoachNoteType;
  milestone?: string;
  userQuery?: string;
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || !userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    const requestBody: GenerateRequest = await req.json();
    const { noteType, milestone, userQuery } = requestBody;

    if (!noteType || !['daily', 'weekly', 'milestone', 'ad_hoc'].includes(noteType)) {
      return NextResponse.json({ error: 'Invalid note type' }, { status: 400 });
    }

    const rateLimitResult = await checkRateLimit(supabase, userProfile.id, noteType);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          reason: rateLimitResult.reason,
          nextAllowedAt: rateLimitResult.nextAllowedAt,
        },
        { status: 429 }
      );
    }

    const { data: proofs, error: proofsError } = await supabase
      .from('proof_cards')
      .select('*')
      .eq('user_id', userProfile.id)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (proofsError) {
      return NextResponse.json({ error: 'Failed to fetch proofs' }, { status: 500 });
    }

    const skillAnalysis = analyzeSkills(proofs || [], undefined);

    if (!nvidiaApiKey) {
      const fallbackNote = generateFallbackNote(noteType, userProfile, proofs || [], skillAnalysis);
      
      const { data: savedNote, error: saveError } = await supabase
        .from('coach_notes')
        .insert({
          user_id: userProfile.id,
          type: noteType,
          content: fallbackNote.content,
          action_label: fallbackNote.actionLabel || null,
          action_url: fallbackNote.actionUrl || null,
          priority: fallbackNote.priority || 5,
          expires_at:
            noteType === 'daily'
              ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
              : noteType === 'weekly'
              ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
              : null,
        })
        .select()
        .single();

      if (saveError) {
        return NextResponse.json({ error: 'Failed to save coach note' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        note: savedNote,
        fallback: true,
      });
    }

    const systemPrompt = buildSystemPrompt();
    const userPrompt = getPromptForNoteType(
      {
        user: {
          id: userProfile.id,
          authUserId: userProfile.auth_user_id,
          email: userProfile.email,
          username: userProfile.username,
          fullName: userProfile.full_name,
          avatarUrl: userProfile.avatar_url,
          college: userProfile.college,
          year: userProfile.year,
          bio: userProfile.bio,
          headline: userProfile.headline,
          location: userProfile.location,
          websiteUrl: userProfile.website_url,
          githubUrl: userProfile.github_url,
          linkedinUrl: userProfile.linkedin_url,
          twitterUrl: userProfile.twitter_url,
          role: userProfile.role,
          accountStatus: userProfile.account_status,
          isProfilePublic: userProfile.is_profile_public,
          hideEmail: userProfile.hide_email,
          emailVerified: userProfile.email_verified,
          authProvider: userProfile.auth_provider,
          lastLoginAt: userProfile.last_login_at ? new Date(userProfile.last_login_at) : undefined,
          createdAt: new Date(userProfile.created_at),
          updatedAt: new Date(userProfile.updated_at),
        },
        proofs: proofs || [],
        skillAnalysis,
        noteType,
        milestone,
      },
      userQuery
    );

    const nvidiaResponse = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${nvidiaApiKey}`,
      },
      body: JSON.stringify({
        model: NIM_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!nvidiaResponse.ok) {
      const errorData = await nvidiaResponse.text();
      console.error('NVIDIA NIM API error:', errorData);
      return NextResponse.json({ error: 'Failed to generate coaching note' }, { status: 500 });
    }

    const nvidiaData = await nvidiaResponse.json();
    const aiContent = nvidiaData.choices[0]?.message?.content;

    if (!aiContent) {
      return NextResponse.json({ error: 'Empty response from NVIDIA NIM' }, { status: 500 });
    }

    const coachNote = parseCoachResponse(aiContent);
    if (!coachNote) {
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
    }

    const { data: savedNote, error: saveError } = await supabase
      .from('coach_notes')
      .insert({
        user_id: userProfile.id,
        type: noteType,
        content: coachNote.content,
        action_label: coachNote.actionLabel || null,
        action_url: coachNote.actionUrl || null,
        priority: coachNote.priority || 5,
        expires_at:
          noteType === 'daily'
            ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            : noteType === 'weekly'
            ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            : null,
      })
      .select()
      .single();

    if (saveError) {
      return NextResponse.json({ error: 'Failed to save coach note' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      note: savedNote,
      usage: {
        model: NIM_MODEL,
        tokensUsed: nvidiaData.usage?.total_tokens || 0,
        costEstimate: 0,
      },
    });
  } catch (error) {
    console.error('Generate coach note error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateFallbackNote(
  noteType: CoachNoteType,
  userProfile: any,
  proofs: any[],
  skillAnalysis: any
): { content: string; actionLabel?: string; actionUrl?: string; priority: number } {
  const verifiedCount = proofs.filter((p) => p.verification_status === 'verified').length;
  const topSkills = skillAnalysis.topSkills.slice(0, 3).map((s: any) => s.name);

  const fallbackNotes: Record<CoachNoteType, () => { content: string; actionLabel?: string; actionUrl?: string; priority: number }> = {
    daily: () => ({
      content: `Hi ${userProfile.full_name || userProfile.username}! ${
        proofs.length === 0
          ? "Start building your portfolio by adding your first proof. Connect your GitHub account or upload a certificate to get started!"
          : topSkills.length > 0
          ? `Great work on your ${topSkills.join(', ')} proofs! Consider adding more variety to showcase different skills. Try a hackathon project or a blog post to diversify your portfolio.`
          : "Add some skills to your proofs to help recruiters discover your expertise. You can add skills when editing your proof cards."
      }`,
      actionLabel: proofs.length === 0 ? 'Add First Proof' : 'View Proofs',
      actionUrl: proofs.length === 0 ? '/dashboard/proof/new' : '/dashboard',
      priority: 5,
    }),
    weekly: () => ({
      content: `Weekly Summary: You have ${proofs.length} proofs total, with ${verifiedCount} verified. ${
        verifiedCount < proofs.length
          ? "Consider submitting your unverified proofs for review to build credibility."
          : "All your proofs are verified! Great job maintaining a credible profile."
      } ${
        topSkills.length > 0
          ? `Your top skills: ${topSkills.join(', ')}.`
          : "Add skills to your proofs to improve discoverability."
      }`,
      priority: 6,
    }),
    milestone: () => ({
      content: `Congratulations! You've reached a milestone with ${proofs.length} proofs in your portfolio. ${
        verifiedCount > 0 ? `${verifiedCount} of them are verified,` : "Keep adding proofs and"
      } building your career proof collection. Keep up the great work!`,
      priority: 8,
    }),
    ad_hoc: () => ({
      content: `Based on your portfolio, ${
        proofs.length === 0
          ? "you're just getting started! Focus on adding diverse proof types to showcase your skills."
          : `you have a solid foundation with ${proofs.length} proofs. ${
              topSkills.length > 0
                ? `Your strengths include ${topSkills.join(', ')}.`
                : "Consider adding more skills to your proofs."
            } Try to get more proofs verified to increase your profile credibility.`
      }`,
      actionLabel: 'View Dashboard',
      actionUrl: '/dashboard',
      priority: 5,
    }),
  };

  return fallbackNotes[noteType]();
}
