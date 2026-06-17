import { useEffect, useRef, useState } from 'react'
import { Train, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

type Site = { name: string; stop: string; tag: string; url: string; accent: string }

const SITES: Site[] = [
  { name: 'Lithos', stop: '01', tag: 'Geology — cursor-spotlight image reveal', url: 'http://localhost:5173', accent: '#e8702a' },
  { name: 'Mainframe', stop: '02', tag: 'Creative agency — mouse-scrub video', url: 'http://localhost:5174', accent: '#14b8a6' },
  { name: 'Cursor Follow', stop: '03', tag: 'Core features — the monster follows you', url: 'http://localhost:5175', accent: '#6366f1' },
  { name: 'Bloom', stop: '04', tag: 'AI floral hero — liquid glass', url: 'http://localhost:5176', accent: '#ec4899' },
  { name: 'Orbis', stop: '05', tag: 'Dark-space NFT landing', url: 'http://localhost:5177', accent: '#6fff00' },
  { name: 'Taskora', stop: '06', tag: 'SaaS hero + mock dashboard', url: 'http://localhost:5178', accent: '#3b82f6' },
]

const ENGINE_ACCENT = '#fbbf24'
const TOTAL = SITES.length + 1 // engine + wagons

// Deterministic starfield (computed once).
const STARS = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 53) % 62,
  r: (i % 3) + 1,
  dur: 2 + (i % 4),
  delay: (i % 5) * 0.5,
}))

function Wheel() {
  return (
    <div className="relative h-9 w-9 rounded-full border-4 border-[#1b2436] bg-[#0d1422] sm:h-11 sm:w-11">
      <div className="absolute inset-[32%] rounded-full bg-[#2a364d]" />
    </div>
  )
}

/** Coupling stub reaching toward the next car (sits at wheel height). */
function Coupling() {
  return <div className="absolute -right-10 bottom-4 z-10 h-2.5 w-10 rounded-full bg-[#222d44]" />
}

function Locomotive({ active }: { active: boolean }) {
  return (
    <div
      className="relative w-[80vw] max-w-[540px] transition-all duration-500"
      style={{ opacity: active ? 1 : 0.5, transform: active ? 'scale(1)' : 'scale(0.92)' }}
    >
      {/* Smokestack */}
      <div className="absolute -top-6 right-12 h-6 w-7 rounded-t-md bg-[#11182a]" />
      {/* Body — rounded "nose" on the left (front of travel) */}
      <div className="relative overflow-hidden rounded-3xl rounded-tl-[3.5rem] border border-white/10 bg-gradient-to-b from-[#141d33] to-[#0b1120] p-6 shadow-2xl sm:p-8">
        <div className="flex items-center gap-2 text-amber-300">
          <Train size={20} />
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/55">Design Express</span>
        </div>
        <h1 className="mt-3 font-display text-5xl leading-[0.95] text-white sm:text-6xl">All aboard.</h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
          Six experiments in what AI can build — one per car. Slide right, drag, or use the arrow
          keys to ride through the whole gallery.
        </p>
        {/* Headlight (front, left) */}
        <div className="absolute left-5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_44px_14px_rgba(252,211,77,0.45)]" />
      </div>
      <div className="mt-3 flex justify-center gap-20">
        <Wheel />
        <Wheel />
      </div>
      <Coupling />
    </div>
  )
}

function Wagon({ site, active, near, hasNext }: { site: Site; active: boolean; near: boolean; hasNext: boolean }) {
  return (
    <div
      className="relative w-[86vw] max-w-[820px] transition-all duration-500"
      style={{ opacity: active ? 1 : 0.55, transform: active ? 'scale(1)' : 'scale(0.93)' }}
    >
      {/* Roof strip in the car's accent */}
      <div className="mx-8 h-2.5 rounded-t-xl" style={{ backgroundColor: site.accent }} />

      {/* Car body */}
      <div className="relative rounded-2xl border border-white/10 bg-[#0c1322] p-3 shadow-2xl">
        {/* Destination sign + open */}
        <div className="flex items-center justify-between px-2 pb-3 pt-1">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl text-white sm:text-3xl">{site.name}</span>
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider"
              style={{ backgroundColor: `${site.accent}22`, color: site.accent }}
            >
              STOP {site.stop}
            </span>
          </div>
          <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:scale-105"
          >
            Open
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Window — live preview */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black">
          {near ? (
            <iframe
              src={site.url}
              title={`${site.name} preview`}
              loading="lazy"
              tabIndex={-1}
              className="absolute left-0 top-0 origin-top-left"
              style={{ width: '200%', height: '200%', transform: 'scale(0.5)', border: 0, pointerEvents: 'none' }}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: `radial-gradient(circle at 50% 35%, ${site.accent}22, transparent 70%)` }}
            >
              <span className="font-display text-5xl text-white/15">{site.name}</span>
            </div>
          )}
          {/* Glass glare */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          {/* Tag */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-10">
            <span className="text-xs text-white/75">{site.tag}</span>
          </div>
        </div>
      </div>

      {/* Wheels */}
      <div className="mt-3 flex justify-center gap-40">
        <Wheel />
        <Wheel />
      </div>

      {hasNext && <Coupling />}
    </div>
  )
}

