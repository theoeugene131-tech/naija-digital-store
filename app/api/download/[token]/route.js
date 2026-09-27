import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { products } from '../../../../data/products';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const { token } = params;
  const [productId, exp, sig] = token.split('.');

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Payments are not configured yet.' }, { status: 500 });
  }

  const expected = crypto.createHmac('sha256', secretKey).update(`${productId}.${exp}`).digest('hex');
  if (sig !== expected || Date.now() > Number(exp)) {
    return NextResponse.json({ error: 'This download link is invalid or has expired.' }, { status: 403 });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'data', 'downloads', product.file);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File missing on server' }, { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${product.file}"`
    }
  });
}
