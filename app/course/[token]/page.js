import { products } from '../../../data/products';
import { parseAccessToken } from '../../../lib/access-token';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function ErrorBox({ message }) {
  return (
    <main style={{ maxWidth: 500, margin: '80px auto', padding: 24, textAlign: 'center' }}>
      <h2>Access issue</h2>
      <p style={{ color: 'crimson' }}>{message}</p>
    </main>
  );
}

export default function CoursePage({ params }) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return <ErrorBox message="Payments are not configured yet." />;
  }

  const parsed = parseAccessToken(params.token, secretKey);
  if (!parsed) {
    return <ErrorBox message="This course link is invalid." />;
  }
  if (parsed.expired) {
    return <ErrorBox message="This course link has expired." />;
  }

  const product = products.find((p) => p.id === parsed.productId && p.type === 'course');
  if (!product) {
    return <ErrorBox message="Course not found." />;
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 32 }}>
      <h1 style={{ marginBottom: 4 }}>{product.name}</h1>
      <p style={{ color: '#555' }}>{product.description}</p>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {product.lessons.map((lesson, i) => (
          <div
            key={i}
            style={{ border: '1px solid #e2e2e5', borderRadius: 12, padding: 20, background: '#fff' }}
          >
            <h3 style={{ margin: '0 0 8px' }}>
              Lesson {i + 1}: {lesson.title}
            </h3>
            {lesson.description && (
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.5 }}>{lesson.description}</p>
            )}
            {lesson.videoUrl ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginTop: 12 }}>
                <iframe
                  src={lesson.videoUrl}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: 8 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p style={{ fontSize: 13, color: '#a15c00', background: '#fff6e5', padding: '8px 12px', borderRadius: 6, marginTop: 8 }}>
                🎥 Video coming soon.
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
