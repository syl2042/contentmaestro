import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection and log the result
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase auth initialization failed:', error.message);
  } else {
    console.log('✅ Supabase auth initialized:', data.session ? 'Session found' : 'No session');
  }
});

// Test database access
supabase.from('users').select('count').limit(1)
  .then(({ error }) => {
    if (error) {
      console.error('❌ Supabase database connection failed:', error.message);
    } else {
      console.log('✅ Supabase database connection successful');
    }
  });