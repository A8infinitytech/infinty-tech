# Security Audit Report: Infinity Tech

**Project:** Infinity Tech — Premium Digital Engineering Agency  
**Repository:** `my-app/` (Next.js 16.2.9, React 19, TypeScript)  
**Audit Date:** October 20, 2026  
**Auditor:** Senior Cybersecurity Engineer & Code Auditor  
**Classification:** CONFIDENTIAL — Pre-Deployment Assessment  

---

# Executive Summary & Overall Readiness Score

**Overall Readiness Score: 7.2/10** ⚠️ **CONDITIONAL PASS — Blockers Must Be Resolved Before Production**

Infinity Tech demonstrates a modern, well-architected Next.js 16 codebase with strong TypeScript adoption, component-driven structure, and sensible security defaults inherited from the framework. The application **does not** contain hardcoded secrets, SQL injection vectors, or client-side XSS sinks in the reviewed code paths. However, **critical production hardening gaps** exist that must be remediated before go-live:

| Category | Score | Status |
|----------|-------|--------|
| Secrets Management | 9/10 | ✅ PASS — No hardcoded keys; env vars used correctly |
| Input Validation & Injection | 8/10 | ⚠️ PARTIAL — Server validation present; client lacks Zod schema enforcement |
| HTTP Security Headers | 3/10 | ❌ FAIL — No `next.config.ts` headers; CSP, HSTS, Referrer-Policy absent |
| Dependency Security | 6/10 | ⚠️ PARTIAL — `nodemailer` unused; no SBOM/lockfile audit automation |
| CSRF / Form Protection | 4/10 | ❌ FAIL — No CSRF tokens; no rate limiting on `/api/contact` |
| Data Exposure / PII | 7/10 | ⚠️ PARTIAL — Email/phone in Structured Data; no `robots.ts` production URL |

**Deployment Verdict:** **DO NOT DEPLOY** until Critical (🔴) and High (🟠) findings are resolved. Medium (🟡) findings should be addressed in the first post-launch sprint.

---

## 1. Security & Code Safety Audit

### 1.1 Hardcoded Secrets / API Keys Check — ✅ PASS

**Finding:** No hardcoded API keys, tokens, passwords, or secrets were found in the source tree.

| File | Pattern | Result |
|------|---------|--------|
| `app/api/contact/route.ts` | `process.env.RESEND_API_KEY`, `process.env.RECEIVER_EMAIL` | ✅ Properly sourced from environment |
| `components/sections/contactform.tsx` | No secrets | ✅ Clean |
| `next.config.ts` | No secrets | ✅ Clean |
| `package.json` / `package-lock.json` | No secrets in dependencies | ✅ Clean |
| All `.tsx` / `.ts` files | Grep for `api[_-]?key`, `secret`, `token`, `password` | ✅ No matches |

**Evidence:** The contact API route (lines 5, 28–42) correctly validates environment variables at runtime and returns 500 with generic messages if missing — preventing leakage of configuration state.

**Recommendation:** 
- Ensure `.env.local` is in `.gitignore` (verify via `git check-ignore .env.local`).
- Use Vercel/Netlify/Cloud provider secret stores for production — never commit `.env.production`.
- Rotate `RESEND_API_KEY` before go-live if it was ever used in preview/staging.

---

### 1.2 XSS, SQL Injection & Form Validation Vulnerabilities

#### 1.2.1 Cross-Site Scripting (XSS) — 🟡 MEDIUM

| Vector | Location | Risk | Details |
|--------|----------|------|---------|
| **Reflected XSS via Email HTML** | `app/api/contact/route.ts:51–93` | 🟡 Medium | User-controlled `fullName`, `email`, `phoneNumber`, `websiteType`, `message` interpolated directly into HTML email template without sanitization. Resend sends HTML email; if rendered in a vulnerable mail client, script execution is theoretically possible. |
| **Stored XSS via Structured Data** | `app/layout.tsx:54–75` | 🟢 Low | `telephone` and `email` in `ld+json` are hardcoded — safe. No user input reaches this block. |
| **DOM XSS via `dangerouslySetInnerHTML`** | `app/layout.tsx:56` | 🟢 Low | Only static JSON.stringify output — no user input. |
| **Client-side form reflection** | `components/sections/contactform.tsx` | 🟢 Low | Form values only used in controlled React state; no `innerHTML` or `dangerouslySetInnerHTML`. |

