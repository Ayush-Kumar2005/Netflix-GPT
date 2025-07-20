import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iuimwjjgzqmitiincocp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1aW13ampnenFtaXRpaW5jb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Njk1MTYsImV4cCI6MjA2ODI0NTUxNn0.vndKFbDY3-hdfAdiWssunHM_AWRAwEe2QLbRqii8A7A'; // full anon key here

export const supabase = createClient(supabaseUrl, supabaseKey);
