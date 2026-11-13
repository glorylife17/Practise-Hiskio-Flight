# Flight Price Notifier

Set a route and a target price, and get emailed when the fare drops.

A Vite + React single-page app with React Router, Tailwind CSS and Supabase Auth, deployed as static files on Vercel.

## Development

You need Node.js and [Bun](https://bun.sh) (or npm).

```sh
git clone https://github.com/glorylife17/Practise-Hiskio-Flight.git
cd Practise-Hiskio-Flight
bun install
bun run dev
```

## Environment variables

The app reads two browser-safe values from `import.meta.env` (see `.env.example`):

| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Supabase project URL, e.g. `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | The project's publishable key (`sb_publishable_...`), which replaces the legacy anon key |

Set them in `.env` for local development and in the Vercel project's **Settings → Environment Variables** for deployments.

## Build and deploy

```sh
bun run build   # outputs a static SPA to dist/
bun run test
```

`vercel.json` rewrites every path to `index.html`, so deep links such as `/app` resolve client-side.
