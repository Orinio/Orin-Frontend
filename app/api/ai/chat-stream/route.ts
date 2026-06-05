import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeSkills, identifySkillGaps, extractSkillsFromProofs } from '@/lib/skills';
import { checkAIRateLimit } from '@/lib/rate-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const nvidiaApiKey = process.env.NVIDIA_API_KEY!;
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const NIM_MODEL = 'meta/llama-3.1-8b-instruct';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (!userProfile) {
      return new Response(JSON.stringify({ error: 'User profile not found' }), { status: 404 });
    }

    // Check rate limit
    const rateLimitResult = await checkAIRateLimit(supabase, userProfile.id, 'ai-chat');
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded', reason: rateLimitResult.reason }),
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
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

    const messages = [
      { role: 'system', content: profileContext },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Check if streaming is requested
    const acceptHeader = req.headers.get('Accept');
    const wantsStreaming = acceptHeader?.includes('text/event-stream');

    if (!nvidiaApiKey) {
      // Fallback non-streaming response
      return new Response(JSON.stringify({
        success: true,
        response: {
          content: "I'm sorry, but the AI service is not configured. Please try again later.",
          thinking: '',
          tokensUsed: 0,
        }
      }));
    }

    if (wantsStreaming) {
      // Streaming response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const nvidiaResponse = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${nvidiaApiKey}`,
              },
              body: JSON.stringify({
                model: NIM_MODEL,
                messages,
                temperature: 0.7,
                max_tokens: 600,
                stream: true,
              }),
            });

            if (!nvidiaResponse.ok) {
              const errorData = await nvidiaResponse.text();
              console.error('NVIDIA NIM API error:', errorData);
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Failed to generate response' })}\n\n`));
              controller.close();
              return;
            }

            const reader = nvidiaResponse.body?.getReader();
            if (!reader) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'No response stream' })}\n\n`));
              controller.close();
              return;
            }

            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6).trim();
                  if (data === '[DONE]') {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                  } else {
                    try {
                      const parsed = JSON.parse(data);
                      const content = parsed.choices?.[0]?.delta?.content;
                      if (content) {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                      }
                    } catch (e) {
                      // Skip invalid JSON
                    }
                  }
                }
              }
            }

            controller.close();
          } catch (error) {
            console.error('Streaming error:', error);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`));
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response
      const nvidiaResponse = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${nvidiaApiKey}`,
        },
        body: JSON.stringify({
          model: NIM_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 600,
        }),
      });

      if (!nvidiaResponse.ok) {
        const errorData = await nvidiaResponse.text();
        console.error('NVIDIA NIM API error:', errorData);
        return new Response(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });
      }

      const nvidiaData = await nvidiaResponse.json();
      const aiContent = nvidiaData.choices[0]?.message?.content;

      if (!aiContent) {
        return new Response(JSON.stringify({ error: 'Empty response from NVIDIA NIM' }), { status: 500 });
      }

      return new Response(JSON.stringify({
        success: true,
        response: {
          content: aiContent,
          thinking: '',
          tokensUsed: nvidiaData.usage?.total_tokens || 0,
        }
      }));
    }

  } catch (error) {
    console.error('AI chat error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
