'use client'
import { useState, useRef } from 'react'
import { createTatuaje, updateTatuaje, uploadTatuajeImagen, TattooUnificado } from '@/lib/admin-tatuajes'
import { TATTOO_CATEGORIES, TATTOO_STYLES, BODY_PARTS } from '@/lib/tatuajes.types'
import { X, Upload, Plus, Image as ImageIcon, Loader2, Tag } from 'lucide-react'

interface Props {
  storeId: string
  tatuaje?: TattooUnificado
  onClose: () => void
  onSave: () => void
}

export default function TattooForm({ storeId, tatuaje, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    id: tatuaje?.id || undefined,
    id_text: tatuaje?.id_text || '',
    title: tatuaje?.title || '',
    description: tatuaje?.description || '',
    imageUrl: tatuaje?.imageUrl || '',
    thumbnailUrl: tatuaje?.thumbnailUrl || '',
    category: tatuaje?.category || 'diseños',
    style: tatuaje?.style || [],
    bodyPart: tatuaje?.bodyPart || '',
    size: tatuaje?.size || 'mediano',
    tags: tatuaje?.tags || [],
    available: tatuaje?.available ?? true,
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(tatuaje?.imageUrl || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [newTag, setNewTag] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setForm(prev => ({ ...prev, imageUrl: '' }))
  }

  function toggleStyle(style: string) {
    setForm(prev => ({
      ...prev,
      style: prev.style.includes(style)
        ? prev.style.filter(s => s !== style)
        : [...prev.style, style]
    }))
  }

  function addTag() {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  function removeTag(tag: string) {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) { setError('El título es obligatorio.'); return }
    if (!form.imageUrl && !imageFile) { setError('La imagen es obligatoria.'); return }

    setSaving(true)
    setError('')

    try {
      let imageUrl = form.imageUrl

      if (imageFile) {
        setUploading(true)
        imageUrl = await uploadTatuajeImagen(imageFile, storeId)
        setUploading(false)
      }

      const tatuajeData: Omit<TattooUnificado, 'id' | 'created_at' | 'updated_at'> = {
        store_id: storeId,
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl,
        thumbnailUrl: imageUrl,
        category: form.category as any,
        style: form.style,
        bodyPart: form.bodyPart,
        size: form.size as any,
        tags: form.tags,
        available: form.available,
      }

      if (tatuaje?.id) {
        await updateTatuaje(tatuaje.id, tatuajeData)
      } else {
        await createTatuaje(tatuajeData)
      }

      onSave()
    } catch (err: any) {
      setError(err?.message || 'Error al guardar el tatuaje. Intenta nuevamente.')
      setUploading(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl w-full max-w-3xl border border-gray-800 my-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <div>
            <h2 className="text-xl font-bold text-white">
              {tatuaje?.id ? 'Editar Tatuaje' : 'Nuevo Tatuaje'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Nicolapso Tatuajes</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Imagen */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3">Imagen del Tatuaje *</label>
            <div className="flex gap-4 items-start">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-40 h-40 bg-black border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition shrink-0 overflow-hidden"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-600 mb-2" />
                    <span className="text-xs text-gray-500 text-center">Click para subir</span>
                  </>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition w-full justify-center"
                >
                  <Upload className="w-4 h-4" />
                  Seleccionar archivo
                </button>
                <p className="text-xs text-gray-500 text-center">— o pega una URL —</p>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={e => {
                    setForm(prev => ({ ...prev, imageUrl: e.target.value }))
                    if (e.target.value) { setImagePreview(e.target.value); setImageFile(null) }
                  }}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-black border border-gray-800 text-white rounded-lg text-sm focus:outline-none focus:border-gray-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Título *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ej: 🐯 Diseño de tigre"
              required
              className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Categoría *</label>
            <div className="flex gap-2 flex-wrap">
              {TATTOO_CATEGORIES.filter(c => c.id !== 'todos').map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, category: cat.id as any }))}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition border ${
                    form.category === cat.id
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-transparent text-white border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Estilos */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Estilos</label>
            <div className="flex gap-2 flex-wrap">
              {TATTOO_STYLES.map(style => (
                <button
                  key={style}
                  type="button"
                  onClick={() => toggleStyle(style)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                    form.style.includes(style)
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-transparent text-white border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Descripción</label>
            <textarea
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe el tatuaje: significado, detalles, etc."
              rows={3}
              className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 resize-none transition"
            />
          </div>

          {/* Parte del cuerpo y tamaño */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Parte del cuerpo</label>
              <select
                value={form.bodyPart}
                onChange={e => setForm(prev => ({ ...prev, bodyPart: e.target.value }))}
                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
              >
                <option value="">Seleccionar...</option>
                {BODY_PARTS.map(part => (
                  <option key={part} value={part}>{part}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Tamaño</label>
              <select
                value={form.size}
                onChange={e => setForm(prev => ({ ...prev, size: e.target.value as any }))}
                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
              >
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Tags</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Agregar tag..."
                className="flex-1 px-4 py-2 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {form.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600/20 border border-amber-600/50 text-amber-400 rounded-full text-xs"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Disponible */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="available"
              checked={form.available}
              onChange={e => setForm(prev => ({ ...prev, available: e.target.checked }))}
              className="w-5 h-5 rounded bg-black border-gray-700 text-amber-600 focus:ring-amber-600"
            />
            <label htmlFor="available" className="text-sm text-white">
              Disponible para tatuar
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {(saving || uploading) && <Loader2 className="w-4 h-4 animate-spin" />}
              {uploading ? 'Subiendo imagen...' : saving ? 'Guardando...' : tatuaje?.id ? 'Actualizar Tatuaje' : 'Publicar Tatuaje'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
