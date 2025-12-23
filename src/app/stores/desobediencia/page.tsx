// src/app/stores/desobediencia/page.tsx
'use client'
import ShoppingCartComponent, { useCart } from '@/components/cart/ShoppingCart';
import Image from 'next/image';
import StoreSelector from '@/components/shared/StoreSelector';
import { useState, useEffect } from 'react';
import {  Heart, Search, Instagram, Facebook, Phone, Mail, MapPin, Grid, List, Star, Truck, CreditCard, Shield, X, ChevronLeft, ChevronRight, Package, AlertCircle, ShoppingCart } from 'lucide-react';
import { createClient } from '@supabase/supabase-js'
import { 
    getProductosDesobediencia,
    ProductoDesobediencia,
    calcularPrecioConTalla,
    obtenerEstadoStock,
    tieneStockEnTalla,  // ← AGREGAR
    obtenerEstadoStockTalla,  // ← AGREGAR
    getStockPorTalla  // ← AGREGAR
} from '@/lib/productos';

interface Product {
    id: number;
    name: string;
    category: 'Manga Corta' | 'Manga Larga';
    basePrice: number;  
    image: string;
    description: string;
    stock: number;
    images?: string[];
    variantes?: any[];
}

interface Size {
    name: 'S' | 'M' | 'L' | 'XL' | 'XXL';
    extraPrice: number;
}

