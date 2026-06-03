import { createClient, SupabaseClient } from '@supabase/supabase-js';

/* ─── Database Types ─── */
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          college: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          college?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          college?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      proof_cards: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          source_type: 'github' | 'kaggle' | 'certificate' | 'project';
          source_url: string | null;
          skills_extracted: string[];
          verification_status: 'pending' | 'verified' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          source_type: 'github' | 'kaggle' | 'certificate' | 'project';
          source_url?: string | null;
          skills_extracted?: string[];
          verification_status?: 'pending' | 'verified' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          source_type?: 'github' | 'kaggle' | 'certificate' | 'project';
          source_url?: string | null;
          skills_extracted?: string[];
          verification_status?: 'pending' | 'verified' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
      };
      opportunities: {
        Row: {
          id: string;
          title: string;
          company: string;
          match_percentage: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          company: string;
          match_percentage?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          match_percentage?: number;
          created_at?: string;
        };
      };
      coach_notes: {
        Row: {
          id: string;
          user_id: string;
          note: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          note: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          note?: string;
          created_at?: string;
        };
      };
      proof_sources: {
        Row: {
          id: string;
          user_id: string;
          source_type: 'github' | 'kaggle' | 'certificate' | 'project';
          source_url: string | null;
          source_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          source_type: 'github' | 'kaggle' | 'certificate' | 'project';
          source_url?: string | null;
          source_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          source_type?: 'github' | 'kaggle' | 'certificate' | 'project';
          source_url?: string | null;
          source_name?: string | null;
          created_at?: string;
        };
      };
    };
  };
};

/* ─── Supabase Client ─── */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient<Database> | null =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;
