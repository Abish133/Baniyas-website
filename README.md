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
npm run dev                   # http://localhost:3000   admin: http://localhost:3000/admin
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
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site (metadata). |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection. |
| `DB_CONNECTION_LIMIT` | Pool size (default 10). |
| `AUTH_SECRET` | **Required.** Min 32 chars, signs the admin session. Generate: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |
| `AUTH_SESSION_HOURS` | Admin session lifetime (default 12). |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | First admin created by `db:seed` / `admin:create`. Change the password after first login. |
| `UPLOAD_DIR` | Where uploaded images are stored (default `./storage/uploads`, served at `/uploads/...`). |
| `CONTACT_FORWARD_URL` | Optional. Contact messages are always saved to MySQL; if set they are also POSTed (JSON) to this URL. |

## 3. Scripts

| Command | What it does |
| --- | --- |
| `npm run db:migrate` | Applies new SQL files from `database/migrations` (tracked in `schema_migrations`). |
| `npm run db:seed` | Seeds the original content + first admin (skips tables that already have data). |
| `npm run db:setup` | migrate + seed. |
| `npm run admin:create -- email@x.com "Password1" "Name"` | Creates an admin or resets its password. |
| `npm run lint` | ESLint (Next.js core-web-vitals rules). |

If your host does not allow Node scripts to create databases, create the database manually and import
`database/migrations/001_initial_schema.sql` (e.g. with phpMyAdmin), then run `npm run db:seed`.

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
| **Messages** | Contact form submissions |
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
│   ├── migrations/001_initial_schema.sql   # tables
│   ├── seed-data.mjs                       # original site content
│   └── seed-services.json
├── public/assets/                          # original theme CSS, fonts, images (unchanged)
├── scripts/                                # migrate / seed / create-admin CLIs
├── storage/uploads/                        # admin uploads (git-ignored)
└── src/
    ├── proxy.js                            # protects /admin/* (Next 16 "proxy" = middleware)
    ├── actions/admin/                      # Server Actions (CRUD, auth, settings)
    ├── app/
    │   ├── (site)/                         # public website (own root layout)
    │   │   ├── (home)/                     # home page + home header/footer
    │   │   └── (pages)/                    # about, services, portfolio, careers, contact, 404
    │   ├── (admin)/admin/                  # admin panel (own root layout, Bootstrap 5.3)
    │   ├── api/contact/route.js            # contact form endpoint
    │   └── uploads/[...path]/route.js      # serves uploaded images
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
