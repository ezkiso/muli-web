// src/lib/supabase-desobediencia.ts
// Cliente de Supabase específico para Desobediencia (BD separada)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DESOBEDIENCIA_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_DESOBEDIENCIA_ANON_KEY!

export const supabaseDesobediencia = createClient(supabaseUrl, supabaseAnonKey)