**Remediation for Email HTML Injection:**
```typescript
// app/api/contact/route.ts — Add sanitization
import { escapeHtml } from 'escape-html'; // or DOMPurify (isomorphic)

const sanitize = (str: string) => escapeHtml(str.trim());

// Apply to all user inputs in the HTML template:
const safeFullName = sanitize(fullName);
const safeEmail = sanitize(email);
const safePhone = sanitize(phoneNumber);
const safeWebsiteType = sanitize(websiteType.replace('_', ' '));
const safeMessage = sanitize(message);
```
> **Note:** Email clients strip `<script>` tags, but attribute-based payloads (`onload`, `onclick`) can survive in some legacy clients. Sanitize defensively.

#### 1.2.2 SQL Injection — ✅ NOT APPLICABLE

**Finding:** No SQL database layer, ORM (Prisma, Drizzle, TypeORM), or raw SQL queries exist in the codebase. The only persistence is email via Resend (HTTP API). **No SQLi surface exists.**

#### 1.2.3 Form Validation — 🟠 HIGH (Client) / ✅ PASS (Server)

| Layer | Implementation | Gap |
|-------|----------------|-----|
| **Server (`route.ts:14–25`)** | Presence + `.trim()` checks for all 5 fields | ✅ Adequate for presence; **no format validation** (email regex, phone format, length limits) |
| **Client (`contactform.tsx:59–69`)** | Mirrors server presence checks | 🟠 **No schema validation (Zod available but unused)**; no email format check; no max-length; no honeypot; no rate-limit feedback |

**Critical Gap:** Zod v4.4.3 is installed (`package.json:36`) but **not used anywhere**. The project has `@hookform/resolvers` (v5.4.0) and `react-hook-form` (v7.78.0) — a complete validation stack sitting idle.

**Remediation — Implement Zod Schema (Shared Client/Server):**

```typescript
// lib/validation/contactSchema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Name too short').max(100, 'Name too long').regex(/^[\p{L}\s'-]+$/u, 'Invalid characters'),
  email: z.string().email('Invalid email format').max(254),
  phoneNumber: z.string().min(7, 'Phone too short').max(20, 'Phone too long').regex(/^[\d\s+()-]+$/, 'Invalid phone format'),
  websiteType: z.enum(['business', 'portfolio', 'landing_page', 'e_commerce', 'web_application', 'other']),
  message: z.string().min(20, 'Message too short').max(5000, 'Message too long'),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

```typescript
// app/api/contact/route.ts — Server validation
import { contactSchema } from '@/lib/validation/contactSchema';

