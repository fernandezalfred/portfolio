# Alfredo Fernandez — Portfolio

A full-stack personal portfolio website with a built-in CMS admin panel. Content is managed through a protected dashboard and served via a REST API backed by MongoDB.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, MUI v7 |
| Animations | Framer Motion |
| Database | MongoDB via Mongoose |
| Auth | bcryptjs (password hashing) |
| Language | TypeScript |

## Features

- **Single-page portfolio** — Home, About, Experience, Projects, and Contact sections
- **CMS admin panel** at `/admin` — edit all content through a sidebar-nav dashboard
- **REST API** — one route file per resource, standard HTTP methods
- **JWT-less auth** — session stored in `sessionStorage`; protected routes redirect to `/login`
- **SEO** — Open Graph tags, Twitter card, JSON-LD structured data, sitemap, and `robots.txt`
- **Responsive** — mobile-first layout with animated navbar

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── home/route.ts           # GET, POST, PUT
│   │   ├── about/route.ts          # GET, POST, PUT
│   │   ├── experience/route.ts     # GET, POST
│   │   ├── experience/[id]/route.ts
│   │   ├── education/route.ts      # GET, POST
│   │   ├── education/[id]/route.ts # DELETE
│   │   ├── projects/route.ts       # GET, POST
│   │   ├── projects/[id]/route.ts
│   │   ├── contact/route.ts        # GET, POST
│   │   ├── contact/[id]/route.ts   # DELETE
│   │   └── auth/login|register/
│   ├── admin/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── portfolio/   # Public sections (HomeSection, AboutSection, …)
│   ├── admin/       # CMS editors (HomeEditor, AboutEditor, …)
│   └── ui/          # Shared: Layout, AnimationWrapper, FormInput
├── lib/db.ts        # MongoDB connection with pooling
├── models/          # Mongoose schemas
└── services/api.ts  # Client-side fetch helpers
```

## Getting Started

### Prerequisites

- Node.js >= 18.17
- A MongoDB instance (local or Atlas)

### Environment Variables

Create a `.env.local` file at the project root:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Create an Admin Account

```bash
# POST /api/auth/register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "yourpassword"}'
```

Then log in at [http://localhost:3000/login](http://localhost:3000/login) to access `/admin`.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Set the environment variables on your host and run:

```bash
npm run build && npm run start
```

The app is ready to deploy on any Node.js-compatible platform (Vercel, Railway, Render, VPS, etc.). Set `NEXT_PUBLIC_BASE_URL` to your production domain so SEO metadata and the sitemap resolve correctly.
