// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://macfjrgvhckwdwlirjas.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hY2Zqcmd2aGNrd2R3bGlyamFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNjg4NDcsImV4cCI6MjA1OTg0NDg0N30.TNLujxS3643rsy1u4DN_9azRm4iVV3lvIgPxcBioH4w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);