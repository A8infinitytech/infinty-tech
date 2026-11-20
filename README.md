# Infinity Official Site

Marketing website and CMS admin for Infinity Tech, built with Next.js 16, React 19, Tailwind CSS 4, TypeScript, Supabase, Groq, and Brevo.

Repository: https://github.com/A8infinitytech/infinty-tech.git

## Features

- Public pages: `/`, `/about`, `/services`, `/projects`, `/contact`
- CMS admin: `/admin` and `/admin/login`, protected by password plus email verification code
- 30 normalized CMS entities with one shared CRUD API per entity
- Server-rendered site content with cached Supabase reads
- Chatbot powered by Groq
- Contact and newsletter emails powered by Brevo SMTP API
- Local icon system (Lucide + React Icons); icons and images are kept in separate APIs

## Requirements

- Node.js 20.9 or later
- npm
- Supabase project
- Optional: Groq API key for chatbot, Brevo API key for email

## Quick start

```powershell
npm install
Copy-Item .env.example .env.local
```

Fill `.env.local` with real values, then run:

```powershell
npm run dev
```

Open:

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## Environment variables

`.env.example` is committed. `.env.local` is local-only and must never be committed.

| Variable | Required | Used for |
|---|---:|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase URL used by the admin client |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Publishable key placeholder for public client configuration |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Admin writes; use `sb_secret_...` or a legacy `service_role` JWT |
| `ADMIN_PASSWORD` | Yes | Password for `/admin/login` and HMAC session signing |
| `GROQ_API_KEY` | Chatbot | Groq API key |
| `GROQ_MODEL` | No | Defaults to `llama3-70b-8192` |
| `BREVO_API_KEY` | Email | Brevo API key for contact and newsletter emails |
| `BREVO_SENDER_EMAIL` | Email | Verified Brevo sender email address |
| `BREVO_SENDER_NAME` | No | Defaults to `Infinity Tech` |
| `CONTACT_EMAIL` | Email | Destination inbox for contact/subscribe forms and admin login codes |

Do not put a `sb_publishable_...` key in `SUPABASE_SERVICE_ROLE_KEY`. Server-side admin writes require the secret key.

The public read client is currently configured directly in `lib/supabase.ts`. If you move to a different Supabase project, update that file as well as the environment variables.

Windows helper:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\set-supabase-admin-key.ps1
```

It prompts for the secret key, writes it to `.env.local`, keeps a timestamped backup, and never prints the key.

## Supabase setup

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Paste the full contents of `supabase/migrations/001_normalize_cms.sql`.
4. Click **Run and enable RLS** — do **not** use “Run without RLS”.

The migration:

- Creates the normalized CMS tables.
- Backfills them from the legacy `site_content` table.
- Enables RLS with public `select` policies.
- Grants `service_role` full access for admin CRUD.
- Adds indexes used by ordering/filtering.

If the Supabase CLI is available, you can also apply the migration through your normal CLI workflow, but the SQL Editor method above is the tested path for this project.

## Brevo setup

1. Create a Brevo account.
2. Verify the sender email under **Senders & Domains**.
3. Create an API key with email/SMTP sending access.
4. Set `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, and optionally `BREVO_SENDER_NAME` in `.env.local` or Vercel.
5. Set `CONTACT_EMAIL` to the inbox that should receive enquiries, newsletter sign-ups, and admin login codes.

The helper in `lib/brevo.ts` calls `https://api.brevo.com/v3/smtp/email`. Contact and subscribe routes send two emails each: one to the admin inbox and one auto-reply to the visitor.

## Admin login verification

Admin sign-in is a two-step flow. After the correct `ADMIN_PASSWORD` is submitted, `/api/admin/login` emails a six-digit code to `CONTACT_EMAIL`. The email includes the device name detected from the browser user-agent. The admin session cookie is only created after `/api/admin/verify` accepts that code.

The verification challenge expires after 5 minutes and allows 5 attempts. The code is stored only as a SHA-256 hash inside a signed httpOnly cookie; the plain code is never persisted. If no email arrives, check Brevo delivery for the `Admin login verification code` subject.

## Scripts

```powershell
npm run dev      # development server
npm run build    # production build (webpack)
npm run start    # production server
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check only
```

Do not add `npm run build` to parallel command batches; it can exhaust Node memory on Windows.

## CMS architecture

Rule: **one table → one API → both admin and frontend**.

- Entity definitions: `lib/cms/entity-config.ts`
- Shared CRUD API: `app/api/cms/[entity-key]/route.ts`
- Admin UI: `components/admin/EntityDashboard.tsx`
- Admin page: `app/admin/page.tsx`
- View model merge: `lib/cms/view.ts`
- Cached loader: `lib/site-content.ts`
- Typed frontend helpers: `lib/cms/services.ts`, `lib/settings.ts`, `lib/services.ts`

