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
