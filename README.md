# Bani Yas Building Contg. LLC — Next.js website + Admin CMS

A 1:1 Next.js rebuild of the original static site (same markup, CSS and animations) with a
MySQL-backed admin panel so the dynamic sections can be managed without touching code.

- **Next.js 16** (App Router, JavaScript, React 19, Server Components + Server Actions)
- **MySQL 8 / MariaDB 10.6+** via `mysql2` (connection pool, parameterised queries)
- **Zod 4** validation shared by the admin UI and the server
- **GSAP 3 (ScrollTrigger + SplitText)**, **Swiper**, animate.css + a WOW.js port — the original theme animations
- Admin auth: bcrypt password hashes + signed JWT session in an httpOnly cookie (`jose`), login rate limiting

---

## 1. Quick start

```bash
cd baniyas-next
npm install
# settings are in .env.development (npm run dev) and .env.production (build / Docker)
npm run db:setup              # creates tables and seeds all current website content + first admin
npm run dev                   # http://localhost:7111   admin: http://localhost:7111/bys-panel-d10224a364
```

Production:

```bash
npm run build
npm start                     # production on your server: Docker, see deploy/DEPLOYMENT.md
```

Requirements: Node.js **20.9+**, MySQL 8+ (or MariaDB 10.6+).

## 2. Environment variables (`.env.development` / `.env.production`)

Both files are committed in this **private** repository. Next.js and the npm scripts load
`.env.development` for `npm run dev` and `.env.production` for `npm run build` / `npm start` / Docker.
Real environment variables (CI, Coolify) and an optional personal `.env.local` (not committed) override them.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Set this in production** to the real address (e.g. `https://baniyasbuilders.com`). Used in the sitemap, robots.txt, share previews and Google business data. |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection. |
| `DB_CONNECTION_LIMIT` | Pool size (default 10). |
| `AUTH_SECRET` | **Required.** Min 32 chars, signs the admin session. Generate: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |
| `AUTH_SESSION_HOURS` | Admin session lifetime (default 12). |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | First admin created by `db:seed` / `admin:create`. Change the password after first login. |
| `UPLOAD_DIR` | Where uploaded images are stored (default `./storage/uploads`, served at `/uploads/...`). |
| `CONTACT_FORWARD_URL` | Optional. Contact messages are always saved to MySQL; if set they are also POSTed (JSON) to this URL (this is what emails them). |
| `BACKUP_DIR` | Where `npm run backup` writes (default `./backups`). |
| `ERROR_WEBHOOK_URL` | Optional. Server errors are POSTed here (Slack/Discord/Google Chat webhook), max once per error per 10 min. |

## 3. Scripts

| Command | What it does |
| --- | --- |
| `npm run db:migrate` | Applies new SQL files from `database/migrations` (tracked in `schema_migrations`). |
| `npm run db:seed` | Seeds the original content + first admin (skips tables that already have data). |
| `npm run db:setup` | migrate + seed. |
| `npm run admin:create -- email@x.com "Password1" "Name"` | Creates an admin or resets its password. |
| `npm run backup` | Saves the database (`database.sql`) and uploads to `backups/<date-time>/`; keeps the 14 newest (`-- --keep 30` to change). Run it daily from cron / Task Scheduler. |
| `npm run lint` | ESLint (Next.js core-web-vitals rules). |
| `npm test` | Unit tests (Vitest, `tests/unit`): validation, content defaults, uploads, CSV, rate limits, admin URL. No database needed. |
| `npm run test:e2e` | Browser tests (Playwright, `tests/e2e`) on desktop + mobile Chrome. Needs `npm run build` and the database; starts the site on port 3100. First time: `npx playwright install chromium`. |

If your host does not allow Node scripts to create databases, create the database manually and import
every file in `database/migrations/` in order (e.g. with phpMyAdmin), then run `npm run db:seed`.

After updating the code, always run `npm run db:migrate` once (new migrations: `002_admin_activity.sql`).

## 4. What is dynamic (Admin → sections)

