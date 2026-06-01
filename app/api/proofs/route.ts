import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const { data: proofs, error } = await supabase
    .from('proof_cards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ proofs });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { user_id, title, description, source_type, source_url, skills_extracted } = body;

  if (!user_id || !title || !source_type) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: proof, error } = await supabase
    .from('proof_cards')
    .insert({
      user_id,
      title,
      description,
      source_type,
      source_url,
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