export default function GalleryTrain() {
  const trackRef = useRef<HTMLDivElement>(null)
  const railsRef = useRef<HTMLDivElement>(null)
  const carRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  // Track scroll position -> active car + parallax rails.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const update = () => {
      const center = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      carRefs.current.forEach((c, i) => {
        if (!c) return
        const cc = c.offsetLeft + c.offsetWidth / 2
        const d = Math.abs(cc - center)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setActive(best)
      if (railsRef.current) railsRef.current.style.transform = `translateX(${-track.scrollLeft * 0.5}px)`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const go = (i: number) => {
    const t = Math.max(0, Math.min(TOTAL - 1, i))
    carRefs.current[t]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(active + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(active - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const activeAccent = active === 0 ? ENGINE_ACCENT : SITES[active - 1].accent
  const sideSpacer = { width: 'max(1.5rem, calc((100vw - 820px) / 2))' }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a1024] via-[#070b18] to-[#05060f]">
      {/* Moon */}
      <div className="pointer-events-none absolute right-[12%] top-[12%] h-20 w-20 rounded-full bg-[#e8edff] shadow-[0_0_70px_20px_rgba(232,237,255,0.25)]" />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r,
              height: s.r,
              animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Horizon glow — tinted to the current car's accent */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[80vw] -translate-x-1/2 rounded-[100%] blur-3xl transition-colors duration-700"
        style={{ backgroundColor: activeAccent, opacity: 0.16 }}
      />

      {/* Station board */}
      <div className="absolute left-1/2 top-6 z-30 -translate-x-1/2 text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Now arriving</div>
        <div className="font-display text-xl text-white sm:text-2xl">
          {active === 0 ? 'Design Express' : SITES[active - 1].name}
        </div>
      </div>

      {/* Rails (behind the train) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[80px] z-10">
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#39466a] to-transparent" />
        <div className="relative mt-1 h-3 overflow-hidden">
          <div
            ref={railsRef}
            className="absolute inset-y-0 -left-[50%] w-[300%] will-change-transform"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, #2a3550 0 5px, transparent 5px 34px)' }}
          />
        </div>
      </div>

      {/* Ground */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#05060f] to-transparent" />

      {/* The train (horizontal scroll-snap track) */}
      <div
        ref={trackRef}
        className="no-scrollbar absolute inset-0 z-20 flex snap-x snap-mandatory items-end gap-10 overflow-x-auto scroll-smooth pb-[108px]"
      >
        <div className="shrink-0 snap-none" style={sideSpacer} />

        <div ref={(el) => { carRefs.current[0] = el }} className="relative shrink-0 snap-center">
          <Locomotive active={active === 0} />
        </div>

        {SITES.map((site, i) => (
          <div key={site.name} ref={(el) => { carRefs.current[i + 1] = el }} className="relative shrink-0 snap-center">
            <Wagon
              site={site}
              active={active === i + 1}
              near={Math.abs(active - (i + 1)) <= 1}
              hasNext={i < SITES.length - 1}
            />
          </div>
        ))}

        <div className="shrink-0 snap-none" style={sideSpacer} />
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous car"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to car ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: active === i ? 24 : 8,
                backgroundColor: active === i ? '#ffffff' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(active + 1)}
          disabled={active === TOTAL - 1}
          aria-label="Next car"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Counter */}
      <div className="absolute bottom-7 right-6 z-30 font-display text-sm tracking-wider text-white/50">
        {String(active + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </div>
    </div>
  )
}
