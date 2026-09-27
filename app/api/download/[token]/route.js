import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { products } from '../../../../data/products';
import { parseAccessToken } from '../../../../lib/access-token';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Payments are not configured yet.' }, { status: 500 });
  }

  const parsed = parseAccessToken(params.token, secretKey);
  if (!parsed) {
    return NextResponse.json({ error: 'This download link is invalid.' }, { status: 403 });
  }
  if (parsed.expired) {
    return NextResponse.json({ error: 'This download link has expired.' }, { status: 403 });
  }

  const product = products.find((p) => p.id === parsed.productId);
  if (!product || !product.file) {
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
