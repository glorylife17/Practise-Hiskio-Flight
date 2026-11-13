<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- This is a plain Vite + React SPA (no SSR). `vite build` emits static files to `dist/`; `vercel.json` rewrites every path to `index.html` so deep links like `/app` resolve client-side.
- Routes are declared in `src/router.tsx` (React Router data routes). Page components live in `src/routes/`.
- Signed-in pages are children of the `authenticated` route (`src/routes/route-ids.ts`); its loader redirects to `/signin` when there is no user, because the session lives in browser storage. Pages read the user with `useRouteLoaderData(AUTHENTICATED_ROUTE_ID)`.
- Auth state changes are handled by one `onAuthStateChange` listener in `src/routes/RootLayout.tsx`; it revalidates route loaders, and UI reads the user via `useSessionUser` (query key `session-user`) so the header reflects session state without extra listeners.
- Per-page `<title>` and meta tags are set with `usePageMeta` (`src/hooks/usePageMeta.ts`); site-wide defaults live in `index.html`.
- Reusable UI lives in `src/components/` with PascalCase filenames; design tokens and utilities (gradients, glow, `reveal`) live only in `src/styles.css`.
