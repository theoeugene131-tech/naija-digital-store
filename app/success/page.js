'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessInner() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const [status, setStatus] = useState('checking');
  const [access, setAccess] = useState([]);
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
          setAccess(data.access || []);
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            {access.map((a, i) => (
              <a
                key={i}
                href={a.url}
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#0b5fff',
                  color: '#fff',
                  borderRadius: 6,
                  textDecoration: 'none'
                }}
              >
                {a.label}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#888', marginTop: 12 }}>
            Bookmark this page — bonus file links expire in 24 hours, but course access does not.
          </p>
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
