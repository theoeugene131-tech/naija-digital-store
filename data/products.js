// Two kinds of product:
//
//   type: 'file'   — a single downloadable file (the default if omitted).
//                     Requires `file`, matching something in data/downloads/.
//
//   type: 'course' — a set of video lessons shown on a private course page
//                     after payment (see app/course/[token]/page.js).
//                     Requires `lessons`. `file` is optional here too — use
//                     it for a bonus downloadable resource pack.
//
// For a course, put each lesson's real video link in `videoUrl` once you've
// recorded it (an unlisted YouTube or Vimeo embed URL works well — anyone
// with the link can watch, but it won't show up in search or your channel).
// Leave it as '' and the lesson just shows its outline until you do.

const products = [
  {
    id: 'ai-video-creation-course',
    type: 'course',
    name: 'AI Video Creation for Beginners',
    description:
      'Learn to make scroll-stopping videos using AI tools — no camera, editing degree, or expensive software required. 6 lessons, lifetime access.',
    priceNaira: 15000,
    file: 'ai-video-creation-toolkit.docx', // bonus: tool list + prompt cheat sheet
    lessons: [
      {
        title: 'What You Need to Get Started',
        videoUrl: '',
        description:
          "What this course covers and what it doesn't. A tour of the four things every AI video needs — a script, generated visuals, a voice, and an editor — and why you don't need a camera, studio, or coding skill for any of them. A quick note on tools: this space moves fast, so lesson 2 covers how to evaluate any tool rather than locking you into one."
      },
      {
        title: 'From Idea to a Script AI Can Use',
        videoUrl: '',
        description:
          "AI video tools work best from a short, visual script — one line per shot, written the way a director would think, not a novelist. You'll write a 30-second script for a real product or service (yours or a client's) and learn the difference between a prompt that gets a usable clip and one that gets a random, unusable one."
      },
      {
        title: 'Generating Your First AI Video Clips',
        videoUrl: '',
        description:
          "A hands-on walkthrough of text-to-video generation using a current mainstream tool (Runway, Pika, Kling, or Google's Veo are all reasonable starting points — the workflow is the same shape across all of them). You'll generate 3–4 short clips from your lesson 2 script, and learn why iterating on a prompt twice usually beats writing one long, perfect prompt."
      },
      {
        title: 'Adding a Voice and Captions',
        videoUrl: '',
        description:
          "A natural-sounding AI voiceover (using a tool like ElevenLabs) makes a video feel finished in a way silent clips never do. You'll generate a voiceover for your script, then add auto-captions — non-negotiable for social video, since most people watch with the sound off."
      },
      {
        title: 'Editing and Polishing',
        videoUrl: '',
        description:
          "Stitching your clips, voiceover, and captions together in a simple editor (CapCut is free and does everything a beginner needs). You'll add basic pacing, a title card, and background music, and export at the right size for TikTok, Reels, and YouTube Shorts."
      },
      {
        title: 'Getting Paid for This Skill',
        videoUrl: '',
        description:
          "Three realistic ways to earn from this: posting your own content and monetizing views, offering AI video creation as a service to local businesses who need social content, and freelance gigs on platforms like Fiverr. Includes how to price a first client project so it's easy to say yes to."
      }
    ]
  },
  {
    id: 'cv-template-pack',
    name: 'Modern CV Template Pack (5 designs)',
    description: 'Five clean, ATS-friendly CV templates, ready to edit.',
    priceNaira: 2000,
    file: 'cv-template-pack.zip'
  },
  {
    id: 'budget-tracker',
    name: 'Naira Budget Tracker (Excel)',
    description: 'A simple monthly budget spreadsheet with automatic totals.',
    priceNaira: 1500,
    file: 'budget-tracker.xlsx'
  },
  {
    id: 'cover-letter-template',
    name: 'Cover Letter Template (Word)',
    description: 'A fill-in-the-blank cover letter that pairs with the CV pack.',
    priceNaira: 1000,
    file: 'cover-letter-template.docx'
  },
  {
    id: 'invoice-template',
    name: 'Invoice Template (Excel)',
    description: 'A ready-to-use invoice with automatic totals — just fill in your details.',
    priceNaira: 1500,
    file: 'invoice-template.xlsx'
  },
  {
    id: 'business-plan-template',
    name: 'Small Business Plan Template (Word)',
    description: 'A guided 10-section template for writing a business plan, with prompts in each section.',
    priceNaira: 2500,
    file: 'business-plan-template.docx'
  },
  {
    id: 'content-calendar',
    name: '30-Day Social Media Content Calendar (Excel)',
    description: 'Plan a full month of posts across platforms, with status tracking.',
    priceNaira: 1500,
    file: 'content-calendar.xlsx'
  }
];

module.exports = { products };
