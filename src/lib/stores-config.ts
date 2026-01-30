// src/lib/stores-config.ts
// ARCHIVO COMPLETO - REEMPLAZAR TODO EL CONTENIDO

/**
 * Configuración de todas las tiendas de la plataforma
 */

// Definir el tipo de una tienda
export interface StoreConfig {
    id: string;
    name: string;
    slug: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    storeType?: 'ecommerce' | 'tattoo';
    accentColor?: string;
}

// Configuración de todas las tiendas
// IMPORTANTE: usar 'as const' al final para tipos literales
export const STORES = {
    desobediencia: {
        id: 'desobediencia',
        name: 'Desobediencia',
        slug: 'desobediencia',
        description: 'Ropa urbana con actitud',
        primaryColor: '#FF6B35',
        secondaryColor: '#2C3E50',
        logo: '/desobediencia/icon.png',
        storeType: 'ecommerce',
    },
    contruhazard: {
        id: 'contruhazard',
        name: 'Contruhazard',
        slug: 'contruhazard',
        description: 'Construcción y seguridad industrial',
        primaryColor: '#FFA500',
        secondaryColor: '#1C1C1C',
        logo: ' 💀 ',
        storeType: 'ecommerce',
    },
    nicolapso: {
        id: 'nicolapso',
        name: 'Nicolapso Tatuajes',
        slug: 'nicolapso',
        description: 'Dotwork & Blackwork',
        primaryColor: '#E8DCC4',
        secondaryColor: '#0A0A0A',
        accentColor: '#FF4D6D',
        logo: '/nicolapso/icon.jpg',
        whatsapp: '+56912345678', // ⚠️ CAMBIAR POR NÚMERO REAL
        instagram: 'nicolapso_tatuajes',
        facebook: 'nicolapso.qu',
        storeType: 'tattoo',
    },
} as const; // ← IMPORTANTE: 'as const' hace que TypeScript sepa que es un objeto, no un array

// Tipo que representa los IDs válidos de tiendas
export type StoreId = keyof typeof STORES;

// Función helper para obtener la configuración de una tienda
export function getStoreConfig(storeId: StoreId): StoreConfig {
    return STORES[storeId] as StoreConfig;
}

// Función helper para obtener todas las tiendas como array
export function getAllStores(): StoreConfig[] {
    return Object.values(STORES) as StoreConfig[];
}

// Verificar si un slug es válido
export function isValidStoreSlug(slug: string): slug is StoreId {
    return Object.values(STORES).some((store) => store.slug === slug);
}

// Obtener tienda por slug
export function getStoreBySlug(slug: string): StoreConfig | undefined {
    const entry = Object.entries(STORES).find(([_, store]) => store.slug === slug);
    return entry ? (entry[1] as StoreConfig) : undefined;
}