'use client';

export default function SuccessPage() {
  return (
    <main style={{ maxWidth: 500, margin: '80px auto', padding: 24, textAlign: 'center' }}>
      <h2>Order received!</h2>
      <p style={{ color: '#555' }}>
        Your payment is being verified. You'll receive your download link within 24 hours.
      </p>
    </main>
  );
}
