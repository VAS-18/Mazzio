
# Mazzio

Your personal second brain. Capture everything — quotes, code, links, voice notes, YouTube videos, X bookmarks — and actually find it later.

---

## The problem

You save things everywhere and never go back to them. X bookmarks, browser bookmarks, Notion pages, notes apps — they're all graveyards. Mazzio is built around resurfacing, not just saving.

---

## What it does

**Capture anything**
- Highlight text on any webpage → save it in one click via the browser extension
- Save YouTube videos with their full auto-transcribed captions
- Sync your X bookmarks automatically (no API key needed)
- Upload images, files, and voice notes
- Write long-form notes with `[[wikilinks]]` between entries

**Find it later**
- Keyword search across everything
- Semantic search — finds entries even when you can't remember the exact words
- Ask your brain in plain language: *"what did I save about React performance?"*
- Knowledge graph showing how your entries connect (Obsidian-style)

**Resurface it**
- Daily digest email with entries you've forgotten about
- Related entries shown whenever you save something new
- Spaced repetition — old entries surface before they fade completely

---

## Stack

| Layer | Tech |
|---|---|
| Backend | Node.js + TypeScript + Hono |
| Database | PostgreSQL + pgvector (Neon) |
| Auth | BetterAuth |
| File storage | Cloudflare R2 |
| Embeddings | Cloudflare Workers AI |
| LLM (AI ask) | Groq (Llama 3) |
| Transcription | Groq Whisper |
| Email | Resend + React Email |
| Tests | Vitest (TDD) |
| Browser extension | Chrome MV3 |

Everything runs on free tiers for personal use.

---

## Repo structure

```
mazzio/
├── apps/
│   ├── backend/       Node.js + TypeScript REST API
│   └── extension/     Chrome/Firefox browser extension
├── .github/
│   └── workflows/
│       └── test.yml   CI — runs tests on every push
└── CLAUDE.md          Context file for Claude Code
```

---

## Getting started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) account (free)
- A [Cloudflare](https://cloudflare.com) account (free, for R2 + Workers AI)
- A [Groq](https://console.groq.com) API key (free)
- A [Resend](https://resend.com) API key (free)

### Backend setup

```bash
# Clone the repo
git clone https://github.com/yourusername/mazzio.git
cd mazzio

# Install dependencies
npm install

# Set up environment variables
cd apps/backend
cp .env.example .env
# Fill in your keys in .env

# Run database migrations
npm run db:migrate

# Start the dev server
npm run dev
```

### Environment variables

```env
DATABASE_URL=            # Neon PostgreSQL connection string
BETTER_AUTH_SECRET=      # Random string, min 32 chars
BETTER_AUTH_URL=         # Public URL of your backend
CLOUDFLARE_ACCOUNT_ID=   # Cloudflare account ID
CLOUDFLARE_API_TOKEN=    # R2 + Workers AI token
R2_BUCKET_NAME=          # Cloudflare R2 bucket name
R2_PUBLIC_URL=           # Public R2 URL for file serving
GROQ_API_KEY=            # Groq API key
RESEND_API_KEY=          # Resend API key
```

### Browser extension setup

Load the extension unpacked in Chrome (no Chrome Web Store needed for personal use):

```
1. Go to chrome://extensions
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the apps/extension/ folder
```

---

## API overview

All endpoints require `Authorization: Bearer <token>` except auth routes.

Base URL: `/v1`

```
POST   /auth/sign-up
POST   /auth/sign-in
GET    /auth/me

GET    /entries               list + filter entries
POST   /entries               create entry
GET    /entries/:id           get entry
PATCH  /entries/:id           update entry
DELETE /entries/:id           delete entry
GET    /entries/:id/related   semantically similar entries
POST   /entries/upload        upload image, file, or voice note

GET    /search                keyword search
POST   /search/semantic       vector similarity search
POST   /ai/ask                ask your brain (RAG, streams via SSE)

GET    /tags                  list tags with counts
DELETE /tags/:slug            delete tag

GET    /graph                 knowledge graph nodes + edges
GET    /digest/today          today's resurfaced entries
```

Full API design is documented in [`CLAUDE.md`](./CLAUDE.md).

---

## Browser extension features

**On any page**
- Highlight text → click the Mazzio icon → save with tags and a note
- Right-click any image or link → "Save to Mazzio"

**On `x.com/i/bookmarks`**
- "Sync to Mazzio" button injected into the page
- Scrolls through your bookmarks and imports them all
- Incremental — remembers where it left off, only syncs new ones

**On `youtube.com/watch`**
- "Save to Mazzio" button injected next to Like
- Saves title, channel, thumbnail, and the full transcript
- No YouTube API key needed — reads captions from the page directly

---

## Testing

Mazzio is built with TDD — tests are written before implementation.

```bash
cd apps/backend

npm test          # watch mode (use during development)
npm run test:run  # run once (used in CI)
```

Tests live next to the files they test:
```
entries.service.ts
entries.service.test.ts
```

GitHub Actions runs the full test suite on every push.

---

## Deployment

The free tier stack for personal use:

| Service | Provider | Limit |
|---|---|---|
| Backend hosting | Railway | 500h/month |
| PostgreSQL + pgvector | Neon | 0.5GB |
| File storage | Cloudflare R2 | 10GB |
| Embeddings | Cloudflare Workers AI | Free |
| LLM | Groq | Free tier |
| Transcription | Groq Whisper | Free tier |
| Email | Resend | 3,000 emails/month |
| CI | GitHub Actions | 2,000 min/month |

---

## What Mazzio is not

- Not a team or collaborative tool — it's personal, single-user only
- Not a Notion replacement — no databases, kanban, or tables
- Not a read-later app — the goal is resurfacing, not a reading queue
- Not a public product (yet)

---

## License

MIT
