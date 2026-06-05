import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeSkills, identifySkillGaps, getSkillRecommendations, extractSkillsFromProofs } from '@/lib/skills';
import { runAgent, type AgentResult } from '@/lib/ai/agent';
import { checkAIRateLimit } from '@/lib/rate-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface MatchRequest {
  userId: string;
  targetRole?: string;
  limit?: number;
  includeSkillGaps?: boolean;
}

interface MatchResult {
  opportunityId: string;
  title: string;
  company: string;
  type: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  reasoning: string;
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

    const body: MatchRequest = await req.json();
    const { userId, targetRole, limit = 10, includeSkillGaps = true } = body;

    if (userId !== (await supabase.from('users').select('id').eq('auth_user_id', user.id).single()).data?.id) {
      return NextResponse.json({ error: 'User ID mismatch' }, { status: 400 });
    }

    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (profileError || !userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Check rate limit
    const rateLimitResult = await checkAIRateLimit(supabase, userProfile.id, 'ai-match-opportunities');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', reason: rateLimitResult.reason, nextAllowedAt: rateLimitResult.nextAllowedAt },
        { status: 429 }
      );
    }

    const { data: proofs, error: proofsError } = await supabase
      .from('proof_cards')
      .select('*')
      .eq('user_id', userProfile.id)
      .is('deleted_at', null);

    if (proofsError) {
      return NextResponse.json({ error: 'Failed to fetch proofs' }, { status: 500 });
    }

    const skillAnalysis = analyzeSkills(proofs || [], targetRole);
    const userSkills = extractSkillsFromProofs(proofs || []);
    const skillGaps = includeSkillGaps ? identifySkillGaps(userSkills, targetRole) : [];
    const recommendations = getSkillRecommendations(skillAnalysis);

    const { data: opportunities, error: oppsError } = await supabase
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (oppsError) {
      return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
    }

    const userSkillsSet = new Set(userSkills.map(s => s.toLowerCase()));

    const matches: MatchResult[] = (opportunities || []).map(opp => {
      const requiredSkills = (opp.required_skills || []) as string[];
      const niceToHaveSkills = (opp.nice_to_have || []) as string[];
      const oppSkills = new Set(requiredSkills.map(s => s.toLowerCase()));
      const niceToHave = new Set(niceToHaveSkills.map(s => s.toLowerCase()));
      
      const matchedRequired = [...oppSkills].filter(s => userSkillsSet.has(s));
      const matchedNice = [...niceToHave].filter(s => userSkillsSet.has(s));
      const missingRequired = [...oppSkills].filter(s => !userSkillsSet.has(s));
      const missingNice = [...niceToHave].filter(s => !userSkillsSet.has(s));

      const requiredWeight = 1.0;
      const niceWeight = 0.3;
      
      const score = Math.round(
        ((matchedRequired.length * requiredWeight + matchedNice.length * niceWeight) / 
         (oppSkills.size * requiredWeight + niceToHave.size * niceWeight)) * 100
      );

      return {
        opportunityId: opp.id,
        title: opp.title,
        company: opp.company,
        type: opp.type,
        matchScore: Math.min(100, Math.max(0, score)),
        matchedSkills: [...matchedRequired, ...matchedNice],
        missingSkills: [...missingRequired, ...missingNice],
        reasoning: `Matches ${matchedRequired.length}/${oppSkills.size} required skills and ${matchedNice.length}/${niceToHave.size} preferred skills`
      };
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    const topMatches = matches.slice(0, limit);

    let aiInsights: AgentResult | null = null;
    if (process.env.NVIDIA_API_KEY && topMatches.length > 0) {
      try {
        const query = `Analyze this user's skill match with opportunities:
User: ${userProfile.full_name || userProfile.username}
Top Skills: ${skillAnalysis.topSkills.slice(0, 5).map(s => s.name).join(', ')}
Target Role: ${targetRole || 'Not specified'}

Top Matched Opportunities:
${topMatches.slice(0, 3).map(m => 
  `- ${m.title} at ${m.company} (${m.matchScore}% match): Required [${m.matchedSkills.join(', ')}], Missing [${m.missingSkills.join(', ')}]`
).join('\n')}

Skill Gaps: ${skillGaps.slice(0, 5).join(', ')}

Provide personalized insights on:
1. Which opportunities to prioritize
2. What skills to learn next for better matches
3. Portfolio improvements to increase match scores

Be specific and actionable.`;

        aiInsights = await runAgent(query, { maxIterations: 2, maxTokens: 400 });
      } catch (e) {
        console.warn('AI insights generation failed:', e);
      }
    }

    return NextResponse.json({
      success: true,
      matches: topMatches,
      skillAnalysis: {
        topSkills: skillAnalysis.topSkills.slice(0, 10),
        totalSkills: skillAnalysis.totalSkills,
        uniqueSkills: skillAnalysis.uniqueSkills,
        skillGaps: skillGaps.slice(0, 10),
        recommendations: recommendations.slice(0, 5)
      },
      aiInsights: aiInsights ? {
        answer: aiInsights.answer,
        thinking: aiInsights.thinking,
        tokensUsed: aiInsights.totalTokens
      } : null
    });

  } catch (error) {
    console.error('Match opportunities error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
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

    const { data: userProfile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    const { data: proofs } = await supabase
      .from('proof_cards')
      .select('*')
      .eq('user_id', userProfile.id)
      .is('deleted_at', null);

    const skillAnalysis = analyzeSkills(proofs || []);
    const userSkillsList = extractSkillsFromProofs(proofs || []);
    const skillGaps = identifySkillGaps(userSkillsList);
    const recommendations = getSkillRecommendations(skillAnalysis);

    return NextResponse.json({
      success: true,
      skillAnalysis: {
        topSkills: skillAnalysis.topSkills.slice(0, 15),
        totalSkills: skillAnalysis.totalSkills,
        uniqueSkills: skillAnalysis.uniqueSkills,
        skills: skillAnalysis.skills,
        skillGaps: skillGaps.slice(0, 15),
        recommendations: recommendations.slice(0, 10)
      }
    });

  } catch (error) {
    console.error('Get skill analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}