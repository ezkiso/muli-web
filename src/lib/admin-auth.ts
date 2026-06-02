// src/lib/admin-auth.ts
import { supabase } from './supabase'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getOwnedStores(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('store_owners')
    .select('store_id')
    .eq('user_id', userId)

  if (error || !data) return []
  return data.map((d: { store_id: string }) => d.store_id)
}

export async function addStoreOwner(userId: string, storeId: string) {
  const { data, error } = await supabase
    .from('store_owners')
    .insert({ user_id: userId, store_id: storeId })

  if (error) throw error
  return data
}