`lib/site-content.ts` caches with the `site-content` tag and `cacheLife("default")`. Admin CRUD calls `revalidateTag("site-content")` and `revalidateTag("cms-entities")`, so published changes refresh without a manual server restart.

### Entity groups

- Brand & shell: site settings, SEO, page SEO, media assets, navigation, UI labels, footer, state messages, icon metadata
- Home: hero, section headings, hero ask, suggested prompts, process steps, why cards, dashboard config, dashboard steps
- Pages: about blocks, services, service settings, tools, projects, testimonials, testimonial placeholder, FAQs, social links
- Contact: contact info, contact form labels, chatbot config, chatbot templates

### Icons and images

- Icons are rendered locally through `iconElement(...)` in `lib/data.ts`.
- Icon names are stored in CMS fields such as `icon`.
- `app/api/cms/icon-meta/route.ts` is for icon metadata only.
- `app/api/cms/media-assets/route.ts` is for images only.
- Do not merge icon metadata into the media/images API.

## API routes

### CMS

`/api/cms/<entity-key>` supports `GET`, `POST`, `PATCH`, and `DELETE` where appropriate. All GET responses use:

```json
{ "ok": true, "data": ... }
```

Errors use:

```json
{ "ok": false, "error": "..." }
```

### Actions

- `POST /api/admin/login`
- `POST /api/admin/verify`
- `POST /api/admin/logout`
- `POST /api/chat`
- `POST /api/contact`
- `POST /api/subscribe`

## Folder structure

