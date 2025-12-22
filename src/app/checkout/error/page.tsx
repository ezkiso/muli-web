// src/app/checkout/error/page.tsx
import { Suspense } from 'react';
import ErrorContent from '../error-content';

function ErrorLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020] mx-auto mb-4"></div>
                <p className="text-white text-lg">Cargando...</p>
            </div>
        </div>
    );
}

export default function CheckoutError() {
    return (
        <Suspense fallback={<ErrorLoading />}>
            <ErrorContent />
        </Suspense>
    );
}