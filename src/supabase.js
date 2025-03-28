import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hvouadgqbetinfufxeog.supabase.co";  
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2b3VhZGdxYmV0aW5mdWZ4ZW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMzcxMDQsImV4cCI6MjA1ODcxMzEwNH0.etiyBxN_26JfmWcujXRYSSLWpHXMKubKvG__6Dx2-vM"

export const supabase = createClient(supabaseUrl, supabaseKey);
