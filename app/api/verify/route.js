import { NextResponse } from 'next/server';
import { products } from '../../../data/products';
import { createAccessToken } from '../../../lib/access-token';

export const runtime = 'nodejs';

const ONE_DAY = 24 * 60 * 60 * 1000;
const TEN_YEARS = 10 * 365 * ONE_DAY; // effectively permanent course access

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
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // A product can grant course access, a file download, or both (a course
  // with a bonus resource pack) — collect whichever apply.
  const access = [];

  if (product.type === 'course') {
    const courseToken = createAccessToken(productId, Date.now() + TEN_YEARS, secretKey);
    access.push({ label: 'Access your course', url: `/course/${courseToken}` });
  }

  if (product.file) {
    const fileToken = createAccessToken(productId, Date.now() + ONE_DAY, secretKey);
    access.push({
      label: product.type === 'course' ? 'Download bonus resources' : 'Download your product',
      url: `/api/download/${fileToken}`
    });
  }

  return NextResponse.json({ access });
}
