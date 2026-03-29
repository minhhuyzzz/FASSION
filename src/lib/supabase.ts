import { createClient } from '@supabase/supabase-js';

// Các biến môi trường này sẽ được cấu hình trong file .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials are missing. Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);