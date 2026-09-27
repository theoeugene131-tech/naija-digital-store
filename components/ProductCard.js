'use client';

import { useState } from 'react';

export default function ProductCard({ product }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleBuy() {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, email })
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{ border: '1px solid #e2e2e5', borderRadius: 12, padding: 20, background: '#fff' }}>
      <h3 style={{ margin: '0 0 8px' }}>{product.name}</h3>
      {product.type === 'course' && (
        <span
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            color: '#0b5fff',
            background: '#eaf1ff',
            padding: '2px 8px',
            borderRadius: 999,
            marginBottom: 8
          }}
        >
          COURSE · {product.lessons.length} LESSONS
        </span>
      )}
      <p style={{ color: '#555', fontSize: 14 }}>{product.description}</p>
      <p style={{ fontWeight: 600, fontSize: 18 }}>₦{product.priceNaira.toLocaleString()}</p>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
      />
      <button
        onClick={handleBuy}
        disabled={loading}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 6,
          border: 'none',
          background: '#0b5fff',
          color: '#fff',
          cursor: loading ? 'default' : 'pointer'
        }}
      >
        {loading ? 'Redirecting…' : 'Buy now'}
      </button>
      {error && <p style={{ color: 'crimson', fontSize: 13 }}>{error}</p>}
    </div>
  );
}
