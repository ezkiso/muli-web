// src/lib/productos.ts
import { supabase } from './supabase'

// ============================================
// TIPOS
// ============================================

export interface ProductoVariante {
  id: number;
  producto_id: number;
  talla: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  stock: number;
  precio_extra: number;
}

export interface ProductoDesobediencia {
  id: number;
  name: string;
  category: 'Manga Corta' | 'Manga Larga';
  base_price: number;
  image: string;
  description: string;
  total_stock: number;
  images?: string[];
  variantes?: ProductoVariante[];
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
 * Calcula el precio final con talla
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
 * Verifica si un producto tiene stock en alguna talla
 */
export function tieneStock(producto: ProductoDesobediencia): boolean {
  return producto.total_stock > 0;
}

/**
 * Verifica si una talla específica tiene stock
 */
export function tieneStockEnTalla(
  variantes: ProductoVariante[] | undefined,
  talla: 'S' | 'M' | 'L' | 'XL' | 'XXL'
): boolean {
  if (!variantes) return false;
  const variante = variantes.find(v => v.talla === talla);
  return variante ? variante.stock > 0 : false;
}

/**
 * Obtiene el stock de una talla específica
 */
export function getStockPorTalla(
  variantes: ProductoVariante[] | undefined,
  talla: 'S' | 'M' | 'L' | 'XL' | 'XXL'
): number {
  if (!variantes) return 0;
  const variante = variantes.find(v => v.talla === talla);
  return variante ? variante.stock : 0;
}

/**
 * Obtiene el estado del stock total del producto
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
  } else if (stock <= 5) {
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

/**
 * Obtiene el estado del stock por talla
 */
export function obtenerEstadoStockTalla(
  variantes: ProductoVariante[] | undefined,
  talla: 'S' | 'M' | 'L' | 'XL' | 'XXL'
): {
  disponible: boolean;
  stock: number;
  mensaje: string;
} {
  const stock = getStockPorTalla(variantes, talla);
  
  if (stock === 0) {
    return {
      disponible: false,
      stock: 0,
      mensaje: 'Agotado'
    };
  } else if (stock <= 2) {
    return {
      disponible: true,
      stock,
      mensaje: `¡Solo ${stock}!`
    };
  } else {
    return {
      disponible: true,
      stock,
      mensaje: `${stock} disponibles`
    };
  }
}

// ============================================
// OPERACIONES DE BASE DE DATOS
// ============================================

/**
 * Obtener todos los productos con sus variantes
 */
export async function getProductosDesobediencia(): Promise<ProductoDesobediencia[]> {
  // Obtener productos
  const { data: productos, error: errorProductos } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .order('id', { ascending: true });

  if (errorProductos) {
    console.error('Error fetching productos:', errorProductos);
    return [];
  }

  if (!productos) return [];

  // Obtener variantes para todos los productos
  const { data: variantes, error: errorVariantes } = await supabase
    .from('producto_variantes')
    .select('*')
    .order('talla', { ascending: true });

  if (errorVariantes) {
    console.error('Error fetching variantes:', errorVariantes);
  }

  // Combinar productos con sus variantes
  const productosConVariantes = productos.map(producto => ({
    ...producto,
    variantes: variantes?.filter(v => v.producto_id === producto.id) || []
  }));

  return productosConVariantes;
}

/**
 * Obtener un producto específico con sus variantes
 */
export async function getProductoDesobedienciaById(
  id: number
): Promise<ProductoDesobediencia | null> {
  const { data: producto, error: errorProducto } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .eq('id', id)
    .single();

  if (errorProducto) {
    console.error('Error fetching producto:', errorProducto);
    return null;
  }

  // Obtener variantes del producto
  const { data: variantes, error: errorVariantes } = await supabase
    .from('producto_variantes')
    .select('*')
    .eq('producto_id', id)
    .order('talla', { ascending: true });

  if (errorVariantes) {
    console.error('Error fetching variantes:', errorVariantes);
  }

  return {
    ...producto,
    variantes: variantes || []
  };
}

/**
 * Obtener productos por categoría
 */
export async function getProductosPorCategoria(
  categoria: 'Manga Corta' | 'Manga Larga'
): Promise<ProductoDesobediencia[]> {
  const { data: productos, error: errorProductos } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .eq('category', categoria)
    .order('id', { ascending: true });

  if (errorProductos) {
    console.error('Error fetching productos por categoría:', errorProductos);
    return [];
  }

  if (!productos) return [];

  // Obtener variantes
  const productosIds = productos.map(p => p.id);
  const { data: variantes } = await supabase
    .from('producto_variantes')
    .select('*')
    .in('producto_id', productosIds);

  return productos.map(producto => ({
    ...producto,
    variantes: variantes?.filter(v => v.producto_id === producto.id) || []
  }));
}

/**
 * Obtener productos disponibles (con stock)
 */
export async function getProductosDisponibles(): Promise<ProductoDesobediencia[]> {
  const { data: productos, error } = await supabase
    .from('productos_desobediencia')
    .select('*')
    .gt('total_stock', 0)
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching productos disponibles:', error);
    return [];
  }

  return productos || [];
}

/**
 * Actualizar stock de una talla específica
 */
export async function updateStockTalla(
  productoId: number,
  talla: 'S' | 'M' | 'L' | 'XL' | 'XXL',
  nuevoStock: number
): Promise<boolean> {
  const { error } = await supabase
    .from('producto_variantes')
    .update({ stock: nuevoStock })
    .eq('producto_id', productoId)
    .eq('talla', talla);

  if (error) {
    console.error('Error actualizando stock:', error);
    return false;
  }

  return true;
}

/**
 * Reducir stock después de una compra
 */
export async function reducirStockTalla(
  productoId: number,
  talla: 'S' | 'M' | 'L' | 'XL' | 'XXL',
  cantidad: number = 1
): Promise<boolean> {
  // Obtener stock actual
  const { data: variante, error: errorGet } = await supabase
    .from('producto_variantes')
    .select('stock')
    .eq('producto_id', productoId)
    .eq('talla', talla)
    .single();

  if (errorGet || !variante) {
    console.error('Error obteniendo variante:', errorGet);
    return false;
  }

  if (variante.stock < cantidad) {
    console.error('Stock insuficiente');
    return false;
  }

  const nuevoStock = variante.stock - cantidad;

  const { error: errorUpdate } = await supabase
    .from('producto_variantes')
    .update({ stock: nuevoStock })
    .eq('producto_id', productoId)
    .eq('talla', talla);

  if (errorUpdate) {
    console.error('Error reduciendo stock:', errorUpdate);
    return false;
  }

  return true;
}

/**
 * Agregar nuevo producto con sus variantes
 */
export async function addProductoConVariantes(
  producto: Omit<ProductoDesobediencia, 'id' | 'total_stock'>,
  variantes: Omit<ProductoVariante, 'id' | 'producto_id'>[]
) {
  // Insertar producto
  const { data: nuevoProducto, error: errorProducto } = await supabase
    .from('productos_desobediencia')
    .insert([producto])
    .select()
    .single();

  if (errorProducto) throw errorProducto;

  // Insertar variantes
  const variantesConProductoId = variantes.map(v => ({
    ...v,
    producto_id: nuevoProducto.id
  }));

  const { error: errorVariantes } = await supabase
    .from('producto_variantes')
    .insert(variantesConProductoId);

  if (errorVariantes) throw errorVariantes;

  return nuevoProducto;
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