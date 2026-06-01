import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { username } = await params;

  if (!username) {
    return NextResponse.json({ error: 'username is required' }, { status: 400 });
  }

  // Find the user by email or id matching username
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('*')
    .or(`email.eq.${username},id.eq.${username}`)
    .single();

  if (userError || !users) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Fetch proof cards for this user
  const { data: proofs, error: proofsError } = await supabase
    .from('proof_cards')
    .select('*')
    .eq('user_id', users.id)
    .order('created_at', { ascending: false });

  // Fetch unique skills
  const { data: skills } = await supabase
    .from('proof_cards')
    .select('skills_extracted')
    .eq('user_id', users.id);

  const allSkills = skills?.flatMap(s => s.skills_extracted || []).filter((v, i, a) => a.indexOf(v) === i) || [];

  if (proofsError) {
    return NextResponse.json({ error: proofsError.message }, { status: 500 });
  }

  return NextResponse.json({
    user: users,
    proofs: proofs || [],
    skills: allSkills,
  });
}