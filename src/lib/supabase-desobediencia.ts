// src/lib/supabase-desobediencia.ts
// Cliente de Supabase específico para Desobediencia (BD separada)
import { createClient } from '@supabase/supabase-js'

let supabaseDesobedienciaClient: any = null

export function getSupabaseDesobediencia() {
  if (supabaseDesobedienciaClient) return supabaseDesobedienciaClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DESOBEDIENCIA_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_DESOBEDIENCIA_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) return null

  supabaseDesobedienciaClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseDesobedienciaClient
}
