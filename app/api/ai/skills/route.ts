import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeSkills, identifySkillGaps, getSkillRecommendations, extractSkillsFromProofs } from '@/lib/skills';
import { checkAIRateLimit } from '@/lib/rate-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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

    // Check rate limit
    const rateLimitResult = await checkAIRateLimit(supabase, userProfile.id, 'ai-skills');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', reason: rateLimitResult.reason, nextAllowedAt: rateLimitResult.nextAllowedAt },
        { status: 429 }
      );
    }

    const { data: proofs } = await supabase
      .from('proof_cards')
      .select('*')
      .eq('user_id', userProfile.id)
      .is('deleted_at', null);

    const { searchParams } = new URL(req.url);
    const targetRole = searchParams.get('targetRole') || undefined;

    const skillAnalysis = analyzeSkills(proofs || [], targetRole);
    const userSkills = extractSkillsFromProofs(proofs || []);
    const skillGaps = identifySkillGaps(userSkills, targetRole);
    const recommendations = getSkillRecommendations(skillAnalysis);

    return NextResponse.json({
      success: true,
      analysis: {
        topSkills: skillAnalysis.topSkills.slice(0, 15),
        totalSkills: skillAnalysis.totalSkills,
        uniqueSkills: skillAnalysis.uniqueSkills,
        skills: skillAnalysis.skills.slice(0, 20),
        skillGaps: skillGaps.slice(0, 15),
        recommendations: recommendations.slice(0, 10),
        proofCount: proofs?.length || 0,
        verifiedCount: proofs?.filter(p => p.verification_status === 'verified').length || 0,
      }
    });

  } catch (error) {
    console.error('Skills analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}