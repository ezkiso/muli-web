// src/app/checkout/success/page.tsx
import { Suspense } from 'react';
import SuccessContent from '../success-content';

function SuccessLoading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020] mx-auto mb-4"></div>
                <p className="text-white text-lg">Cargando...</p>
            </div>
        </div>
    );
}

export default function CheckoutSuccess() {
    return (
        <Suspense fallback={<SuccessLoading />}>
            <SuccessContent />
        </Suspense>
    );
}
