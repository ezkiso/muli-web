// src/app/checkout/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, CreditCard, User, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
    id: number;
    productId: number;
    name: string;
    image: string;
    basePrice: number;
    size: string;
    quantity: number;
    category: string;
    }

    export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        region: '',
        ciudad: '',
        direccion: '',
        detalles: '',
    });

    useEffect(() => {
        const savedCart = localStorage.getItem('desobediencia_cart');
        if (savedCart) {
        setCart(JSON.parse(savedCart));
        }
    }, []);

    // Calcular precio con talla
    const calculateItemPrice = (item: CartItem): number => {
        return item.size === 'XXL' ? item.basePrice + 2000 : item.basePrice;
    };

    // Calcular total
    const getCartTotal = (): number => {
        return cart.reduce((total, item) => {
        return total + calculateItemPrice(item) * item.quantity;
        }, 0);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        }).format(price);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        // Llamar a la API de Webpay
        const response = await fetch('/api/webpay/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            amount: getCartTotal(),
            cart,
            customer: formData,
            }),
        });

        const data = await response.json();

        if (data.url && data.token) {
            // Redirigir a Webpay
            window.location.href = `${data.url}?token_ws=${data.token}`;
        } else {
            alert('Error al iniciar el pago. Intenta nuevamente.');
        }
        } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar el pago');
        } finally {
        setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
                Tu carrito está vacío
            </h2>
            <p className="text-gray-400 mb-6">
                Agrega productos antes de hacer el checkout
            </p>
            <Link
                href="/stores/desobediencia"
                className="inline-block bg-[#800020] hover:bg-[#600018] text-white px-6 py-3 rounded-lg font-bold transition"
            >
                Ver Productos
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 py-4">
            <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
                <Link
                href="/stores/desobediencia"
                className="text-white hover:text-[#800020] transition"
                >
                <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold text-white">Finalizar Compra</h1>
            </div>
            </div>
        </header>

        <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Personal */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-[#800020]" />
                    <h2 className="text-xl font-bold text-white">
                        Información Personal
                    </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                        Nombre *
                        </label>
                        <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) =>
                            setFormData({ ...formData, nombre: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="Juan"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                        Apellido *
                        </label>
                        <input
                        type="text"
                        required
                        value={formData.apellido}
                        onChange={(e) =>
                            setFormData({ ...formData, apellido: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="Pérez"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                        Email *
                        </label>
                        <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                        Teléfono *
                        </label>
                        <input
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) =>
                            setFormData({ ...formData, telefono: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="+56 9 1234 5678"
                        />
                    </div>
                    </div>
                </div>

                {/* Dirección de Envío */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-[#800020]" />
                    <h2 className="text-xl font-bold text-white">
                        Dirección de Envío
                    </h2>
                    </div>

                    <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Región *
                        </label>
                        <select
                            required
                            value={formData.region}
                            onChange={(e) =>
                            setFormData({ ...formData, region: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        >
                            <option value="">Selecciona región</option>
                            <option value="Metropolitana">Región Metropolitana</option>
                            <option value="Valparaíso">Valparaíso</option>
                            <option value="Biobío">Biobío</option>
                            {/* Agregar más regiones */}
                        </select>
                        </div>

                        <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Ciudad *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.ciudad}
                            onChange={(e) =>
                            setFormData({ ...formData, ciudad: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            placeholder="Santiago"
                        />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                        Dirección *
                        </label>
                        <input
                        type="text"
                        required
                        value={formData.direccion}
                        onChange={(e) =>
                            setFormData({ ...formData, direccion: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="Calle Principal 123"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                        Detalles adicionales (opcional)
                        </label>
                        <textarea
                        rows={3}
                        value={formData.detalles}
                        onChange={(e) =>
                            setFormData({ ...formData, detalles: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="Depto 101, timbre rojo, etc."
                        />
                    </div>
                    </div>
                </div>

                {/* Botón de pago */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Procesando...
                    </>
                    ) : (
                    <>
                        <CreditCard className="w-5 h-5" />
                        Pagar con Webpay
                    </>
                    )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    Serás redirigido a la plataforma segura de Transbank
                </p>
                </form>
            </div>

            {/* Resumen del pedido */}
            <div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-4">
                <h2 className="text-xl font-bold text-white mb-6">
                    Resumen del Pedido
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-4 pb-4 border-b border-gray-800"
                    >
                        <div className="relative w-16 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                        />
                        </div>
                        <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm truncate">
                            {item.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                            Talla: {item.size} x {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-white mt-1">
                            {formatPrice(calculateItemPrice(item) * item.quantity)}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Totales */}
                <div className="space-y-3 pt-4 border-t border-gray-800">
                    <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                    <span>Envío</span>
                    <span>A calcular</span>
                    </div>
                    <div className="flex justify-between text-white text-2xl font-bold pt-3 border-t border-gray-800">
                    <span>Total</span>
                    <span>{formatPrice(getCartTotal())}</span>
                    </div>
                </div>

                {/* Info de seguridad */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CreditCard className="w-5 h-5 text-[#800020]" />
                    <span>Pago 100% seguro con Transbank</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}