export default function DesobedienciaFull() {
    // Estados principales (manteniendo exactamente los mismos)
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [sortBy, setSortBy] = useState('destacados');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { addToCart, getCartCount } = useCart();
    
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Estado nuevo para cargar productos desde la base de datos
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Cargar productos desde Supabase
    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                // Obtener productos de la base de datos
                const productosDB = await getProductosDesobediencia();
                
                // Convertir la estructura de la base de datos a la estructura del frontend
                const productosConvertidos: Product[] = productosDB.map(productoDB => ({
                    id: productoDB.id,
                    name: productoDB.name,
                    category: productoDB.category,
                    basePrice: productoDB.base_price,
                    image: productoDB.image,
                    description: productoDB.description,
                    stock: productoDB.total_stock,
                    images: productoDB.images || [productoDB.image],
                    variantes: productoDB.variantes || []
                }));
                
                setProducts(productosConvertidos);
            } catch (error) {
                console.error('Error cargando productos:', error);
                // Si hay error, mantener productos vacíos
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        
        loadProducts();
    }, []); // Se ejecuta solo una vez al montar el componente

    const sizes: Size[] = [
        { name: 'S', extraPrice: 0 },
        { name: 'M', extraPrice: 0 },
        { name: 'L', extraPrice: 0 },
        { name: 'XL', extraPrice: 0 },
        { name: 'XXL', extraPrice: 2000 }
    ];

    const categories = ['Todas', 'Manga Corta', 'Manga Larga'];

    const filteredProducts = products.filter(p => 
        selectedCategory === 'Todas' ? true : p.category === selectedCategory
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'precio-menor') return a.basePrice - b.basePrice;
        if (sortBy === 'precio-mayor') return b.basePrice - a.basePrice;
        if (sortBy === 'nombre') return a.name.localeCompare(b.name);
        return 0;
    });

    const toggleFavorite = (productId: number) => {
        if (favorites.includes(productId)) {
        setFavorites(favorites.filter(id => id !== productId));
        } else {
        setFavorites([...favorites, productId]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Mensaje enviado! Te contactaremos pronto.');
        setFormData({ name: '', email: '', message: '' });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL').format(price);
    };

    const openProductDetail = (product: Product) => {
        setSelectedProduct(product);
        setSelectedSize('M');
        setCurrentImageIndex(0);
    };

    const closeProductDetail = () => {
        setSelectedProduct(null);
    };

    const getCurrentPrice = () => {
        if (!selectedProduct) return 0;
        return calcularPrecioConTalla(selectedProduct.basePrice, selectedSize);
    };

    const addToCartFromDetail = () => {
        if (selectedProduct) {
            // Verificar stock de la talla seleccionada
            if (!tieneStockEnTalla(selectedProduct.variantes, selectedSize)) {
                alert(`⚠️ Talla ${selectedSize} agotada`);
                return;
            }
            
            addToCart(
                selectedProduct.id,
                selectedProduct.name,
                selectedProduct.image,
                selectedProduct.basePrice,
                selectedSize,
                selectedProduct.category
            );
            
            alert(`${selectedProduct.name} talla ${selectedSize} agregado al carrito!`);
            closeProductDetail();
        }
    };

    const nextImage = () => {
        if (selectedProduct?.images) {
        setCurrentImageIndex((prev) => 
            prev === selectedProduct.images!.length - 1 ? 0 : prev + 1
        );
        }
    };

    const prevImage = () => {
        if (selectedProduct?.images) {
        setCurrentImageIndex((prev) => 
            prev === 0 ? selectedProduct.images!.length - 1 : prev - 1
        );
        }
    };

    // Mostrar loading mientras se cargan los productos
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020] mx-auto mb-4"></div>
                    <p className="text-white text-lg">Cargando productos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
        <StoreSelector currentStoreId="serigrafia" />

        {/* Header */}
        <header className="bg-black text-white shadow-lg sticky top-0 z-40 border-b border-gray-800">
            <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative">
                    <Image 
                    src="/desobediencia/icon.png"
                    alt="Desobediencia Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">DESOBEDIENCIA</h1>
                    <p className="text-xs text-gray-400">Serigrafía</p>
                </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                <a href="#productos" className="text-white hover:text-[#800020] transition-colors">
                    Productos
                </a>
                <a href="#nosotros" className="text-white hover:text-[#800020] transition-colors">
                    Nosotros
                </a>
                <a href="#contacto" className="text-white hover:text-[#800020] transition-colors">
                    Contacto
                </a>
                </nav>

                <div className="flex gap-3">
                <button className="hover:bg-gray-900 p-2 rounded-lg transition">
                    <Search className="w-5 h-5" />
                </button>
                <button className="hover:bg-gray-900 p-2 rounded-lg transition relative">
                    <Heart className="w-5 h-5" />
                    {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#800020] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {favorites.length}
                    </span>
                    )}
                </button>
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="hover:bg-gray-900 p-2 rounded-lg transition relative"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#800020] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {getCartCount()}
                        </span>
                    )}
                </button>
                </div>
            </div>
            </div>
        </header>

        {/* Productos - PRIMERO */}
        <section id="productos" className="py-16 bg-black">
            <div className="container mx-auto px-4">
            {/* Logo y nombre circular como Jumpseller */}
            <div className="flex flex-col items-center mb-12">
                <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-[#800020] overflow-hidden mb-6 relative">
                <Image 
                    src="/desobediencia/icon.png"
                    alt="Desobediencia"
                    fill
                    className="object-cover"
                    priority
                />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">DESOBEDIENCIA</h1>
                <p className="text-gray-400 text-lg">Serigrafía</p>
            </div>

            {/* Filtros y Orden */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                    <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${
                        selectedCategory === cat
                        ? 'bg-[#800020] text-white'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    >
                    {cat}
                    </button>
                ))}
                </div>

                <div className="flex gap-4 items-center">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-gray-900 text-white border border-gray-800 rounded-lg"
                >
                    <option value="destacados">Destacados</option>
                    <option value="precio-menor">Precio: Menor a Mayor</option>
                    <option value="precio-mayor">Precio: Mayor a Menor</option>
                    <option value="nombre">Nombre A-Z</option>
                </select>

                <div className="flex gap-2">
                    <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#800020] text-white' : 'bg-gray-900 text-white'}`}
                    >
                    <Grid className="w-5 h-5" />
                    </button>
                    <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#800020] text-white' : 'bg-gray-900 text-white'}`}
                    >
                    <List className="w-5 h-5" />
                    </button>
                </div>
                </div>
            </div>

            {/* Grid de Productos */}
            {sortedProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-xl">No hay productos disponibles en este momento.</p>
                </div>
            ) : (
                <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
                {sortedProducts.map((product) => (
                <div 
                    key={product.id}
                    onClick={() => openProductDetail(product)}
                    className={`group bg-gray-900 rounded-xl shadow-md hover:shadow-2xl hover:shadow-[#800020]/20 transition-all duration-300 overflow-hidden cursor-pointer border border-gray-800 hover:border-[#800020] ${
                    viewMode === 'list' ? 'flex' : ''
                    }`}
                >
                    <div className={`bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative ${
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
                        <span className="text-xs font-semibold text-[#800020] uppercase tracking-wide">
                            {product.category}
                        </span>
                        <h3 className="font-bold text-lg mt-1 text-white">{product.name}</h3>
                        </div>
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                        }}
                        className="p-2 hover:bg-gray-800 rounded-full transition"
                        >
                        <Heart 
                            className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                        />
                        </button>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                    
                    {(() => {
                        const estadoStock = obtenerEstadoStock(product.stock);
                        return (
                            <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 ${estadoStock.clase}`}>
                                {estadoStock.mensaje}
                            </div>
                        );
                    })()}

                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-xs text-gray-500">Desde</p>
                        <span className="text-2xl font-bold text-white">
                            ${formatPrice(product.basePrice)}
                        </span>
                        </div>
                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            openProductDetail(product);
                        }}
                        className="bg-[#800020] hover:bg-[#600018] text-white px-4 py-2 rounded-lg text-sm transition-colors font-bold"
                        >
                        Ver Detalles
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
            </div>
        </section>

        {/* Beneficios */}
        <section className="py-12 bg-gray-900 border-y border-gray-800">
            <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4">
                <Truck className="w-10 h-10 mx-auto mb-3 text-[#800020]" />
                <h3 className="font-bold mb-1 text-sm text-white">Envío Internacional</h3>
                <p className="text-xs text-gray-400">A todo el mundo</p>
                </div>
                <div className="text-center p-4">
                <Shield className="w-10 h-10 mx-auto mb-3 text-[#800020]" />
                <h3 className="font-bold mb-1 text-sm text-white">Calidad Garantizada</h3>
                <p className="text-xs text-gray-400">Tintas duraderas</p>
                </div>
                <div className="text-center p-4">
                <CreditCard className="w-10 h-10 mx-auto mb-3 text-[#800020]" />
                <h3 className="font-bold mb-1 text-sm text-white">Pago Seguro</h3>
                <p className="text-xs text-gray-400">Múltiples métodos</p>
                </div>
                <div className="text-center p-4">
                <Star className="w-10 h-10 mx-auto mb-3 text-[#800020]" />
                <h3 className="font-bold mb-1 text-sm text-white">Diseños Únicos</h3>
                <p className="text-xs text-gray-400">100% originales</p>
                </div>
            </div>
            </div>
        </section>

        {/* Sobre Nosotros */}
        <section id="nosotros" className="py-16 bg-black border-t border-gray-800">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6 text-white">Sobre Desobediencia</h2>
                <p className="text-xl text-gray-300 mb-8">
                Nacimos de la pasión por la música alternativa, el post-punk y la cultura underground. 
                Cada diseño es una declaración de identidad, una rebeldía visual que se lleva con orgullo.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                Trabajamos con serigrafía tradicional, garantizando durabilidad y calidad en cada pieza. 
                Nuestros estampados son hechos a mano con tintas de primera calidad que resisten el paso del tiempo.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                    <div className="text-5xl font-bold text-[#800020] mb-2">5+</div>
                    <p className="text-gray-400">Años de Experiencia</p>
                </div>
                <div>
                    <div className="text-5xl font-bold text-[#800020] mb-2">1000+</div>
                    <p className="text-gray-400">Clientes Satisfechos</p>
                </div>
                <div>
                    <div className="text-5xl font-bold text-[#800020] mb-2">100%</div>
                    <p className="text-gray-400">Diseños Originales</p>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-16 bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Contáctanos</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                <h3 className="text-2xl font-bold mb-6 text-white">¿Tienes dudas sobre tu pedido?</h3>
                <p className="text-gray-400 mb-8">
                    Estamos aquí para ayudarte con cualquier consulta sobre tallas, envíos o productos.
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                    <div className="bg-[#800020] text-white p-3 rounded-lg">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">WhatsApp</p>
                        <p className="font-semibold text-white">+56 9 XXXX XXXX</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <div className="bg-black text-white p-3 rounded-lg border border-gray-800">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold text-white">contacto@desobediencia.cl</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <div className="bg-[#800020] text-white p-3 rounded-lg">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Ubicación</p>
                        <p className="font-semibold text-white">Santiago, Chile</p>
                    </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <a 
                    href="https://www.facebook.com/criakuerv?locale=es_LA" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                    >
                    <Facebook className="w-6 h-6" />
                    </a>
                    <a 
                    href="#" 
                    className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-lg transition-colors"
                    >
                    <Instagram className="w-6 h-6" />
                    </a>
                </div>
                </div>

                <div className="bg-black p-8 rounded-xl shadow-lg border border-gray-800">
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Nombre</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="Tu nombre"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Email</label>
                    <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="tu@email.com"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Mensaje</label>
                    <textarea 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        placeholder="Cuéntanos tu consulta..."
                    ></textarea>
                    </div>
                    <button 
                    onClick={handleSubmit}
                    className="w-full bg-[#800020] hover:bg-[#600018] text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                    Enviar Mensaje
                    </button>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 border-t border-gray-800">
            <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold">DESOBEDIENCIA</h3>
                <p className="text-gray-400 text-sm">Serigrafía & Diseños Únicos</p>
                </div>
                <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">© 2025 Desobediencia. Todos los derechos reservados.</p>
                <p className="text-gray-500 text-xs mt-1">Hecho en Chile</p>
                </div>
            </div>
            </div>
        </footer>

        {/* Modal de Detalle de Producto */}
        {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
                <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                <button 
                    onClick={closeProductDetail}
                    className="p-2 hover:bg-gray-800 rounded-full transition"
                >
                    <X className="w-6 h-6 text-white" />
                </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-6">
                {/* Galería de imágenes */}
                <div>
                    <div className="relative bg-gray-800 rounded-xl overflow-hidden mb-4" style={{ height: '400px' }}>
                    <Image 
                        src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-contain p-8"
                    />
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                        <>
                        <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                        </>
                    )}
                    </div>
                </div>
                
                {/* Información del producto */}
                <div>
                    <span className="inline-block bg-[#800020] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {selectedProduct.category}
                    </span>
                    
                    {/* Estado de Stock */}
                    {(() => {
                        const estadoStock = obtenerEstadoStock(selectedProduct.stock);
                        return (
                            <div className={`mb-6 px-4 py-2 rounded-lg ${estadoStock.clase} flex items-center gap-2`}>
                                {estadoStock.disponible ? (
                                    <Package className="w-5 h-5" />
                                ) : (
                                    <AlertCircle className="w-5 h-5" />
                                )}
                                <span className="font-bold">{estadoStock.mensaje}</span>
                            </div>
                        );
                    })()}
                                

                    {/* 1. PRECIO PRIMERO */}
                    <div className="mb-8 pb-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm text-gray-400 mb-1">Precio:</p>
                        <p className="text-5xl font-bold text-white">${formatPrice(getCurrentPrice())}</p>
                        </div>
                        {selectedSize === 'XXL' && (
                        <span className="bg-orange-900 text-orange-200 text-xs font-semibold px-3 py-1 rounded-full">
                            Talla especial
                        </span>
                        )}
                    </div>
                    </div>

                    {/* 2. SELECTOR DE TALLA SEGUNDO */}
                    <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <label className="font-semibold text-white text-lg">
                            Selecciona tu talla:
                        </label>
                        <span className="text-sm text-gray-400">
                            Stock: {getStockPorTalla(selectedProduct.variantes, selectedSize)} unidades
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => {
                            const estadoTalla = obtenerEstadoStockTalla(
                                selectedProduct.variantes,
                                size.name
                            );
                            
                            return (
                                <button
                                    key={size.name}
                                    onClick={() => setSelectedSize(size.name)}
                                    disabled={!estadoTalla.disponible}
                                    className={`py-3 px-4 rounded-lg font-semibold transition-all relative ${
                                        selectedSize === size.name
                                            ? 'bg-[#800020] text-white'
                                            : estadoTalla.disponible
                                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                                            : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                                    }`}
                                >
                                    <span className="block">{size.name}</span>
                                    {size.extraPrice > 0 && estadoTalla.disponible && (
                                        <span className="block text-xs mt-1">
                                            +${formatPrice(size.extraPrice)}
                                        </span>
                                    )}
                                    {!estadoTalla.disponible && (
                                        <span className="block text-xs mt-1 text-red-400">
                                            Agotado
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    </div>

                    {/* 3. BOTONES DE ACCIÓN */}
                    <div className="mb-8">
                    <button
                        onClick={addToCartFromDetail}
                        className="w-full bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 mb-3"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Agregar al Carrito
                    </button>

                    <button
                        onClick={() => toggleFavorite(selectedProduct.id)}
                        className="w-full border-2 border-gray-700 hover:border-red-500 text-white hover:text-red-500 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        {favorites.includes(selectedProduct.id) ? 'En Favoritos' : 'Agregar a Favoritos'}
                    </button>
                    </div>

                    {/* 4. DESCRIPCIÓN AL FINAL */}
                    <div className="pt-6 border-t border-gray-800">
                    <h3 className="font-bold text-white text-lg mb-3">Descripción del Producto</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
                    </div>
                </div>

                    
                {/* Precio y botón de compra */}
                <div className="border-t border-gray-800 pt-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                        <p className="text-sm text-gray-400">Precio total:</p>
                        <p className="text-4xl font-bold text-white">${formatPrice(getCurrentPrice())}</p>
                        </div>
                        {selectedSize === 'XXL' && (
                        <span className="bg-orange-900 text-orange-200 text-xs font-semibold px-3 py-1 rounded-full">
                            Talla especial
                        </span>
                        )}
                    </div>

                    <button
                        onClick={addToCartFromDetail}
                        className="w-full bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Agregar al Carrito
                    </button>

                    <button
                        onClick={() => toggleFavorite(selectedProduct.id)}
                        className="w-full mt-3 border-2 border-gray-700 hover:border-red-500 text-white hover:text-red-500 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        {favorites.includes(selectedProduct.id) ? 'En Favoritos' : 'Agregar a Favoritos'}
                    </button>
                    </div>
                </div>
                </div>
            </div>
        )}
        <ShoppingCartComponent isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        </div>
    );
}