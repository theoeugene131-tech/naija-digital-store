# Naija Digital Store

A Next.js store for selling digital products (templates, e-books,
spreadsheets) with automatic delivery:

1. Customer picks a product, enters their email, clicks **Buy now**.
2. They pay via Paystack (card, bank transfer, or USSD).
3. On success, the server verifies the payment and issues a
   **signed, 24-hour download link** — no manual delivery needed.

It ships with two sample products (a placeholder CV template pack and a real
Excel budget tracker) so the full flow works out of the box.

## 1. Run it locally

```bash
npm install
cp .env.example .env
```

Add your Paystack **test** secret key to `.env` (get one free at
[dashboard.paystack.com](https://dashboard.paystack.com) → Settings → API
Keys & Webhooks), then:

```bash
npm run dev
```

Open http://localhost:3000, buy a product with a Paystack **test card**:

```
Card: 4084 0840 8408 4081
Expiry: any future date
CVV: 408
PIN: 0000
OTP: 123456
```

## 2. Add your own products

1. Drop the file into `data/downloads/` (e.g. `my-ebook.pdf`).
2. Add an entry to `data/products.js`:

```js
{
  id: 'my-ebook',
  name: 'My Ebook',
  description: 'A short description customers will see.',
  priceNaira: 3000,
  file: 'my-ebook.pdf'
}
```

Replace the two sample files with your real products before going live —
`cv-template-pack.zip` is a placeholder.

## 3. Deploy

Vercel is the easiest fit (no cron jobs here, unlike the WhatsApp bot):

```bash
npx vercel
```

Or push this folder to a GitHub repo and import it in the Vercel dashboard
for automatic deploys on every push. Either way, add `PAYSTACK_SECRET_KEY`
and `APP_URL` (your live domain) as environment variables in the Vercel
project settings — switch to your **live** Paystack secret key once you're
ready to accept real payments.

## Project structure

```
app/page.js                        Product grid (home page)
components/ProductCard.js           Buy button + email input
app/api/checkout/route.js            Starts a Paystack payment
app/api/verify/route.js               Verifies payment, issues a download token
app/api/download/[token]/route.js      Validates the token and serves the file
app/success/page.js                     Post-payment page that shows the download link
data/products.js                          Product catalog — edit this to add products
data/downloads/                            Your product files
```
