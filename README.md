# Ayle / Meow

Personal portfolio: scrapbook styled, fully responsive, with live Discord presence.

> life is lowkey a string of memories, has anything ever remained besides them?

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 with a custom theme |
| Animation | Framer Motion |
| Fonts | next/font: Space Mono, Caveat, Parisienne |
| Live data | Lanyard API over WebSocket, REST fallback |
| Icons | Inline SVG, brand paths vendored at build time |

## Commands

```bash
npm install
npm run dev     # dev server, http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npx tsc --noEmit  # type check
```

## Structure

```text
portfolio/
├── app/
│   ├── layout.tsx        Root layout: font variables, metadata, viewport
│   ├── page.tsx          Page composition: Nav, Hero, Presence, Projects, Contact
│   └── globals.css       Tailwind layers, theme tokens, shared component classes
│
├── components/
│   ├── Nav.tsx           Sticky header, blur on scroll, animated mobile menu
│   ├── Hero.tsx          Portrait, intro note, education, tech stack, experience
│   ├── Presence.tsx      Live Discord status, custom status, Spotify or game card
│   ├── Projects.tsx      GitHub project cards, count controlled by SHOWN
│   ├── Contact.tsx       Email, Discord, Instagram, call to action, footer
│   ├── Reveal.tsx        Scroll triggered fade and lift wrapper
│   ├── TechIcon.tsx      Tech and software glyphs, official marks plus custom ones
│   └── Icons.tsx         UI icons: mail, phone, Discord, Instagram, arrow, doodles
│
├── lib/
│   ├── data.ts           All page content as typed constants, the file to edit
│   ├── lanyard.ts        Lanyard types, status colors, avatar and asset URL helpers
│   └── brandPaths.ts     Vendored 24x24 brand path data, no runtime dependency
│
├── app/
│   ├── icon.svg          Favicon, served from the App Router metadata API
│   ├── robots.ts         robots.txt route
│   └── sitemap.ts        sitemap.xml route
│
├── public/
│   └── portrait.jpg      Avatar used in the hero polaroid
│
├── tailwind.config.ts    Colors, fonts, shadows, keyframes
├── next.config.mjs
├── tsconfig.json         Strict mode, @/* path alias
└── package.json
```

## Data flow

Everything static lives in `lib/data.ts` and is imported directly by server
components, so most of the page ships as HTML with no client JavaScript.

Only three components are client side:

1. `Nav.tsx` for the scroll listener and the mobile menu.
2. `Reveal.tsx` for viewport triggered animation.
3. `Presence.tsx` for the Lanyard socket.

`Presence.tsx` opens `wss://api.lanyard.rest/socket`, sends op 2 to subscribe to
the Discord id in `lib/lanyard.ts`, answers op 1 with an op 3 heartbeat on the
interval the server asks for, and applies `INIT_STATE` and `PRESENCE_UPDATE`
payloads to state. It reconnects after five seconds on close and falls back to
`GET /v1/users/:id` when websockets are unavailable.

## Editing content

| Change | File |
| --- | --- |
| Name, nav wordmark, role, location, intro | `lib/data.ts` → `profile` |
| Education rows | `lib/data.ts` → `education` |
| Tech stack chips | `lib/data.ts` → `software`, glyphs in `components/TechIcon.tsx` |
| Experience rows | `lib/data.ts` → `experience` |
| Projects | `lib/data.ts` → `projects`, visible count in `components/Projects.tsx` |
| Contact links | `lib/data.ts` → `socials` |
| Discord id | `lib/lanyard.ts` → `DISCORD_ID` |
| Colors, fonts, shadows | `tailwind.config.ts` |

## Responsive behaviour

| Width | Layout |
| --- | --- |
| Below 640px | Single column, hamburger menu, projects become a snap scroll rail |
| 640px to 1024px | Two column grids, six tech chips per row |
| 1024px and up | Resume beside the portrait, three project cards with staggered offsets |

Reduced motion is respected globally in `globals.css`, images use `next/image`
with explicit `sizes`, and focus rings are visible for keyboard navigation.

## Deployment (Vercel)

The project is a stock Next.js App Router app with no custom server, no native
dependencies and no build step outside `next build`, so Vercel detects and
builds it with zero configuration.

1. Push the repository to GitHub.
2. On vercel.com choose New Project and import `ayliee/home`.
3. Keep the detected defaults: framework Next.js, build `next build`,
   install `npm install`, output handled by the adapter.
4. Deploy.

### Environment variables

Both are optional, the app ships working defaults.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, Open Graph and the sitemap. Only needed for a custom domain, otherwise Vercel's own URL is used. |
| `NEXT_PUBLIC_DISCORD_ID` | Discord account for the presence card. Defaults to the id in `lib/lanyard.ts`. |

### What is already configured

- `metadataBase` resolves from `NEXT_PUBLIC_SITE_URL`, then
  `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then localhost.
- `robots.txt` and `sitemap.xml` are generated routes.
- `next/image` remote patterns allow the Discord and Spotify CDNs.
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`) are set in `next.config.mjs`.
- `engines.node` is pinned to 18.18 or newer, matching Vercel's runtimes.
- Every route prerenders as static content, the Lanyard socket runs in the
  browser, so the deployment needs no serverless functions to stay live.
