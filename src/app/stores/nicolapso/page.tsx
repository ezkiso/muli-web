'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    MessageCircle, 
    Instagram, 
    Facebook,
    Search,
    Grid3x3,
    List,
    MapPin,
    Clock,
    Award,
    Sparkles,
    Filter,
    X,
    ChevronDown,
    Calendar,
    } from 'lucide-react';
import { STORES } from '@/lib/stores-config';
import { TATTOO_CATEGORIES, TATTOO_STYLES, TattooWork } from '@/lib/tatuajes.types';
import { MOCK_TATTOOS, getTattoosByCategory } from '@/lib/tatuajes.data';
import TattooCard from '@/components/nicolapso/TattooCard';
import TattooModal from '@/components/nicolapso/TattooModal';
import StoreSelector from '@/components/shared/StoreSelector';

const storeConfig = STORES.nicolapso;

export default function NicolapsoTatuajesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('todos');
    const [selectedStyle, setSelectedStyle] = useState<string>('todos');
    const [selectedTattoo, setSelectedTattoo] = useState<TattooWork | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Filtrado de tatuajes
    const filteredTattoos = useMemo(() => {
        let result = MOCK_TATTOOS;

        if (selectedCategory !== 'todos') {
            result = result.filter(t => t.category === selectedCategory);
        }

        if (selectedStyle !== 'todos') {
            result = result.filter(t => t.style.includes(selectedStyle));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.title.toLowerCase().includes(query) ||
                t.description?.toLowerCase().includes(query) ||
                t.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return result;
    }, [selectedCategory, selectedStyle, searchQuery]);

    const handleTattooClick = (tattoo: TattooWork) => {
        setSelectedTattoo(tattoo);
        setIsModalOpen(true);
    };

    const whatsappLink = `https://wa.me/${storeConfig.whatsapp?.replace(/[^\d]/g, '')}?text=Hola!%20Me%20interesa%20agendar%20una%20cita%20para%20un%20tatuaje`;
    
    return (
        
        <div className="min-h-screen bg-linear-to-br from-stone-950 via-zinc-950 to-neutral-950">
            {/* Hero Section */}
            <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-stone-950/50 to-stone-950" />
                
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e8dcc4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
                    <div className="mb-6 relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-600/30 shadow-2xl shadow-amber-900/50 bg-stone-900">
                            <Image
                                src="/nicolapso/icon.jpg"
                                alt="Nicolapso Tatuajes"
                                width={160}
                                height={160}
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full shadow-lg">
                            <Sparkles className="w-5 h-5" />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-linear-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
                        Nicolapso Tatuajes
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-stone-300 mb-3 max-w-2xl">
                        Arte corporal personalizado
                    </p>
                    
                    <p className="text-md text-stone-400 mb-8 max-w-xl">
                        BLACK // TRAD TATTOS
                    </p>

                    <div className="flex flex-wrap gap-6 md:gap-12 justify-center mb-8 text-stone-300">
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">+10 años de experiencia</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">Diseños únicos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">Santiago, Chile</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-linear-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-green-900/50 hover:shadow-green-900/70 hover:scale-105"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Agenda tu Cita</span>
                        </a>
                        
                        <a
                            href="#galeria"
                            className="flex items-center justify-center gap-3 bg-zinc-800/50 hover:bg-zinc-800 backdrop-blur-sm border-2 border-amber-600/30 hover:border-amber-600 text-amber-400 font-bold py-4 px-8 rounded-xl transition-all duration-300"
                        >
                            <Grid3x3 className="w-5 h-5" />
                            <span>Ver Galería</span>
                        </a>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <a
                            href={`https://instagram.com/${storeConfig.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-zinc-900/70 backdrop-blur-sm rounded-full hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-stone-300 hover:text-white hover:scale-110"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href={`https://facebook.com/${storeConfig.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-zinc-900/70 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-all duration-300 text-stone-300 hover:text-white hover:scale-110"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-amber-500/50" />
                </div>
            </section>

            {/* Sección de categorías rápidas */}
            <section className="py-12 bg-zinc-900/30 border-y border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {TATTOO_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    selectedCategory === category.id
                                        ? 'bg-linear-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/50'
                                        : 'bg-zinc-800/50 text-stone-300 hover:bg-zinc-800 border border-zinc-700'
                                }`}
                            >
                                <span>{category.name}</span>
                                <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">
                                    {getTattoosByCategory(category.id).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección de galería */}
            <section id="galeria" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-2">
                            Galería de Trabajos
                        </h2>
                        <p className="text-stone-400">
                            Explora nuestros diseños y trabajos realizados
                        </p>
                    </div>

                    <div className="mb-8 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, estilo o tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-800 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4 text-stone-400" />
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-stone-300 hover:bg-zinc-800 transition-colors"
                            >
                                <Filter className="w-5 h-5" />
                                <span>Filtros</span>
                            </button>

                            <div className="flex gap-2 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-3 rounded-lg transition-colors ${
                                        viewMode === 'grid'
                                            ? 'bg-amber-600 text-white'
                                            : 'text-stone-400 hover:text-stone-200'
                                    }`}
                                >
                                    <Grid3x3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 rounded-lg transition-colors ${
                                        viewMode === 'list'
                                            ? 'bg-amber-600 text-white'
                                            : 'text-stone-400 hover:text-stone-200'
                                    }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                            <div className="flex flex-col md:flex-row gap-4">
                                <select
                                    value={selectedStyle}
                                    onChange={(e) => setSelectedStyle(e.target.value)}
                                    className="px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600"
                                >
                                    <option value="todos">Todos los estilos</option>
                                    {TATTOO_STYLES.map((style) => (
                                        <option key={style} value={style}>{style}</option>
                                    ))}
                                </select>

                                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/30 border border-zinc-800 rounded-xl text-stone-400">
                                    <span className="text-sm">
                                        {filteredTattoos.length} {filteredTattoos.length === 1 ? 'resultado' : 'resultados'}
                                    </span>
                                </div>

                                {(selectedCategory !== 'todos' || selectedStyle !== 'todos' || searchQuery) && (
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('todos');
                                            setSelectedStyle('todos');
                                            setSearchQuery('');
                                        }}
                                        className="flex items-center gap-2 px-4 py-3 bg-red-900/20 border border-red-800/30 rounded-xl text-red-400 hover:bg-red-900/30 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        <span className="text-sm">Limpiar filtros</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredTattoos.length > 0 ? (
                        <div className={`grid gap-6 ${
                            viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                        }`}>
                            {filteredTattoos.map((tattoo) => (
                                <TattooCard
                                    key={tattoo.id}
                                    tattoo={tattoo}
                                    onClick={() => handleTattooClick(tattoo)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-semibold text-stone-300 mb-2">
                                No se encontraron resultados
                            </h3>
                            <p className="text-stone-500 mb-6">
                                Intenta ajustar los filtros o términos de búsqueda
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('todos');
                                    setSelectedStyle('todos');
                                    setSearchQuery('');
                                }}
                                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>
            </section>


            {/* Sección de proceso */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-3">
                            Cómo Funciona
                        </h2>
                        <p className="text-stone-400 max-w-2xl mx-auto">
                            El proceso para conseguir tu tatuaje personalizado es simple
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                step: '01',
                                icon: MessageCircle,
                                title: 'Contacto Inicial',
                                description: 'Conversamos sobre tu idea y preferencias por WhatsApp',
                            },
                            {
                                step: '02',
                                icon: Sparkles,
                                title: 'Diseño Personalizado',
                                description: 'Creo un diseño único basado en tus gustos y zona del cuerpo',
                            },
                            {
                                step: '03',
                                icon: Calendar,
                                title: 'Agendamos Cita',
                                description: 'Coordinamos fecha y hora que mejor te acomode',
                            },
                            {
                                step: '04',
                                icon: Award,
                                title: 'Sesión de Tatuaje',
                                description: 'Tu diseño cobra vida en un ambiente cómodo y profesional',
                            },
                        ].map((item) => (
                            <div key={item.step} className="relative">
                                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-amber-600/50 transition-all duration-300">
                                    <div className="text-5xl font-bold text-amber-600/20 mb-4">
                                        {item.step}
                                    </div>
                                    <div className="p-3 bg-amber-600/20 rounded-xl w-fit mb-4">
                                        <item.icon className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-stone-100 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-stone-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-zinc-950 border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-amber-600/20 shadow-2xl shadow-amber-900/30 bg-linear-to-br from-zinc-900 to-stone-900 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="text-8xl mb-4">🎨</div>
                                    <p className="text-stone-400 text-sm">Foto del artista</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-linear-to-br from-amber-600 to-amber-700 text-white p-6 rounded-2xl shadow-xl">
                                <p className="text-sm font-semibold mb-1">Especializado en</p>
                                <p className="text-2xl font-bold">TRAD TATTOS</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">
                                Sobre Mí
                            </h2>
                            <p className="text-stone-300 mb-6 text-lg leading-relaxed">
                                Soy Nicolapso, tatuador especializado en técnicas de{' '}
                                <span className="text-amber-400 font-semibold">BLACK TATTOS</span> y{' '}
                                <span className="text-amber-400 font-semibold">TRAD TATTOS</span>. 
                                Con más de 10 años de experiencia, me dedico a transformar tus ideas 
                                en arte corporal único que cuente tu historia.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-600/20 rounded-xl">
                                        <Sparkles className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-stone-100 mb-1">Diseños 100% Personalizados</h3>
                                        <p className="text-sm text-stone-400">
                                            Cada tatuaje es único, creado específicamente para ti a partir de tus ideas
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-600/20 rounded-xl">
                                        <Award className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-stone-100 mb-1">Experiencia Garantizada</h3>
                                        <p className="text-sm text-stone-400">
                                            Más de 10 años perfeccionando técnicas avanzadas de tatuaje
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-600/20 rounded-xl">
                                        <MapPin className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-stone-100 mb-1">Studio Profesional</h3>
                                        <p className="text-sm text-stone-400">
                                            Ambiente cómodo, seguro y esterilizado en Santiago
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-linear-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-green-900/50 hover:scale-105"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>Consulta Disponibilidad</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modal de tatuaje */}
            <TattooModal
                tattoo={selectedTattoo}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTattoo(null);
                }}
            />

            {/* Botón flotante de WhatsApp */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-40 p-4 bg-linear-to-r from-green-600 to-green-500 text-white rounded-full shadow-2xl shadow-green-900/50 hover:scale-110 transition-all duration-300 animate-bounce"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle className="w-6 h-6" />
            </a>
        </div>
    );
}