```text
infinity-officall-site/
├── .env.example                       # safe env template; commit this
├── .env.local                         # real secrets; local only; never commit
├── .gitignore                         # tells Git what to ignore
├── README.md                          # this documentation
├── eslint.config.mjs                  # ESLint rules
├── next.config.ts                     # Next.js configuration
├── package.json                       # scripts and dependencies
├── package-lock.json                  # locked dependency versions
├── postcss.config.mjs                 # Tailwind/PostCSS setup
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.tsbuildinfo               # generated TypeScript cache; ignored
│
├── app/                               # Next.js routes and pages
│   ├── api/                           # server endpoints
│   │   ├── admin/
│   │   │   ├── login/route.ts         # password check + verification email
│   │   │   ├── verify/route.ts        # code check + signed admin cookie
│   │   │   └── logout/route.ts        # clears admin cookies
│   │   ├── chat/route.ts              # Groq chatbot endpoint
│   │   ├── contact/route.ts           # Brevo contact form endpoint
│   │   ├── subscribe/route.ts         # Brevo newsletter endpoint
│   │   └── cms/                       # 30 canonical CMS CRUD routes
│   │       ├── about-blocks/route.ts
│   │       ├── chatbot-config/route.ts
│   │       ├── chatbot-templates/route.ts
│   │       ├── contact-form-labels/route.ts
│   │       ├── contact-info/route.ts
│   │       ├── dashboard-config/route.ts
│   │       ├── dashboard-steps/route.ts
│   │       ├── faqs/route.ts
│   │       ├── footer-config/route.ts
│   │       ├── hero-ask/route.ts
│   │       ├── hero-sections/route.ts
│   │       ├── icon-meta/route.ts     # icon metadata only
│   │       ├── media-assets/route.ts  # images/media only
│   │       ├── navigation-items/route.ts
│   │       ├── page-seo/route.ts
│   │       ├── process-steps/route.ts
│   │       ├── projects/route.ts
│   │       ├── section-headings/route.ts
│   │       ├── seo-settings/route.ts
│   │       ├── service-settings/route.ts
│   │       ├── services/route.ts
│   │       ├── site-settings/route.ts
│   │       ├── social-links/route.ts
│   │       ├── state-messages/route.ts
│   │       ├── suggested-prompts/route.ts
│   │       ├── testimonial-placeholder/route.ts
│   │       ├── testimonials/route.ts
│   │       ├── tools/route.ts
│   │       ├── ui-labels/route.ts
│   │       └── why-cards/route.ts
│   ├── admin/
│   │   ├── page.tsx                   # CMS dashboard
│   │   ├── login/page.tsx             # admin login page
│   │   └── loading.tsx                # admin loading fallback
│   ├── about/page.tsx                 # /about
│   ├── contact/page.tsx               # /contact
│   ├── projects/page.tsx              # /projects
│   ├── services/page.tsx              # /services
│   ├── global-error.tsx               # root error boundary
│   ├── error.tsx                      # route error fallback
│   ├── globals.css                    # Tailwind + global styles
│   ├── icon.png                       # browser tab icon
│   ├── layout.tsx                     # root layout + provider + chrome
│   ├── loading.tsx                    # public loading fallback
│   ├── not-found.tsx                  # 404 page
│   └── page.tsx                       # home page
│
├── components/                        # reusable UI
│   ├── admin/
│   │   ├── AdminLoginForm.tsx         # login form
│   │   └── EntityDashboard.tsx        # generic CRUD UI for every entity
│   ├── AppChrome.tsx                  # navbar/footer wrapper; hidden on /admin
│   ├── Button.tsx                     # shared button styles
│   ├── Chatbot.tsx                    # chat UI
│   ├── ChatbotMount.tsx               # mounts chat only where needed
│   ├── ContactForm.tsx                # contact form UI
│   ├── CTASection.tsx                 # call-to-action block
│   ├── FAQ.tsx                        # FAQ accordion
│   ├── Footer.tsx                     # footer + newsletter + year
│   ├── HeroAsk.tsx                    # hero prompt box
│   ├── HeroDashboard.tsx              # hero process dashboard
│   ├── Logo.tsx                       # logo with light/dark variants
│   ├── Navbar.tsx                     # public navigation
│   ├── Reveal.tsx                     # scroll reveal animation
│   ├── ScrollUtils.tsx                # scroll helpers
│   ├── SectionHeading.tsx             # shared section heading
│   ├── ServiceCard.tsx                # single service card
│   ├── ServicesPreview.tsx            # home services preview
│   ├── SiteContentProvider.tsx        # client-side content context
│   ├── SocialLinks.tsx                # social icons/links
│   ├── Testimonials.tsx               # testimonial cards
│   ├── ThemeToggle.tsx                # light/dark toggle
│   └── ToolsGrid.tsx                  # tools grid
│
├── lib/                               # shared logic, no UI
│   ├── cms/
│   │   ├── crud-route.ts              # shared GET/POST/PATCH/DELETE factory
│   │   ├── entity-config.ts           # the 30 entity definitions
│   │   ├── services.ts                # typed services loader
│   │   └── view.ts                    # merges normalized CMS data into SiteContent
│   ├── admin-auth.ts                  # ADMIN_PASSWORD + HMAC session cookie
│   ├── admin-challenge.ts             # signed login code challenge + attempts
│   ├── brevo.ts                       # Brevo SMTP API email helper
│   ├── device.ts                      # user-agent device-name parser
│   ├── data.ts                        # SiteContent type + local icon helpers
│   ├── settings.ts                    # typed site settings loader
│   ├── services.ts                    # services helper for pages/API
│   ├── site-content.ts                # cached content loader + cache tag
│   ├── supabase-admin.ts              # secret-key Supabase client
│   ├── supabase.ts                    # public-read Supabase client
│   └── useSiteContent.ts              # client hook for SiteContent context
│
├── public/                            # static files served at /...
│   ├── file.svg
│   ├── globe.svg
│   ├── logo-dark.png
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── scripts/
│   └── set-supabase-admin-key.ps1     # writes secret key to .env.local safely
│
├── supabase/
│   ├── migrations/
│   │   └── 001_normalize_cms.sql      # schema, backfill, RLS, indexes
│   └── .temp/                         # local Supabase CLI cache; ignored
│       └── cli-latest
│
├── .next/                             # generated build output; ignored
├── .playwright-mcp/                   # local browser artifacts; ignored
└── node_modules/                      # installed packages; ignored
```

Every `.ts`/`.tsx` file starts with a `// <relative-path>` header so its location is clear when copied into a prompt or log.

### What each main folder does

| Folder | Purpose |
|---|---|
| `app/` | Defines the actual website URLs. `page.tsx` = page, `route.ts` = API endpoint, `layout.tsx` = shared shell. |
| `app/api/cms/` | One folder per CMS table. Every `route.ts` is a thin wrapper around `lib/cms/crud-route.ts`. |
| `app/admin/` | Password-protected CMS screens. Public navbar/footer are hidden here by `AppChrome.tsx`. |
| `components/` | Reusable public UI blocks such as navbar, hero, cards, footer, chatbot, and animations. |
| `components/admin/` | Admin-only forms and the generic entity editor. |
| `lib/cms/` | The CMS brain: entity registry, CRUD factory, view merge, and typed loaders. |
| `lib/` | Shared server/client logic: auth, Brevo email helper, Supabase clients, content cache, and site-content hook. |
| `public/` | Files served directly by URL, for example `/logo.png`. |
| `supabase/migrations/` | Database schema and one-time data backfill. Apply this in Supabase SQL Editor. |
| `scripts/` | Small local helper scripts; no secrets are stored in them. |
| `.next/`, `node_modules/`, `.playwright-mcp/`, `supabase/.temp/` | Generated or local-only files; never commit. |

