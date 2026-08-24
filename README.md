# Keruvva Platform

A self-contained React + Vite + TypeScript concept site for Keruvva, an AI-powered participation infrastructure platform.

## Development

```bash
npm install
npm run dev
```

Build with `npm run build`; preview with `npm run preview`.

## Architecture

`src/App.tsx` composes the single-page experience. `src/App.css` contains the responsive visual system, fallback scene, prototype UI, modal, and reduced-motion behavior. The app includes system architecture, digital-twin layers, potential applications, business model, principles, founder, and early-access conversion surfaces.

## Assets

Place replacement files in `src/assets/`: `keruvva-logo.png`, `keruvva-hero.mp4`, `keruvva-hero-poster.webp`, `digital-twin-01.webp`, `digital-twin-02.webp`, and `digital-twin-03.webp`. The hero remains functional when media is absent because a CSS fallback scene sits beneath it.

## Future integrations

The early-access form posts to the Vercel function in `api/early-access.ts`, which stores submissions in Supabase. Create the table with `supabase/early-access.sql`, then configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as Vercel environment variables. Keep the service-role key server-side and never expose it through `VITE_` variables. Analytics events are dispatched as `keruvva:analytics` browser events by `track()` and can be connected to a provider later. Add Stripe only when billing is configured.

## Deployment

Run `npm run build` and deploy `dist/` to a static host such as Cloudflare Pages, Netlify, Vercel, or equivalent.
