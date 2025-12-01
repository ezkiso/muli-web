// src/app/stores/contruhazard/page.tsx
import Link from 'next/link';
import StoreSelector from '@/components/shared/StoreSelector';
import { ShoppingCart, Heart, Search, Instagram, Facebook, Phone, Mail, MapPin, Hammer, HardHat, Wrench, Home, Building2, Skull } from 'lucide-react';
import Image from 'next/image';

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
        { id: 1, title: 'Remodelación Casa', emoji: '🏠💀' },
        { id: 2, title: 'Construcción Nueva', emoji: '🏗️💀' },
        { id: 3, title: 'Ampliación Segundo Piso', emoji: '🏢💀' },
        { id: 4, title: 'Terraza y Quinchos', emoji: '🏡💀' },
        { id: 5, title: 'Baños y Cocinas', emoji: '🚿💀' },
        { id: 6, title: 'Pintura y Acabados', emoji: '🎨💀' }
    ];

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

        {/* Hero Section - Banner principal con calaveras */}
        <section className="relative bg-gradient-to-r from-black via-zinc-900 to-orange-900 text-white py-24 overflow-hidden">
            {/* Patrón de calaveras de fondo */}
            <div className="absolute inset-0 opacity-5 text-6xl">
            <div className="grid grid-cols-8 gap-8 p-8">
                {[...Array(40)].map((_, i) => (
                <div key={i} className="animate-pulse">💀</div>
                ))}
            </div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                <Skull className="w-12 h-12 text-orange-500" />
                <HardHat className="w-12 h-12 text-orange-500" />
                </div>
                <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                CONSTRUCCIÓN<br />
                <span className="text-orange-500">SIN MIEDO</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 flex items-center gap-2">
                <Skull className="w-6 h-6 text-orange-500" />
                Trabajos de construcción y remodelación con la mejor calidad.
                <br />Experiencia, compromiso y actitud extrema.
                </p>
                <div className="flex flex-wrap gap-4">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Cotizar Ahora
                </button>
                <button className="border-2 border-orange-500 hover:bg-orange-500 hover:text-black px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Ver Proyectos
                </button>
                </div>
            </div>
            </div>
        </section>

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

        {/* Galería de trabajos */}
        <section id="galeria" className="py-16 bg-black">
            <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-black text-white mb-4 flex items-center justify-center gap-3">
                💀 NUESTROS TRABAJOS 💀
                </h2>
                <p className="text-gray-400">Proyectos que hablan por sí solos</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {gallery.map((item) => (
                <div 
                    key={item.id}
                    className="group relative bg-zinc-900 rounded-xl overflow-hidden border-2 border-zinc-800 hover:border-orange-500 transition-all duration-300"
                >
                    <div className="h-64 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-9xl group-hover:scale-110 transition-transform">
                    {item.emoji}
                    </div>
                    <div className="p-4 bg-black">
                    <h3 className="font-bold text-white text-center">{item.title}</h3>
                    </div>
                </div>
                ))}
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

        {/* Footer con calaveras */}
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
                <p className="text-gray-500 text-sm">
                © 2024 ContruHazard. Todos los derechos reservados. 💀🔨
                </p>
            </div>
            </div>
        </footer>
        </div>

    );
}