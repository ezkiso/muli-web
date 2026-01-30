// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllStores } from '@/lib/stores-config';  // ← CAMBIO AQUÍ
import { ArrowRight, Store } from 'lucide-react';

export default function Home() {
  const stores = getAllStores();
  <head>
    <meta name="google-site-verification" content="8hG1PXfzuhfEu4J_mN8AktmJR42FMC8Rj5EqPG85UH0" />
  </head>
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Desobediencia, ContruHazard y Nicolapso-Tatuajes
          </h1>
          <p className="text-xl text-gray-600">
            Descubre nuestras tiendas especializadas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stores.map((store) => (  // ← USAR VARIABLE
            <Link
              key={store.id}
              href={`/stores/${store.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Logo: detecta si es emoji o imagen */}
                <div className="mb-4 flex justify-center items-center h-24">
                  {store.logo.startsWith('/') ? (
                    // Si comienza con /, es una ruta de imagen
                    <Image 
                      src={store.logo}
                      alt={`${store.name} Logo`}
                      sizes="100vm"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  ) : (
                    // Si no, es un emoji
                    <span className="text-6xl">{store.logo}</span>
                  )}
                </div>
                
                <h2 
                  className="text-2xl font-bold mb-2 text-center"
                  style={{ color: store.primaryColor }}
                >
                  {store.name}
                </h2>
                <p className="text-gray-600 text-center mb-4">
                  {store.description}
                </p>
                <div className="flex items-center justify-center text-sm font-medium group-hover:gap-2 transition-all"
                      style={{ color: store.primaryColor }}>
                  Explorar tienda
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
