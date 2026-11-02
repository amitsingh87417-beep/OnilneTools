# 100K Tools Universe — v3.0 All-in-One Edition

A responsive, browser-first utility platform using Vite + vanilla JavaScript, with an optional Express AI API for Render and optional Supabase client configuration.

## What's new in v3.0

- Premium white + blue responsive interface, with optional dark mode.
- 90+ individually named tool configurations across Text, Developer, Math, Convert, Date, Security, Web, Data, Generate, Image and PDF.
- Existing core workflows retained: search, categories, favorites, tool workspace, copy, download and browser-local processing.
- Added recent tools, local tool history, compact directory layout, custom Tool Builder, QR image generation, image resize/compress/convert, and PDF merge/extract/count/rotate/info.
- AI Assistant UI with a server-side OpenAI integration. API keys are read only from the Render server environment.
- Optional Supabase client configuration is included for the next auth/cloud-history integration phase; this starter does not yet implement user sign-in or cloud sync.

## Requirements

- Node.js 18 or newer
- npm

## Run the frontend

```bash
npm install
npm run dev
```

Vite prints a local URL (usually http://localhost:5173).

## Production build / Vercel

```bash
npm run build
npm run preview
```

Deploy the repository to Vercel with:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

The included `vercel.json` enables SPA fallback routes.

## Deploy the AI backend to Render

1. Create a separate Render Web Service from this repository.
2. Set the Root Directory to `server`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.
5. Add environment variables in Render:
   - `OPENAI_API_KEY` = your private API key (server only)
   - `OPENAI_MODEL` = `gpt-4.1-mini` (or a model available to your account)
   - `FRONTEND_ORIGIN` = your exact Vercel website origin (e.g. `https://your-site.vercel.app`)
6. In the Vercel project environment, set `VITE_API_BASE_URL` to the Render service URL, e.g. `https://your-service.onrender.com`.
7. Redeploy Vercel after changing environment variables.

Never put `OPENAI_API_KEY` in a `VITE_` variable, HTML, or frontend JavaScript. OpenAI API usage may incur separate charges.

## Optional Supabase configuration

`.env.example` includes `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, and the Supabase client is initialized when both are supplied. Authentication, user profiles and cloud history are not wired up in this release; favorites, recents and history currently stay in the current browser's local storage.

## Real-tool scope and limitations

The directory contains 90+ distinct tool configurations, each routed to an implemented engine; some share reusable code families. Image and PDF tools use browser APIs and `pdf-lib`. Some advanced formats, scanned-PDF OCR, PDF-to-Word, true image background removal, AI image generation, and third-party SEO keyword data are not included. The AI assistant requires a deployed backend and a valid server-side API key. Browser compatibility and large-file limits depend on the user's device.

## Privacy and safety notes

- Local text, image and PDF operations are processed in the browser.
- Do not paste real passwords into a website. Password strength is a simple educational estimate, not a security audit.
- Email syntax checking does not confirm that an inbox exists.
- JWT decoding does not verify the token signature.
- The BMI calculator is a general calculation and not a medical diagnosis.
