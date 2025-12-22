'use client'

import { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export interface CartItem {
    id: number;
    productId: number;
    name: string;
    image: string;
    basePrice: number;
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
    quantity: number;
    category: string;
    }

    interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
    }

    export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Cargar carrito del localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('desobediencia_cart');
        if (savedCart) {
        setCart(JSON.parse(savedCart));
        }
    }, [isOpen]);

    // Guardar carrito en localStorage
    const saveCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('desobediencia_cart', JSON.stringify(newCart));
    };

    // Calcular precio con talla
    const calculateItemPrice = (item: CartItem): number => {
        return item.size === 'XXL' ? item.basePrice + 2000 : item.basePrice;
    };

    // Calcular subtotal de un item
    const getItemSubtotal = (item: CartItem): number => {
        return calculateItemPrice(item) * item.quantity;
    };

    // Calcular total del carrito
    const getCartTotal = (): number => {
        return cart.reduce((total, item) => total + getItemSubtotal(item), 0);
    };

    // Aumentar cantidad
    const increaseQuantity = (itemId: number) => {
        const newCart = cart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        saveCart(newCart);
    };

    // Disminuir cantidad
    const decreaseQuantity = (itemId: number) => {
        const newCart = cart.map(item =>
        item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        saveCart(newCart);
    };

    // Eliminar item
    const removeItem = (itemId: number) => {
        const newCart = cart.filter(item => item.id !== itemId);
        saveCart(newCart);
    };

    // Vaciar carrito
    const clearCart = () => {
        saveCart([]);
    };

    // Formatear precio
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        }).format(price);
    };

    // Ir al checkout
    const handleCheckout = () => {
        // Aquí integramos Webpay
        window.location.href = '/checkout';
    };

    if (!isOpen) return null;

    return (
        <>
        {/* Overlay */}
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
        />

        {/* Drawer del carrito */}
        <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-gray-900 shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="bg-black border-b border-gray-800 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#800020]" />
                <h2 className="text-2xl font-bold text-white">
                Mi Carrito ({cart.length})
                </h2>
            </div>
            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition"
            >
                <X className="w-6 h-6 text-white" />
            </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
                <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">Tu carrito está vacío</p>
                <p className="text-gray-500 text-sm">
                    Agrega productos para comenzar tu compra
                </p>
                </div>
            ) : (
                <div className="space-y-4">
                {cart.map((item) => (
                    <div
                    key={item.id}
                    className="bg-black rounded-lg p-4 border border-gray-800"
                    >
                    <div className="flex gap-4">
                        {/* Imagen */}
                        <div className="relative w-20 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                        />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm mb-1 truncate">
                            {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">
                            Talla: {item.size}
                            {item.size === 'XXL' && (
                            <span className="ml-2 text-orange-400">(+$2.000)</span>
                            )}
                        </p>

                        <div className="flex items-center justify-between">
                            {/* Cantidad */}
                            <div className="flex items-center gap-2">
                            <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition"
                            >
                                <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="w-8 text-center font-bold text-white">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => increaseQuantity(item.id)}
                                className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition"
                            >
                                <Plus className="w-4 h-4 text-white" />
                            </button>
                            </div>

                            {/* Precio */}
                            <div className="text-right">
                            <p className="text-sm font-bold text-white">
                                {formatPrice(getItemSubtotal(item))}
                            </p>
                            {item.quantity > 1 && (
                                <p className="text-xs text-gray-500">
                                {formatPrice(calculateItemPrice(item))} c/u
                                </p>
                            )}
                            </div>
                        </div>
                        </div>

                        {/* Botón eliminar */}
                        <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-gray-800 rounded-full transition h-fit"
                        >
                        <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                    </div>
                    </div>
                ))}

                {/* Botón limpiar carrito */}
                {cart.length > 0 && (
                    <button
                    onClick={clearCart}
                    className="w-full py-2 text-sm text-red-400 hover:text-red-300 transition"
                    >
                    Vaciar carrito
                    </button>
                )}
                </div>
            )}
            </div>

            {/* Footer con total y checkout */}
            {cart.length > 0 && (
            <div className="bg-black border-t border-gray-800 p-6">
                {/* Resumen */}
                <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Envío</span>
                    <span>A calcular</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-gray-800">
                    <span>Total</span>
                    <span>{formatPrice(getCartTotal())}</span>
                </div>
                </div>

                {/* Botón checkout */}
                <button
                onClick={handleCheckout}
                className="w-full bg-[#800020] hover:bg-[#600018] text-white py-4 rounded-lg font-bold text-lg transition-colors"
                >
                Ir a Pagar con Webpay
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                Pago seguro con Transbank
                </p>
            </div>
            )}
        </div>
        </>
    );
    }

    // Hook personalizado para usar el carrito
    export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('desobediencia_cart');
        if (savedCart) {
        setCart(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (
        productId: number,
        name: string,
        image: string,
        basePrice: number,
        size: 'S' | 'M' | 'L' | 'XL' | 'XXL',
        category: string
    ) => {
        const existingItem = cart.find(
        item => item.productId === productId && item.size === size
        );

        let newCart: CartItem[];

        if (existingItem) {
        // Si ya existe, aumentar cantidad
        newCart = cart.map(item =>
            item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        } else {
        // Si no existe, agregar nuevo
        const newItem: CartItem = {
            id: Date.now(),
            productId,
            name,
            image,
            basePrice,
            size,
            quantity: 1,
            category,
        };
        newCart = [...cart, newItem];
        }

        setCart(newCart);
        localStorage.setItem('desobediencia_cart', JSON.stringify(newCart));
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return { cart, addToCart, getCartCount };
}