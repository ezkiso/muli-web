// src/app/checkout/error/page.tsx
'use client'

import Link from 'next/link';
import { XCircle, ArrowLeft, Phone, Mail } from 'lucide-react';

export default function CheckoutError() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
            {/* Icono de error */}
            <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-600 rounded-full mb-6">
                <XCircle className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3">
                Pago no completado
            </h1>
            <p className="text-xl text-gray-300">
                Hubo un problema al procesar tu pago
            </p>
            </div>

            {/* Información del error */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
                ¿Qué pudo haber pasado?
            </h2>
            
            <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>El pago fue rechazado por tu banco</span>
                </li>
                <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Cancelaste la transacción</span>
                </li>
                <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Se agotó el tiempo de la sesión</span>
                </li>
                <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Hubo un error de conexión</span>
                </li>
            </ul>

            <div className="bg-black rounded-lg p-6">
                <h3 className="font-bold text-white mb-3">
                No te preocupes:
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ No se ha realizado ningún cargo a tu tarjeta</li>
                <li>✓ Tu carrito de compras sigue guardado</li>
                <li>✓ Puedes intentar el pago nuevamente</li>
                </ul>
            </div>
            </div>

            {/* Botones de acción */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Link
                href="/checkout"
                className="bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold text-center transition flex items-center justify-center gap-2"
            >
                <ArrowLeft className="w-5 h-5" />
                Intentar de nuevo
            </Link>
            
            <Link
                href="/stores/desobediencia"
                className="bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg font-bold text-center transition"
            >
                Volver a la tienda
            </Link>
            </div>

            {/* Contacto de soporte */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="font-bold text-white mb-4 text-center">
                ¿Necesitas ayuda?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
                <a
                href="https://wa.me/56944868653"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                >
                <Phone className="w-5 h-5" />
                WhatsApp
                </a>
                
                <a
                href="mailto:contacto@desobediencia.cl"
                className="flex items-center justify-center gap-3 bg-[#800020] hover:bg-[#600018] text-white py-3 rounded-lg font-semibold transition"
                >
                <Mail className="w-5 h-5" />
                Email
                </a>
            </div>
            </div>

            {/* Mensaje adicional */}
            <p className="text-center text-gray-400 text-sm mt-6">
            Si el problema persiste, contáctanos y te ayudaremos con tu pedido
            </p>
        </div>
        </div>
    );
}