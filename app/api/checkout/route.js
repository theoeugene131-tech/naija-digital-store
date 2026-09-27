import { NextResponse } from 'next/server';
import { products } from '../../../data/products';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request) {
  const { productId, email, payerName, transactionRef } = await request.json();
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }
  if (!payerName) {
    return NextResponse.json({ error: 'Please enter your name' }, { status: 400 });
  }
  if (!transactionRef) {
    return NextResponse.json({ error: 'Please enter your transaction reference' }, { status: 400 });
  }

  const order = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    productId,
    productName: product.name,
    priceNaira: product.priceNaira,
    email,
    payerName,
    transactionRef,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
  let orders = [];
  if (fs.existsSync(ordersPath)) {
    orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
  }
  orders.push(order);
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

  return NextResponse.json({ orderId: order.id });
}
