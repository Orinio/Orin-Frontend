import { NextRequest, NextResponse } from 'next/server';
import { supabase, Database } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { username } = await params;

  if (!username) {
    return NextResponse.json({ error: 'username is required' }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_public_profiles')
    .select('*')
    .or(`username.eq.${username},id.eq.${username}`)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  if (!profile) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    user: profile,
    proofs: profile.public_proofs || [],
    skills: profile.public_skills || [],
  });
}
