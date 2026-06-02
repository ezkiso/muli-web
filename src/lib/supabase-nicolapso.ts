// src/lib/supabase-nicolapso.ts
// Cliente de Supabase específico para Nicolapso (BD separada)
import { createClient } from '@supabase/supabase-js'

let supabaseNicolapsoClient: any = null

export function getSupabaseNicolapso() {
  if (supabaseNicolapsoClient) return supabaseNicolapsoClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_NICOLAPSO_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_NICOLAPSO_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) return null

  supabaseNicolapsoClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseNicolapsoClient
}
