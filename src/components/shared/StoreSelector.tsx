// src/components/shared/StoreSelector.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { STORES } from '@/lib/stores-config';
import { Store } from 'lucide-react';

export default function StoreSelector({ currentStoreId }: { currentStoreId: string }) {
    return (
        <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
            {/* Texto "Nuestras Tiendas" - Solo desktop */}
            <div className="hidden md:flex items-center gap-2">
                <Store className="w-5 h-5" />
                <span className="text-sm font-medium">Nuestras Tiendas:</span>
            </div>
            
            {/* Links de tiendas */}
            <div className="flex gap-4 md:gap-6 mx-auto md:mx-0">
                {STORES.map((store) => (
                <Link
                    key={store.id}
                    href={store.path}
                    className={`flex items-center gap-2 text-sm hover:text-gray-300 transition-colors ${
                    currentStoreId === store.id ? 'font-bold border-b-2 border-white pb-1' : ''
                    }`}
                >
                    {/* Logo/Emoji */}
                    {store.logo.startsWith('/') ? (
                    <Image 
                        src={store.logo} 
                        alt={store.name}
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    ) : (
                    <span className="text-xl">{store.logo}</span>
                    )}
                    {/* Nombre - Solo en desktop */}
                    <span className="hidden md:inline">{store.name}</span>
                </Link>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}