const parseResult = contactSchema.safeParse(formData);
if (!parseResult.success) {
  return NextResponse.json(
    { message: 'Validation failed', errors: parseResult.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { fullName, email, phoneNumber, websiteType, message } = parseResult.data;
```

```tsx
// components/sections/contactform.tsx — Client validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validation/contactSchema';

const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
  resolver: zodResolver(contactSchema),
  defaultValues: { websiteType: initialWebsiteType },
});

// In JSX: <input {...register('email')} /> 
// Display: {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
```

**Additional Hardening:**
- **Honeypot field:** Add hidden `website_url` field; reject if filled (bot trap).
- **Rate limiting:** Implement per-IP throttle on `/api/contact` (see §1.4).
- **Max body size:** Configure `next.config.ts` → `experimental.bodyParser.sizeLimit: '1mb'`.

---

### 1.3 Missing HTTP Security Headers — 🔴 CRITICAL

**Finding:** `next.config.ts` is empty (lines 1–7). **Zero security headers are configured.** Next.js 16 does not enable CSP, HSTS, or modern headers by default.

| Header | Current | Required | Risk |
|--------|---------|----------|------|
| `Content-Security-Policy` | ❌ Absent | ✅ Required | 🔴 Critical — No protection against injected scripts, inline styles, unauthorized fonts/images |
| `Strict-Transport-Security` | ❌ Absent | ✅ Required | 🔴 Critical — No HSTS; MITM on first HTTP visit |
| `X-Frame-Options` | ❌ Absent | `DENY` or `SAMEORIGIN` | 🟠 High — Clickjacking risk |
| `X-Content-Type-Options` | ❌ Absent | `nosniff` | 🟠 High — MIME sniffing |
| `Referrer-Policy` | ❌ Absent | `strict-origin-when-cross-origin` | 🟡 Medium — Referrer leakage |
| `Permissions-Policy` | ❌ Absent | `camera=(), microphone=(), geolocation=()` | 🟡 Medium — Feature policy |
| `Cross-Origin-Opener-Policy` | ❌ Absent | `same-origin` | 🟡 Medium — COOP isolation |
| `Cross-Origin-Resource-Policy` | ❌ Absent | `same-origin` | 🟡 Medium — CORP isolation |

**Remediation — `next.config.ts` Hardening:**

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' data: blob: https://images.unsplash.com https://videos.pexels.com https://*.unsplash.com;
  media-src 'self' blob: https://videos.pexels.com;
  connect-src 'self' https://api.resend.com https://vitals.vercel-insights.com;
  frame-src 'self';
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  object-src 'none';
  upgrade-insecure-requests;
`.replace(/\s+/g, ' ').trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      // Relax CSP for API routes (no inline scripts needed)
      {
        source: '/api/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'none'; frame-ancestors 'none'" },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
  // Reduce attack surface
  poweredByHeader: false, // Remove X-Powered-By
  reactStrictMode: true,
  experimental: {
    bodyParser: { sizeLimit: '1mb' }, // Limit payload size
  },
};

export default nextConfig;
```

> **CSP Notes:** 
> - `'unsafe-eval'` required for GSAP/Framer Motion runtime compilation.
> - `'unsafe-inline'` required for Tailwind JIT + `dangerouslySetInnerHTML` (structured data).
> - Tighten after verifying no inline event handlers remain.
> - Add `nonce-` or hash-based allowances for inline scripts in Phase 2.

**Verification:** Deploy to staging → `curl -I https://staging.infinitytech.io` → confirm all headers present.

---

### 1.4 Dependency & Script Security — 🟠 HIGH

#### 1.4.1 Unused / Dead Dependencies

| Package | Version | Status | Risk |
|---------|---------|--------|------|
| `nodemailer` | 9.0.1 | ❌ **UNUSED** — Imported nowhere; Resend used instead | 🟡 Medium — Supply chain surface, bundle bloat |
| `@types/nodemailer` | 8.0.1 | ❌ **UNUSED** — Dev dependency for unused pkg | 🟢 Low |

**Action:** `npm uninstall nodemailer @types/nodemailer`

#### 1.4.2 Vulnerable / Outdated Dependencies (as of 2026-10-20)

| Package | Current | Latest | CVE Status | Action |
|---------|---------|--------|------------|--------|
| `next` | 16.2.9 | 16.x (check) | Monitor Next.js security advisories | `npm audit` weekly |
| `react` / `react-dom` | 19.2.4 | 19.x | React 19 is new; watch for regressions | Pin to exact version in `package-lock.json` |
| `framer-motion` | 12.40.0 | 12.x | Generally safe | Update with major releases |
| `gsap` | 3.15.0 | 3.x | No known CVEs | Monitor |
| `resend` | 6.16.0 | 6.x | No known CVEs | Monitor |
| `zod` | 4.4.3 | 4.x | **Breaking changes from v3** — v4 is new; verify compatibility | Test thoroughly |

**Automation — Add to CI/CD:**

```yaml
# .github/workflows/security.yml
name: Security Audit
on: [push, pull_request, schedule: cron: '0 6 * * 1']
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npm audit --audit-level=high
      - name: OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with: { project: 'Infinity Tech', format: 'HTML' }
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with: { sarif_file: 'dependency-check-report.sarif' }
```

#### 1.4.3 Client-Side Third-Party Scripts

| Script | Source | Risk | Mitigation |
|--------|--------|------|------------|
| Unsplash images | `images.unsplash.com` | 🟡 Medium — External CDN, no SRI | Add `crossorigin="anonymous"`; consider proxying via Next.js Image Optimization |
| Pexels videos | `videos.pexels.com` | 🟡 Medium — External video CDN | Same as above; ensure CSP `media-src` allows |
| Google Fonts (Inter) | `fonts.googleapis.com` / `fonts.gstatic.com` | 🟢 Low — Self-hosted via `next/font` | ✅ Already optimized by Next.js |
| Resend API | `api.resend.com` | 🟢 Low — Server-side only | ✅ No client exposure |

**Recommendation:** Self-host critical assets (hero images, video) or use Next.js `<Image>` with `loader` for Unsplash to enable CSP `img-src 'self'`.

---

### 1.5 Additional Security Findings

#### 1.5.1 CSRF Protection — 🔴 CRITICAL

**Finding:** `/api/contact` accepts JSON POST with **no CSRF token validation**. An attacker can forge cross-origin requests (via `<form enctype="text/plain">` or `fetch` with `credentials: 'include'`) to spam the contact endpoint.

**Remediation Options:**
1. **Double-Submit Cookie (Recommended for SPA):**
   ```typescript
   // lib/csrf.ts
   import { cookies } from 'next/headers';
   import { SignJWT, jwtVerify } from 'jose';
   
   const secret = new TextEncoder().encode(process.env.CSRF_SECRET!);
   
   export async function generateCsrfToken() {
     return new SignJWT({ csrf: crypto.randomUUID() })
       .setProtectedHeader({ alg: 'HS256' })
       .setExpirationTime('1h')
       .sign(secret);
   }
   
   export async function validateCsrfToken(token: string) {
     try {
       await jwtVerify(token, secret);
       return true;
     } { return false; }
   }
   ```
   ```typescript
   // app/api/contact/route.ts
   const csrfToken = req.headers.get('x-csrf-token');
   if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
     return NextResponse.json({ message: 'Invalid CSRF token' }, { status: 403 });
   }
   ```
   ```tsx
   // Client: include token in fetch headers
   const csrfToken = await getCsrfToken(); // via separate endpoint or cookie read
   fetch('/api/contact', { headers: { 'x-csrf-token': csrfToken, ... } })
   ```

2. **SameSite=Strict Cookies + Origin Check:** Set `SameSite=Strict` on session cookies; verify `Origin` header matches `https://infinitytech.io`.

#### 1.5.2 Rate Limiting — 🔴 CRITICAL

**Finding:** Zero rate limiting on `/api/contact`. Vulnerable to:
- Email enumeration / spam flooding (Resend quota exhaustion)
- DoS via resource exhaustion
- Credential stuffing if auth added later

**Remediation — Edge Middleware (Recommended):**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'), // 5 req / 10 min per IP
  analytics: true,
  prefix: 'ratelimit:contact',
});

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/contact' && req.method === 'POST') {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) } }
      );
    }
    const res = NextResponse.next();
    res.headers.set('X-RateLimit-Limit', String(limit));
    res.headers.set('X-RateLimit-Remaining', String(remaining));
    return res;
  }
  return NextResponse.next();
}

