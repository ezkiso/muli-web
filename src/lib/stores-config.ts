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
    path: string;
}

// Configuración de todas las tiendas
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
        path: '/stores/desobediencia'
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
        path: '/stores/contruhazard' 
    },
    nicolapso: {
        id: 'nicolapso',
        name: 'Nicolapso Tatuajes',
        slug: 'nicolapso',
        description: 'TRADICIONAL - BLACKWORK',
        primaryColor: '#E8DCC4',
        secondaryColor: '#0A0A0A',
        accentColor: '#FF4D6D',
        logo: '/nicolapso/icon.jpg',
        whatsapp: '+56994868300',
        instagram: 'nicolapso_tatuajes',
        facebook: 'nicolapso.qu',
        storeType: 'tattoo',
        path: '/stores/nicolapso' 
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

// Función helper para obtener el path de una tienda
export function getStorePath(storeId: StoreId): string {
    return `/stores/${storeId}`;
}