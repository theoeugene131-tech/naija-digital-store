import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
      <h1>Naija Digital Store</h1>
      <p style={{ color: '#555' }}>
        Pay with card, bank or USSD via Paystack. Get your download instantly.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginTop: 24
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
