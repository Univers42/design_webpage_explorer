import {
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
} from 'lucide-react'
import heroFlowers from '@/assets/hero-flowers.svg'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4'

const HERO_PILLS = ['Artistic Gallery', 'AI Generation', '3D Structures']

export default function BloomHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(var(--background))] text-white">
      {/* ---------- Background video (z-0, covers the viewport) ---------- */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      {/* Faint grayscale scrim to keep text legible over any frame */}
      <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />

      {/* ---------- Content (z-10, floats above the video) ---------- */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* ================= LEFT PANEL (52%) ================= */}
        <section className="relative w-full lg:w-[52%]">
          {/* Strong-glass overlay card */}
          <div className="liquid-glass-strong absolute inset-4 rounded-3xl lg:inset-6" />

          {/* Panel content sits above the glass overlay */}
          <div className="relative z-10 flex min-h-screen flex-col px-8 py-7 sm:px-12 lg:px-14 lg:py-10">
            {/* ----- Nav ----- */}
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="/logo.svg" alt="Bloom" width={32} height={32} className="h-8 w-8" />
                <span className="text-2xl font-semibold tracking-tighter text-white">bloom</span>
              </div>
              <button
                type="button"
                className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80 transition-transform hover:scale-105"
              >
                <Menu className="h-4 w-4" />
                Menu
              </button>
            </nav>

            {/* ----- Hero center ----- */}
            <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
              <img
                src="/logo.svg"
                alt=""
                width={80}
                height={80}
                className="mb-7 h-20 w-20"
                aria-hidden="true"
              />

              <h1 className="text-6xl font-medium leading-[1.04] tracking-[-0.05em] text-white lg:text-7xl">
                Innovating the
                <br />
                <span className="font-serif italic text-white/80">spirit</span> of bloom AI
              </h1>

              {/* CTA */}
              <button
                type="button"
                className="liquid-glass-strong mt-9 inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-6 transition-transform hover:scale-105 active:scale-95"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  <Download className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="text-sm font-medium text-white">Explore Now</span>
              </button>

              {/* Pills */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                {HERO_PILLS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80 transition-transform hover:scale-105"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ----- Bottom quote ----- */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">Visionary Design</p>
              <p className="mt-4 text-2xl leading-snug text-white/90">
                <span className="font-display">“We imagined a realm with </span>
                <span className="font-serif italic text-white">no&nbsp;ending.</span>
                <span className="font-display">”</span>
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-white/20" />
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Marcus Aurelio
                </span>
                <span className="h-px flex-1 bg-white/20" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= RIGHT PANEL (48%, desktop only) ================= */}
        <aside className="relative hidden flex-col p-6 lg:flex lg:w-[48%]">
          {/* ----- Top bar ----- */}
          <div className="flex items-center justify-between gap-3">
            {/* Social pill */}
            <div className="liquid-glass flex items-center gap-4 rounded-full px-5 py-3">
              <a
                href="#"
                aria-label="Twitter"
                className="text-white transition-colors hover:text-white/80"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white transition-colors hover:text-white/80"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white transition-colors hover:text-white/80"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <span className="h-4 w-px bg-white/20" />
              <ArrowRight className="h-4 w-4 text-white/80" />
            </div>

            {/* Account button (Sparkles icon) */}
            <button
              type="button"
              className="liquid-glass inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-sm text-white transition-transform hover:scale-105"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Sparkles className="h-4 w-4" />
              </span>
              Account
            </button>
          </div>

          {/* ----- Community card ----- */}
          <div className="liquid-glass mt-6 ml-auto w-56 rounded-2xl p-5">
            <h3 className="text-sm font-medium text-white">Enter our ecosystem</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">
              Join a living network of designers cultivating tomorrow’s botanical intelligence.
            </p>
          </div>

          {/* ----- Bottom feature section ----- */}
          <div className="mt-auto">
            <div className="liquid-glass rounded-[2.5rem] p-3">
              {/* Two feature cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="liquid-glass rounded-3xl p-5">
                  <div className="mb-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <Wand2 className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-white">Processing</h4>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    Real-time generative growth engine.
                  </p>
                </div>
                <div className="liquid-glass rounded-3xl p-5">
                  <div className="mb-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-white">Growth Archive</h4>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    Every bloom you’ve ever cultivated.
                  </p>
                </div>
              </div>

              {/* Bottom thumbnail card */}
              <div className="liquid-glass mt-3 flex items-center gap-4 rounded-3xl p-3">
                <img
                  src={heroFlowers}
                  alt="Monochrome botanical study"
                  width={96}
                  height={64}
                  className="h-16 w-24 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium text-white">
                    Advanced Plant Sculpting
                  </h4>
                  <p className="mt-0.5 text-xs text-white/60">
                    Shape living structures with AI precision.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Add"
                  className="liquid-glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg leading-none text-white transition-transform hover:scale-105"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
