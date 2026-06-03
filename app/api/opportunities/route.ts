import { NextRequest, NextResponse } from 'next/server';
import { supabase, Database } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const company = searchParams.get('company');

  let query = supabase.from('opportunities').select('*');

  if (company) {
    query = query.ilike('company', `%${company}%`);
  }

  const { data: opportunities, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ opportunities });
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const body = await request.json();
  const { title, company, link, match_percentage, type, description, location, is_remote, required_skills } = body;

  if (!title || !company || !link) {
    return NextResponse.json({ error: 'Title, company, and link are required' }, { status: 400 });
  }

  const insertData: Database['public']['Tables']['opportunities']['Insert'] = {
    title,
    company,
    link,
    match_percentage: match_percentage || 0,
    type: type || 'internship',
    description: description || null,
    location: location || null,
    is_remote: is_remote || false,
    required_skills: required_skills || [],
  };

  const { data: opportunity, error } = await supabase
    .from('opportunities')
    .insert([insertData])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ opportunity }, { status: 201 });
}
