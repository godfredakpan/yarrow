# Her Health Hub

A women's health awareness website built with Vite, React, TypeScript, and Tailwind. It provides trusted information, programmes by life stage, events, and free consultation requests.

## Tech stack

- **Vite** – Build and dev server
- **React 18** + **React Router**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix-based components)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint
- `npm run test` – Run tests

## Project structure

- `src/pages/` – Route pages (Index, About, Programs, Events, Contact)
- `src/components/layout/` – Header, Footer, Layout
- `src/components/home/` – Hero, AgePathways, DidYouKnow, EventsPreview, CTASection
- `src/components/ui/` – shadcn/ui components

## Admin (events & bookings)

The admin section uses the **rvw/api** Laravel backend (Women Health project). You can log in, create/edit events, and manage bookings.

- **Admin URL:** [http://localhost:8080/admin](http://localhost:8080/admin) (or `/admin/login` to sign in)
- **API base:** Set `VITE_API_BASE_URL` in `.env` to your Laravel API base, e.g. `http://localhost:8000/api`. If unset, the app uses `/api` (same-origin).

**Backend (rvw/api):**

1. Run Women Health migrations only: `php artisan womenhealth:migrate`  
   (Or run all migrations: `php artisan migrate`.)  
   Tables: `women_health_admins`, `women_health_events`, `women_health_bookings`.  
   To re-run from scratch: `php artisan womenhealth:migrate --fresh`
2. Seed dummy admins: `php artisan db:seed --class=WomenHealthAdminSeeder`  
   **Dummy logins (for testing):**
   - **admin@example.com** / **admin123**
   - **admin@herhealthhub.local** / **password**  
   (Remove or change these in production.)

**Routes (API prefix `womenhealth`):**

- Public: `GET /api/womenhealth/events`, `GET /api/womenhealth/events/{id}`, `POST /api/womenhealth/bookings`
- Admin (auth required): `POST /api/womenhealth/admin/login`, then `GET/POST/PUT/DELETE` for `/api/womenhealth/admin/events` and `/api/womenhealth/admin/bookings`

## Images

The site uses placeholder images (Picsum) by default. To use your own photos:

1. Add images to `public/images/` (e.g. `hero-banner.jpg`, `pathway-teen.jpg`).
2. Update `src/lib/images.ts` to point to those paths (e.g. `heroBanner: "/images/hero-banner.jpg"`).

Keys: `heroBanner`, `pathwayTeen` / `pathwayYoung` / `pathwayPeri` / `pathwaySenior`, `eventWorkshop` / `eventCommunity` / `eventSupport`, `facts`, `cta`.

## Deploy

Build output is in `dist/`. Deploy that folder to any static host (Vercel, Netlify, Cloudflare Pages, etc.). Set `VITE_API_BASE_URL` to your production API URL.
