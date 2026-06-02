'use client'

export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTatuajesStore, deleteTatuaje, toggleTatuajeActivo, TattooUnificado } from '@/lib/admin-tatuajes'
import { MOCK_TATTOOS } from '@/lib/tatuajes.data'
import { getCurrentUserNicolapso, signOutNicolapso, getOwnedStoresNicolapso } from '@/lib/admin-auth-nicolapso'
import { getStoreConfig } from '@/lib/stores-config'
import TattooForm from '@/components/nicolapso/TattooForm'
import { Eye, EyeOff, Edit, Trash2, Plus, LogOut, Loader2, ArrowLeft } from 'lucide-react'

const STORE_ID = 'nicolapso'

type Tatuaje = TattooUnificado & { id: number; id_text: string }

export default function NicolapsoAdminPage() {
  const router = useRouter()
  const storeConfig = getStoreConfig(STORE_ID as any)

  const [loading, setLoading] = useState(true)
  const [tatuajes, setTatuajes] = useState<Tatuaje[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTatuaje, setSelectedTatuaje] = useState<Tatuaje | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  async function checkAuthAndLoadData() {
    try {
      const user = await getCurrentUserNicolapso()
      console.log('Admin - User:', user?.id)

      if (!user) {
        console.log('Admin - No user, redirecting to login')
        router.push(`/stores/${STORE_ID}/login`)
        return
      }

      // Temporalmente deshabilitado verificación de store_owners
      // const ownedStores = await getOwnedStoresNicolapso(user.id)
      // console.log('Admin - Owned stores:', ownedStores)
      // if (!ownedStores.includes(STORE_ID)) {
      //   console.log('Admin - User not owner, redirecting to login')
      //   router.push(`/stores/${STORE_ID}/login`)
      //   return
      // }

      await loadTatuajes()
    } catch (err) {
      console.error('Error en autenticación:', err)
      router.push(`/stores/${STORE_ID}/login`)
    } finally {
      setLoading(false)
    }
  }

  async function loadTatuajes() {
    try {
      const data = await getTatuajesStore(STORE_ID)
      setTatuajes(data.filter(t => t.id !== undefined && t.id_text !== undefined) as Tatuaje[])
    } catch (err: any) {
      setError('Error cargando tatuajes')
      console.error(err)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este tatuaje?')) return
    try {
      await deleteTatuaje(id)
      setTatuajes(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError('Error al eliminar')
    }
  }

  async function handleToggleActive(id: number, available: boolean) {
    try {
      await toggleTatuajeActivo(id, !available)
      setTatuajes(prev =>
        prev.map(t => t.id === id ? { ...t, available: !available } : t)
      )
    } catch (err) {
      setError('Error actualizando estado')
    }
  }

  async function handleLogout() {
    try {
      await signOutNicolapso()
      router.push(`/stores/${STORE_ID}/login`)
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

  const totalTatuajes = tatuajes.length
  const tatuajesDisponibles = tatuajes.filter(t => t.available).length
  const porCategoria = {
    realizados: tatuajes.filter(t => t.category === 'realizados').length,
    diseños: tatuajes.filter(t => t.category === 'diseños').length,
    flash: tatuajes.filter(t => t.category === 'flash').length,
  }

  const primaryColor = storeConfig?.primaryColor || '#ffffff'

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/stores/nicolapso">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Admin - {storeConfig?.name}</h1>
              <p className="text-gray-400 text-sm mt-1">Gestión de tatuajes</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-2xl font-bold mt-2">{totalTatuajes}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Disponibles</p>
            <p className="text-2xl font-bold text-green-400 mt-2">{tatuajesDisponibles}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Realizados</p>
            <p className="text-2xl font-bold text-amber-400 mt-2">{porCategoria.realizados}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Diseños</p>
            <p className="text-2xl font-bold text-blue-400 mt-2">{porCategoria.diseños}</p>
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
            setSelectedTatuaje(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold transition mb-6"
        >
          <Plus className="w-5 h-5" />
          Nuevo Tatuaje
        </button>
      </div>

      {/* Tabla de Tatuajes */}
      <div className="max-w-7xl mx-auto">
        {tatuajes.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No hay tatuajes aún</p>
          </div>
        ) : (
          <div className="hidden md:block">
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Imagen</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Título</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Categoría</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Estilos</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tatuajes.map((tatuaje) => (
                    <tr key={tatuaje.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                          {tatuaje.imageUrl && (
                            <img
                              src={tatuaje.imageUrl}
                              alt={tatuaje.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{tatuaje.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{tatuaje.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="text-xs text-gray-400">{tatuaje.style?.join(', ') || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={tatuaje.available ? 'text-green-400' : 'text-gray-500'}>
                          {tatuaje.available ? 'Disponible' : 'No disponible'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleActive(tatuaje.id, tatuaje.available ?? false)}
                            className="p-2 hover:bg-gray-700 rounded transition text-gray-400 hover:text-white"
                            title={tatuaje.available ? 'Marcar no disponible' : 'Marcar disponible'}
                          >
                            {tatuaje.available ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTatuaje(tatuaje)
                              setShowForm(true)
                            }}
                            className="p-2 hover:bg-gray-700 rounded transition text-gray-400 hover:text-white"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(tatuaje.id)}
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
          {tatuajes.map((tatuaje) => (
            <div key={tatuaje.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              {tatuaje.imageUrl && (
                <img
                  src={tatuaje.imageUrl}
                  alt={tatuaje.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-semibold mb-2">{tatuaje.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <p className="text-gray-400">Categoría: {tatuaje.category}</p>
                <p className="text-gray-400">Estado: {tatuaje.available ? 'Disponible' : 'No disponible'}</p>
                <p className="text-gray-400 col-span-2">Estilos: {tatuaje.style?.join(', ') || '-'}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleActive(tatuaje.id, tatuaje.available ?? false)}
                  className="flex-1 p-2 hover:bg-gray-700 rounded transition text-sm"
                >
                  {tatuaje.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setSelectedTatuaje(tatuaje)
                    setShowForm(true)
                  }}
                  className="flex-1 p-2 hover:bg-gray-700 rounded transition text-sm"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(tatuaje.id)}
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
        <TattooForm
          storeId={STORE_ID}
          tatuaje={selectedTatuaje || undefined}
          onClose={() => {
            setShowForm(false)
            setSelectedTatuaje(null)
          }}
          onSave={() => {
            setShowForm(false)
            setSelectedTatuaje(null)
            loadTatuajes()
          }}
        />
      )}
    </div>
  )
}
