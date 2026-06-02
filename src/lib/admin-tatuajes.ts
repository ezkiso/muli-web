// src/lib/admin-tatuajes.ts
import { getSupabaseNicolapso } from './supabase-nicolapso'
import { TattooWork } from './tatuajes.types'

export interface TattooUnificado extends Omit<TattooWork, 'id'> {
  id?: number
  id_text?: string
  store_id: string
  created_at?: string
  updated_at?: string
}

// ——— Leer tatuajes de una tienda ———
export async function getTatuajesStore(storeId: string): Promise<TattooUnificado[]> {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) return []
  const { data, error } = await supabaseNicolapso
    .from('tatuajes')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// ——— Crear tatuaje ———
export async function createTatuaje(
  tatuaje: Omit<TattooUnificado, 'id' | 'created_at' | 'updated_at'>
): Promise<TattooUnificado> {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) throw new Error('Supabase Nicolapso no configurado')
  const { data, error } = await supabaseNicolapso
    .from('tatuajes')
    .insert([tatuaje])
    .select()
    .single()

  if (error) throw error
  return data
}

// ——— Actualizar tatuaje ———
export async function updateTatuaje(
  id: number,
  tatuaje: Partial<TattooUnificado>
): Promise<TattooUnificado> {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) throw new Error('Supabase Nicolapso no configurado')
  const { data, error } = await supabaseNicolapso
    .from('tatuajes')
    .update({ ...tatuaje, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// ——— Eliminar tatuaje ———
export async function deleteTatuaje(id: number): Promise<void> {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) throw new Error('Supabase Nicolapso no configurado')
  const { error } = await supabaseNicolapso.from('tatuajes').delete().eq('id', id)
  if (error) throw error
}

// ——— Activar / desactivar tatuaje ———
export async function toggleTatuajeActivo(id: number, available: boolean): Promise<void> {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) throw new Error('Supabase Nicolapso no configurado')
  const { error } = await supabaseNicolapso
    .from('tatuajes')
    .update({ available })
    .eq('id', id)
  if (error) throw error
}

// ——— Subir imagen al bucket ———
export async function uploadTatuajeImagen(file: File, storeId: string): Promise<string> {
  const supabaseNicolapso = getSupabaseNicolapso()
  if (!supabaseNicolapso) throw new Error('Supabase Nicolapso no configurado')
  const ext = file.name.split('.').pop()
  const path = `${storeId}/tatuajes/${Date.now()}.${ext}`

  const { error } = await supabaseNicolapso.storage
    .from('product-images')
    .upload(path, file, { upsert: true })

  if (error) throw error

  const { data } = supabaseNicolapso.storage.from('product-images').getPublicUrl(path)
  return data.publicUrl
}
