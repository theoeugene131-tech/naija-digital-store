'use client';

import { useState } from 'react';

export default function ProductCard({ product }) {
  const [step, setStep] = useState('buy');
  const [email, setEmail] = useState('');
  const [payerName, setPayerName] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');

  async function handleBuy() {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setStep('payment');
  }

  async function handleSubmitPayment() {
    setError('');
    if (!payerName) {
      setError('Please enter your name.');
      return;
    }
    if (!transactionRef) {
      setError('Please enter your transaction reference.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, email, payerName, transactionRef })
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      setOrderId(data.orderId);
      setStep('done');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (step === 'payment') {
    return (
      <div style={{ border: '1px solid #e2e2e5', borderRadius: 12, padding: 20, background: '#fff' }}>
        <h3 style={{ margin: '0 0 8px' }}>{product.name}</h3>
        <p style={{ fontWeight: 600, fontSize: 18 }}>₦{product.priceNaira.toLocaleString()}</p>
        <div style={{ background: '#f0f7ff', border: '1px solid #cce0ff', borderRadius: 8, padding: 12, margin: '12px 0' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14 }}>Pay via bank transfer to:</p>
          <p style={{ margin: '0 0 2px', fontSize: 14 }}><strong>Bank:</strong> Zenith Bank</p>
          <p style={{ margin: '0 0 2px', fontSize: 14 }}><strong>Account Name:</strong> [Your Name]</p>
          <p style={{ margin: '0', fontSize: 14 }}><strong>Account Number:</strong> 2006060507</p>
        </div>
        <p style={{ fontSize: 13, color: '#555', margin: '8px 0' }}>
          After paying, enter your transaction reference below.
        </p>
        <input
          type="text"
          placeholder="Your name"
          value={payerName}
          onChange={(e) => setPayerName(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        <input
          type="text"
          placeholder="Transaction reference (e.g., TRX123456)"
          value={transactionRef}
          onChange={(e) => setTransactionRef(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        <button
          onClick={handleSubmitPayment}
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
          {loading ? 'Submitting…' : 'I have paid — submit for verification'}
        </button>
        {error && <p style={{ color: 'crimson', fontSize: 13 }}>{error}</p>}
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div style={{ border: '1px solid #e2e2e5', borderRadius: 12, padding: 20, background: '#fff', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px' }}>Order received!</h3>
        <p style={{ color: '#555', fontSize: 14 }}>
          Your payment is being verified. You'll receive your download link at <strong>{email}</strong> within 24 hours.
        </p>
        <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Order ID: {orderId}</p>
      </div>
    );
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
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 6,
          border: 'none',
          background: '#0b5fff',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Buy now
      </button>
      {error && <p style={{ color: 'crimson', fontSize: 13 }}>{error}</p>}
    </div>
  );
}
