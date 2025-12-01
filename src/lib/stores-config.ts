// src/lib/stores-config.ts
export interface Store{
    id: string;
    name: string;
    description: string;
    path: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string;
}

export const STORES: Store [] = [
    {
        id: 'serigrafia',
        name: 'Desobediencia',
        description: 'Serigrafía & Estampados',
        path: '/stores/desobediencia',
        primaryColor: '#000000',
        secondaryColor: '#800020',
        logo: '/desobediencia/icon.png'
    },
    {
        id: 'construccion',
        name: 'ContruHazard',
        description: 'Construcción & Remodelaciones',
        path: '/stores/contruhazard',
        primaryColor: '#FF6B00', // Naranja construcción
        secondaryColor: '#1a1a1a', // Negro oscuro
        logo: '💀' // Temporal hasta que tengas el logo
    },
    {
        id: 'copete',
        name: 'Fono Copete',
        description: 'Delivery de Alcohol 24/7',
        path: '/stores/fono-copete',
        primaryColor: '#7F1D1D', // Rojo oscuro
        secondaryColor: '#065F46', 
        logo: '/fono-copete/icon.png'
    }
];