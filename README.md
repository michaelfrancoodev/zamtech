# ZamTech Automation Studio — Official Website

**ZamTech Automation Studio** is a professional ICT company based in **Mbeya, Tanzania**, founded by **Michael Francoo**. This is the official company website — built with Next.js 16 App Router, Tailwind CSS v4, and shadcn/ui. No database is required; all pages are statically rendered.

---

## Live Site

Deployed on Vercel. Push to the connected GitHub branch to trigger an automatic production build.

---

## Tech Stack

| Layer       | Technology                                                        |
|-------------|-------------------------------------------------------------------|
| Framework   | Next.js 16 (App Router, TypeScript)                               |
| Styling     | Tailwind CSS v4 (no `tailwind.config.js` — config lives in `globals.css`) |
| UI Kit      | shadcn/ui (`components/ui/`)                                      |
| Fonts       | Plus Jakarta Sans (headings) · Inter (body) — `next/font/google`  |
| Icons       | lucide-react                                                      |
| Images      | Next.js `<Image>` with `fill` + `mix-blend-screen` for logo      |
| Analytics   | Vercel Analytics (production only)                                |
| Deployment  | Vercel                                                            |

---

## Business Details

| Field          | Value                            |
|----------------|----------------------------------|
| Company        | ZamTech Automation Studio        |
| Founder / CEO  | Michael Francoo                  |
| Location       | Mbeya, Tanzania                  |
| Phone          | +255 796 985 138                 |
| WhatsApp       | wa.me/255796985138               |
| Email          | info@zamtech.co.tz               |
| Support Email  | support@zamtech.co.tz            |
| Mon – Fri      | 8:00 am – 6:00 pm EAT            |
| Saturday       | 9:00 am – 1:00 pm EAT            |
| Sunday         | Closed                           |

---

## Brand

| Token            | Value / Purpose                                                       |
|------------------|-----------------------------------------------------------------------|
| Primary (cyan)   | `#00C8FF` — electric cyan from the ZamTech Z logo                    |
| Navy             | `#0A1628` — navbar, footer, dark sections                            |
| Background       | `#ffffff`                                                             |
| Logo             | `public/images/zamtech-logo.png` — angular cyan Z on black            |
| Logo rendering   | `mix-blend-screen` on dark backgrounds → black fill disappears        |
| Heading font     | Plus Jakarta Sans, extrabold, `letter-spacing: -0.04em`               |
| Body font        | Inter, regular / medium                                               |
| WhatsApp green   | `#25D366` — used only for the WhatsApp icon and button                |

---

## Pages

| Route                | Description                                                          |
|----------------------|----------------------------------------------------------------------|
| `/`                  | Home — hero, services, why us, process, business hours, testimonials, CTA |
| `/about`             | Company story, team (initials avatars), milestones, values           |
| `/services`          | Full service listing with features                                   |
| `/pricing`           | Three tiers in TZS (Tanzanian Shilling)                              |
| `/testimonials`      | Six client reviews with initials avatars                             |
| `/contact`           | Contact form + Google Maps (Mbeya)                                   |
| `/request-service`   | Detailed project brief form                                          |
| `/support`           | Support ticket form                                                  |
| `/faq`               | Accordion FAQ                                                        |
| `/office-info`       | Office address, hours, map, directions                               |
| `/careers`           | Job listings + application form                                      |
| `/privacy`           | Privacy policy                                                       |
| `/terms`             | Terms and conditions                                                 |
| `/cookies`           | Cookie policy                                                        |

---

## Key Components

| Component                    | Purpose                                                                   |
|------------------------------|---------------------------------------------------------------------------|
| `components/navbar.tsx`      | Fixed top nav — logo+name left, hamburger only right on mobile; full nav + CTAs on desktop |
| `components/footer.tsx`      | Dark footer — CTA strip (desktop/tablet only), 4-col grid, contact, legal |
| `components/back-to-top.tsx` | Floating scroll-to-top button, appears after 400 px                       |
| `components/whatsapp-icon.tsx` | Official WhatsApp SVG icon (`#25D366`)                                  |
| `components/page-wrapper.tsx`| Inner page wrapper — `pt-16` navbar offset + fade-in animation            |

