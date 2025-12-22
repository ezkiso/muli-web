import { NextRequest, NextResponse } from 'next/server';
import { WebpayPlus, Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment } from 'transbank-sdk';

const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get('token_ws') as string;

    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`
      );
    }

    const response = await tx.commit(token);

    if (response.response_code === 0) {
      // TODO: Aquí guardar la orden en Supabase
      // TODO: Reducir stock de productos
      // TODO: Enviar email de confirmación

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${response.buy_order}`
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`
      );
    }
  } catch (error) {
    console.error('Error confirming transaction:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token_ws');

  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`
    );
  }

  try {
    const response = await tx.commit(token);

    if (response.response_code === 0) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${response.buy_order}`
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`
    );
  }
}