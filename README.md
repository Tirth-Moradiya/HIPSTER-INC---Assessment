# Service Manager — Services & Blog Portal

Modern React (Vite) + Tailwind app showcasing services, a blog, and a contact form.

## Tech
- Vite + React 19
- React Router v6 (route-based code splitting)
- TailwindCSS v4
- react-hook-form, dompurify

## Quick start
```bash
npm i
npm run dev
```

Open http://localhost:5173

## Data sources
- Local JSON in `public/data/services.json` and `public/data/blogs.json`
- WordPress REST API (services via custom post type): `wp-json/wp/v2/services?_embed`

## Switch to WP REST API
Use `.env` to point directly to endpoints:
```
# Services (WP CPT) endpoint with embeds for featured images
VITE_WP_SERVICES_URL=http://localhost:10004/wp-json/wp/v2/services?_embed

# Optional generic base (used for other endpoints)
VITE_API_BASE=https://example.com/wp-json/wp/v2
```
`src/utils/api.js` uses `VITE_WP_SERVICES_URL` for services. If not provided, it falls back to local JSON.

Example mapping (adjust to your WP shape):
```js
// src/utils/api.js
export async function fetchBlogs() {
  const url = API_BASE ? `${API_BASE}/posts?_embed` : '/data/blogs.json'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch blogs')
  const data = await res.json()
  return API_BASE ? data.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title.rendered,
    excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, ''),
    date: p.date,
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    content: p.content.rendered,
  })) : data
}
```

## reCAPTCHA
We support Google reCAPTCHA v2 checkbox on the Contact form.

1) Create `.env`:
```
VITE_RECAPTCHA_SITE_KEY=YOUR_SITE_KEY
```
2) The script is loaded in `index.html`. On submit, a token is captured client-side. For production, you must verify tokens server-side using the secret key on your server only. Never expose the secret in frontend code.

Production security of keys:
- Store `RECAPTCHA_SECRET` on the server or serverless function.
- Verify tokens via `https://www.google.com/recaptcha/api/siteverify`.
- Do not log tokens or expose secrets to the client.

## Deployment
### Netlify
- Security headers are configured in `netlify.toml` (CSP, X-Frame-Options, etc.). Example:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/index.html"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
    Content-Security-Policy = "default-src 'self'; script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' http://localhost:*; frame-src https://www.google.com/recaptcha/; frame-ancestors 'none'"
```

### Vercel
- Project Settings → Build Command: `npm run build`, Output: `dist`
- Add rewrite to `index.html` for SPA routing if needed

## Security headers (prod)
- Content-Security-Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=()
- HSTS (Strict-Transport-Security)

## Demo script
1. Home → see hero and navigation
2. Services → search "UI", filter by Design, price `$50-$100`
3. Blog → open a post → Blog Details (sanitized HTML)
4. Contact → submit form; with `VITE_RECAPTCHA_SITE_KEY` set, complete reCAPTCHA

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
