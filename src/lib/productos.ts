// src/lib/productos.ts
import { supabase } from './supabase'

// ============================================
// TIPOS
// ============================================

export interface ProductoDesobediencia {
  id: number;
  name: string;
  category: 'Manga Corta' | 'Manga Larga';
  base_price: number;
  image: string;
  description: string;
  stock: number;
  images?: string[]; // Array de imágenes
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

// ============================================
// UTILIDADES
// ============================================

/**
 * Calcula el precio final según la talla
 * Tallas XXL suman $2000 al precio base
 */
export function calcularPrecioConTalla(
  precioBase: number, 
  talla: 'S' | 'M' | 'L' | 'XL' | 'XXL'
): number {
  return talla === 'XXL' ? precioBase + 2000 : precioBase;
}

/**
 * Formatea precio a formato chileno (CLP)
 */
export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(precio);
}

/**
 * Verifica si un producto tiene stock disponible
 */
export function tieneStock(producto: ProductoDesobediencia): boolean {
  return producto.stock > 0;
}

/**
 * Obtiene el estado del stock para mostrar al usuario
 */
export function obtenerEstadoStock(stock: number): {
  disponible: boolean;
  mensaje: string;
  clase: string;
} {
  if (stock === 0) {
    return {
      disponible: false,
      mensaje: 'SIN STOCK',
      clase: 'bg-red-600 text-white'
    };
  } else if (stock <= 3) {
    return {
      disponible: true,
      mensaje: `¡Últimas ${stock} unidades!`,
      clase: 'bg-yellow-600 text-white'
    };
  } else {
    return {
      disponible: true,
      mensaje: 'Disponible',
      clase: 'bg-green-600 text-white'
    };
  }
}

// ============================================
// OPERACIONES DE BASE DE DATOS
// ============================================

/**
 * Obtener todos los productos de Desobediencia
 */
export async function getProductosDesobediencia(): Promise<ProductoDesobediencia[]> {
  const { data, error } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching productos:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtener un producto específico por ID
 */
export async function getProductoDesobedienciaById(
  id: number
): Promise<ProductoDesobediencia | null> {
  const { data, error } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching producto:', error);
    return null;
  }

  return data;
}

/**
 * Obtener productos por categoría
 */
export async function getProductosPorCategoria(
  categoria: 'Manga Corta' | 'Manga Larga'
): Promise<ProductoDesobediencia[]> {
  const { data, error } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .eq('category', categoria)
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching productos por categoría:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtener productos disponibles (con stock)
 */
export async function getProductosDisponibles(): Promise<ProductoDesobediencia[]> {
  const { data, error } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .gt('stock', 0)
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching productos disponibles:', error);
    return [];
  }

  return data || [];
}

/**
 * Agregar nuevo producto (requiere autenticación)
 */
export async function addProductoDesobediencia(
  producto: Omit<ProductoDesobediencia, 'id'>
) {
  const { data, error } = await supabase
    .from('productos_desobediencia')
    .insert([producto])
    .select();

  if (error) throw error;
  return data;
}

/**
 * Actualizar stock de un producto
 */
export async function updateStock(
  tienda: 'desobediencia' | 'fono-copete',
  id: number,
  nuevoStock: number
) {
  const tabla = tienda === 'desobediencia' 
    ? 'productos_desobediencia' 
    : 'productos_fono_copete';

  const { data, error } = await supabase
    .from(tabla)
    .update({ stock: nuevoStock })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

/**
 * Reducir stock después de una compra
 */
export async function reducirStock(
  id: number,
  cantidad: number = 1
): Promise<boolean> {
  // Primero obtenemos el producto actual
  const producto = await getProductoDesobedienciaById(id);
  
  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  if (producto.stock < cantidad) {
    throw new Error('Stock insuficiente');
  }

  const nuevoStock = producto.stock - cantidad;

  const { error } = await supabase
    .from('productos_desobediencia')
    .update({ stock: nuevoStock })
    .eq('id', id);

  if (error) {
    console.error('Error reduciendo stock:', error);
    return false;
  }

  return true;
}

// ============================================
// FONO COPETE (mantener compatibilidad)
// ============================================

export async function getProductosFonoCopete(): Promise<ProductoFonoCopete[]> {
  const { data, error } = await supabase
    .from('productos_fono_copete')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching tragos:', error);
    return [];
  }

  return data || [];
}

export async function addProductoFonoCopete(
  producto: Omit<ProductoFonoCopete, 'id'>
) {
  const { data, error } = await supabase
    .from('productos_fono_copete')
    .insert([producto])
    .select();

  if (error) throw error;
  return data;
}