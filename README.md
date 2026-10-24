# Divyansh Singh — Portfolio

A cinematic personal portfolio: an elegant AI spaceship drifting through deep space. Not cyberpunk — quiet, premium, responsive.

## Experience

- **Boot sequence** — percentage, diagnostics, engine startup, then a smooth enter into the site.
- **AI Core hero** — a live Three.js core that rotates, glows, pulses, reacts to the cursor and emits particles. No profile photo.
- **Scroll journey** — white → light grey → blue → dark blue → deep space → galaxy black, seamless.
- **Living background** — infinite stars, nebula drift, space dust, slow planets, light rays, ambient bloom, subtle camera movement.
- **Skills as orbiting planets** — hover for description, experience, projects and tech stack. No progress bars.
- **Projects as 3D glass cards** — hover glow, lift, tilt and parallax, with tech chips and links.
- **Mission Control contact** — glass form with a rocket-launch send button.
- **Cursor** — a glowing AI orb with a particle trail that enlarges over buttons and pulls cards toward it.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, TypeScript, Vite)
- [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei)
- [Framer Motion](https://motion.dev/) (`motion`) and [GSAP](https://gsap.com/) for animation
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)

## Running locally

Requires [Bun](https://bun.sh) (or Node.js 20+ with npm).

```sh
git clone <this-repository-url>
cd portfolio
bun install
bun run dev
```

Open the printed URL (default `http://localhost:8080`).

### Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview the production build |
| `bun run lint` | ESLint over the source |
| `bun run test` | Vitest unit tests |

## Project layout

```text
src/
  lib/portfolio.ts            # identity + all sample content, in one place
  lib/github.functions.ts     # server function: live repositories from GitHub
  components/portfolio/
    SpaceScene.tsx            # lazy-loaded Three.js AI core, stars, rings
    ExperienceEffects.tsx     # Lenis smooth scroll, cursor orb, boot sequence
  routes/
    __root.tsx                # head metadata, fonts, shared shell
    index.tsx                 # the scroll journey
  styles.css                  # design system: colour journey, glass, motion tokens
public/
  robots.txt
```

## Notes

- The Three.js scene loads lazily after hydration and falls back to a CSS orb when WebGL is unavailable, so server rendering and older devices stay usable.
- Reduced-motion preferences are honoured: the boot sequence, cursor orb, parallax and scroll effects all stand down.
- Repository data on the page is fetched live from the connected GitHub account through a server function; the connector credentials stay server-side.

## Deploy

The app is a standard TanStack Start build (`bun run build`) and deploys to any Node-compatible host. For a zero-config host, connect the project to [Lovable](https://lovable.dev) or point Vercel at this repository with the build command `bun run build` and output directory `dist`.
