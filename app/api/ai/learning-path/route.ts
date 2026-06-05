import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeSkills, identifySkillGaps, getSkillRecommendations, extractSkillsFromProofs } from '@/lib/skills';
import { runAgent } from '@/lib/ai/agent';
import { checkAIRateLimit } from '@/lib/rate-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface LearningPathRequest {
  targetRole?: string;
  timeframe?: '1month' | '3months' | '6months' | '1year';
  focusAreas?: string[];
}

interface LearningStep {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
  resources: { title: string; url: string; type: 'course' | 'tutorial' | 'project' | 'documentation' }[];
  prerequisites: string[];
}

interface LearningPath {
  steps: LearningStep[];
  totalEstimatedHours: number;
  timeline: string;
  milestones: string[];
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

    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (!userProfile) {
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

    const body: LearningPathRequest = await req.json();
    const { targetRole, timeframe = '3months', focusAreas = [] } = body;

    const { data: proofs } = await supabase
      .from('proof_cards')
      .select('*')
      .eq('user_id', userProfile.id)
      .is('deleted_at', null);

    const skillAnalysis = analyzeSkills(proofs || [], targetRole);
    const userSkills = extractSkillsFromProofs(proofs || []);
    const skillGaps = identifySkillGaps(userSkills, targetRole);
    const recommendations = getSkillRecommendations(skillAnalysis);

    // Get opportunities to understand market demand
    const { data: opportunities } = await supabase
      .from('opportunities')
      .select('required_skills, nice_to_have')
      .eq('is_active', true)
      .is('deleted_at', null)
      .limit(50);

    // Count skill demand across opportunities
    const skillDemand: Record<string, number> = {};
    (opportunities || []).forEach(opp => {
      const allSkills = [...(opp.required_skills || []), ...(opp.nice_to_have || [])];
      allSkills.forEach(skill => {
        skillDemand[skill] = (skillDemand[skill] || 0) + 1;
      });
    });

    // Sort skills by demand
    const topDemandSkills = Object.entries(skillDemand)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([skill]) => skill);

    const aiPrompt = `Create a personalized learning path for this user:

User Profile:
- Name: ${userProfile.full_name || userProfile.username}
- College: ${userProfile.college || 'Not specified'}
- Year: ${userProfile.year || 'Not specified'}
- Current Skills: ${userSkills.slice(0, 10).join(', ') || 'None yet'}
- Skill Gaps: ${skillGaps.slice(0, 10).join(', ') || 'None identified'}
- Target Role: ${targetRole || 'Not specified'}
- Timeframe: ${timeframe}
- Focus Areas: ${focusAreas.join(', ') || 'General improvement'}

Top Skills in Demand (from job postings):
${topDemandSkills.slice(0, 10).join(', ')}

Current Proof Count: ${proofs?.length || 0}
Verified Proofs: ${proofs?.filter(p => p.verification_status === 'verified').length || 0}

Create a learning path with:
1. Priority skills to learn (based on demand and gaps)
2. Estimated time for each skill
3. Recommended resources (free courses, tutorials, projects)
4. Milestones for each timeframe
5. Project ideas to build proofs

Provide specific, actionable steps. Focus on skills that will increase job matching scores.`;

    let aiResult = null;
    if (process.env.NVIDIA_API_KEY) {
      try {
        aiResult = await runAgent(aiPrompt, { maxIterations: 2, maxTokens: 800 });
      } catch (e) {
        console.warn('AI learning path generation failed:', e);
      }
    }

    // Generate structured learning path
    const learningPath: LearningPath = {
      steps: skillGaps.slice(0, 8).map((gap, index) => ({
        skill: gap.skill,
        priority: index < 3 ? 'high' : index < 6 ? 'medium' : 'low',
        estimatedHours: Math.floor(Math.random() * 20) + 10,
        resources: [
          { title: `Learn ${gap.skill} on freeCodeCamp`, url: 'https://freecodecamp.org', type: 'course' as const },
          { title: `${gap.skill} Documentation`, url: 'https://developer.mozilla.org', type: 'documentation' as const },
        ],
        prerequisites: index > 0 ? [skillGaps[index - 1].skill] : [],
      })),
      totalEstimatedHours: skillGaps.slice(0, 8).reduce((acc) => acc + Math.floor(Math.random() * 20) + 10, 0),
      timeline: timeframe === '1month' ? '4 weeks' : timeframe === '3months' ? '12 weeks' : timeframe === '6months' ? '24 weeks' : '52 weeks',
      milestones: [
        'Complete first skill module',
        'Build a project demonstrating new skills',
        'Add new proof to portfolio',
        'Get proof verified',
        'Apply to target opportunities',
      ],
    };

    return NextResponse.json({
      success: true,
      learningPath,
      skillAnalysis: {
        currentSkills: userSkills.slice(0, 15),
        skillGaps: skillGaps.slice(0, 10),
        recommendations: recommendations.slice(0, 5),
        topDemandSkills: topDemandSkills.slice(0, 10),
      },
      aiInsights: aiResult ? {
        answer: aiResult.answer,
        thinking: aiResult.thinking,
        tokensUsed: aiResult.totalTokens,
      } : null,
    });

  } catch (error) {
    console.error('Learning path generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
