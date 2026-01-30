// src/lib/tatuajes.data.ts
// Datos de ejemplo - REEMPLAZAR con queries a Supabase en producción

import { TattooWork } from './tatuajes.types';

export const MOCK_TATTOOS: TattooWork[] = [
  {
    id: 'd-001',
    title: '🥷🏻',
    imageUrl: '/nicolapso/bebe.jpg',
    category: 'diseño',
    style: ['Dotwork', 'Blackwork'],
    tags: ['corazón', 'ornamental', 'dotwork']
  },
  {
    id: 'd-002',
    title: 'Madball 👹⚾🔥',
    description: 'Disponible 💥',
    imageUrl: '/nicolapso/madball.jpg',
    category: 'diseño',
    style: ['Blackwork', 'Dotwork'],
    tags: ['blackwork']
  },
  {
    id: 'd-003',
    title: 'Disponibles 💥💥💥',
    imageUrl: '/nicolapso/diseños.jpg',
    category: 'diseño',
    style: ['Blackwork', 'Dotwork'],
    tags: ['blackwork']
  },
  {
    id: 'd-004',
    title: 'Mangual',
    description: 'Disponible 💥',
    imageUrl: '/nicolapso/mangual.jpg',
    style: ['Dotwork'],
    category: 'diseño',
    tags: ['armas', 'dotwork']
  },
  {
    id: 'd-005',
    title: 'Disponible 🐯',
    imageUrl: '/nicolapso/tigre.jpg',
    category: 'diseño',
    style: ['Dotwork'],
    tags: ['animales', 'dotwork']
  },
  {
    id: 'd-006',
    title: 'Disponible 💃👹',
    imageUrl: '/nicolapso/mujer.jpg',
    category: 'diseño',
    style: ['Dotwork', 'Blackwork'],
    tags: ['caras', 'dotwork']
  },
  {
    id: 'd-007',
    title: 'Disponible 🥋🥋🥋🥋',
    imageUrl: '/nicolapso/mujer-cuchillo.jpg',
    category: 'diseño',
    style: ['Dotwork'],
    tags: ['caras', 'dotwork', 'armas']
  },
  {
    id: 'd-008',
    title: '🐱🤡',
    imageUrl: '/nicolapso/gato.jpg',
    category: 'diseño',
    style: ['Dotwork',],
    tags: ['animales', 'dotwork']
  },

  // Trabajos realizados
  {
    id: 'r-001',
    title: '🧙‍♀️🧹',
    imageUrl: '/nicolapso/tr-bruja.jpg',
    category: 'realizado',
    style: ['Dotwork'],
    tags: ['dotwork']
  },
  {
    id: 'r-002',
    title: '🐍🐍🐍🐍',
    imageUrl: '/nicolapso/tr-serpiente.jpg',
    category: 'realizado',
    style: ['Dotwork', 'Blackwork'],
    tags: ['dotwork', 'blackwork']
  },
  {
    id: 'r-003',
    title: 'Bathory',
    imageUrl: '/nicolapso/tr-bathory.jpg',
    category: 'realizado',
    style: ['Blackwork'],
    tags: ['blackwork']
  },
  {
    id: 'r-004',
    title: 'Ozzy 💖💖🗣️🗣️',
    imageUrl: '/nicolapso/tr-gato-comiendo-murcielago.jpg',
    category: 'realizado',
    style: ['Blackwork', 'Dotwork'],
    tags: ['blackwork', 'dotwork', 'animales'],
  },
  {
    id: 'r-005',
    title: 'Roma 🐶',
    imageUrl: '/nicolapso/tr-perrito.jpg',
    category: 'realizado',
    style: ['Dotwork'],
    tags: ['dotwork', 'animales'],
  },
  {
    id: 'r-006',
    title: '💀🕯️🕸️',
    imageUrl: '/nicolapso/tr-vela.jpg',
    category: 'realizado',
    style: ['Dotwork', 'Blackwork'],
    tags: ['dotwork', 'blackwork', 'calaveras'],
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