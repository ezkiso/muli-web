// src/app/stores/fono-copete/page.tsx
'use client'

import Image from 'next/image';
import StoreSelector from '@/components/shared/StoreSelector';
import { Phone, Clock, MapPin, Wine, Beer, Flame, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProductosFonoCopete, ProductoFonoCopete } from '@/lib/productos';

interface Trago {
    id: number;
    slug: string;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    priority?: boolean;
}

export default function FonoCopete() {
    const [selectedProduct, setSelectedProduct] = useState<Trago | null>(null);
    const [tragosData, setTragosData] = useState<Trago[]>([]);
    const [loading, setLoading] = useState(true);

    // Cargar productos desde la base de datos
    useEffect(() => {
        async function loadTragos() {
            try {
                setLoading(true);
                const data = await getProductosFonoCopete();
                setTragosData(data);
            } catch (error) {
                console.error('Error cargando tragos:', error);
                setTragosData([]);
            } finally {
                setLoading(false);
            }
        }
        loadTragos();
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL').format(price);
    };

    const handleWhatsApp = (trago: Trago) => {
        const mensaje = `Hola! Quiero pedir: ${trago.nombre} - $${formatPrice(trago.precio)}`;
        const url = `https://wa.me/56966743432?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    // Mostrar loading mientras se cargan los productos
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-black flex items-center justify-center">
                <p className="text-white text-2xl">Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-black">
        <StoreSelector currentStoreId="copete" />

        {/* Header */}
        <header className="bg-gradient-to-r from-red-900 via-black to-red-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="text-center">
                    {/* Logo Circular mini */}
                    <div className="flex justify-center mb-2">
                        <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-red-600 overflow-hidden relative">
                            <Image
                                src="/fono-copete/icon.png"
                                alt="Fono Copete Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold mb-1">
                        Fono Copete Barrio Yungay
                    </h1>
                    <p className="text-red-200 text-sm md:text-base mb-2">
                        ¡No te quedi seco! Fono Copete 24 horas.
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-green-400" />
                            <span>24/7</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-400" />
                            <span>Barrio Yungay</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-blue-400" />
                            <span>Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        {/* Grid de Tragos - SOLO 4 PRODUCTOS */}
        <section className="container mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tragosData.map((trago) => (
                <div 
                key={trago.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-700 hover:border-red-600 transition-all duration-300 transform hover:-translate-y-2"
                >
                {/* Imagen del producto */}
                <div className="relative h-64 bg-gray-950">
                    <Image 
                    src={trago.imagen}
                    alt={trago.nombre}
                    fill
                    className="object-contain p-4"
                    priority={trago.priority}
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ¡DESTACADO!
                    </div>
                </div>

                {/* Información del producto */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 min-h-[3rem]">
                    {trago.nombre}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {trago.descripcion}
                    </p>

                    {/* Precio */}
                    <div className="mb-4">
                    <p className="text-gray-400 text-xs">Precio</p>
                    <p className="text-3xl font-bold text-red-400">
                        ${formatPrice(trago.precio)}
                    </p>
                    </div>

                    <button
                        onClick={() => handleWhatsApp(trago)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 mb-2"
                    >
                        {/* Usa este SVG de WhatsApp */}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.032 0a12 12 0 00-10.14 18.36L0 24l5.64-1.896A12 12 0 1012.032 0zm5.772 17.52c-.324.912-1.752 1.668-2.88 1.884-.72.132-1.656.24-4.836-.996-3.984-1.56-6.564-5.46-6.756-5.7-.192-.24-1.56-2.076-1.56-3.96s.972-2.856 1.356-3.276c.36-.396.78-.552 1.044-.552h.324c.24 0 .564.036.78 1.2.216 1.056.72 3.672.78 3.936.06.264.12.6.024.936-.096.336-.18.504-.324.72-.144.216-.288.384-.432.6-.144.216-.288.456-.12.888.168.432.756 1.44 1.644 2.328 1.14 1.14 2.112 1.5 2.52 1.68.408.18.648.144.888-.084.24-.228 1.032-1.008 1.308-1.356.276-.348.552-.288.936-.168.384.12 2.412 1.14 2.82 1.356.408.216.684.324.78.504.096.18.096 1.02-.228 1.932z"/>
                        </svg>
                        Pedir por WhatsApp
                    </button>

                    <button
                    onClick={() => setSelectedProduct(trago)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-all"
                    >
                    Ver Detalles
                    </button>
                </div>
                </div>
            ))}
            </div>
        </section>

        {/* Información del servicio */}
        <section className="bg-black border-t border-red-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                Fono Copete en Santiago
                </h2>
                <p className="text-lg mb-8">
                Somos un servicio de delivery de alcohol en Santiago, con foco en Barrio Yungay.
                Pisco, vino, cervezas, promociones y todo lo que necesitas 24/7.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-gray-900 p-6 rounded-xl border border-red-900">
                    <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg mb-2">Servicio 24/7</h3>
                    <p className="text-gray-400 text-sm">
                    Disponibles todos los días, a cualquier hora
                    </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-red-900">
                    <MapPin className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg mb-2">Delivery Rápido</h3>
                    <p className="text-gray-400 text-sm">
                    Entrega en Barrio Yungay y alrededores
                    </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-red-900">
                    <Wine className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg mb-2">Gran Variedad</h3>
                    <p className="text-gray-400 text-sm">
                    Pisco, vino, cerveza y más
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-red-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
            <p className="text-lg mb-2 flex items-center justify-center gap-2">
                <Wine className="w-5 h-5" />
                Fono Copete Santiago Barrio Yungay - Delivery disponible (cargo extra)
            </p>
            <p className="text-gray-400 text-sm mb-4">
                📍 Barrio Yungay, Santiago | 📞 WhatsApp: +56 9 6674 3432
            </p>
            <p className="text-red-400 text-sm font-bold">
                ⚠️ Prohibida la venta a menores de 18 años. Bebe con responsabilidad.
            </p>
            </div>
        </footer>

        {/* Modal de Detalle */}
        {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-600">
                <div className="sticky top-0 bg-gray-900 border-b border-red-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedProduct.nombre}</h2>
                <button 
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-red-900/30 rounded-full transition"
                >
                    <X className="w-6 h-6 text-white" />
                </button>
                </div>

                <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-80 bg-black rounded-xl">
                    <Image 
                        src={selectedProduct.imagen}
                        alt={selectedProduct.nombre}
                        fill
                        className="object-contain p-4"
                    />
                    </div>

                    <div>
                    <div className="mb-6">
                        <p className="text-gray-400 text-sm mb-1">Precio:</p>
                        <p className="text-5xl font-bold text-red-400">
                        ${formatPrice(selectedProduct.precio)}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-white text-lg mb-3">Descripción</h3>
                        <p className="text-gray-300 leading-relaxed">
                        {selectedProduct.descripcion}
                        </p>
                    </div>

                    <button
                        onClick={() => handleWhatsApp(selectedProduct)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                    >
                        {/* Usa este SVG de WhatsApp */}
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.032 0a12 12 0 00-10.14 18.36L0 24l5.64-1.896A12 12 0 1012.032 0zm5.772 17.52c-.324.912-1.752 1.668-2.88 1.884-.72.132-1.656.24-4.836-.996-3.984-1.56-6.564-5.46-6.756-5.7-.192-.24-1.56-2.076-1.56-3.96s.972-2.856 1.356-3.276c.36-.396.78-.552 1.044-.552h.324c.24 0 .564.036.78 1.2.216 1.056.72 3.672.78 3.936.06.264.12.6.024.936-.096.336-.18.504-.324.72-.144.216-.288.384-.432.6-.144.216-.288.456-.12.888.168.432.756 1.44 1.644 2.328 1.14 1.14 2.112 1.5 2.52 1.68.408.18.648.144.888-.084.24-.228 1.032-1.008 1.308-1.356.276-.348.552-.288.936-.168.384.12 2.412 1.14 2.82 1.356.408.216.684.324.78.504.096.18.096 1.02-.228 1.932z"/>
                        </svg>
                        Pedir por WhatsApp
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}