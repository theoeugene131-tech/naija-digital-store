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
      <div style={{ marginTop: 40, padding: 20, background: '#fff', borderRadius: 12, border: '1px solid #e2e2e5', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px' }}>Have questions?</h3>
        <p style={{ color: '#555', fontSize: 14, margin: '0 0 12px' }}>
          Reach us on WhatsApp for any enquiries about our products.
        </p>
        <a
          href="https://wa.me/2348026892077"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#25D366',
            color: '#fff',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Chat on WhatsApp
        </a>
      </div>
    </main>
  );
}
