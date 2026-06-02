// src/lib/admin-auth-nicolapso.ts
// Funciones específicas para Nicolapso: Auth global + BD específica para permisos
import { getSupabase } from './supabase'
import { getSupabaseNicolapso } from './supabase-nicolapso'

// Auth usa Supabase GLOBAL (sesión es global)
export async function signInNicolapso(email: string, password: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase no configurado')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOutNicolapso() {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase no configurado')
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSessionNicolapso() {
  const supabase = getSupabase()
  if (!supabase) return null
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getCurrentUserNicolapso() {
  const supabase = getSupabase()
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Permisos usan BD ESPECÍFICA de nicolapso
export async function getOwnedStoresNicolapso(userId: string): Promise<string[]> {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) return []
  const { data, error } = await supabaseNicolapso
    .from('store_owners')
    .select('store_id')
    .eq('user_id', userId)

  if (error || !data) return []
  return data.map((d: { store_id: string }) => d.store_id)
}

export async function addStoreOwnerNicolapso(userId: string, storeId: string) {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) throw new Error('Supabase Nicolapso no configurado')
  const { data, error } = await supabaseNicolapso
    .from('store_owners')
    .insert({ user_id: userId, store_id: storeId })

  if (error) throw error
  return data
}
