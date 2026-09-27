import { NextResponse } from 'next/server';
import { products } from '../../../data/products';

export const runtime = 'nodejs';

export async function POST(request) {
  const { productId, email } = await request.json();
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Payments are not configured yet. Add PAYSTACK_SECRET_KEY to .env.' },
      { status: 500 }
    );
  }

  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      amount: product.priceNaira * 100,
      metadata: { productId },
      callback_url: `${appUrl}/success`
    })
  });

  const data = await res.json();
  if (!data.status) {
    return NextResponse.json({ error: data.message || 'Could not start payment' }, { status: 500 });
  }

  return NextResponse.json({ authorizationUrl: data.data.authorization_url });
}
