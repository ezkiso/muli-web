'use client'

import Link from 'next/link';
import { XCircle, ArrowLeft, Phone, Mail, ShoppingCart } from 'lucide-react';

export default function ErrorContent() {
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
                        <h3 className="font-bold text-white mb-4">¿Qué puedes hacer?</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-[#800020]">✓</span>
                                <span>Vuelve a intentar el pago con los mismos datos</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#800020]">✓</span>
                                <span>Verifica los datos de tu tarjeta</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#800020]">✓</span>
                                <span>Contacta a tu banco si persiste el problema</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#800020]">✓</span>
                                <span>Comunícate con nosotros para asistencia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contacto */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                        <div className="flex items-center gap-3 mb-3">
                            <Phone className="w-5 h-5 text-[#800020]" />
                            <h3 className="font-bold text-white">WhatsApp</h3>
                        </div>
                        <p className="text-sm text-gray-400">+56 9 XXXX XXXX</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                        <div className="flex items-center gap-3 mb-3">
                            <Mail className="w-5 h-5 text-[#800020]" />
                            <h3 className="font-bold text-white">Email</h3>
                        </div>
                        <p className="text-sm text-gray-400">contacto@desobediencia.cl</p>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                    <Link
                        href="/checkout"
                        className="flex items-center justify-center gap-2 w-full bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Volver al Checkout
                    </Link>
                    
                    <Link
                        href="/stores/desobediencia"
                        className="flex items-center justify-center gap-2 w-full border-2 border-gray-800 hover:bg-gray-900 text-white py-4 rounded-lg font-bold transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        </div>
    );
}
