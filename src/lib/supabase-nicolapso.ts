// src/lib/supabase-nicolapso.ts
// Cliente de Supabase específico para Nicolapso (BD separada)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_NICOLAPSO_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_NICOLAPSO_ANON_KEY!

export const supabaseNicolapso = createClient(supabaseUrl, supabaseAnonKey)
