import fs from 'fs';
import path from 'path';
import { products } from '../../data/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
  let orders = [];
  if (fs.existsSync(ordersPath)) {
    orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
  }

  const pending = orders.filter((o) => o.status === 'pending');
  const verified = orders.filter((o) => o.status === 'verified');

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
      <h1>Store Admin</h1>
      <p style={{ color: '#555' }}>Manage orders and verify payments.</p>

      <h2>Pending Verification ({pending.length})</h2>
      {pending.length === 0 && <p style={{ color: '#888' }}>No pending orders.</p>}
      {pending.map((order) => (
        <div key={order.id} style={{ border: '1px solid #e2e2e5', borderRadius: 8, padding: 16, marginBottom: 12, background: '#fff' }}>
          <p style={{ margin: '0 0 4px' }}><strong>{order.productName}</strong> — ₦{order.priceNaira.toLocaleString()}</p>
          <p style={{ margin: '0 0 4px', fontSize: 14 }}>Email: {order.email}</p>
          <p style={{ margin: '0 0 4px', fontSize: 14 }}>Name: {order.payerName}</p>
          <p style={{ margin: '0 0 4px', fontSize: 14 }}>Transaction Ref: {order.transactionRef}</p>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#888' }}>Order ID: {order.id} | {new Date(order.createdAt).toLocaleString()}</p>
          <form action={`/api/verify-order?orderId=${order.id}`} method="POST">
            <button type="submit" style={{ padding: '6px 12px', background: '#0b5fff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              Mark as Verified
            </button>
          </form>
        </div>
      ))}

      <h2 style={{ marginTop: 32 }}>Verified Orders ({verified.length})</h2>
      {verified.length === 0 && <p style={{ color: '#888' }}>No verified orders yet.</p>}
      {verified.map((order) => (
        <div key={order.id} style={{ border: '1px solid #e2e2e5', borderRadius: 8, padding: 16, marginBottom: 12, background: '#f9f9f9' }}>
          <p style={{ margin: '0 0 4px' }}><strong>{order.productName}</strong> — ₦{order.priceNaira.toLocaleString()}</p>
          <p style={{ margin: '0 0 4px', fontSize: 14 }}>Email: {order.email}</p>
          <p style={{ margin: '0 0 4px', fontSize: 14 }}>Transaction Ref: {order.transactionRef}</p>
          <p style={{ margin: '0', fontSize: 12, color: '#888' }}>Order ID: {order.id} | Verified</p>
        </div>
      ))}
    </main>
  );
}
