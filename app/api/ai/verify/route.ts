import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { runAgent, verifyProof, analyzeProofQuality, extractSkillsFromText, checkUrlSafety, analyzeGitHubProfile } from '@/lib/ai/agent';
import { checkAIRateLimit } from '@/lib/rate-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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
    const rateLimitResult = await checkAIRateLimit(supabase, userProfile.id, 'ai-verify');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', reason: rateLimitResult.reason, nextAllowedAt: rateLimitResult.nextAllowedAt },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { action, proofId, proofUrl, sourceType, proofData, text, username, url, query } = body;

    let result;

    switch (action) {
      case 'verify':
        if (!proofUrl || !sourceType) {
          return NextResponse.json({ error: 'proofUrl and sourceType required' }, { status: 400 });
        }

        const { data: proof } = await supabase
          .from('proof_cards')
          .select('*')
          .eq('id', proofId)
          .eq('user_id', userProfile.id)
          .single();

        if (!proof) {
          return NextResponse.json({ error: 'Proof not found' }, { status: 404 });
        }

        result = await verifyProof(proofUrl, sourceType);

        const verified = result.toolCalls.some(tc => tc.result.success && tc.result.data?.exists === true);

        await supabase
          .from('proof_cards')
          .update({
            verification_status: verified ? 'verified' : 'rejected',
            verified_at: verified ? new Date().toISOString() : null,
            metadata: {
              ...proof.metadata,
              verification: {
                verified,
                timestamp: new Date().toISOString(),
                toolCalls: result.toolCalls.length,
                agentReasoning: result.thinking
              }
            }
          })
          .eq('id', proofId);

        return NextResponse.json({
          success: true,
          action: 'verify',
          result: {
            verified,
            thinking: result.thinking,
            toolCalls: result.toolCalls.map(tc => ({
              tool: tc.tool,
              args: tc.args,
              success: tc.result.success,
              data: tc.result.data
            })),
            answer: result.answer,
            iterations: result.iterations,
            tokensUsed: result.totalTokens
          }
        });

      case 'analyze':
        if (!proofData) {
          return NextResponse.json({ error: 'proofData required' }, { status: 400 });
        }
        result = await analyzeProofQuality(proofData);
        return NextResponse.json({
          success: true,
          action: 'analyze',
          result: {
            thinking: result.thinking,
            answer: result.answer,
            toolCalls: result.toolCalls.map(tc => ({ tool: tc.tool, success: tc.result.success })),
            iterations: result.iterations,
            tokensUsed: result.totalTokens
          }
        });

      case 'extract_skills':
        if (!text) {
          return NextResponse.json({ error: 'text required' }, { status: 400 });
        }
        result = await extractSkillsFromText(text);
        return NextResponse.json({
          success: true,
          action: 'extract_skills',
          result: {
            thinking: result.thinking,
            answer: result.answer,
            toolCalls: result.toolCalls.map(tc => ({ tool: tc.tool, success: tc.result.success, data: tc.result.data })),
            iterations: result.iterations,
            tokensUsed: result.totalTokens
          }
        });

      case 'check_safety':
        if (!url) {
          return NextResponse.json({ error: 'url required' }, { status: 400 });
        }
        result = await checkUrlSafety(url);
        return NextResponse.json({
          success: true,
          action: 'check_safety',
          result: {
            thinking: result.thinking,
            answer: result.answer,
            toolCalls: result.toolCalls.map(tc => ({ tool: tc.tool, success: tc.result.success, data: tc.result.data })),
            iterations: result.iterations,
            tokensUsed: result.totalTokens
          }
        });

      case 'analyze_github':
        if (!username) {
          return NextResponse.json({ error: 'username required' }, { status: 400 });
        }
        result = await analyzeGitHubProfile(username);
        return NextResponse.json({
          success: true,
          action: 'analyze_github',
          result: {
            thinking: result.thinking,
            answer: result.answer,
            toolCalls: result.toolCalls.map(tc => ({ tool: tc.tool, success: tc.result.success, data: tc.result.data })),
            iterations: result.iterations,
            tokensUsed: result.totalTokens
          }
        });

      case 'custom':
        if (!query) {
          return NextResponse.json({ error: 'query required' }, { status: 400 });
        }
        result = await runAgent(query);
        return NextResponse.json({
          success: true,
          action: 'custom',
          result: {
            thinking: result.thinking,
            answer: result.answer,
            toolCalls: result.toolCalls.map(tc => ({ tool: tc.tool, success: tc.result.success, data: tc.result.data })),
            iterations: result.iterations,
            tokensUsed: result.totalTokens
          }
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('AI agent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
