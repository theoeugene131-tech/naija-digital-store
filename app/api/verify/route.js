import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function GET(request) {
  const reference = request.nextUrl.searchParams.get('reference');
  if (!reference) {
    return NextResponse.json({ error: 'Missing payment reference' }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Payments are not configured yet.' }, { status: 500 });
  }

  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${secretKey}` }
  });
  const data = await res.json();

  if (!data.status || data.data.status !== 'success') {
    return NextResponse.json({ error: 'Payment not successful' }, { status: 402 });
  }

  const productId = data.data.metadata?.productId;
  const exp = Date.now() + 24 * 60 * 60 * 1000; // link valid for 24 hours
  const sig = crypto.createHmac('sha256', secretKey).update(`${productId}.${exp}`).digest('hex');
  const token = `${productId}.${exp}.${sig}`;

  return NextResponse.json({ downloadUrl: `/api/download/${token}` });
}