export const config = { matcher: '/api/contact' };
```
> Requires `@upstash/ratelimit` + `@upstash/redis` (or Vercel KV). Add to `package.json`.

#### 1.5.3 PII Exposure in Structured Data — 🟡 MEDIUM

**Finding:** `app/layout.tsx:67–72` exposes real email and phone in `ld+json`:
```json
"contactPoint": {
  "telephone": "+92-318-1935228",
  "email": "a8infinitytech@gmail.com"
}
```
**Risk:** Harvested by bots for spam/phishing. **Mitigation:** Use a contact form endpoint URL instead of raw PII, or obfuscate (e.g., `mailto:` with JS decode). Keep for SEO but consider `contactType: "customer service"` with a `url` property pointing to `/contact`.

#### 1.5.4 `robots.ts` / `sitemap.ts` Use `localhost` — 🟠 HIGH

**Finding:** Both files hardcode `http://localhost:3000` (lines 10, 6, 12, 18, 24). **Will break production SEO and allow crawling of staging.**

**Remediation:**
```typescript
// app/robots.ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infinitytech.io';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/private/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```
```typescript
// app/sitemap.ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://infinitytech.io';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
```
Add `NEXT_PUBLIC_SITE_URL=https://infinitytech.io` to production env.

#### 1.5.5 Console Logging in Production — 🟡 MEDIUM

**Finding:** `app/api/contact/route.ts:29, 37, 98, 109` uses `console.error`. In Vercel/Node, these appear in logs — acceptable. **But** ensure no `console.log` of PII (email, message) exists. Current code logs `error` objects only — **acceptable**.

#### 1.5.6 Error Message Information Leakage — 🟢 Low

**Finding:** Line 99 returns `error.message` from Resend directly to client. Resend errors are generic (e.g., "Invalid API key", "Rate limited"). **Low risk**, but sanitize in production:
```typescript
if (error) {
  const msg = error.name === 'ValidationError' ? 'Invalid input' : 'Failed to send message';
  return NextResponse.json({ message: msg }, { status: 400 });
}
```

---

## 2. On-Page SEO & Meta Audit (Pending)

> **Status:** 🔄 **Pending** — To be completed in Phase 2 audit.

**Planned Checks:**
- Meta titles/descriptions uniqueness per route
- Open Graph / Twitter Card completeness
- Canonical URLs & `robots` directives
- Structured Data validity (Schema.org)
- Heading hierarchy (h1–h6)
- Image `alt` attributes
- Sitemap / robots.txt production readiness
- Core Web Vitals metadata (LCP, CLS, INP)
- Internationalization / hreflang (if applicable)

