// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tjmienmwvjcbzpdohcep.supabase.co"
const supabaseAnonKey = "sb_publishable_fKzzUNBPaN-Lgq9hNcHkZQ_UTNoWn5w"

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 