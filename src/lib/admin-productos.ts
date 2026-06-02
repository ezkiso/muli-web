// src/lib/admin-productos.ts
import { supabaseDesobediencia } from './supabase-desobediencia'

export interface ProductoUnificado {
  id?: number
  store_id: string
  name: string
  category: string
  base_price: number
  image: string
  images?: string[]
  description: string
  total_stock?: number
  active?: boolean
}

export interface VarianteUnificada {
  id?: number
  producto_id?: number
  talla: string
  stock: number
  precio_extra?: number
}

// ——— Leer productos de una tienda (con variantes) ———
export async function getProductosStore(storeId: string): Promise<(ProductoUnificado & { variantes: VarianteUnificada[] })[]> {
  const { data: productos, error } = await supabaseDesobediencia
    .from('productos')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  if (error) throw error

  const ids = (productos || []).map((p: ProductoUnificado) => p.id)
  if (ids.length === 0) return []

  const { data: variantes } = await supabaseDesobediencia
    .from('producto_variantes_gen')
    .select('*')
    .in('producto_id', ids)

  return (productos || []).map((p: ProductoUnificado) => ({
    ...p,
    variantes: (variantes || []).filter((v: VarianteUnificada) => v.producto_id === p.id)
  }))
}

// ——— Crear producto con variantes ———
export async function createProducto(
  producto: Omit<ProductoUnificado, 'id'>,
  variantes: Omit<VarianteUnificada, 'id' | 'producto_id'>[]
): Promise<ProductoUnificado> {
  const total_stock = variantes.reduce((sum, v) => sum + (v.stock || 0), 0)

  const { data: nuevo, error } = await supabaseDesobediencia
    .from('productos')
    .insert([{ ...producto, total_stock }])
    .select()
    .single()

  if (error) throw error

  if (variantes.length > 0) {
    const { error: varError } = await supabaseDesobediencia
      .from('producto_variantes_gen')
      .insert(variantes.map(v => ({ ...v, producto_id: nuevo.id })))

    if (varError) throw varError
  }

  return nuevo
}

// ——— Actualizar producto y sus variantes ———
export async function updateProducto(
  id: number,
  producto: Partial<ProductoUnificado>,
  variantes: VarianteUnificada[]
): Promise<ProductoUnificado> {
  const total_stock = variantes.reduce((sum, v) => sum + (v.stock || 0), 0)

  const { data, error } = await supabaseDesobediencia
    .from('productos')
    .update({ ...producto, total_stock, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  // Reemplazar variantes completas
  await supabaseDesobediencia.from('producto_variantes_gen').delete().eq('producto_id', id)

  if (variantes.length > 0) {
    const { error: varError } = await supabaseDesobediencia
      .from('producto_variantes_gen')
      .insert(variantes.map(v => ({ talla: v.talla, stock: v.stock, precio_extra: v.precio_extra || 0, producto_id: id })))

    if (varError) throw varError
  }

  return data
}

// ——— Eliminar producto ———
export async function deleteProducto(id: number): Promise<void> {
  const { error } = await supabaseDesobediencia.from('productos').delete().eq('id', id)
  if (error) throw error
}

// ——— Activar / desactivar producto ———
export async function toggleProductoActivo(id: number, active: boolean): Promise<void> {
  const { error } = await supabaseDesobediencia
    .from('productos')
    .update({ active })
    .eq('id', id)
  if (error) throw error
}

// ——— Subir imagen al bucket ———
export async function uploadImagen(file: File, storeId: string): Promise<string> {
  const ext = file.name.split('.').pop()
  const path = `${storeId}/${Date.now()}.${ext}`

  const { error } = await supabaseDesobediencia.storage
    .from('product-images')
    .upload(path, file, { upsert: true })

  if (error) throw error

  const { data } = supabaseDesobediencia.storage.from('product-images').getPublicUrl(path)
  return data.publicUrl
}