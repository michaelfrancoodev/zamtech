# ZamTech Automation Studio — Official Website

Full-stack company website for **ZamTech Automation Studio**, a professional ICT company based in **Mbeya, Tanzania**, founded by **Michael Francoo**.

Built with Next.js 16, Neon Postgres, Better Auth, Drizzle ORM, and Tailwind CSS v4.

**Live:** [zamtech.vercel.app](https://zamtech.vercel.app) &nbsp;|&nbsp; **Future domain:** zamtech.co.tz

---

## Tech Stack

| Layer              | Technology                                                                        |
|--------------------|-----------------------------------------------------------------------------------|
| Framework          | Next.js 16 App Router — TypeScript                                                |
| Styling            | Tailwind CSS v4 (config in `globals.css`, no `tailwind.config.js`)                |
| UI Components      | Base UI (`@base-ui/react`) + custom shadcn-style components                       |
| Database           | Neon Postgres (serverless) via `pg` driver                                        |
| ORM                | Drizzle ORM — schema in `lib/db/schema.ts`                                        |
| Auth               | Better Auth — email + password, session-based                                     |
| Email              | Nodemailer (SMTP) — Gmail now, Resend-ready                                       |
| WhatsApp           | CallMeBot free API — instant WhatsApp notifications on every form submission      |
| Fonts              | Plus Jakarta Sans (headings) · Inter (body) — `next/font/google`                  |
| Icons              | lucide-react                                                                      |
| Analytics          | Vercel Analytics (production only)                                                |
| Deployment         | Vercel                                                                            |

---

## Business Details

| Field         | Value                         |
|---------------|-------------------------------|
| Company       | ZamTech Automation Studio     |
| Founder / CEO | Michael Francoo               |
| Location      | Mbeya, Tanzania               |
| Phone         | +255 796 985 138              |
| WhatsApp      | wa.me/255796985138            |
| Email         | info@zamtech.co.tz            |
| Support       | support@zamtech.co.tz         |
| Hours         | Mon–Fri 8am–6pm, Sat 9am–1pm |

---

## Pages (20 routes)

### Public

| Route                  | Description                                                             |
|------------------------|-------------------------------------------------------------------------|
| `/`                    | Home — hero, services, why us, process, portfolio preview, testimonials, CTA |
| `/about`               | Company story, mission, values, team                                    |
| `/services`            | Full ICT service listing with features                                  |
| `/portfolio`           | Case studies — 6 completed projects with tech stacks                   |
| `/pricing`             | Three pricing tiers in TZS                                              |
| `/blog`                | Blog index — 6 articles                                                 |
| `/blog/[slug]`         | Individual blog post with full content, reading time, related articles  |
| `/testimonials`        | Client reviews with marquee animation                                   |
| `/contact`             | Contact form (saves to DB, email + WhatsApp to admin)                   |
| `/request-service`     | Detailed project brief form (saves to DB, email + WhatsApp to admin)    |
| `/support`             | Support ticket form (saves to DB, email + WhatsApp to admin)            |
| `/track`               | Manual tracking reference entry page                                    |
| `/track/[token]`       | Tracking page — shows live status of service request or support ticket  |
| `/faq`                 | Accordion FAQ                                                           |
| `/office-info`         | Office address, hours, directions                                       |
| `/careers`             | Open positions and application info                                     |
| `/privacy`             | Privacy policy                                                          |
| `/terms`               | Terms and conditions                                                    |
| `/cookies`             | Cookie policy                                                           |

### Admin (protected — session required)

| Route           | Description                                                                    |
|-----------------|--------------------------------------------------------------------------------|
| `/admin-login`  | Staff login page — email + password. Already-authenticated admins auto-redirect |
| `/admin`        | Dashboard overview — totals and recent activity                                |
| `/admin?tab=service-requests` | All service requests — status update, notes, delete              |
| `/admin?tab=messages`         | All contact messages — reply, mark read, delete                  |
| `/admin?tab=tickets`          | All support tickets — respond, status update, delete             |
| `/admin?tab=users`            | Manage admin accounts — add new admin, remove existing           |

Entry point from the public site: **Footer bottom bar → "Staff Login"** (small, low-contrast — intentional).

---

## Database Schema

Managed with Drizzle ORM. Tables live in `lib/db/schema.ts`.

### Better Auth tables (auto-managed)
- `user` — admin accounts
- `session` — active sessions
- `account` — auth provider links
- `verification` — email verification tokens

### App tables

**`service_requests`**
```
id, tracking_token (UUID), full_name, email, phone, company,
service_type, budget_range, timeline, description,
status (new|in-progress|completed|cancelled), admin_notes,
createdAt, updatedAt
```

**`contact_messages`**
```
id, full_name, email, phone, subject, message,
status (unread|read|replied), admin_reply,
createdAt, updatedAt
```

**`support_tickets`**
```
id, tracking_token (UUID), full_name, email, phone,
issue_category, priority (normal|high|urgent), subject, description,
status (open|in-progress|resolved|closed), admin_response,
createdAt, updatedAt
```

---

## Notifications Architecture

Every form submission triggers three things automatically:

1. **Save to Neon DB** — record persisted with UUID tracking token
2. **Email to admin** — branded HTML email via SMTP (Gmail or Resend)
3. **Email to client** — confirmation with tracking link and reference number
4. **WhatsApp to admin** — instant message via CallMeBot free API

All notification config is in `lib/email.ts`. Zero hardcoded values — everything reads from env vars.

### Switching to Resend (when ready)

Change only 4 env vars — no code changes needed:

```bash
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=resend
SMTP_PASS=re_your_resend_api_key
```

### Switching to custom domain

Change only 2 env vars:

```bash
NEXT_PUBLIC_SITE_URL=https://zamtech.co.tz
BETTER_AUTH_URL=https://zamtech.co.tz
```

Redeploy. Every tracking link, email URL, and auth cookie domain updates automatically.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Set all vars in **Vercel → Settings → Environment Variables** for production.

```bash
# Database
DATABASE_URL=postgresql://...neon.tech/neondb?sslmode=require

# Auth
BETTER_AUTH_SECRET=        # openssl rand -base64 32
BETTER_AUTH_URL=           # https://zamtech.vercel.app  (or custom domain)

# Site URL (used in tracking emails and links)
NEXT_PUBLIC_SITE_URL=      # https://zamtech.vercel.app  (or custom domain)

# SMTP — Gmail now, swap to Resend later (see .env.example for details)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx   # Gmail App Password

# Admin
ADMIN_EMAIL=               # Who receives notification emails
EMAIL_FROM_NAME=ZamTech Automation Studio
EMAIL_FROM_ADDRESS=noreply@zamtech.co.tz

# WhatsApp (CallMeBot — free, no paid API)
ADMIN_WHATSAPP_PHONE=255796985138
CALLMEBOT_API_KEY=         # See setup instructions below
```

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
# Fill in DATABASE_URL, BETTER_AUTH_SECRET, SMTP_* values
```

### 3. Push database schema

```bash
pnpm db:push
```

### 4. Create the first admin account

```bash
# Make sure pnpm dev is running first
pnpm dev

# In a separate terminal:
pnpm create-admin
```

Edit `scripts/create-admin.mjs` to set your name, email, and password before running.

### 5. Open the app

```bash
# http://localhost:3000        — public site
# http://localhost:3000/admin-login  — admin login
```

---

## WhatsApp Notification Setup (CallMeBot — Free)

One-time setup, takes 2 minutes:

1. Save `+34 644 82 17 63` in your phone contacts as **CallMeBot**
2. Send this exact message to that number on WhatsApp:
   ```
   I allow callmebot to send me messages
   ```
3. You will receive your API key back within seconds via WhatsApp
4. Set `CALLMEBOT_API_KEY=your-key` in your env vars
5. Set `ADMIN_WHATSAPP_PHONE=255796985138` (your number, no + prefix)

Reference: [callmebot.com/blog/free-api-whatsapp-messages](https://www.callmebot.com/blog/free-api-whatsapp-messages/)

---

## Project Structure

```
app/
  layout.tsx                  Root layout — JSON-LD schema, fonts, CookieConsent, Analytics
  globals.css                 Tailwind v4 @theme tokens, marquee keyframes
  sitemap.ts                  Auto-generated XML sitemap (20 routes)
  robots.ts                   robots.txt — blocks /admin*, allows all else
  page.tsx                    Home page
  about/page.tsx
  services/page.tsx
  portfolio/page.tsx
  pricing/page.tsx
  blog/
    page.tsx                  Blog index (6 articles)
    [slug]/page.tsx           Individual post — full content, JSON-LD Article schema
  testimonials/page.tsx
  contact/
    layout.tsx                Metadata wrapper (client page)
    page.tsx
  request-service/
    layout.tsx
    page.tsx
  support/
    layout.tsx
    page.tsx
  track/
    layout.tsx
    page.tsx                  Manual tracking token entry
    [token]/page.tsx          Live tracking status
  faq/page.tsx
  office-info/page.tsx
  careers/page.tsx
  privacy/page.tsx
  terms/page.tsx
  cookies/page.tsx
  admin/
    layout.tsx                Session guard — redirects to /admin-login
    loading.tsx               Skeleton loader
    page.tsx                  Dashboard (fetches all data, passes to AdminOverview)
  admin-login/page.tsx        Auth page — auto-redirects if already logged in
  actions/
    data.ts                   All server actions (CRUD + auth guard)

components/
  navbar.tsx                  Fixed top nav — Blog + Portfolio links added
  footer.tsx                  Dark footer — Staff Login link in bottom bar
  cookie-consent.tsx          GDPR cookie banner (localStorage-persisted)
  back-to-top.tsx
  page-hero.tsx               Reusable hero section for inner pages
  page-wrapper.tsx            Inner page layout wrapper
  page-loading.tsx            Shared skeleton loading component
  reveal-section.tsx          Scroll-triggered fade-in animation
  whatsapp-icon.tsx           Official WhatsApp SVG icon
  admin/
    admin-overview.tsx        Dashboard UI — 5 tabs (overview, requests, messages, tickets, users)
    admin-sidebar.tsx         Sidebar nav — uses ?tab= searchParams, Suspense-wrapped
  ui/
    accordion.tsx             Base UI accordion
    badge.tsx
    button.tsx
    card.tsx
    separator.tsx
    tabs.tsx

lib/
  auth.ts                     Better Auth server config
  auth-client.ts              Better Auth client (useSession, signIn, signOut)
  email.ts                    SMTP email + WhatsApp notifications (fully env-driven)
  utils.ts                    cn() utility
  db/
    index.ts                  Neon pool + Drizzle instance
    schema.ts                 All table definitions

scripts/
  create-admin.mjs            One-time script to create the first admin account

public/
  images/
    zamtech-logo.png          Angular cyan Z logo
    hero-office.png           Hero background image
```

---

## SEO

- Per-page `export const metadata` on every server-rendered route
- `metadataBase`, `openGraph`, and `twitter` card configured globally in `layout.tsx`
- JSON-LD `LocalBusiness` schema injected in root layout
- JSON-LD `Article` schema on every blog post page
- `sitemap.ts` covers all 20 public routes including all 6 blog slugs
- `robots.ts` — disallows `/admin` and `/admin-login`, allows everything else
- `next.config.ts` — security headers (X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy), image optimization (avif + webp), `www` redirect

---

## Security Headers

Set via `next.config.ts` on all routes:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-XSS-Protection: 1; mode=block
```

---

## Admin Flow

```
Landing page
  └── Footer → "Staff Login" (small link, bottom right)
        └── /admin-login
              ├── Not authenticated → show login form → /admin on success
              └── Already authenticated → redirect straight to /admin

/admin (protected by layout.tsx session check)
  ├── Sidebar: Overview / Service Requests / Messages / Tickets / Manage Admins
  ├── All tabs via ?tab= searchParams (no separate routes, no 404s)
  └── Sign Out → clears session → /admin-login

Manage Admins tab
  ├── List all admin users with creation date
  ├── Add new admin (name + email + password — min 8 chars)
  └── Remove admin (with guard: cannot delete yourself)
```

---

## Scripts

| Script            | Command              | Purpose                                  |
|-------------------|----------------------|------------------------------------------|
| Dev server        | `pnpm dev`           | Start Next.js on localhost:3000          |
| Build             | `pnpm build`         | Production build + type check            |
| Start             | `pnpm start`         | Serve production build                   |
| Lint              | `pnpm lint`          | ESLint                                   |
| DB push           | `pnpm db:push`       | Push schema changes to Neon (no migration files) |
| DB generate       | `pnpm db:generate`   | Generate Drizzle migration files         |
| DB migrate        | `pnpm db:migrate`    | Run pending migrations                   |
| DB studio         | `pnpm db:studio`     | Open Drizzle Studio (local DB GUI)       |
| Create admin      | `pnpm create-admin`  | Seed first admin account (run once)      |

---

## Deployment

1. **Merge** `deep-audit-and-research` → `main` on GitHub
2. **Vercel** detects the push and auto-deploys
3. **Set all env vars** in Vercel → Settings → Environment Variables
4. **Run** `pnpm create-admin` pointed at the production URL to seed the admin account

Or click **Publish** in the v0 UI to deploy directly.

---

## Brand

| Token           | Value        | Usage                                         |
|-----------------|--------------|-----------------------------------------------|
| Primary cyan    | `#00C8FF`    | Buttons, accents, icons, active states        |
| Navy            | `#0A1628`    | Navbar, footer, dark section backgrounds      |
| Background      | `#ffffff`    | Page background                               |
| WhatsApp green  | `#25D366`    | WhatsApp icon and button only                 |
| Heading font    | Plus Jakarta Sans, extrabold, `letter-spacing: -0.04em` | |
| Body font       | Inter, regular/medium                         | |

Logo: `public/images/zamtech-logo.png` — angular cyan Z on black background.
Use `mix-blend-screen` on dark surfaces so the black fill disappears and only the cyan Z shows.

---

&copy; 2025 ZamTech Automation Studio. Mbeya, Tanzania. All rights reserved.
