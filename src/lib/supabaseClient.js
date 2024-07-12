import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qlvxgvjxuaxjelyqjvmk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsdnhndmp4dWF4amVseXFqdm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzOTU2MTMsImV4cCI6MjAyODk3MTYxM30.MY2xUrRjxp9D3Wfm-TCBzp3M9ksMynGSi0rA9Bedt1Y"
);
