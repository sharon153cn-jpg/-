import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bskpzodushnwbkjfdqzc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJza3B6b2R1c2hud2JramZkcXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwOTI0NzAsImV4cCI6MjAyNjY2ODQ3MH0.sb_publishable_L3OlUgSxSiQAyrs3MnrEAQ_X2qSAigc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
