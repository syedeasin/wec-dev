# West End Chiropractic website

Astro 7 site for **austin-chiropractor.com**, deployed on **Cloudflare Workers** (static assets + one small Worker route for forms).

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/ (must pass before deploying)
npm run preview    # serves the built site
```

Node 22 or newer.

## Deploy (Cloudflare)

1. Push the repo to GitHub and connect it in **Cloudflare → Workers & Pages → Create → Import a repository**.
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
2. Add the secret **`LEAD_WEBHOOK_URL`** (Settings → Variables and Secrets), or run `npx wrangler secret put LEAD_WEBHOOK_URL`.
3. Point the domain at the Worker (Settings → Domains & Routes).

## Forms

Every form (booking request, newsletter) posts to `/api/lead` (`src/pages/api/lead.ts`).

- On Cloudflare it sends the fields as JSON to `LEAD_WEBHOOK_URL` (Zapier, Make, GoHighLevel, n8n…), then redirects to `/thank-you`.
- Locally, or when the variable is not set, it skips sending and goes straight to the thank-you page.
- A hidden `company` field is a honeypot for bots.
- Fields sent by the booking form: `form, date, time, first_name, last_name, phone, email, patient_type, payment, message, source_page, submitted_at`.

## Where things live

| What | Where |
| --- | --- |
| Business details (phone, address, hours, links, video URLs, form links) | `src/data/site.ts` |
| Navigation menus | `src/data/site.ts` (`mainNav`, `services`, `conditionHubs`, `areas`) |
| Page copy (from Figma, one file per page) | `src/data/pages/<slug>.json` |
| URL, SEO title and description of data-driven pages | `src/data/routes.ts` |
| Reviews shown on each page | `src/data/reviews.json` |
| Resource library list | `src/data/articles.ts` |
| Article pages (Markdown) | `src/articles/<slug>.md` → `/resources/<slug>` |
| Design tokens (colours, type scale, spacing, breakpoints) | `src/styles/tokens.css` |
| Photos (WebP, optimised at build) | `src/assets/images/` |
| Icons (SVG) | `src/assets/icons/` |
| Redirects | `public/_redirects` |

### Editing page copy

Open `src/data/pages/<slug>.json` and change the text. `**bold**` is already converted: use `<strong>…</strong>` for bold and `<span class="hl">…</span>` for the orange highlight. Section types are picked automatically from their content (`src/lib/content.ts → sectionKind`).

### Adding an article

Create `src/articles/<slug>.md` with the same front matter as `why-lower-back-hurts-after-sitting.md`. If the slug is listed in `src/data/articles.ts`, its card on /resources becomes a link automatically (cards without an article show "Coming soon").

### Videos

Set YouTube or Vimeo links in `site.videos` (home) and `videos` in `src/data/articles.ts`. A plain watch link works; it opens in a popup.

## Layout rules

- Breakpoints: mobile < 768, tablet 768–1279, laptop 1280–1679, desktop ≥ 1680.
- Content width: 1600 at ≥1680, 1280 with 80px gutters at 1440, 80px gutters at 768, exactly 20px side padding at 393.
- Mobile is the client-approved reference; copy comes from the mobile frames.

## Review avatars

Google review photos are not committed. The Windows installer downloads them into `public/avatars/NNN.jpg`; a missing avatar falls back to initials.
