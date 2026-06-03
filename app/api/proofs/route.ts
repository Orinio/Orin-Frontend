import { NextRequest, NextResponse } from 'next/server';
import { supabase, Database } from '@/lib/supabase';

type ProofInsert = Database['public']['Tables']['proof_cards']['Insert'];

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const userIdParam = searchParams.get('userId');

  let userId: string;

  if (userIdParam) {
    userId = userIdParam;
  } else {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    userId = session.user.id;
  }

  const { data: proofs, error } = await supabase
    .from('proof_cards')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ proofs });
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<ProofInsert>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { title, description, source_type, source_url, skills_extracted } = body;

  if (!title || !source_type) {
    return NextResponse.json({ error: 'Title and source_type are required' }, { status: 400 });
  }

  const validSourceTypes = ['github', 'kaggle', 'certificate', 'hackathon', 'project', 'blog', 'demo', 'other'];
  if (!validSourceTypes.includes(source_type)) {
    return NextResponse.json({ error: `source_type must be one of: ${validSourceTypes.join(', ')}` }, { status: 400 });
  }

  const { data: proof, error } = await supabase
    .from('proof_cards')
    .insert({
      user_id: session.user.id,
      title,
      description: description || null,
      source_type,
      source_url: source_url || null,
      skills_extracted: skills_extracted || [],
      verification_status: 'pending',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ proof }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const proofId = searchParams.get('id');

  if (!proofId) {
    return NextResponse.json({ error: 'Proof ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('proof_cards')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', proofId)
    .eq('user_id', session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