| Admin section | Website location |
| --- | --- |
| **Trusted Clients** | Home banner logo marquee "Our Trusted Clients" |
| **Counters** | Home "35+ Complete Projects / 70+ Team Members / 35+ Clients" |
| **Services** | Home services slider cards **and** the full Services page (sidebar, images, paragraphs, benefits, FAQs) |
| **Project Showcase** | Home hover-to-expand project strip (e.g. "Algail — Embosal Steel Mill") |
| **Portfolio** | Portfolio page grid (`/portfolio`, old `gallery.html`) |
| **Our Clients** | About page "Our Partners / Our Clients" grid |
| **Job Openings** | Careers page "Open Positions" (replaces the Google Sheet) |
| **Messages** | Contact form submissions (search, unread filter, mark all read, CSV download) |
| **Page content → Home / About / Careers** | All other text, images, the banner video, FAQs, core values and benefits |
| **Page content → Footer & Sidebar** | Footer texts, copyright line (year is automatic), sidebar menu text |
| **Page content → Legal Pages** | `/terms` and `/privacy` (empty = page and footer link hidden) |
| **Contact Details** | Phones, email, address, map, social links, WhatsApp button |
| **SEO & Sharing** | Page titles/descriptions for Google and the link preview image |
| **Admin Users / Activity Log** | Who can sign in, and who changed what |

Page content screens are generated from `src/lib/content-config.js` (fields, limits and the original
text as defaults). To make another text editable, add a field there and read it with `getSiteSettings()`.
| **Section Headings** | Headings of the sections above + the home services image |

Every list supports create / edit / delete / show-hide and a sort order.

### Validation rules

Text limits are enforced in the browser (maxlength + live character counter) and again on the server (Zod).

| Image | Formats | Max size | Min px | Max px | Aspect ratio (w÷h) | Recommended |
| --- | --- | --- | --- | --- | --- | --- |
| Trusted client logo | PNG, WEBP, JPG | 1 MB | 200×80 | 1600×800 | 1.5 – 4 | 400×160 transparent PNG |
| Showcase project | JPG, PNG, WEBP | 5 MB | 800×600 | 6000×6000 | — | 1600×1200+ |
| Portfolio project | JPG, PNG, WEBP | 5 MB | 500×500 | 6000×6000 | — | 1280×960+ |
| Service main image | JPG, PNG, WEBP | 2 MB | 750×450 | 3000×2000 | 1.3 – 1.9 | 872×553 |
| Service detail images | JPG, PNG, WEBP | 1 MB | 400×230 | 2000×1200 | 1.4 – 2.0 | 424×244 |
| Home services image | JPG, PNG, WEBP | 2 MB | 900×380 | 3000×1500 | 2.0 – 2.8 | 1060×453 |

Images are checked in the browser before upload and re-checked on the server from the real file bytes
(type is detected from content, not the file name). Layout limits: max **3** visible counters,
**6** visible showcase projects, **20** visible trusted-client logos, **10** benefits and **10** FAQs per service.

Rules live in `src/lib/validation/image-rules.js` and `src/lib/validation/schemas.js`.

## 5. Project structure

```
baniyas-next/
├── database/
│   ├── migrations/                         # 001 tables, 002 activity log
│   ├── seed-data.mjs                       # original site content
│   └── seed-services.json
├── public/assets/                          # original theme CSS, fonts, images (unchanged)
├── scripts/                                # migrate / seed / create-admin / backup CLIs
├── storage/uploads/                        # admin uploads (git-ignored)
└── src/
    ├── proxy.js                            # protects /bys-panel-d10224a364/* (Next 16 "proxy" = middleware)
    ├── actions/admin/                      # Server Actions (CRUD, auth, settings)
    ├── app/
    │   ├── (site)/                         # public website (own root layout)
    │   │   ├── (home)/                     # home page + home header/footer
    │   │   └── (pages)/                    # about, services, portfolio, careers, contact, 404
    │   ├── (admin)/bys-panel-d10224a364/                # admin panel (own root layout, Bootstrap 5.3)
    │   ├── api/contact/route.js            # contact form endpoint
    │   ├── uploads/[...path]/route.js      # serves uploaded images/videos (with byte ranges)
    │   └── sitemap.js, robots.js           # /sitemap.xml, /robots.txt
    ├── components/
    │   ├── site/                           # layout, sections, effects (animations)
    │   └── admin/                          # shell, tables, form fields, forms
    ├── lib/
    │   ├── db.js                           # MySQL pool
    │   ├── auth/                           # JWT session, rate limit
    │   ├── repositories/                   # data access per table
    │   ├── validation/                     # zod schemas + image rules
    │   ├── admin/                          # generic CRUD action helpers
    │   ├── uploads.js                      # image inspection / storage
    │   ├── content-config.js               # editable page content (admin fields + original text as defaults)
    │   ├── seo.js                          # page metadata + schema.org business data
    │   └── constants/                      # company info, nav, icons, FAQs
    └── styles/admin.css
```

