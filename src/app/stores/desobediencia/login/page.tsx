'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signIn } from '@/lib/admin-auth'
import { getStoreConfig } from '@/lib/stores-config'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const STORE_ID = 'desobediencia'

export default function DesobedienciaLoginPage() {
  const router = useRouter()
  const storeConfig = getStoreConfig(STORE_ID as any)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkIfAlreadyAuthenticated()
  }, [])

  async function checkIfAlreadyAuthenticated() {
    try {
      const user = await getCurrentUser()
      if (user) {
        router.push(`/stores/${STORE_ID}/admin`)
      }
    } catch (err) {
      console.log('Usuario no autenticado')
    } finally {
      setVerifying(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await signIn(email, password)
      if (success) {
        router.push(`/stores/${STORE_ID}/admin`)
      } else {
        setError('Email o contraseña incorrectos')
      }
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  const primaryColor = storeConfig?.primaryColor || '#FF6B35'

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {storeConfig?.name}
          </h1>
          <p className="text-gray-400">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Iniciar Sesión</h2>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
              style={{
                backgroundColor: primaryColor,
                color: '#000',
              }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Solo administradores de {storeConfig?.name} pueden acceder
          </p>
        </div>
      </div>
    </div>
  )
}
