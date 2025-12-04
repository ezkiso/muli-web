// src/lib/productos.ts
import { supabase } from './supabase'

// Tipos
export interface ProductoDesobediencia {
  id: number;
  name: string;
  category: 'Manga Corta' | 'Manga Larga';
  base_price: number;
  image: string;
  description: string;
  stock: number;
  rating: number;
}

export interface ProductoFonoCopete {
  id: number;
  slug: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  priority?: boolean;
}

// Obtener productos de Desobediencia
export async function getProductosDesobediencia(): Promise<ProductoDesobediencia[]> {
  const { data, error } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching productos:', error)
    return []
  }

  return data || []
}

// Obtener productos de Fono Copete
export async function getProductosFonoCopete(): Promise<ProductoFonoCopete[]> {
  const { data, error } = await supabase
    .from('productos_fono_copete')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching tragos:', error)
    return []
  }

  return data || []
}

// Agregar producto nuevo (Desobediencia)
export async function addProductoDesobediencia(producto: Omit<ProductoDesobediencia, 'id'>) {
  const { data, error } = await supabase
    .from('productos_desobediencia')
    .insert([producto])
    .select()

  if (error) throw error
  return data
}

// Agregar producto nuevo (Fono Copete)
export async function addProductoFonoCopete(producto: Omit<ProductoFonoCopete, 'id'>) {
  const { data, error } = await supabase
    .from('productos_fono_copete')
    .insert([producto])
    .select()

  if (error) throw error
  return data
}

// Actualizar stock
export async function updateStock(tienda: 'desobediencia' | 'fono-copete', id: number, nuevoStock: number) {
    const tabla = tienda === 'desobediencia' ? 'productos_desobediencia' : 'productos_fono_copete'
    
    const { data, error } = await supabase
        .from(tabla)
        .update({ stock: nuevoStock })
        .eq('id', id)
        .select()

    if (error) throw error
    return data
}