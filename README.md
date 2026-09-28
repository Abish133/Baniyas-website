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
cp .env.example .env          # then edit the values (DB + AUTH_SECRET + admin login)
npm run db:setup              # creates tables and seeds all current website content + first admin
npm run dev                   # http://localhost:3000   admin: http://localhost:3000/bys-panel-d10224a364
```

Production:

```bash
npm run build
npm start                     # or run behind PM2 / systemd / a reverse proxy
```

Requirements: Node.js **20.9+**, MySQL 8+ (or MariaDB 10.6+).

## 2. Environment variables (`.env`)

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

## 3. Scripts

| Command | What it does |
| --- | --- |
| `npm run db:migrate` | Applies new SQL files from `database/migrations` (tracked in `schema_migrations`). |
| `npm run db:seed` | Seeds the original content + first admin (skips tables that already have data). |
| `npm run db:setup` | migrate + seed. |
| `npm run admin:create -- email@x.com "Password1" "Name"` | Creates an admin or resets its password. |
| `npm run backup` | Saves the database (`database.sql`) and uploads to `backups/<date-time>/`; keeps the 14 newest (`-- --keep 30` to change). Run it daily from cron / Task Scheduler. |
| `npm run lint` | ESLint (Next.js core-web-vitals rules). |

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

## 6. Notes

- **Animations** — `src/components/site/effects/` ports the theme's `custom.js`: WOW reveal, GSAP bounce buttons,
  split-text titles, counter-up, custom cursor, scroll-to-top progress circle, Swiper slider.
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
  If a reverse proxy sits in front (nginx `client_max_body_size`, Plesk, cPanel), raise its limit to 40 MB too.
- The admin URL is hidden on purpose: it is not linked from the site or listed in `robots.txt`.
