// src/components/nicolapso/TattooModal.tsx
'use client';

import { X, Calendar, MapPin, Ruler, Tag, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { TattooWork } from '@/lib/tatuajes.types';
import { STORES } from '@/lib/stores-config';

interface TattooModalProps {
  tattoo: TattooWork | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TattooModal({ tattoo, isOpen, onClose }: TattooModalProps) {
  if (!isOpen || !tattoo) return null;

  const storeConfig = STORES.nicolapso;
  const whatsappMessage = `Hola! Me interesa el ${tattoo.category === 'diseño' || tattoo.category === 'flash' ? 'diseño' : 'trabajo'} "${tattoo.title}". ¿Podemos agendar una cita?`;
  const whatsappLink = `https://wa.me/${storeConfig.whatsapp?.replace(/[^\d]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/70 backdrop-blur-sm rounded-full hover:bg-black/90 transition-all text-white hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[90vh]">
          {/* Imagen */}
          <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-zinc-950">
            <Image
              src={tattoo.imageUrl}
              alt={tattoo.title}
              fill
              className="object-contain"
            />
          </div>

          {/* Contenido */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
            {/* Categoría badge */}
            <div className="mb-4">
              {tattoo.category === 'realizado' && (
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/30">
                  ✓ Trabajo Realizado
                </span>
              )}
              {tattoo.category === 'diseño' && (
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                  ✎ Diseño Disponible
                </span>
              )}
              {tattoo.category === 'flash' && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                  tattoo.available 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}>
                  ⚡ Flash {tattoo.available ? 'Disponible' : 'Ya Tatuado'}
                </span>
              )}
            </div>

            {/* Título y descripción */}
            <h2 className="text-3xl font-bold text-gray-100 mb-3">
              {tattoo.title}
            </h2>
            
            {tattoo.description && (
              <p className="text-gray-400 mb-6 leading-relaxed">
                {tattoo.description}
              </p>
            )}

            {/* Detalles */}
            <div className="space-y-3 mb-6">
              {/* Estilos */}
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estilos</p>
                  <div className="flex flex-wrap gap-2">
                    {tattoo.style.map((style) => (
                      <span 
                        key={style}
                        className="bg-amber-600/20 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-600/30"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Parte del cuerpo */}
              {tattoo.bodyPart && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Zona</p>
                    <p className="text-gray-200">{tattoo.bodyPart}</p>
                  </div>
                </div>
              )}

              {/* Tamaño */}
              {tattoo.size && (
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Tamaño</p>
                    <p className="text-gray-200 capitalize">{tattoo.size}</p>
                  </div>
                </div>
              )}

              {/* Fecha */}
              {tattoo.date && tattoo.category === 'realizado' && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="text-gray-200">
                      {new Date(tattoo.date).toLocaleDateString('es-CL', { 
                        year: 'numeric', 
                        month: 'long'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {tattoo.tags && tattoo.tags.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tattoo.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-sm text-gray-400 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botón de contacto */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}