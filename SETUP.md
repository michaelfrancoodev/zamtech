# ZamTech Automation Studio — Complete Setup Guide

## Admin Credentials (Default)

| Field    | Value                             |
|----------|-----------------------------------|
| URL      | `/admin-login`                    |
| Email    | `francoomichaeldev@gmail.com`     |
| Password | `ZamTech@2025!`                   |

> **Important:** Change your password after your very first login.
> The admin account does not exist yet — you must create it by running `pnpm create-admin` after setup (Step 5 below).

---

## Prerequisites

Make sure these are installed on your computer before starting:

- [Node.js](https://nodejs.org) v18 or higher
- [pnpm](https://pnpm.io) — install with: `npm install -g pnpm`
- [Git](https://git-scm.com)
- A [Neon](https://neon.tech) account (free)
- A Gmail account with 2-Step Verification enabled (for email forwarding)

---

## Step 1 — Get the Code

**Option A: GitHub (recommended)**
```bash
git clone https://github.com/YOUR_USERNAME/zamtech-website.git
cd zamtech-website
```

**Option B: Download ZIP from v0**
1. Click the three dots (top right) in v0 → Download ZIP
2. Unzip and open the folder in your terminal

---

## Step 2 — Create Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up (free)
2. Click **"Create Project"**
   - Name: `zamtech-db`
   - Region: `AWS eu-west-1` (closest to Tanzania)
3. After creation, click **"Connect"** → copy the **Connection String**:
   ```
   postgresql://username:password@ep-xxx.eu-west-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Save this string — you will need it in the next step

---

## Step 3 — Create .env.local

Create a file named `.env.local` in the root of the project:

```bash
# On Mac/Linux:
touch .env.local

# On Windows — create the file manually in your code editor
```

Then fill it with:

```env
# ── Neon Database ─────────────────────────────────────────────
DATABASE_URL=postgresql://USER:PASSWORD@ep-XXXX.neon.tech/neondb?sslmode=require

# ── Better Auth ───────────────────────────────────────────────
# Generate a secret: run this in terminal → openssl rand -base64 32
BETTER_AUTH_SECRET=paste-your-generated-secret-here

# Development
BETTER_AUTH_URL=http://localhost:3000

# ── Email Forwarding ──────────────────────────────────────────
# All form submissions will be sent to francoomichaeldev@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=francoomichaeldev@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
```

### How to get Gmail App Password (for SMTP_PASS):
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → **2-Step Verification** (must be ON)
3. Search "App passwords" → Select "Mail" → Generate
4. Copy the 16-character password into `SMTP_PASS`

> `.env.local` is listed in `.gitignore` — it will NEVER be uploaded to GitHub.

---

## Step 4 — Install and Set Up Database

```bash
# Install all packages
pnpm install

# Push the schema to Neon (creates all tables)
pnpm db:push
```

This creates the following tables in your Neon database:
- `user` — admin accounts
- `session` — login sessions
- `account` — auth accounts
- `verification` — email verification tokens
- `service_requests` — service quote requests from the website
- `contact_messages` — contact form submissions
- `support_tickets` — support form submissions

---

## Step 5 — Create Admin Account

1. First, start the development server:
   ```bash
   pnpm dev
   ```
2. Open a **second terminal** in the same folder and run:
   ```bash
   pnpm create-admin
   ```
3. You should see:
   ```
   Admin account created successfully!
   Login at: /admin-login
   ```

> If you see "Admin account already exists" — that is fine, you can log in directly.

---

## Step 6 — Run the Project

```bash
pnpm dev
```

Open your browser at: **http://localhost:3000**

| Page          | URL                              |
|---------------|----------------------------------|
| Home          | http://localhost:3000            |
| Admin Login   | http://localhost:3000/admin-login|
| Admin Panel   | http://localhost:3000/admin      |
| Contact       | http://localhost:3000/contact    |
| Services      | http://localhost:3000/services   |
| Pricing       | http://localhost:3000/pricing    |

---

## Database Management Commands

| Command             | What it does                                          |
|---------------------|-------------------------------------------------------|
| `pnpm db:push`      | Push schema changes to Neon (use during development)  |
| `pnpm db:generate`  | Generate a migration file from schema changes         |
| `pnpm db:migrate`   | Apply migration files to the database (production)    |
| `pnpm db:studio`    | Open Drizzle Studio UI to view/edit data in browser   |
| `pnpm create-admin` | Create the admin user account                         |

### Drizzle Studio (Visual Database Manager)
```bash
pnpm db:studio
# Opens at: https://local.drizzle.studio
```
You can view and edit all tables: service requests, messages, support tickets, users.

### Neon Console (SQL Editor)
Go to [neon.tech](https://neon.tech) → your project → **SQL Editor**
Example queries:
```sql
-- See all service requests
SELECT * FROM service_requests ORDER BY "createdAt" DESC;

-- See all contact messages
SELECT * FROM contact_messages WHERE status = 'unread';

-- See all support tickets
SELECT * FROM support_tickets WHERE status = 'open';
```

---

## Modifying the Database Schema

If you need to add a new column or table:

1. Edit `lib/db/schema.ts`
2. Run:
   ```bash
   # For development (fast, no migration file)
   pnpm db:push

   # For production (safe, keeps history)
   pnpm db:generate
   pnpm db:migrate
   ```

---

## Deploying to Vercel (Production)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. In Vercel → Project → **Settings → Environment Variables**, add:
   ```
   DATABASE_URL      = (your Neon connection string)
   BETTER_AUTH_SECRET = (same as .env.local)
   BETTER_AUTH_URL   = https://your-domain.vercel.app
   SMTP_HOST         = smtp.gmail.com
   SMTP_PORT         = 587
   SMTP_USER         = francoomichaeldev@gmail.com
   SMTP_PASS         = (your Gmail App Password)
   ```

3. After deploying, run the admin creation script pointing at the live URL:
   ```bash
   BETTER_AUTH_URL=https://your-domain.vercel.app pnpm create-admin
   ```

---

## Project Structure

```
zamtech-website/
├── app/
│   ├── admin/          # Admin dashboard (protected)
│   ├── admin-login/    # Admin login page
│   ├── actions/        # Server actions (form submissions)
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── services/       # Services page
│   ├── pricing/        # Pricing page
│   ├── request-service/# Quote request form
│   ├── support/        # Support ticket form
│   ├── faq/            # FAQ page
│   ├── careers/        # Careers page
│   ├── testimonials/   # Testimonials page
│   └── page.tsx        # Home page
├── components/
│   ├── admin/          # Admin UI components
│   ├── navbar.tsx      # Navigation bar
│   ├── footer.tsx      # Footer
│   └── page-hero.tsx   # Shared page header
├── lib/
│   ├── auth.ts         # Better Auth configuration
│   ├── auth-client.ts  # Client-side auth
│   ├── db/
│   │   ├── index.ts    # Database connection
│   │   └── schema.ts   # All database tables
│   └── email.ts        # Email forwarding (nodemailer)
├── scripts/
│   └── create-admin.mjs # Admin account creation script
├── public/
│   └── images/         # Logo and images
├── drizzle.config.ts   # Drizzle ORM configuration
├── .env.example        # Environment variables template
├── .env.local          # Your local secrets (NOT in Git)
├── .gitignore          # Files excluded from Git
└── SETUP.md            # This file
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `DATABASE_URL` error | Check `.env.local` has the correct Neon connection string |
| `pnpm db:push` fails | Make sure `DATABASE_URL` is set and Neon project is active |
| Admin login fails | Run `pnpm create-admin` first (dev server must be running) |
| Emails not sending | Check Gmail App Password is correct, not regular password |
| `pnpm dev` port in use | Run `pnpm dev -- -p 3001` to use a different port |
| Tables not found | Run `pnpm db:push` to create missing tables |
