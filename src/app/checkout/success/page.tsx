// src/app/checkout/success/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Home, Mail } from 'lucide-react';

export default function CheckoutSuccess() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Limpiar el carrito después de compra exitosa
        localStorage.removeItem('desobediencia_cart');
        
        // Obtener email del sessionStorage si lo guardaste
        const savedEmail = sessionStorage.getItem('checkout_email');
        if (savedEmail) {
        setEmail(savedEmail);
        sessionStorage.removeItem('checkout_email');
        }
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
            {/* Animación de éxito */}
            <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-600 rounded-full mb-6 animate-bounce">
                <CheckCircle className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3">
                ¡Pago Exitoso!
            </h1>
            <p className="text-xl text-gray-300">
                Tu pedido ha sido confirmado
            </p>
            </div>

            {/* Información del pedido */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 mb-6">
            <div className="space-y-6">
                {/* Número de orden */}
                <div className="text-center pb-6 border-b border-gray-800">
                <p className="text-sm text-gray-400 mb-2">Número de orden</p>
                <p className="text-3xl font-bold text-[#800020]">
                    {orderNumber || 'DESOBEDIENCIA-' + Date.now()}
                </p>
                </div>

                {/* Iconos informativos */}
                <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <div className="bg-[#800020] p-3 rounded-lg shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h3 className="font-bold text-white mb-1">
                        Confirmación enviada
                    </h3>
                    <p className="text-sm text-gray-400">
                        {email || 'Recibirás un email con los detalles de tu pedido'}
                    </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-[#800020] p-3 rounded-lg shrink-0">
                    <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h3 className="font-bold text-white mb-1">
                        Preparando envío
                    </h3>
                    <p className="text-sm text-gray-400">
                        Te contactaremos para coordinar la entrega
                    </p>
                    </div>
                </div>
                </div>

                {/* Información adicional */}
                <div className="bg-black rounded-lg p-6">
                <h3 className="font-bold text-white mb-4">Próximos pasos:</h3>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                    <span className="text-[#800020] font-bold">1.</span>
                    <span>Recibirás un email de confirmación con los detalles de tu compra</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-[#800020] font-bold">2.</span>
                    <span>Prepararemos tu pedido con serigrafía de calidad</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-[#800020] font-bold">3.</span>
                    <span>Te contactaremos para coordinar el envío</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-[#800020] font-bold">4.</span>
                    <span>Recibirás tu pedido en 5-7 días hábiles</span>
                    </li>
                </ul>
                </div>
            </div>
            </div>

            {/* Botones de acción */}
            <div className="grid md:grid-cols-2 gap-4">
            <Link
                href="/stores/desobediencia"
                className="bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold text-center transition flex items-center justify-center gap-2"
            >
                <Package className="w-5 h-5" />
                Ver más productos
            </Link>
            
            <Link
                href="/"
                className="bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg font-bold text-center transition flex items-center justify-center gap-2"
            >
                <Home className="w-5 h-5" />
                Volver al inicio
            </Link>
            </div>

            {/* Contacto */}
            <div className="text-center mt-8">
            <p className="text-gray-400 text-sm mb-2">
                ¿Tienes dudas sobre tu pedido?
            </p>
            <a 
                href="mailto:contacto@desobediencia.cl"
                className="text-[#800020] hover:text-[#600018] font-semibold transition"
            >
                contacto@desobediencia.cl
            </a>
            </div>
        </div>
        </div>
    );
}