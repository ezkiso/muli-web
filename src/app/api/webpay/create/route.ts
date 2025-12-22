import { NextRequest, NextResponse } from 'next/server';
import { WebpayPlus, Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment } from 'transbank-sdk';

export async function POST(request: NextRequest) {
    try {
        const { amount, cart, customer } = await request.json();

        // Guardar email para mostrarlo en success
        // (esto lo harías en sessionStorage del cliente antes de redirigir)

        const buyOrder = `DESOB-${Date.now()}`;
        const sessionId = `SESS-${Date.now()}`;
        const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/webpay/confirm`;

        const tx = new WebpayPlus.Transaction(
        new Options(
            IntegrationCommerceCodes.WEBPAY_PLUS,
            IntegrationApiKeys.WEBPAY,
            Environment.Integration
        )
        );

        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);

        return NextResponse.json({
        url: response.url,
        token: response.token,
        });
    } catch (error: any) {
        console.error('Error creating Webpay transaction:', error);
        return NextResponse.json(
        { error: error.message || 'Error al crear la transacción' },
        { status: 500 }
        );
    }
}