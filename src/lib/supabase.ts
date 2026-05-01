import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bskpzodushnwbkjfdqzc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJza3B6b2R1c2hud2JramZkcXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTMzOTEsImV4cCI6MjA5MzE4OTM5MX0.xFw_EEePCCpZcdFOjIj9X09o6pNSmVt-zL6OtK2XBNg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
