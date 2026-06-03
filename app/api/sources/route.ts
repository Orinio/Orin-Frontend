import { NextRequest, NextResponse } from 'next/server';
import { supabase, Database } from '@/lib/supabase';

type SourceInsert = Database['public']['Tables']['proof_sources']['Insert'];

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

  const { data: sources, error } = await supabase
    .from('proof_sources')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sources });
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<SourceInsert>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { source_type, source_url, source_name } = body;

  if (!source_type) {
    return NextResponse.json({ error: 'source_type is required' }, { status: 400 });
  }

  const validSourceTypes = ['github', 'kaggle', 'certificate', 'hackathon', 'project', 'blog', 'demo', 'other'];
  if (!validSourceTypes.includes(source_type)) {
    return NextResponse.json({ error: `source_type must be one of: ${validSourceTypes.join(', ')}` }, { status: 400 });
  }

  const { data: source, error } = await supabase
    .from('proof_sources')
    .insert({
      user_id: session.user.id,
      source_type,
      source_url: source_url || null,
      source_name: source_name || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ source }, { status: 201 });
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
  const sourceId = searchParams.get('id');

  if (!sourceId) {
    return NextResponse.json({ error: 'Source ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('proof_sources')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', sourceId)
    .eq('user_id', session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
