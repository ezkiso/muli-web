'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getProductosStore, deleteProducto, toggleProductoActivo, ProductoUnificado, VarianteUnificada } from '@/lib/admin-productos'
import { getCurrentUser, signOut, getOwnedStores } from '@/lib/admin-auth'
import { getStoreConfig } from '@/lib/stores-config'
import ProductoForm from '@/components/admin/ProductoForm'
import { Eye, EyeOff, Edit, Trash2, Plus, LogOut, Loader2, ArrowLeft } from 'lucide-react'

const STORE_ID = 'contruhazard'

type Producto = ProductoUnificado & { variantes: VarianteUnificada[] } & { id: number; active: boolean }

export default function ContruhazardAdminPage() {
  const router = useRouter()
  const storeConfig = getStoreConfig(STORE_ID as any)

  const [loading, setLoading] = useState(true)
  const [productos, setProductos] = useState<Producto[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  async function checkAuthAndLoadData() {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/admin/login')
        return
      }

      const ownedStores = await getOwnedStores(user.id)
      if (!ownedStores.includes(STORE_ID)) {
        router.push('/admin/login')
        return
      }

      await loadProductos()
    } catch (err) {
      console.error('Error en autenticación:', err)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  async function loadProductos() {
    try {
      const data = await getProductosStore(STORE_ID)
      setProductos(data.filter(p => p.id !== undefined) as Producto[])
    } catch (err: any) {
      setError('Error cargando productos')
      console.error(err)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await deleteProducto(id)
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError('Error al eliminar')
    }
  }

  async function handleToggleActive(id: number, active: boolean) {
    try {
      await toggleProductoActivo(id, !active)
      setProductos(prev =>
        prev.map(p => p.id === id ? { ...p, active: !active } : p)
      )
    } catch (err) {
      setError('Error actualizando estado')
    }
  }

  async function handleLogout() {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (err) {
      console.error('Error en logout:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  const totalProductos = productos.length
  const productosActivos = productos.filter(p => p.active).length
  const sinStock = productos.filter(p => (p.total_stock ?? 0) === 0).length

  const primaryColor = storeConfig?.primaryColor || '#ffffff'

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/stores/contruhazard">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Admin - {storeConfig?.name}</h1>
              <p className="text-gray-400 text-sm mt-1">Gestión de productos</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Productos</p>
            <p className="text-2xl font-bold mt-2">{totalProductos}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Activos</p>
            <p className="text-2xl font-bold text-green-400 mt-2">{productosActivos}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Sin Stock</p>
            <p className="text-2xl font-bold text-red-400 mt-2">{sinStock}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Botón Nuevo */}
        <button
          onClick={() => {
            setSelectedProducto(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition mb-6"
          style={{ backgroundColor: primaryColor, color: '#000' }}
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </button>
      </div>

      {/* Tabla de Productos */}
      <div className="max-w-7xl mx-auto">
        {productos.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No hay productos aún</p>
          </div>
        ) : (
          <div className="hidden md:block">
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Imagen</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Categoría</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Precio</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                          {prod.image && (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{prod.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{prod.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        ${prod.base_price.toLocaleString('es-CL')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={(prod.total_stock ?? 0) > 0 ? 'text-green-400' : 'text-red-400'}>
                          {prod.total_stock ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={prod.active ? 'text-green-400' : 'text-gray-500'}>
                          {prod.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleActive(prod.id, prod.active)}
                            className="p-2 hover:bg-gray-700 rounded transition text-gray-400 hover:text-white"
                            title={prod.active ? 'Desactivar' : 'Activar'}
                          >
                            {prod.active ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProducto(prod)
                              setShowForm(true)
                            }}
                            className="p-2 hover:bg-gray-700 rounded transition text-gray-400 hover:text-white"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="p-2 hover:bg-red-900/30 rounded transition text-gray-400 hover:text-red-400"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vista Mobile */}
        <div className="md:hidden space-y-4">
          {productos.map((prod) => (
            <div key={prod.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-semibold mb-2">{prod.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <p className="text-gray-400">Categoría: {prod.category}</p>
                <p className="text-gray-400">Precio: ${prod.base_price.toLocaleString('es-CL')}</p>
                <p className="text-gray-400">Stock: {prod.total_stock ?? 0}</p>
                <p className="text-gray-400">Estado: {prod.active ? 'Activo' : 'Inactivo'}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleActive(prod.id, prod.active)}
                  className="flex-1 p-2 hover:bg-gray-700 rounded transition text-sm"
                >
                  {prod.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setSelectedProducto(prod)
                    setShowForm(true)
                  }}
                  className="flex-1 p-2 hover:bg-gray-700 rounded transition text-sm"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="flex-1 p-2 hover:bg-red-900/30 rounded transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <ProductoForm
          storeId={STORE_ID}
          producto={selectedProducto}
          onClose={() => {
            setShowForm(false)
            setSelectedProducto(null)
          }}
          onSave={() => {
            setShowForm(false)
            setSelectedProducto(null)
            loadProductos()
          }}
        />
      )}
    </div>
  )
}
