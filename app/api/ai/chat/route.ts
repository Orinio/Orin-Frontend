import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeSkills, identifySkillGaps, extractSkillsFromProofs } from '@/lib/skills';
import { runAgent } from '@/lib/ai/agent';
import { checkAIRateLimit } from '@/lib/rate-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
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
    const rateLimitResult = await checkAIRateLimit(supabase, userProfile.id, 'ai-chat');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', reason: rateLimitResult.reason, nextAllowedAt: rateLimitResult.nextAllowedAt },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const { data: proofs } = await supabase
      .from('proof_cards')
      .select('*')
      .eq('user_id', userProfile.id)
      .is('deleted_at', null);

    const skillAnalysis = analyzeSkills(proofs || []);
    const userSkills = extractSkillsFromProofs(proofs || []);
    const skillGaps = identifySkillGaps(userSkills);

    const verifiedCount = (proofs || []).filter(p => p.verification_status === 'verified').length;
    const topSkills = skillAnalysis.topSkills.slice(0, 5).map(s => s.name).join(', ');
    const topGaps = skillGaps.slice(0, 5).join(', ');

    const profileContext = `
User Profile:
- Name: ${userProfile.full_name || userProfile.username}
- College: ${userProfile.college || 'Not specified'}
- Year: ${userProfile.year || 'Not specified'}
- Bio: ${userProfile.bio || 'Not specified'}

Portfolio:
- Total proofs: ${proofs?.length || 0}
- Verified proofs: ${verifiedCount}
- Top skills: ${topSkills || 'None yet'}
- Skill gaps: ${topGaps || 'None identified'}

Available tools you can use:
- verify_github_repo: Check if a GitHub repo exists
- verify_github_user: Check GitHub user info
- verify_certificate: Verify certificate URLs
- verify_kaggle: Check Kaggle notebooks/datasets
- extract_skills: Extract skills from text
- analyze_portfolio: Analyze proof portfolio
- check_url_safety: Check URL safety
- web_search: Search the web (if configured)
- fetch_webpage: Fetch webpage content

You are Orin AI Assistant, a helpful career advisor for students and early-career developers.
You have access to the user's portfolio data and can help with:
1. Career advice and planning
2. Skill gap analysis and learning recommendations
3. Resume/portfolio improvement tips
4. Job search strategies
5. Interview preparation
6. GitHub project ideas
7. Certifications to pursue
8. Networking advice

Be concise, specific, and actionable. Reference the user's actual skills and proofs when giving advice.
Always be encouraging but honest. Focus on practical, actionable steps.`;

    const conversationHistory = history.slice(-6).map((m: ChatMessage) => ({
      role: m.role,
      content: m.content
    }));

    const agent = await runAgent(
      `Context: ${profileContext}\n\nConversation history:\n${conversationHistory.map((m: any) => `${m.role}: ${m.content}`).join('\n')}\n\nUser: ${message}`,
      { maxIterations: 3, maxTokens: 600 }
    );

    return NextResponse.json({
      success: true,
      response: {
        content: agent.answer || 'I apologize, but I was unable to generate a response. Please try again.',
        thinking: agent.thinking,
        tokensUsed: agent.totalTokens,
        iterations: agent.iterations,
      }
    });

  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}