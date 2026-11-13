## Project rules

- This is a plain Vite + React SPA (no SSR). `vite build` emits static files to `dist/`; `vercel.json` rewrites every path to `index.html` so deep links like `/app` resolve client-side.
- Routes are declared in `src/router.tsx` (React Router data routes). Page components live in `src/routes/`.
- Signed-in pages are children of the `authenticated` route (`src/routes/route-ids.ts`); its loader redirects to `/signin` when there is no user, because the session lives in browser storage. Pages read the user with `useRouteLoaderData(AUTHENTICATED_ROUTE_ID)`.
- Auth state changes are handled by one `onAuthStateChange` listener in `src/routes/RootLayout.tsx`; it revalidates route loaders, and UI reads the user via `useSessionUser` (query key `session-user`) so the header reflects session state without extra listeners.
- Per-page `<title>` and meta tags are set with `usePageMeta` (`src/hooks/usePageMeta.ts`); site-wide defaults live in `index.html`.
- Reusable UI lives in `src/components/` with PascalCase filenames; design tokens and utilities (gradients, glow, `reveal`) live only in `src/styles.css`.
