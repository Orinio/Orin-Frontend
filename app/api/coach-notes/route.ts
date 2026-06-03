import { NextRequest, NextResponse } from 'next/server';
import { supabase, Database } from '@/lib/supabase';

type CoachNoteInsert = Database['public']['Tables']['coach_notes']['Insert'];

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: coachNotes, error } = await supabase
    .from('coach_notes')
    .select('*')
    .eq('user_id', session.user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ coachNotes });
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<CoachNoteInsert>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { type, content, action_label, action_url, priority, expires_at } = body;

  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  if (type) {
    const validTypes = ['daily', 'weekly', 'milestone', 'ad_hoc'];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: `type must be one of: ${validTypes.join(', ')}` }, { status: 400 });
    }
  }

  const insertData: CoachNoteInsert = {
    user_id: session.user.id,
    type: type || 'ad_hoc',
    content,
    action_label: action_label || null,
    action_url: action_url || null,
    priority: priority || 0,
    expires_at: expires_at || null,
  };

  const { data: coachNote, error } = await supabase
    .from('coach_notes')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ coachNote }, { status: 201 });
}
