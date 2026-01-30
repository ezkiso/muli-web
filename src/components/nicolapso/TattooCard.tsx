// src/components/nicolapso/TattooCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, X, Check } from 'lucide-react';
import { TattooWork } from '@/lib/tatuajes.types';

interface TattooCardProps {
  tattoo: TattooWork;
  onClick: () => void;
}

export default function TattooCard({ tattoo, onClick }: TattooCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Aquí podrías guardar en localStorage o Supabase
  };

  const getCategoryBadge = () => {
    const badges = {
      realizado: { text: 'Realizado', color: 'bg-green-500/90' },
      diseño: { text: 'Diseño', color: 'bg-blue-500/90' },
      flash: { text: tattoo.available ? '⚡ Disponible' : '⚡ Tatuado', 
              color: tattoo.available ? 'bg-amber-500/90' : 'bg-gray-500/90' }
    };
    const badge = badges[tattoo.category];
    
    return (
      <span className={`${badge.color} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
        {badge.text}
      </span>
    );
  };

  return (
    <div 
      className="group relative bg-zinc-900/50 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-900/20 border border-zinc-800 hover:border-amber-700/50"
      onClick={onClick}
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        {!imageError ? (
          <Image
            src={tattoo.thumbnailUrl || tattoo.imageUrl}
            alt={tattoo.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900">
            <div className="text-center">
              <div className="text-6xl mb-2">🎨</div>
              <p className="text-zinc-500 text-sm">Imagen no disponible</p>
            </div>
          </div>
        )}

        {/* Overlay con información al hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex flex-wrap gap-1 mb-2">
              {tattoo.style.slice(0, 2).map((style) => (
                <span 
                  key={style}
                  className="text-xs bg-amber-600/80 text-white px-2 py-0.5 rounded-full"
                >
                  {style}
                </span>
              ))}
            </div>
            {tattoo.bodyPart && (
              <p className="text-xs text-gray-300">📍 {tattoo.bodyPart}</p>
            )}
          </div>
        </div>

        {/* Badges superiores */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          {getCategoryBadge()}
          
          <button
            onClick={toggleFavorite}
            className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </button>
        </div>

        {/* Indicador de tamaño */}
        {tattoo.size && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full">
              {tattoo.size.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-100 mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {tattoo.title}
        </h3>
        {tattoo.description && (
          <p className="text-sm text-gray-400 line-clamp-2 mb-2">
            {tattoo.description}
          </p>
        )}
        
        {/* Tags */}
        {tattoo.tags && tattoo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tattoo.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="text-xs text-gray-500 bg-zinc-800 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Fecha para trabajos realizados */}
        {tattoo.category === 'realizado' && tattoo.date && (
          <p className="text-xs text-gray-600 mt-2">
            {new Date(tattoo.date).toLocaleDateString('es-CL', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </p>
        )}
      </div>

      {/* Indicador de disponibilidad para flash */}
      {tattoo.category === 'flash' && !tattoo.available && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
          <div className="bg-red-500/90 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <X className="w-4 h-4" />
            <span className="font-semibold">Ya tatuado</span>
          </div>
        </div>
      )}
    </div>
  );
}