---

## Home Page Sections

1. **Hero** — full-viewport navy, background image at 20 % opacity, grid overlay, headline, two CTAs, four stats chips (2×2 on mobile, 4-col on sm+)
2. **Services** — 6 cards, first card has "Popular" badge, `hover:-translate-y-1` lift
3. **Why ZamTech** — two-column: left text + CTAs, right 2×3 benefit cards
4. **How We Work** — 4-step process, dark navy step numbers, connecting gradient lines on desktop
5. **Business Hours** — card layout on mobile (hours in bordered box, "Call Us" + "WhatsApp" grid buttons); inline row on desktop
6. **Testimonials** — CSS `@keyframes marquee` infinite scroll, 4× duplicated cards, `translateX(-50%)`, `will-change: transform`, never stops or pauses
7. **Final CTA** — hidden on mobile (`hidden sm:block`), desktop shows badge + large headline + two buttons

---

## Pricing (TZS)

| Tier       | Price (TZS)  |
|------------|--------------|
| Starter    | 150,000      |
| Business   | 450,000      |
| Enterprise | 1,200,000    |
| Custom     | Quote-based  |

---

## Responsive Design Rules

- **Mobile-first** — every layout starts at 320 px
- Navbar mobile: logo + name left · hamburger only right (no phone icon)
- Footer CTA strip: `hidden sm:block` — not visible on mobile
- Final page CTA (`/` bottom): `hidden sm:block` — not visible on mobile
- Business hours: card layout on mobile, inline row on sm+
- All sections use `px-4 sm:px-6` and `max-w-7xl mx-auto`

---

## Testimonials Animation

Pure CSS seamless marquee in `globals.css`:

```css
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
  will-change: transform;
}
```

Four copies of the 6 review cards are rendered (`6 × 4 = 24 items`). The animation translates exactly −50 % (back to the start of copy 3), creating a perfect seamless loop on all screen sizes.

---

## Project Structure

```
app/
  layout.tsx             Root layout — fonts, metadata, BackToTop, Analytics
  globals.css            @theme tokens, base styles, marquee keyframes
  page.tsx               Home page
  about/page.tsx
  services/page.tsx
  pricing/page.tsx
  testimonials/page.tsx
  contact/page.tsx
  request-service/page.tsx
  support/page.tsx
  faq/page.tsx
  office-info/page.tsx
  careers/page.tsx
  privacy/page.tsx
  terms/page.tsx
  cookies/page.tsx
  not-found.tsx

components/
  navbar.tsx
  footer.tsx
  back-to-top.tsx
  whatsapp-icon.tsx
  page-wrapper.tsx
  ui/button.tsx          shadcn Button

public/
  images/
    zamtech-logo.png     Angular cyan Z logo (black background, use mix-blend-screen)
    hero-office.png      Hero section background
```

---

## Getting Started

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

### Production build check

```bash
pnpm exec next build
```

---

## Environment Variables

No environment variables are required for this static site. Vercel Analytics is injected automatically in production.

---

## Deployment

Click **Publish** in the v0 UI, or push to the connected GitHub branch. Vercel detects Next.js automatically and handles all build configuration.

---

## Design Decisions

**No profile photos** — All testimonials and team members use two-letter initials avatars (coloured circles). This was a deliberate choice for privacy and visual consistency.

**No badge above hero headline** — The hero leads directly with the `h1` headline.

**Dark CTA sections only** — Full-page CTA strips use `#0A1628` navy, never the cyan primary colour. Cyan is reserved for accents, icons, and buttons on white.

**Logo rendering** — The logo file has a black background. On dark navbars and footers, `mix-blend-screen` is applied so the black fill is invisible and only the cyan Z shows.

**Mobile-first hiding** — Elements that are too bulky on a 390 px phone (CTA strip, final CTA section) are hidden with `hidden sm:block` and replaced with nothing on mobile, keeping the phone experience clean and focused.

---

&copy; 2025 ZamTech Automation Studio. Mbeya, Tanzania. All rights reserved.
