// src/app/stores/contruhazard/jarros/page.tsx
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Search, Instagram, Facebook, Phone, Mail, MapPin, ArrowLeft, Hammer, Skull, Grid, List, Star } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
    material: string;
    }

    export default function ContruHazardJarros() {
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const products: Product[] = [
        {
        id: 1,
        name: 'Shopero Exploited',
        category: 'Shoperos',
        image: '/jarros/shopero-exploited.jpg',
        description: 'Shopero con diseño de Exploited',
        material: 'Masilla de artesano',
        },
        {
        id: 2,
        name: 'Bong Depredador',
        category: 'Bongs',
        image: '/jarros/bong-depredador.jpg',
        description: 'Jarro robusto con diseño de herramientas. Ideal para trabajadores de la construcción. Resistente y duradero.',
        material: 'Masilla de artesano reforzada',
        },
        {
        id: 3,
        name: 'Shopero Popeye',
        category: 'Shoperos',
        image: '/jarros/shopero-popeye.jpg',
        description: 'Shopero con diseño de Popeye el marino. Divertido y funcional, perfecto para los fans del personaje clásico.',
        material: 'Masilla de artesano'
        },
        {
        id: 4,
        name: 'Tuneo Moto',
        category: 'Manualidades',
        image: '/jarros/moto-jhony.jpg',
        description: 'Diseño de bruja echo sobre una moto. Pieza única y llamativa para los amantes de lo extremo.',
        material: 'Masilla de artesano premium',
        },
        {
        id: 5,
        name: 'Bong Calavera',
        category: 'Bongs',
        image: '/jarros/bong.jpg',
        description: 'Bong artesanal con diseño de calavera. Perfecto para los amantes del arte y la funcionalidad. Hecho a mano con detalle.',
        material: 'Masilla de artesano'
        },
        {
        id: 6,
        name: 'Porta Copas Esqueleto',
        category: 'Manualidades',
        image: '/jarros/porta-copas.jpg',
        description: 'Porta copas con diseño de esqueleto. Ideal para decorar tu espacio con un toque macabro y funcional.',
        material: 'Masilla de artesano premium',
        },
        {
        id: 7,
        name: 'Carcasa Bruhazard',
        category: 'Manualidades',
        image: '/jarros/carcasa-bruhazard.jpg',
        description: 'Carcasa para celular con diseño exclusivo de Bruhazard. Protege tu teléfono con estilo y actitud.',
        material: 'Masilla de artesano',
        },
        {
        id: 8,
        name: 'Shopero Jason',
        category: 'Jarros',
        image: '/jarros/shopero-jason-2.jpg',
        description: 'Shopero con diseño de Jason Voorhees. Perfecto para los fans del cine de terror y coleccionistas de artículos únicos.',
        material: 'Shoperos',
        }
    ];

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
        alert(`${product.name} agregado al carrito!`);
    };

    const toggleFavorite = (productId: number) => {
        if (favorites.includes(productId)) {
        setFavorites(favorites.filter(id => id !== productId));
        } else {
        setFavorites([...favorites, productId]);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL').format(price);
    };

    const openProductDetail = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeProductDetail = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="min-h-screen bg-zinc-900">
        {/* Header */}
        <header className="bg-black text-white shadow-2xl sticky top-0 z-50 border-b-4 border-orange-600">
            <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                <Link href="/stores/contruhazard" className="text-orange-500 hover:text-orange-400 transition">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-5xl animate-pulse">💀</div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-orange-500">
                    CONTRU<span className="text-white">HAZARD</span>
                    </h1>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Skull className="w-3 h-3" />
                    Jarros & Manualidades Artesanales
                    </p>
                </div>
                </div>

                <div className="flex gap-3">
                <button className="hover:bg-zinc-800 p-2 rounded-lg transition">
                    <Search className="w-5 h-5" />
                </button>
                <button className="hover:bg-zinc-800 p-2 rounded-lg transition relative">
                    <Heart className="w-5 h-5" />
                    {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {favorites.length}
                    </span>
                    )}
                </button>
                <button className="hover:bg-zinc-800 p-2 rounded-lg transition relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                    </span>
                    )}
                </button>
                </div>
            </div>
            </div>
        </header>

        {/* Hero Section - Más compacto */}
        <section className="relative bg-gradient-to-r from-black via-zinc-900 to-orange-900 text-white py-8 border-b-4 border-orange-600">
            <div className="absolute inset-0 opacity-5 text-2xl">
                <div className="grid grid-cols-8 gap-2 p-2">
                    {[...Array(40)].map((_, i) => (
                        <div key={i} className="animate-pulse">💀</div>
                    ))}
                </div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Skull className="w-10 h-10 text-orange-500" />
                        <h2 className="text-4xl font-black">JARROS ARTESANALES</h2>
                        <Hammer className="w-10 h-10 text-orange-500" />
                    </div>
                    <p className="text-base text-gray-300 mb-3">
                        Cada pieza es única, hecha a mano con masilla de artesano.
                        <br />Arte funcional con actitud extrema.
                    </p>
                    <div className="inline-flex items-center gap-1 bg-orange-600 text-white px-4 py-1 rounded-lg font-bold text-sm">
                        <span>💀</span>
                        <span>100% Artesanal</span>
                        <span className="mx-1">|</span>
                        <span>🔨</span>
                        <span>Hecho en Chile</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Productos */}
        <section className="py-16">
            <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white">Nuestros Productos</h3>
                <div className="flex gap-2">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-white'}`}
                >
                    <Grid className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-white'}`}
                >
                    <List className="w-5 h-5" />
                </button>
                </div>
            </div>

            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
                {products.map((product) => (
                <div 
                    key={product.id}
                    onClick={() => openProductDetail(product)}
                    className={`group bg-black rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden border-2 border-zinc-800 hover:border-orange-500 cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                    }`}
                >
                    <div className={`bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative ${
                    viewMode === 'list' ? 'w-48 h-48' : 'h-64'
                    }`}>
                    <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                    />
                    </div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                            {product.category}
                        </span>
                        <h3 className="font-bold text-lg text-white mt-1">{product.name}</h3>
                        </div>
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                        }}
                        className="p-2 hover:bg-zinc-800 rounded-full transition"
                        >

                        </button>
                    </div>
                    
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Info Artesanal */}
        <section className="py-16 bg-black border-t-4 border-orange-600">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-black text-white mb-6 flex items-center justify-center gap-3">
                💀 TRABAJO ARTESANAL 💀
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                Cada pieza es moldeada a mano con masilla de artesano de alta calidad. 
                No hay dos iguales. Arte funcional con alma de construcción.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-zinc-900 p-6 rounded-xl border-2 border-orange-600">
                    <div className="text-5xl mb-4">🎨</div>
                    <h3 className="font-bold text-white text-lg mb-2">100% Artesanal</h3>
                    <p className="text-gray-400 text-sm">Cada pieza única hecha a mano</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border-2 border-orange-600">
                    <div className="text-5xl mb-4">💪</div>
                    <h3 className="font-bold text-white text-lg mb-2">Material Premium</h3>
                    <p className="text-gray-400 text-sm">Masilla de artesano resistente</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-xl border-2 border-orange-600">
                    <div className="text-5xl mb-4">🇨🇱</div>
                    <h3 className="font-bold text-white text-lg mb-2">Hecho en Chile</h3>
                    <p className="text-gray-400 text-sm">Apoyando artesanos locales</p>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Contacto */}
        <section className="py-16 bg-zinc-900">
            <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-black text-white mb-6">
                ¿PEDIDOS PERSONALIZADOS?
                </h2>
                <p className="text-gray-300 mb-8">
                Podemos hacer diseños especiales según tu idea. Contáctanos para cotizar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+56900000000" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold transition flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Llamar Ahora
                </a>
                <a href="https://wa.me/56900000000" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    WhatsApp
                </a>
                </div>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 border-t-4 border-orange-600">
            <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Skull className="w-8 h-8 text-orange-500" />
                <h3 className="text-2xl font-black">
                CONTRU<span className="text-orange-500">HAZARD</span>
                </h3>
                <Hammer className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-gray-400 text-sm">Jarros & Manualidades Artesanales</p>
            <p className="text-gray-500 text-xs mt-2">© 2024 ContruHazard. Hecho con 💀🔨 en Chile</p>
            </div>
        </footer>

        {/* Modal de Detalle */}
        {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-orange-600">
                <div className="sticky top-0 bg-zinc-900 border-b border-orange-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                <button 
                    onClick={closeProductDetail}
                    className="p-2 hover:bg-zinc-800 rounded-full transition"
                >
                    <span className="text-white text-2xl">×</span>
                </button>
                </div>

                <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative bg-black rounded-xl h-96">
                        <Image 
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            fill
                            className="object-contain p-8"
                        />
                        </div>
                    <div>
                    <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {selectedProduct.category}
                    </span>

                    <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2 text-white">
                        </div>
                        <div className="flex items-center gap-2 text-white">
                        <span className="font-bold">🛠️ Material:</span>
                        <span className="text-gray-300">{selectedProduct.material}</span>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-zinc-800">
                        <h3 className="font-bold text-white text-lg mb-3">Descripción</h3>
                        <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}