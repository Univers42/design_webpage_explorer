# Design Explorer

A gallery of websites built with AI — each one an experiment in what's possible.

Every site lives in its **own directory** with its **own `Dockerfile`**. The
`docker-compose.yml` at the repo root builds and runs them one at a time.
**Nothing is installed on your machine — only Docker is required.**

## Requirements

- Docker Engine + Docker Compose v2 (check with `docker compose version`)

## Sites

| Site   | Directory | Description                                                                                                          |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------ |
| Lithos | `lithos/` | Dark, full-screen geology hero with a cursor-following spotlight that reveals a second image. React 18 + TS + Vite + Tailwind. |
| Mainframe | `mainframe/` | Creative-agency hero with a mouse-scrub background video, typewriter intro, and pill CTAs. React 18 + TS + Vite + Tailwind. |
| Cursor Follow | `cursor-follow/` | "Core Features" marketing section — three gradient cards (prompt suggestions, API access, project library). Vanilla HTML/CSS via Vite. |
| Bloom | `bloom/` | AI floral hero with a looping video background and a two-tier liquid-glass UI in strict grayscale. React 18 + TS + Vite + Tailwind. |
| Orbis | `orbis/` | Dark-space NFT landing ("Orbis.Nft") — 4 sections, looping video backgrounds, liquid-glass UI, neon accents. React 18 + TS + Vite + Tailwind + lucide-react. |
| Taskora | `taskora/` | Dark SaaS hero with a fading video background and a detailed light-mode mock dashboard. React 18 + TS + Vite + Tailwind + Framer Motion + lucide-react. |
| **Gallery** | `gallery/` | **The hub** — a "Design Express" train; each site is a wagon you slide between, with a live iframe preview framed in its window. React 18 + TS + Vite + Tailwind + lucide-react. |

## Run a site

**Development** (Vite dev server with hot reload):

```bash
docker compose up lithos --build
# then open http://localhost:5173
```

**Production** (built static assets served by nginx):

```bash
docker compose --profile prod up lithos-prod --build
# then open http://localhost:8080
```

**Mainframe** runs the same way on its own ports:

```bash
docker compose up mainframe --build                       # dev  -> http://localhost:5174
docker compose --profile prod up mainframe-prod --build   # prod -> http://localhost:8081
```

**Cursor Follow** (`:5175` dev / `:8082` prod):

```bash
docker compose up cursor-follow --build                       # dev  -> http://localhost:5175
docker compose --profile prod up cursor-follow-prod --build   # prod -> http://localhost:8082
```

**Bloom** (`:5176` dev / `:8083` prod):

```bash
docker compose up bloom --build                       # dev  -> http://localhost:5176
docker compose --profile prod up bloom-prod --build   # prod -> http://localhost:8083
```

**Orbis** (`:5177` dev / `:8084` prod):

```bash
docker compose up orbis --build                       # dev  -> http://localhost:5177
docker compose --profile prod up orbis-prod --build   # prod -> http://localhost:8084
```

**Taskora** (`:5178` dev / `:8085` prod):

```bash
docker compose up taskora --build                       # dev  -> http://localhost:5178
docker compose --profile prod up taskora-prod --build   # prod -> http://localhost:8085
```

**Gallery train** (`:5179` dev / `:8086` prod) — the hub. Its live previews iframe the other
sites, so bring everything up first (`docker compose up`), then open the train:

```bash
docker compose up --build          # all six sites + the gallery hub
# then open http://localhost:5179   (slide / arrow-key through the wagons)
```

**Stop everything:**

```bash
docker compose down
```

## Add a new site

1. Create a directory, e.g. `mkdir my-site/`.
2. Add its source plus a `Dockerfile` (copy `lithos/Dockerfile` as a starting point).
3. Add a service block to `docker-compose.yml` pointing `build.context` at the
   new directory and mapping a free host port.
4. `docker compose up my-site --build`.
