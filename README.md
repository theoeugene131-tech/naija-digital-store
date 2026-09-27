# Naija Digital Store

A Next.js store for selling digital products — templates, spreadsheets, and
video courses — with automatic delivery:

1. Customer picks a product, enters their email, clicks **Buy now**.
2. They pay via Paystack (card, bank transfer, or USSD).
3. On success, the server verifies the payment and grants access:
   a **signed download link** for files (valid 24 hours), or a private
   **course page** for courses (access never expires).

It ships with seven sample products so the full flow works out of the box:

- **AI Video Creation for Beginners** (course — 6 lessons + a bonus toolkit download)
- CV Template Pack (placeholder zip — swap for real designs)
- Naira Budget Tracker (Excel)
- Cover Letter Template (Word)
- Invoice Template (Excel)
- Small Business Plan Template (Word)
- 30-Day Social Media Content Calendar (Excel)

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

## 2. Add a course

A course product needs `type: 'course'` and a `lessons` array instead of
(or in addition to) a single `file`:

```js
{
  id: 'my-course',
  type: 'course',
  name: 'My Course',
  description: 'What the customer gets.',
  priceNaira: 15000,
  file: 'bonus-worksheet.pdf', // optional — a downloadable extra
  lessons: [
    {
      title: 'Lesson 1 title',
      videoUrl: 'https://www.youtube.com/embed/XXXXXXXXXXX',
      description: 'What this lesson covers.'
    }
    // ...more lessons
  ]
}
```

**Recording and hosting your videos:** upload each lesson as an
**unlisted** YouTube (or Vimeo) video — unlisted means it won't show up in
search or on your channel, but anyone with the link can watch it. Use the
**embed URL** (`youtube.com/embed/VIDEO_ID`, found via Share → Embed), not
the regular watch link, or the video won't play inside the course page.
Until you add a real `videoUrl`, that lesson just shows its written outline
with a "video coming soon" note, so you can publish the course and record
lessons over time.

The AI Video Creation course that ships with this store already has full
lesson outlines written — check `data/products.js` for the script/talking
points for all 6 lessons, ready for you to record against.

Buying a course doesn't route through `/api/download/` at all — it lands on
a private `/course/[token]` page instead, listing every lesson. That link is
signed and doesn't expire, so it works as the customer's permanent access
to what they paid for.

## 3. Add a template/file product

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

Replace `cv-template-pack.zip` with real designs before going live — it's
currently a placeholder.

## 4. Deploy

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
components/ProductCard.js           Buy button + email input; shows a lesson-count badge for courses
app/api/checkout/route.js            Starts a Paystack payment
app/api/verify/route.js               Verifies payment, issues course and/or download access
app/api/download/[token]/route.js      Validates a file token and serves the file
app/course/[token]/page.js              Validates a course token and lists lessons
app/success/page.js                       Post-payment page — shows every access link the purchase grants
lib/access-token.js                        Shared signed-token logic used by both download and course access
data/products.js                            Product catalog — edit this to add files or courses
data/downloads/                              Your product files (including course bonus downloads)
```
