'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessInner() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const [status, setStatus] = useState('checking');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!reference) {
      setStatus('error');
      setError('No payment reference found.');
      return;
    }
    fetch(`/api/verify?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus('error');
          setError(data.error);
        } else {
          setStatus('done');
          setDownloadUrl(data.downloadUrl);
        }
      })
      .catch(() => {
        setStatus('error');
        setError('Could not verify payment.');
      });
  }, [reference]);

  return (
    <main style={{ maxWidth: 500, margin: '80px auto', padding: 24, textAlign: 'center' }}>
      {status === 'checking' && <p>Verifying your payment…</p>}
      {status === 'done' && (
        <>
          <h2>Payment confirmed 🎉</h2>
          <a
            href={downloadUrl}
            style={{
              display: 'inline-block',
              marginTop: 16,
              padding: '10px 20px',
              background: '#0b5fff',
              color: '#fff',
              borderRadius: 6,
              textDecoration: 'none'
            }}
          >
            Download your product
          </a>
          <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>This link expires in 24 hours.</p>
        </>
      )}
      {status === 'error' && (
        <>
          <h2>Something went wrong</h2>
          <p style={{ color: 'crimson' }}>{error}</p>
        </>
      )}
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <SuccessInner />
    </Suspense>
  );
}
