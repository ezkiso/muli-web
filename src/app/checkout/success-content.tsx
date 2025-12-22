'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Home, Mail } from 'lucide-react';

export function SuccessContentInner() {
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
                                    <h3 className="font-bold text-white mb-1">Confirmación por Email</h3>
                                    <p className="text-sm text-gray-400">Recibirás un email de confirmación en breve</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-[#800020] p-3 rounded-lg shrink-0">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Tu Pedido</h3>
                                    <p className="text-sm text-gray-400">Se procesará en las próximas 24 horas</p>
                                </div>
                            </div>
                        </div>

                        {email && (
                            <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                                <p className="text-sm text-gray-400 mb-1">Email confirmado</p>
                                <p className="text-white font-semibold">{email}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botones */}
                <div className="space-y-3">
                    <Link
                        href="/stores/desobediencia"
                        className="block w-full bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold text-lg transition-colors text-center"
                    >
                        Continuar Comprando
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full border-2 border-gray-800 hover:bg-gray-900 text-white py-4 rounded-lg font-bold transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SuccessContent() {
    return <SuccessContentInner />;
}
