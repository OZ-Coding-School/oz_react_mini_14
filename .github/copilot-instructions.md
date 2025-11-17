## Purpose
Provide concise, actionable instructions for an AI coding agent to work productively in this repository: a Vite + React frontend with Prisma + Supabase integrations and project-specific conventions.

## Quick start (commands)
- Start dev server: `npm run dev` (Vite) — opens on http://localhost:5173 by default.
- Build static assets: `npm run build`.
- Preview production build: `npm run preview`.
- Lint code: `npm run lint` (ESLint; see `eslint.config.js`).

Reference: `package.json` contains the scripts above.

## Big-picture architecture
- Frontend: React + Vite (source in `src/`). Entry: `src/main.jsx` and `src/App.jsx`.
- UI is organized by features/pages under `src/pages/` and reusable pieces under `src/components/` (each feature folder commonly has an `index.jsx` and `style.jsx`).
- Styling: `styled-components` and some `@emotion` are used. Files that define styles are often named `style.jsx` next to the component.
- Data & APIs: `src/api/` contains `api.jsx`, `fetch.jsx`, and `supabase.jsx` — this is the surface for network calls and service integration. React Query (`@tanstack/react-query`) is used in hooks for data fetching.
- Backend/DB client: Prisma schema is in `prisma/schema.prisma` and a generated client exists under `prisma/generated/prisma/client.ts` — do not edit generated files.

## Important directories and files (examples)
- `src/components/` — common components (e.g., `MovieCard.jsx`, `MovieGrid.jsx`, `SearchInput.jsx`).
- `src/pages/` — page-level components grouped by route (e.g., `DetailPage`, `MainPage`, `SearchPage`).
- `src/constants/` — app constants. Example: `src/constants/tabs.jsx` defines tab mapping used by the Detail page:
  - To add a tab, update `src/constants/tabs.jsx` with a new key and component mapping (e.g., `{ help: { label: '도움', component: HelpComponent } }`).
- `src/context/AuthContext.jsx` — authentication context used across the app.
- `src/hooks/` — custom hooks (naming: `useSomething.jsx`, e.g., `useFetchData.jsx`, `useInfiniteMovies.jsx`). Follow existing function shapes.
- `public/data/` — static JSON samples used by the app (e.g., `movieListData.json`, `movieDetailData.json`). Useful for offline testing.

## Data flow & integration notes
- Primary fetch layer: `src/api/fetch.jsx` and `src/api/api.jsx`. Many components use React Query hooks that call utilities in `src/api/`.
- Supabase is integrated in `src/api/supabase.jsx` and used where auth or DB features are needed. Check `src/context/AuthContext.jsx` and `src/pages/LoginPage` for concrete usage.
- Prisma client exists in `prisma/generated/prisma`. If you need DB schema changes, edit `prisma/schema.prisma` and run the Prisma CLI locally (e.g., `npx prisma migrate dev`), but be cautious: migrations are environment-sensitive. Generated client files should not be edited manually.
- Environment variables: `dotenv` is present in dependencies — local dev likely requires a `.env` for Supabase/Prisma credentials. The repo does not include secrets.

## Conventions and patterns to follow
- File naming: components and pages use `.jsx` (this is a JS project, not TypeScript). Keep exports default where existing files do.
- Style files: component-specific styles live in `style.jsx` next to the component; prefer the existing styled-components pattern.
- Component exports: many folders have `index.jsx` that re-exports inner components — use that pattern when adding new feature folders.
- Hooks: use the `useX` prefix and put shared logic into `src/hooks/`.
- State & data fetching: prefer React Query for server data and local hooks for derived or UI-only state (`useDebounce`, `useIntersectionObserver`, etc.). See `src/hooks/useInfiniteMovies.jsx` for an example.

## Editing and codegen rules
- Do not edit files under `prisma/generated/` — regenerate them from Prisma schema instead.
- Keep ESLint happy: `npm run lint` is available; preserve current code style and patterns.

## Debugging tips
- Use `npm run dev` and open the browser console for client errors.
- Vite Hot Module Reloading (HMR) is enabled — iterative edits to components/style files update quickly.
- For data-related bugs, compare live API responses vs `public/data/*.json` which contain sample payloads used in the UI.

## When adding features (practical checklist)
1. Add components under `src/components/` or a page under `src/pages/` following existing folder structure.
2. Add styles in `style.jsx` and export the component from the folder `index.jsx`.
3. If new network calls are needed, add them to `src/api/` and use React Query hooks in `src/hooks/` when appropriate.
4. Update `src/constants/` for central mappings (e.g., `tabs.jsx`) rather than sprinkling strings across components.

## Where to look for examples
- Tab pattern: `src/constants/tabs.jsx` (maps keys to components used by DetailPage).
- Auth flow: `src/context/AuthContext.jsx` + `src/pages/LoginPage`.
- Data fetch + infinite scroll example: `src/hooks/useInfiniteMovies.jsx` and `src/components/Carousel.jsx`.

## Final note
Keep instructions concrete and limited to discoverable patterns above. If something requires environment secrets or backend migration, request those details before attempting changes.

Please review and tell me if you'd like more examples (small code snippets) or added run/debug workflows (Prisma commands, Supabase seed steps) — I can expand those when you confirm environment details.