## 5. Deployment, CI and monitoring

- **Deployment guide:** [`deploy/DEPLOYMENT.md`](deploy/DEPLOYMENT.md) (server setup, database user, updates,
  backups, monitoring, go-live checklist), with the `Dockerfile` (the site is served on port 7111, run by Coolify).
- **Docker deploy (Coolify):** `.github/workflows/deploy.yml` runs after CI passes on a push to `production`:
  it builds the image, pushes it to GitHub Container Registry and triggers Coolify's deploy webhook,
  then waits until `/api/health` reports the new version.
- **CI:** `.github/workflows/ci.yml` runs lint, unit tests, a MySQL-backed build and the browser tests on every
  push / pull request. `.github/dependabot.yml` proposes package updates weekly.
- **Health check:** `GET /api/health` → `{"status":"ok"}` (503 if the database is down) for uptime monitors.
- **Errors:** logged by `src/instrumentation.js`; alerts go to `ERROR_WEBHOOK_URL` when set.
- **Admin URL:** defined once in `src/lib/admin-path.js` (`ADMIN_BASE`). It must match the folder
  `src/app/(admin)/bys-panel-d10224a364` and the matcher in `src/proxy.js` (a unit test checks this).

## 6. Notes

- **Animations** — `src/components/site/effects/` ports the theme's `custom.js`: WOW reveal, GSAP bounce buttons,
  split-text titles, counter-up, custom cursor, scroll-to-top progress circle, Swiper slider.
- **Rendering / caching** —
  - **Public pages (ISR):** Home, About, Services, Portfolio, Careers, Contact, Terms, Privacy and `sitemap.xml` are
    pre-rendered and served from cache. Every admin save calls `refreshSite()` → `revalidatePath('/', 'layout')`,
    so the next visit rebuilds the page with the new content. The `revalidate = 3600` in `(site)/layout.jsx` is only
    a safety net.
  - **Services page:** the `?service=<slug>` choice is read in the browser (`useSearchParams` inside `<Suspense>`),
    so the page can stay cached. The pre-rendered HTML shows the first service.
  - **Per request (SSR):** the admin panel (`force-dynamic` in `(admin)/layout.jsx`), `/api/contact`, `/uploads/…`,
    the CSV export and unknown URLs (404).
  - **Static:** `robots.txt`.
  - `next build` **needs the database**, because the public pages are rendered at build time. The cache lives in
    `.next`, so run the site as one long-running container (Docker, see deploy/). Several instances would each have
    their own cache.
- **Images & video** —
  - Admin uploads are shrunk to max 2000 px (the org chart 3000 px) and recompressed with `sharp` when saved;
    EXIF rotation is applied and metadata (e.g. phone GPS) removed. Videos are stored as uploaded, so compress
    them first (e.g. HandBrake, H.264, no audio, under ~5 MB).
  - `npm run images:optimize` recompresses the theme images in `public/assets/img` in place (same names);
    `npm run images:optimize -- storage/uploads` does the same for existing uploads, `-- --dry` only reports.
  - Images below the first screen use `loading="lazy"`; the banner video has a still image (`poster`).
  - `/assets/*` is cached by browsers for 7 days (`next.config.mjs`). After replacing a theme file under the same
    name, returning visitors may see the old one for up to a week; give it a new name to update it immediately.
- **Old URLs** (`/about.html`, `/gallery.html`, …) permanently redirect to the new routes (`next.config.mjs`).
- **Uploads** are stored outside `public/` because Next.js only serves files that exist in `public/` at build time.
  Back up `storage/uploads` together with the database.
- The login rate limiter and contact-form flood protection are in-memory; use a shared store if you run several instances.
  Client IPs are read from the **last** `x-forwarded-for` entry (the one your reverse proxy adds); logins are also
  limited per email address, so forged IPs don't help an attacker.
- **Contact form spam**: a hidden honeypot field and a minimum fill time; bots get a fake "sent" reply and nothing is stored.
- **Security headers** (CSP, X-Frame-Options, HSTS in production, …) are set in `next.config.mjs`. If you add an
  external script, font or iframe, allow its domain in the CSP there.
- **Upload size**: `serverActions.bodySizeLimit` and `proxyClientMaxBodySize` are both 40 MB (banner video up to 30 MB).
  If you ever put a reverse proxy in front of the app, raise its upload limit to 40 MB too.
- The admin URL is hidden on purpose: it is not linked from the site or listed in `robots.txt`.




admin : http://localhost:7111/bys-panel-d10224a364