## Repository and Git commands

Remote repository: `https://github.com/A8infinitytech/infinty-tech.git`

### First time on a new PC

```powershell
git clone https://github.com/A8infinitytech/infinty-tech.git
cd infinty-tech
npm install
Copy-Item .env.example .env.local
```

Then fill `.env.local` with real secrets and apply the Supabase migration described above.

### If this folder is already a Git repo

Check the current remote:

```powershell
git remote -v
```

If no remote is shown, add it:

```powershell
git remote add origin https://github.com/A8infinitytech/infinty-tech.git
```

If the remote URL is wrong, replace it:

```powershell
git remote set-url origin https://github.com/A8infinitytech/infinty-tech.git
```

### Daily workflow

`fetch` only downloads remote changes. `pull` downloads and merges them. `push` uploads your commits.

```powershell
git fetch origin
git status
git pull origin main
```

If `pull` fails because local and remote commits diverged:

```powershell
git pull --rebase origin main
```

Resolve any conflict, then:

```powershell
git rebase --continue
```

### Stage and commit safely

Do not use `git add .` here because local-only files exist. Stage exact paths:

```powershell
git add README.md .env.example .gitignore app components lib public next.config.ts package.json package-lock.json postcss.config.mjs eslint.config.mjs tsconfig.json supabase/migrations/001_normalize_cms.sql scripts/set-supabase-admin-key.ps1
git status
git commit -m "Update README, CMS structure, and setup docs"
```

`git status` before committing is the safety check: `.env.local`, `.next/`, `node_modules/`, `.playwright-mcp/`, and `supabase/.temp/` must not appear in the staged list.

### Push

First push of the branch:

```powershell
git branch -M main
git push -u origin main
```

Later pushes:

```powershell
git push origin main
```

If the remote default branch is `master`, use `master` instead of `main`.

## Git hygiene

### Commit

```text
app/
components/
lib/
public/
next.config.ts
package.json
package-lock.json
tsconfig.json
postcss.config.mjs
eslint.config.mjs
.gitignore
README.md
.env.example
supabase/migrations/001_normalize_cms.sql
scripts/set-supabase-admin-key.ps1
```

### Never commit

```text
node_modules/
.next/
out/
build/
coverage/
.vercel/
.env
.env.local
.env.*.bak-*
*.tsbuildinfo
next-env.d.ts
.playwright-mcp/
supabase/.temp/
*.pem
npm-debug.log*
```

Stage specific paths instead of whole folders where local files may exist:

```powershell
git add supabase/migrations/001_normalize_cms.sql
git add scripts/set-supabase-admin-key.ps1
```

## Deployment

Deploy to Vercel with the repository root as the project root. The build command comes from `package.json` (`npm run build`).

Add all environment variables from the table above in **Project Settings → Environment Variables**. Use the same Supabase project that received the migration. `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `GROQ_API_KEY`, and `BREVO_API_KEY` must be secret environment variables. Verify `BREVO_SENDER_EMAIL` in Brevo before going live.

After deployment, visit `/admin/login` and confirm CMS edits revalidate the public pages.

## Troubleshooting

### `SUPABASE_SERVICE_ROLE_KEY contains a publishable key`

Use `sb_secret_...` or a legacy `service_role` JWT. Run `scripts/set-supabase-admin-key.ps1`, then restart the dev server.

### `useSiteContent must be used within a SiteContentProvider`

Shell pages such as `error`, `loading`, `not-found`, and `Logo` read context optionally with static fallbacks because Next prerenders them outside the root provider. If adding another shell component, do not call `useSiteContent()` unguarded there.

### `new Date()` prerender error

Do not evaluate current time during render in a Client Component. `Footer` sets the copyright year in `useEffect`.

### Admin changes do not appear

Confirm the migration was applied with RLS, `SUPABASE_SERVICE_ROLE_KEY` is a secret key, and the admin write revalidated `site-content`.

### Build passes locally but email/chat fails

Check `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `CONTACT_EMAIL`, `GROQ_API_KEY`, and `GROQ_MODEL` in `.env.local` or Vercel environment variables. If Brevo returns `401`, the API key is wrong; if it returns `400`, the sender email is not verified.

### Vercel fails with `EBADPLATFORM` for `@next/swc-win32-x64-msvc`

Never add a platform-specific `@next/swc-*` package to `package.json`. Next.js installs the correct native binary automatically for the build machine. Remove the Windows-only entry from both `package.json` and `package-lock.json`, commit both files, and rebuild.
