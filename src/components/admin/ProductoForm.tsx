'use client'
import { useState, useRef } from 'react'
import { createProducto, updateProducto, uploadImagen, VarianteUnificada } from '@/lib/admin-productos'
import { getStoreConfig } from '@/lib/stores-config'
import { X, Upload, Plus, Minus, Image as ImageIcon, Loader2 } from 'lucide-react'

const TALLAS_ROPA = ['S', 'M', 'L', 'XL', 'XXL']
const PRECIOS_EXTRA: Record<string, number> = { XXL: 2000 }

interface Props {
    storeId: string
    producto?: any
    onClose: () => void
    onSave: () => void
    }

    export default function ProductoForm({ storeId, producto, onClose, onSave }: Props) {
    const storeConfig = getStoreConfig(storeId as any)
    const usaTallas = storeConfig?.usaTallas ?? false
    const categories = storeConfig?.categories ?? ['General']

    const defaultVariantes: VarianteUnificada[] = usaTallas
        ? TALLAS_ROPA.map(t => ({ talla: t, stock: 0, precio_extra: PRECIOS_EXTRA[t] || 0 }))
        : [{ talla: 'Único', stock: 0, precio_extra: 0 }]

    const [form, setForm] = useState({
        name: producto?.name || '',
        category: producto?.category || categories[0],
        base_price: producto?.base_price?.toString() || '',
        description: producto?.description || '',
        image: producto?.image || '',
    })

    const [variantes, setVariantes] = useState<VarianteUnificada[]>(
        producto?.variantes?.length > 0 ? producto.variantes : defaultVariantes
    )

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>(producto?.image || '')
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
        setForm(prev => ({ ...prev, image: '' }))
    }

    function updateVariante(talla: string, field: 'stock' | 'precio_extra', value: number) {
        setVariantes(prev =>
        prev.map(v => v.talla === talla ? { ...v, [field]: Math.max(0, value) } : v)
        )
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.name.trim()) { setError('El nombre es obligatorio.'); return }
        if (!form.base_price || Number(form.base_price) <= 0) { setError('El precio debe ser mayor a 0.'); return }

        setSaving(true)
        setError('')

        try {
        let imageUrl = form.image

        if (imageFile) {
            setUploading(true)
            imageUrl = await uploadImagen(imageFile, storeId)
            setUploading(false)
        }

        const productoData = {
            store_id: storeId,
            name: form.name.trim(),
            category: form.category,
            base_price: Number(form.base_price),
            description: form.description.trim(),
            image: imageUrl,
            images: imageUrl ? [imageUrl] : [],
            active: true,
        }

        if (producto?.id) {
            await updateProducto(producto.id, productoData, variantes)
        } else {
            await createProducto(productoData, variantes)
        }

        onSave()
        } catch (err: any) {
        setError(err?.message || 'Error al guardar el producto. Intenta nuevamente.')
        setUploading(false)
        } finally {
        setSaving(false)
        }
    }

    const totalStock = variantes.reduce((sum, v) => sum + (v.stock || 0), 0)
    const primaryColor = storeConfig?.primaryColor || '#ffffff'

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-gray-900 rounded-2xl w-full max-w-2xl border border-gray-800 my-4">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
                <h2 className="text-xl font-bold text-white">
                {producto?.id ? 'Editar Producto' : 'Publicar Nuevo Producto'}
                </h2>
                <p className="text-xs text-gray-500 mt-1">Tienda: {storeConfig?.name}</p>
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

            {/* ——— Imagen ——— */}
            <div>
                <label className="block text-sm font-semibold text-white mb-3">Imagen del Producto</label>
                <div className="flex gap-4 items-start">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 bg-black border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition shrink-0 overflow-hidden"
                >
                    {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
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
                    value={form.image}
                    onChange={e => {
                        setForm(prev => ({ ...prev, image: e.target.value }))
                        if (e.target.value) { setImagePreview(e.target.value); setImageFile(null) }
                    }}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-black border border-gray-800 text-white rounded-lg text-sm focus:outline-none focus:border-gray-600 transition"
                    />
                </div>
                </div>
            </div>

            {/* ——— Nombre ——— */}
            <div>
                <label className="block text-sm font-semibold text-white mb-2">Nombre *</label>
                <input
                type="text"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Polera Post-Punk Negra"
                required
                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
                />
            </div>

            {/* ——— Categoría ——— */}
            <div>
                <label className="block text-sm font-semibold text-white mb-2">Categoría / Tipo *</label>
                <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                    <button
                    key={cat}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, category: cat }))}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition border ${
                        form.category === cat
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white border-gray-700 hover:border-gray-500'
                    }`}
                    >
                    {cat}
                    </button>
                ))}
                </div>
                <input
                type="text"
                value={categories.includes(form.category) ? '' : form.category}
                onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Otra categoría personalizada..."
                className="mt-2 w-full px-3 py-2 bg-black border border-gray-800 text-white rounded-lg text-sm focus:outline-none focus:border-gray-600 transition"
                />
            </div>

            {/* ——— Precio ——— */}
            <div>
                <label className="block text-sm font-semibold text-white mb-2">Precio Base (CLP) *</label>
                <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                <input
                    type="number"
                    value={form.base_price}
                    onChange={e => setForm(prev => ({ ...prev, base_price: e.target.value }))}
                    placeholder="15000"
                    required
                    min="1"
                    className="w-full pl-8 pr-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 transition"
                />
                </div>
            </div>

            {/* ——— Descripción ——— */}
            <div>
                <label className="block text-sm font-semibold text-white mb-2">Descripción</label>
                <textarea
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe el producto: materiales, características, tallas disponibles..."
                rows={3}
                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-gray-600 resize-none transition"
                />
            </div>

            {/* ——— Stock por Talla ——— */}
            <div>
                <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-white">
                    {usaTallas ? 'Stock por Talla' : 'Stock Disponible'}
                </label>
                <span className="text-sm text-gray-400">
                    Total: <span className="text-white font-bold">{totalStock}</span> unidades
                </span>
                </div>

                {usaTallas ? (
                <div className="grid grid-cols-5 gap-2">
                    {variantes.map(v => (
                    <div key={v.talla} className="bg-black border border-gray-800 rounded-xl p-3 text-center">
                        <p className="text-sm font-bold text-white mb-2">{v.talla}</p>
                        <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => updateVariante(v.talla, 'stock', (v.stock || 0) - 1)}
                            className="w-6 h-6 bg-gray-800 hover:bg-gray-700 rounded text-white flex items-center justify-center shrink-0"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <input
                            type="number"
                            value={v.stock}
                            onChange={e => updateVariante(v.talla, 'stock', Number(e.target.value))}
                            className="flex-1 w-0 text-center bg-transparent text-white text-sm font-bold focus:outline-none"
                            min="0"
                        />
                        <button
                            type="button"
                            onClick={() => updateVariante(v.talla, 'stock', (v.stock || 0) + 1)}
                            className="w-6 h-6 bg-gray-800 hover:bg-gray-700 rounded text-white flex items-center justify-center shrink-0"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                        </div>
                        {(v.precio_extra || 0) > 0 && (
                        <p className="text-xs text-yellow-500 mt-1">+${v.precio_extra?.toLocaleString('es-CL')}</p>
                        )}
                    </div>
                    ))}
                </div>
                ) : (
                // Sin tallas: solo un campo de stock
                <div className="bg-black border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-3 justify-center">
                    <button
                        type="button"
                        onClick={() => updateVariante('Único', 'stock', (variantes[0]?.stock || 0) - 1)}
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg text-white flex items-center justify-center"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <input
                        type="number"
                        value={variantes[0]?.stock || 0}
                        onChange={e => updateVariante('Único', 'stock', Number(e.target.value))}
                        className="w-24 text-center bg-transparent text-white text-3xl font-bold focus:outline-none"
                        min="0"
                    />
                    <button
                        type="button"
                        onClick={() => updateVariante('Único', 'stock', (variantes[0]?.stock || 0) + 1)}
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg text-white flex items-center justify-center"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    </div>
                    <p className="text-center text-gray-500 text-xs mt-2">unidades disponibles</p>
                </div>
                )}
            </div>

            {/* ——— Botones ——— */}
            <div className="flex gap-3 pt-2 border-t border-gray-800">
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
                className="flex-1 py-3 bg-white hover:bg-gray-200 text-black rounded-lg font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                {(saving || uploading) && <Loader2 className="w-4 h-4 animate-spin" />}
                {uploading ? 'Subiendo imagen...' : saving ? 'Guardando...' : producto?.id ? 'Actualizar Producto' : 'Publicar Producto'}
                </button>
            </div>
            </form>
        </div>
        </div>
    )
    }