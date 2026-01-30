// src/lib/tatuajes.types.ts
// Tipos para la galería de tatuajes

export interface TattooWork {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    thumbnailUrl?: string;
    category: 'realizado' | 'diseño' | 'flash';
    style: string[]; // ['dotwork', 'blackwork', 'linework', etc.]
    bodyPart?: string;
    size?: 'pequeño' | 'mediano' | 'grande';
    date?: string;
    tags?: string[];
    available?: boolean; // Para flash tattoos
    }

    export interface TattooCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    }

    export const TATTOO_CATEGORIES: TattooCategory[] = [
    {
        id: 'todos',
        name: 'Todos',
        slug: 'todos',
        description: 'Toda la galería',
        icon: 'grid-3x3',
    },
    {
        id: 'realizados',
        name: 'Trabajos Realizados',
        slug: 'realizados',
        description: 'Tatuajes completados',
        icon: 'check-circle',
    },
    {
        id: 'diseños',
        name: 'Diseños Disponibles',
        slug: 'diseños',
        description: 'Diseños listos para tatuar',
        icon: 'palette',
    },
    {
        id: 'flash',
        name: 'Flash Tattoos',
        slug: 'flash',
        description: 'Diseños únicos - Una sola sesión',
        icon: 'zap',
    },
    ];

    export const TATTOO_STYLES = [
    'Dotwork',
    'Blackwork',
    'Linework',
    'Traditional',
    'Neo-traditional',
    'Realismo',
    'Minimalista',
    'Ornamental',
    'Geométrico',
    'Fine Line',
    ];

    export const BODY_PARTS = [
    'Brazo',
    'Antebrazo',
    'Muñeca',
    'Mano',
    'Pierna',
    'Muslo',
    'Pantorrilla',
    'Tobillo',
    'Pie',
    'Espalda',
    'Pecho',
    'Costillas',
    'Cuello',
    'Hombro',
    ];