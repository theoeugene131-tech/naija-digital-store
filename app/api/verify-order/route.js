import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request) {
  const orderId = request.nextUrl.searchParams.get('orderId');
  if (!orderId) {
    return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
  }

  const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
  if (!fs.existsSync(ordersPath)) {
    return NextResponse.json({ error: 'No orders found' }, { status: 404 });
  }

  const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  order.status = 'verified';
  order.verifiedAt = new Date().toISOString();
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

  return NextResponse.redirect(new URL('/admin', request.url));
}
