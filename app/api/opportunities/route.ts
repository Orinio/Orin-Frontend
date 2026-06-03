import { NextRequest, NextResponse } from 'next/server';
import { supabase, Database } from '@/lib/supabase';

type OpportunityInsert = Database['public']['Tables']['opportunities']['Insert'];

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const company = searchParams.get('company');
  const type = searchParams.get('type');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const offset = (page - 1) * limit;

  let query = supabase
    .from('opportunities')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .is('deleted_at', null);

  if (company) {
    query = query.ilike('company', `%${company}%`);
  }

  if (type) {
    const validTypes = ['internship', 'job', 'scholarship', 'mentorship', 'hackathon', 'research', 'other'] as const;
    if ((validTypes as readonly string[]).includes(type)) {
      query = query.eq('type', type as Database['public']['Tables']['opportunities']['Row']['type']);
    }
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%`);
  }

  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const { data: opportunities, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    opportunities,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  let body: Partial<OpportunityInsert>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { title, company, link, match_percentage, type, description, location, is_remote, required_skills } = body;

  if (!title || !company || !link) {
    return NextResponse.json({ error: 'Title, company, and link are required' }, { status: 400 });
  }

  if (type) {
    const validTypes = ['internship', 'job', 'scholarship', 'mentorship', 'hackathon', 'research', 'other'];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: `type must be one of: ${validTypes.join(', ')}` }, { status: 400 });
    }
  }

  const insertData: OpportunityInsert = {
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