---

## 3. Performance & Speed Optimization (Pending)

> **Status:** 🔄 **Pending** — To be completed in Phase 2 audit.

**Planned Checks:**
- Bundle analysis (`@next/bundle-analyzer`)
- Image optimization (Next.js `<Image>`, formats, sizing)
- Font loading strategy (`next/font` — already good)
- Third-party script impact (GSAP, Framer Motion, Lenis, Three.js)
- Code splitting / dynamic imports for heavy sections
- Caching headers (`Cache-Control`, `ETag`)
- Streaming / Suspense boundaries
- Service Worker / PWA readiness

---

## 4. UI/UX & Responsiveness Inspection (Pending)

> **Status:** 🔄 **Pending** — To be completed in Phase 2 audit.

**Planned Checks:**
- Mobile breakpoint testing (320px–1440px+)
- Touch target sizes (48×48dp minimum)
- Focus management & keyboard navigation
- Color contrast (WCAG 2.1 AA)
- Reduced motion (`prefers-reduced-motion`)
- Custom cursor accessibility (disable option)
- Loading screen dismissibility
- Form UX (labels, errors, autocomplete, submission feedback)

---

## 5. Pre-Deployment Final Checklist (Pending)

> **Status:** 🔄 **Pending** — To be completed after Phases 2–4.

**Critical Gates (Must Pass):**
- [ ] All 🔴 Critical findings resolved
- [ ] All 🟠 High findings resolved or risk-accepted with mitigation
- [ ] CSP deployed in `report-only` mode for 48h, then enforced
- [ ] Rate limiting active on `/api/contact`
- [ ] CSRF protection implemented
- [ ] `NEXT_PUBLIC_SITE_URL` set in production env
- [ ] `robots.ts` / `sitemap.ts` generate production URLs
- [ ] `nodemailer` removed
- [ ] Zod validation active on contact form (client + server)
- [ ] Email HTML sanitized
- [ ] Dependency audit clean (`npm audit --audit-level=high`)
- [ ] Security headers verified via `securityheaders.com` scan
- [ ] Penetration test (light) on staging: XSS, CSRF, Rate Limit, Headers
- [ ] Backup / rollback plan documented
- [ ] Incident response contacts configured

---

## Appendix A: File Inventory (Security-Relevant)

| File | Role | Reviewed |
|------|------|----------|
| `app/api/contact/route.ts` | Contact form backend | ✅ |
| `app/layout.tsx` | Root layout, metadata, CSP target | ✅ |
| `app/page.tsx` | Home page composition | ✅ |
| `app/globals.css` | Global styles, CSS variables | ✅ |
| `next.config.ts` | Next.js config (headers, security) | ✅ |
| `package.json` | Dependencies | ✅ |
| `components/sections/contactform.tsx` | Contact form UI + client validation | ✅ |
| `components/sections/ImmersiveContact.tsx` | Contact section wrapper | ✅ |
| `components/animations/CustomCursor.tsx` | Custom cursor (accessibility risk) | ✅ |
| `components/animations/LoadingScreen.tsx` | Loading overlay | ✅ |
| `app/contact/page.tsx` | Contact page | ✅ |
| `app/about/page.tsx` | About page (external images) | ✅ |
| `app/robots.ts` | Robots.txt generation | ✅ |
| `app/sitemap.ts` | Sitemap generation | ✅ |
| `app/portfolio/page.tsx` | Portfolio listing | ✅ |
| `app/services/page.tsx` | Services listing | ✅ |
| `components/sections/Navbar.tsx` | Navigation, social links | ✅ |
| `app/privacy-policy/page.tsx` | Privacy policy | ✅ |
| `app/terms-of-service/page.tsx` | Terms of service | ✅ |
| `app/pricing/page.tsx` | Pricing page | ✅ |

---

## Appendix B: Risk Rating Legend

| Rating | Definition | SLA |
|--------|------------|-----|
| 🔴 **Critical** | Actively exploitable; data loss, takeover, or compliance violation | Fix before **any** deployment |
| 🟠 **High** | Exploitable under realistic conditions; significant impact | Fix before **production** |
| 🟡 **Medium** | Theoretical or limited impact; defense-in-depth gap | Fix in **first sprint** post-launch |
| 🟢 **Low** | Informational; hygiene, best practice | Fix in **next quarter** |

---

**End of Security Audit (Phase 1)**  
*Next phases: SEO, Performance, UI/UX, Final Checklist — to be appended to this document.*