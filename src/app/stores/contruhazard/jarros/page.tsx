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
    price: number;
    image: string;
    description: string;
    stock: number;
    rating: number;
    material: string;
    size: string;
    }

    export default function ContruHazardJarros() {
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const products: Product[] = [
        {
        id: 1,
        name: 'Jarro Calavera Artesanal',
        category: 'Jarros',
        price: 15000,
        image: '/jarros/jarro-calavera-1.png',
        description: 'Jarro hecho a mano con masilla de artesano. Diseño de calavera única, perfecto para café o cerveza. Cada pieza es única.',
        stock: 5,
        rating: 5,
        material: 'Masilla de artesano',
        size: '350ml'
        },
        {
        id: 2,
        name: 'Jarro Construcción Heavy Duty',
        category: 'Jarros',
        price: 12000,
        image: '/jarros/jarro-construccion.png',
        description: 'Jarro robusto con diseño de herramientas. Ideal para trabajadores de la construcción. Resistente y duradero.',
        stock: 8,
        rating: 5,
        material: 'Masilla de artesano reforzada',
        size: '400ml'
        },
        {
        id: 3,
        name: 'Set Calaveras Mini',
        category: 'Manualidades',
        price: 8000,
        image: '/jarros/calaveras-mini.png',
        description: 'Set de 3 calaveras decorativas hechas en masilla. Perfectas para decoración de escritorio o estantes.',
        stock: 10,
        rating: 4,
        material: 'Masilla de artesano',
        size: 'Aprox. 5cm cada una'
        },
        {
        id: 4,
        name: 'Jarro Skull Worker',
        category: 'Jarros',
        price: 18000,
        image: '/jarros/jarro-skull-worker.png',
        description: 'Jarro premium con calavera de trabajador con casco. Diseño exclusivo y acabado profesional.',
        stock: 4,
        rating: 5,
        material: 'Masilla de artesano premium',
        size: '450ml'
        },
        {
        id: 5,
        name: 'Portavelas Calavera Industrial',
        category: 'Manualidades',
        price: 10000,
        image: '/jarros/portavelas-calavera.png',
        description: 'Portavelas artesanal con estilo industrial. Combina calavera con elementos de construcción.',
        stock: 6,
        rating: 5,
        material: 'Masilla de artesano',
        size: '10cm alto'
        },
        {
        id: 6,
        name: 'Jarro Doble Calavera',
        category: 'Jarros',
        price: 20000,
        image: '/jarros/jarro-doble.png',
        description: 'Diseño especial con dos calaveras entrelazadas. Pieza de colección única y llamativa.',
        stock: 3,
        rating: 5,
        material: 'Masilla de artesano premium',
        size: '500ml'
        },
        {
        id: 7,
        name: 'Llavero Herramientas',
        category: 'Manualidades',
        price: 3500,
        image: '/jarros/llavero-herramientas.png',
        description: 'Llavero con miniatura de herramientas de construcción. Hecho a mano con detalle.',
        stock: 15,
        rating: 4,
        material: 'Masilla de artesano',
        size: '4cm'
        },
        {
        id: 8,
        name: 'Taza Calavera Clásica',
        category: 'Jarros',
        price: 14000,
        image: '/jarros/taza-clasica.png',
        description: 'Taza estilo clásico con grabado de calavera. Perfecta para uso diario o regalo.',
        stock: 7,
        rating: 5,
        material: 'Masilla de artesano',
        size: '300ml'
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

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-black via-zinc-900 to-orange-900 text-white py-16 border-b-4 border-orange-600">
            <div className="absolute inset-0 opacity-5 text-6xl">
            <div className="grid grid-cols-8 gap-8 p-8">
                {[...Array(40)].map((_, i) => (
                <div key={i} className="animate-pulse">💀</div>
                ))}
            </div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                <Skull className="w-16 h-16 text-orange-500" />
                <h2 className="text-6xl font-black">JARROS ARTESANALES</h2>
                <Hammer className="w-16 h-16 text-orange-500" />
                </div>
                <p className="text-xl text-gray-300 mb-4">
                Cada pieza es única, hecha a mano con masilla de artesano.
                <br />Arte funcional con actitud extrema.
                </p>
                <div className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg font-bold">
                💀 100% Artesanal | 🔨 Hecho en Chile
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
                    <div className="text-9xl">
                        {product.category === 'Jarros' ? '🍺' : '🎨'}
                    </div>
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
                        <Heart 
                            className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                        />
                        </button>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-2">
                        📏 {product.size} | 🛠️ {product.material}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i}
                            className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                        />
                        ))}
                        <span className="text-xs text-gray-500 ml-2">Stock: {product.stock}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-500">
                        ${formatPrice(product.price)}
                        </span>
                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                        >
                        <ShoppingCart className="w-4 h-4" />
                        Agregar
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
                    <div className="bg-black rounded-xl p-8 flex items-center justify-center">
                    <div className="text-9xl">
                        {selectedProduct.category === 'Jarros' ? '🍺' : '🎨'}
                    </div>
                    </div>

                    <div>
                    <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {selectedProduct.category}
                    </span>

                    <div className="mb-6 pb-6 border-b border-zinc-800">
                        <p className="text-sm text-gray-400 mb-1">Precio:</p>
                        <p className="text-5xl font-bold text-orange-500">${formatPrice(selectedProduct.price)}</p>
                    </div>

                    <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2 text-white">
                        <span className="font-bold">📏 Tamaño:</span>
                        <span className="text-gray-300">{selectedProduct.size}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                        <span className="font-bold">🛠️ Material:</span>
                        <span className="text-gray-300">{selectedProduct.material}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                        <span className="font-bold">📦 Stock:</span>
                        <span className="text-gray-300">{selectedProduct.stock} unidades</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                        addToCart(selectedProduct);
                        closeProductDetail();
                        }}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 mb-6"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Agregar al Carrito
                    </button>

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