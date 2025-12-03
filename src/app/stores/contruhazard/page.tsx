'use client';
import Link from 'next/link';
import StoreSelector from '@/components/shared/StoreSelector';
import { 
    ShoppingCart, 
    Heart, 
    Search, 
    Instagram, 
    Facebook, 
    Phone, 
    Mail, 
    MapPin, 
    Hammer, 
    HardHat, 
    Wrench, 
    Home, 
    Building2, 
    Skull,
    X, // ← Agregar X (icono de cerrar)
    ChevronLeft, // ← Agregar ChevronLeft
    ChevronRight // ← Agregar ChevronRight
} from 'lucide-react';import Image from 'next/image';
import { useState }from 'react';

export default function ContruHazard() {

    // Servicios destacados
    const services = [
        {
        id: 1,
        name: 'Remodelaciones Completas',
        description: 'Transformamos tu espacio',
        icon: '💀🔨',
        price: 'Cotización'
        },
        
        {
        id: 2,
        name: 'Construcción de Casas',
        description: 'Proyectos desde cero',
        icon: '💀🏗️',
        price: 'Cotización'
        },
        {
        id: 3,
        name: 'Ampliaciones',
        description: 'Más espacio para tu familia',
        icon: '💀📐',
        price: 'Cotización'
        },
        {
        id: 4,
        name: 'Trabajos Especializados',
        description: 'Albañilería y más',
        icon: '💀🧱',
        price: 'Cotización'
        }
    ];
    const gallery = [
        { id: 1, title: 'Closet desde 0', src: '/contruhazard/closet.jpg' },
        { id: 2, title: 'Reja', src: '/contruhazard/reja.jpg' },
        { id: 3, title: 'Ampliación Segundo Piso', emoji: '🏢💀' },
        { id: 4, title: 'Terraza y Quinchos', emoji: '🏡💀' },
        { id: 5, title: 'Baños y Cocinas', emoji: '🚿💀' },
        { id: 6, title: 'Pintura y Acabados', emoji: '🎨💀' }
    ];

    const [selectedImage, setSelectedImage] = useState<number | null>(null);


    const openModal = (id: number) => {
        setSelectedImage(id);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const goToPrev = () => {
        if (selectedImage === null) return;
        setSelectedImage(prev => prev === 1 ? gallery.length : (prev || 1) - 1);
    };

    const goToNext = () => {
        if (selectedImage === null) return;
        setSelectedImage(prev => prev === gallery.length ? 1 : (prev || 0) + 1);
    };

    return (
        <div className="min-h-screen bg-zinc-900">
            <StoreSelector currentStoreId="construccion" />
            {/* Header con tema de calaveras */}
            <header className="bg-black text-white shadow-2xl sticky top-0 z-50 border-b-4 border-orange-600">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo y nombre */}
                        <div className="flex items-center gap-3">
                            <div className="text-5xl animate-pulse">💀</div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-orange-500">
                                    CONTRU<span className="text-white">HAZARD</span>
                                </h1>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Skull className="w-3 h-3" />
                                    Construcción con Actitud
                                </p>
                            </div>
                        </div>

                        {/* Navegación */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#servicios" className="hover:text-orange-500 transition-colors flex items-center gap-1">
                                <Hammer className="w-4 h-4" />
                                Servicios
                            </a>
                            <a href="#galeria" className="hover:text-orange-500 transition-colors">
                                Galería
                            </a>
                            <a href="#contacto" className="hover:text-orange-500 transition-colors">
                                Contacto
                            </a>
                            {/* NUEVO: Enlace a Jarros con Masilla */}
                            <Link 
                                href="/stores/contruhazard/jarros"
                                className="hover:text-orange-500 transition-colors flex items-center gap-1 group"
                            >
                                <span className="text-xl group-hover:scale-110 transition-transform">💀</span>
                                <span>Jarros & Manualidades Artesanales</span>
                            </Link>
                        </nav>

                        {/* Iconos de acción */}
                        <div className="flex gap-3">
                            <button className="hover:bg-zinc-800 p-2 rounded-lg transition">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="hover:bg-zinc-800 p-2 rounded-lg transition relative">
                                <Phone className="w-5 h-5 text-orange-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Hero Section - Banner principal con calaveras (más pequeño) */}
            <section className="relative bg-gradient-to-r from-black via-zinc-900 to-orange-900 text-white py-12 overflow-hidden">
                {/* Patrón de calaveras de fondo */}
                <div className="absolute inset-0 opacity-5 text-2xl">
                    <div className="grid grid-cols-8 gap-4 p-4">
                        {[...Array(40)].map((_, i) => (
                            <div key={i} className="animate-pulse">💀</div>
                        ))}
                    </div>
                </div>
                
                {/* Contenedor principal */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Contenido de texto - Lado izquierdo */}
                        <div className="lg:w-1/2 max-w-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Skull className="w-6 h-6 text-orange-500" />
                                <HardHat className="w-6 h-6 text-orange-500" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                                CONSTRUCCIÓN<br />
                                <span className="text-orange-500">SIN MIEDO</span>
                            </h2>
                            <p className="text-base text-gray-300 mb-4 flex items-center gap-1">
                                <Skull className="w-4 h-4 text-orange-500" />
                                Trabajos de construcción y remodelación con la mejor calidad.
                                <br />Experiencia, compromiso y actitud extrema.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-1 text-sm">
                                    <Phone className="w-3 h-3" />
                                    Cotizar Ahora
                                </button>
                                <button className="border border-orange-500 hover:bg-orange-500 hover:text-black px-5 py-2 rounded-lg font-bold transition-all flex items-center gap-1 text-sm">
                                    <Building2 className="w-3 h-3" />
                                    Ver Proyectos
                                </button>
                            </div>
                        </div>
                        
                        {/* Carrusel de imágenes - Lado derecho */}
                        <div className="lg:w-1/2 relative overflow-hidden">
                            {/* Fondo para el carrusel */}
                            <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/50 z-10 pointer-events-none"></div>
                            
                            {/* Carrusel horizontal */}
                            <div className="flex space-x-4 animate-marquee py-4">
                                {/* Primera tanda de imágenes */}
                                {gallery.map((item) => (
                                    <div 
                                        key={`slide-${item.id}`}
                                        className="relative min-w-[180px] h-64 flex-shrink-0 rounded-xl overflow-hidden border-2 border-orange-500/40 shadow-2xl shadow-orange-900/30"
                                    >
                                        {item.src ? (
                                            <Image
                                                src={item.src}
                                                alt={item.title}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 180px, 200px"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-6xl">
                                                {item.emoji || '🏗️'}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                            <p className="text-white text-sm font-bold text-center">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Duplicado para efecto continuo */}
                                {gallery.map((item) => (
                                    <div 
                                        key={`slide-duplicate-${item.id}`}
                                        className="relative min-w-[180px] h-64 flex-shrink-0 rounded-xl overflow-hidden border-2 border-orange-500/40 shadow-2xl shadow-orange-900/30"
                                    >
                                        {item.src ? (
                                            <Image
                                                src={item.src}
                                                alt={item.title}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 180px, 200px"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-6xl">
                                                {item.emoji || '🏗️'}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                            <p className="text-white text-sm font-bold text-center">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section id="servicios" className="py-16 bg-zinc-900">
                <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                    <Skull className="w-10 h-10 text-orange-500" />
                    <h2 className="text-5xl font-black text-white">SERVICIOS</h2>
                    <Skull className="w-10 h-10 text-orange-500" />
                    </div>
                    <p className="text-gray-400">Construcción profesional con actitud extrema</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {services.map((service) => (
                    <div 
                        key={service.id}
                        className="group bg-black rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden border-2 border-zinc-800 hover:border-orange-500"
                    >
                        <div className="bg-gradient-to-br from-zinc-900 to-black h-48 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                        </div>
                        <div className="p-6">
                        <h3 className="font-bold text-xl text-white mb-2">{service.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-orange-500">
                            {service.price}
                            </span>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                            Consultar
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            <section id="galeria" className="py-16 bg-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-black text-white mb-4 flex items-center justify-center gap-3">
                            💀 NUESTROS TRABAJOS 💀
                        </h2>
                        <p className="text-gray-400">Haz clic en cualquier imagen para verla completa</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {gallery.map((item) => (
                            <div 
                                key={item.id}
                                className="group relative bg-zinc-900 rounded-xl overflow-hidden border-2 border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                                onClick={() => openModal(item.id)}
                            >
                                {/* Contenedor de imagen */}
                                <div className="h-64 relative bg-gradient-to-br from-zinc-800 to-black overflow-hidden">
                                    {item.src ? (
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                            {item.emoji || '🏗️'}
                                        </div>
                                    )}
                                    {/* Overlay en hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                                            <Search className="w-12 h-12 text-orange-500" />
                                            <span className="text-white font-bold text-sm">Ver más</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-black">
                                    <h3 className="font-bold text-white text-center">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal para imagen completa */}
            {selectedImage !== null && (
                <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4">
                    {/* Botón cerrar */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white hover:text-orange-500 z-50"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Botón anterior */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 z-50 bg-black/50 p-2 rounded-full"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Botón siguiente */}
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 z-50 bg-black/50 p-2 rounded-full"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Contenido del modal */}
                    <div className="relative w-full max-w-4xl h-[80vh]">
                        {(() => {
                            const item = gallery.find(img => img.id === selectedImage);
                            if (!item) return null;

                            return (
                                <>
                                    {/* Imagen */}
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        {item.src ? (
                                            <Image
                                                src={item.src}
                                                alt={item.title}
                                                fill
                                                className="object-contain"
                                                sizes="100vw"
                                                priority
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-9xl bg-gradient-to-br from-zinc-900 to-black">
                                                {item.emoji || '🏗️'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Título */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                        <h3 className="text-2xl font-bold text-white text-center">
                                            {item.title}
                                        </h3>
                                        <div className="flex justify-center mt-4">
                                            <span className="text-sm text-gray-400">
                                                {selectedImage} / {gallery.length}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {/* Miniaturas */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4">
                        {gallery.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedImage(item.id)}
                                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                                    selectedImage === item.id 
                                        ? 'border-orange-500 scale-110' 
                                        : 'border-transparent hover:border-white'
                                } transition-all`}
                            >
                                {item.src ? (
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xl bg-zinc-800">
                                        {item.emoji || '🏗️'}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Instrucciones */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
                        <span className="hidden md:inline">Usa ← → para navegar • ESC para salir</span>
                        <span className="md:hidden">Desliza para navegar • Toca para salir</span>
                    </div>
                </div>
            )}

             {/* Sección Especial: Jarros Artesanales */}
            <section className="py-16 bg-gradient-to-r from-orange-900 to-black border-y-4 border-orange-600">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <Skull className="w-16 h-16 text-orange-500 animate-bounce" />
                    <h2 className="text-5xl font-black text-white">JARROS ARTESANALES</h2>
                    <Hammer className="w-16 h-16 text-orange-500 animate-bounce" />
                </div>
                <p className="text-xl text-gray-300 mb-8">
                    Descubre nuestra colección exclusiva de jarros y manualidades hechas a mano con masilla de artesano.
                    Cada pieza es única. Arte funcional con actitud extrema.
                </p>
                <Link 
                    href="/stores/contruhazard/jarros"
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
                >
                    💀 VER JARROS ARTESANALES 🍺
                </Link>
                </div>
            </div>
            </section>
            {/* Sección de contacto con calaveras */}
            <section id="contacto" className="py-16 bg-zinc-900">
                <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Skull className="w-12 h-12 text-orange-500 animate-pulse" />
                        <h2 className="text-5xl font-black text-white">CONTÁCTANOS</h2>
                        <Skull className="w-12 h-12 text-orange-500 animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-400">¿Listo para construir tu proyecto?</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                    {/* Información de contacto */}
                    <div className="bg-black p-8 rounded-xl border-2 border-orange-500">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Skull className="w-6 h-6 text-orange-500" />
                        Información
                        </h3>
                        
                        <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-orange-600 text-white p-3 rounded-lg">
                            <Phone className="w-6 h-6" />
                            </div>
                            <div>
                            <p className="text-sm text-gray-400">Teléfono / WhatsApp</p>
                            <p className="font-bold text-white text-lg">+56 9 XXXX XXXX</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-orange-600 text-white p-3 rounded-lg">
                            <Mail className="w-6 h-6" />
                            </div>
                            <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="font-bold text-white text-lg">contacto@contruhazard.cl</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-orange-600 text-white p-3 rounded-lg">
                            <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                            <p className="text-sm text-gray-400">Ubicación</p>
                            <p className="font-bold text-white text-lg">Santiago, Chile</p>
                            </div>
                        </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                        <a 
                            href="https://www.facebook.com/eduardo.bobadilla.39948856?locale=es_LA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                        >
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a 
                            href="#" 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-lg transition-colors"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                        </div>
                    </div>
                    
                    {/* Formulario */}
                    <div className="bg-black p-8 rounded-xl border-2 border-zinc-800">
                        <h3 className="text-2xl font-bold text-white mb-6">Solicita tu Cotización</h3>
                        <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre</label>
                            <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Teléfono</label>
                            <input 
                            type="tel" 
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            placeholder="+56 9 XXXX XXXX"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Tipo de Proyecto</label>
                            <select className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white">
                            <option>Remodelación</option>
                            <option>Construcción Nueva</option>
                            <option>Ampliación</option>
                            <option>Otro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Detalles del Proyecto</label>
                            <textarea 
                            rows={3}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            placeholder="Cuéntanos sobre tu proyecto..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <Skull className="w-5 h-5" />
                            Enviar Cotización
                        </button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <footer className="bg-black text-white py-12 border-t-4 border-orange-600">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Skull className="w-8 h-8 text-orange-500" />
                            <h3 className="text-3xl font-black">
                                CONTRU<span className="text-orange-500">HAZARD</span>
                            </h3>
                            <Skull className="w-8 h-8 text-orange-500" />
                        </div>
                        <p className="text-gray-400 mb-4">Construcción con Actitud Extrema</p>
                        <p className="text-gray-500 text-sm mb-12">
                            © 2024 ContruHazard. Todos los derechos reservados. 💀🔨
                        </p>
                        
                        {/* Separador decorativo */}
                        <div className="flex items-center justify-center mb-16">
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                            <div className="mx-4 text-orange-500">💀</div>
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                        </div>
                    </div>
                </div>
                
                {/* Características con iconos de calaveras */}
                <section className="py-16 bg-black border-y-4 border-orange-600">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-6xl mb-4 group-hover:animate-bounce">💀</div>
                                <h3 className="font-bold text-lg text-white mb-2">+15 Años</h3>
                                <p className="text-gray-400 text-sm">De Experiencia</p>
                            </div>
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-6xl mb-4 group-hover:animate-bounce">🔨</div>
                                <h3 className="font-bold text-lg text-white mb-2">100% Calidad</h3>
                                <p className="text-gray-400 text-sm">Garantizada</p>
                            </div>
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-6xl mb-4 group-hover:animate-bounce">⚡</div>
                                <h3 className="font-bold text-lg text-white mb-2">Rapidez</h3>
                                <p className="text-gray-400 text-sm">Sin Sacrificar Calidad</p>
                            </div>
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-6xl mb-4 group-hover:animate-bounce">🎯</div>
                                <h3 className="font-bold text-lg text-white mb-2">Precisión</h3>
                                <p className="text-gray-400 text-sm">En Cada Detalle</p>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </div>
    );
}