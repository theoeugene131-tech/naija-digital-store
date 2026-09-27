export const metadata = {
  title: 'Naija Digital Store',
  description: 'Buy digital products instantly, pay with Paystack, download right away.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          margin: 0,
          background: '#f7f7f8',
          color: '#111'
        }}
      >
        {children}
      </body>
    </html>
  );
}
