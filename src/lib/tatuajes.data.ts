// src/lib/tatuajes.data.ts
// Datos de ejemplo - REEMPLAZAR con queries a Supabase en producción

import { TattooWork } from './tatuajes.types';

export const MOCK_TATTOOS: TattooWork[] = [
  {
    id: 'd-001',
    title: '🥷🏻',
    imageUrl: '/nicolapso/bebe.jpg',
    category: 'diseños',
    style: ['TRAD-TATTO', 'BLACK-TATTO'],
    tags: ['corazón', 'ornamental', 'TRAD-TATTO']
  },
  {
    id: 'd-002',
    title: 'Madball 👹⚾🔥',
    description: 'Disponible 💥',
    imageUrl: '/nicolapso/madball.jpg',
    category: 'diseños',
    style: ['BLACK-TATTO', 'TRAD-TATTO'],
    tags: ['BLACK-TATTO']
  },
  {
    id: 'd-003',
    title: 'Disponibles 💥💥💥',
    imageUrl: '/nicolapso/diseños.jpg',
    category: 'diseños',
    style: ['BLACK-TATTO', 'TRAD-TATTO'],
    tags: ['BLACK-TATTO']
  },
  {
    id: 'd-004',
    title: 'Mangual',
    description: 'Disponible 💥',
    imageUrl: '/nicolapso/mangual.jpg',
    style: ['TRAD-TATTO'],
    category: 'diseños',
    tags: ['armas', 'TRAD-TATTO']
  },
  {
    id: 'd-005',
    title: 'Disponible 🐯',
    imageUrl: '/nicolapso/tigre.jpg',
    category: 'diseños',
    style: ['TRAD-TATTO'],
    tags: ['animales', 'TRAD-TATTO']
  },
  {
    id: 'd-006',
    title: 'Disponible 💃👹',
    imageUrl: '/nicolapso/mujer.jpg',
    category: 'diseños',
    style: ['TRAD-TATTO', 'BLACK-TATTO'],
    tags: ['caras', 'TRAD-TATTO']
  },
  {
    id: 'd-007',
    title: 'Disponible 🥋🥋🥋🥋',
    imageUrl: '/nicolapso/mujer-cuchillo.jpg',
    category: 'diseños',
    style: ['TRAD-TATTO'],
    tags: ['caras', 'TRAD-TATTO', 'armas']
  },
  {
    id: 'd-008',
    title: '🐱🤡',
    imageUrl: '/nicolapso/gato.jpg',
    category: 'diseños',
    style: ['TRAD-TATTO',],
    tags: ['animales', 'TRAD-TATTO']
  },

  // Trabajos realizados
  {
    id: 'r-001',
    title: '🧙‍♀️🧹',
    imageUrl: '/nicolapso/tr-bruja.jpg',
    category: 'realizados',
    style: ['TRAD-TATTO'],
    tags: ['TRAD-TATTO']
  },
  {
    id: 'r-002',
    title: '🐍🐍🐍🐍',
    imageUrl: '/nicolapso/tr-serpiente.jpg',
    category: 'realizados',
    style: ['TRAD-TATTO', 'BLACK-TATTO'],
    tags: ['TRAD-TATTO', 'BLACK-TATTO']
  },
  {
    id: 'r-003',
    title: 'Bathory',
    imageUrl: '/nicolapso/tr-bathory.jpg',
    category: 'realizados',
    style: ['BLACK-TATTO'],
    tags: ['BLACK-TATTO']
  },
  {
    id: 'r-004',
    title: 'Ozzy 💖💖🗣️🗣️',
    imageUrl: '/nicolapso/tr-gato-comiendo-murcielago.jpg',
    category: 'realizados',
    style: ['BLACK-TATTO', 'TRAD-TATTO'],
    tags: ['BLACK-TATTO', 'TRAD-TATTO', 'animales'],
  },
  {
    id: 'r-005',
    title: 'Roma 🐶',
    imageUrl: '/nicolapso/tr-perrito.jpg',
    category: 'realizados',
    style: ['TRAD-TATTO'],
    tags: ['TRAD-TATTO', 'animales'],
  },
  {
    id: 'r-006',
    title: '💀🕯️🕸️',
    imageUrl: '/nicolapso/tr-vela.jpg',
    category: 'realizados',
    style: ['TRAD-TATTO', 'BLACK-TATTO'],
    tags: ['TRAD-TATTO', 'BLACK-TATTO', 'calaveras'],
  },

];

// Funciones helper
export const getTattoosByCategory = (category: string): TattooWork[] => {
  if (category === 'todos') return MOCK_TATTOOS;
  return MOCK_TATTOOS.filter(work => work.category === category);
};

export const getTattoosByStyle = (style: string): TattooWork[] => {
  return MOCK_TATTOOS.filter(work => work.style.includes(style));
};

export const searchTattoos = (query: string): TattooWork[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_TATTOOS.filter(work => 
    work.title.toLowerCase().includes(lowerQuery) ||
    work.description?.toLowerCase().includes(lowerQuery) ||
    work.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    work.style.some(s => s.toLowerCase().includes(lowerQuery))
  );
};

export const getAvailableFlashTattoos = (): TattooWork[] => {
  return MOCK_TATTOOS.filter(work => work.category === 'flash' && work.available);
};