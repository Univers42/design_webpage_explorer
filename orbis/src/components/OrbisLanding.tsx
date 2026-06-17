import { Mail, Twitter, Github, type LucideIcon } from 'lucide-react'

/* All videos are served locally from /public/videos (self-contained). */
const VIDEOS = {
  hero: '/videos/hero.mp4',
  about: '/videos/about.mp4',
  card1: '/videos/card1.mp4',
  card2: '/videos/card2.mp4',
  card3: '/videos/card3.mp4',
  cta: '/videos/cta.mp4',
}

const NAV_LINKS = ['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact']
const SOCIALS: LucideIcon[] = [Mail, Twitter, Github]

const ABOUT_TEXT =
  'A digital object fixed beyond time and place. An exploration of distance, form, and silence in space'

const CARDS = [
  { src: VIDEOS.card1, score: '8.7/10' },
  { src: VIDEOS.card2, score: '9/10' },
  { src: VIDEOS.card3, score: '8.2/10' },
]

/** Looping, muted, autoplaying background video. */
function BgVideo({ src, className }: { src: string; className?: string }) {
  return <video src={src} className={className} autoPlay loop muted playsInline />
}

/** Square liquid-glass icon button. */
function GlassIconButton({ Icon, className = '' }: { Icon: LucideIcon; className?: string }) {
  return (
    <a
      href="#"
      className={`liquid-glass flex items-center justify-center transition hover:bg-white/10 ${className}`}
    >
      <Icon className="h-5 w-5 text-cream" strokeWidth={1.5} />
    </a>
  )
}

/** A single NFT card: square looping video + liquid-glass rarity bar. */
function NftCard({ src, score }: { src: string; score: string }) {
  return (
    <div className="liquid-glass rounded-[32px] p-[18px] transition hover:bg-white/10">
      <div className="relative overflow-hidden rounded-[24px]" style={{ paddingBottom: '100%' }}>
        <BgVideo src={src} className="absolute inset-0 h-full w-full object-cover" />

        {/* Rarity overlay bar */}
        <div className="liquid-glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-[20px] px-5 py-4">
          <div className="leading-tight">
            <div className="font-mono text-[11px] uppercase text-cream/70">Rarity score:</div>
            <div className="font-grotesk text-[16px] text-cream">{score}</div>
          </div>
          <button
            type="button"
            aria-label="View NFT"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] shadow-lg shadow-purple-500/50 transition hover:scale-110"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OrbisLanding() {
  return (
    <div className="relative w-full overflow-x-hidden bg-space text-cream">
      {/* ================= SECTION 1 — HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden rounded-b-[32px]">
        <BgVideo src={VIDEOS.hero} className="absolute inset-0 h-full w-full object-cover" />

        {/* Desktop social icons — top-right corner */}
        <div className="absolute right-5 top-6 z-20 hidden flex-col gap-3 sm:right-8 lg:right-12 lg:flex">
          {SOCIALS.map((Icon, i) => (
            <GlassIconButton key={i} Icon={Icon} className="h-14 w-14 rounded-[1rem]" />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1831px] flex-col px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <header className="grid grid-cols-3 items-center pt-6 lg:pt-8">
            <span className="font-grotesk text-[16px] uppercase tracking-wide text-cream">
              Orbis.Nft
            </span>
            <nav className="liquid-glass hidden justify-self-center rounded-[28px] px-[52px] py-[24px] lg:block">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="font-grotesk text-[13px] uppercase text-cream transition hover:text-neon"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div aria-hidden />
          </header>

          {/* Hero heading */}
          <div className="flex flex-1 items-center">
            <div className="relative w-full lg:ml-32 lg:max-w-[780px]">
              <h1 className="font-grotesk text-[40px] uppercase leading-[1.05] text-cream sm:text-[60px] md:text-[75px] md:leading-[1] lg:text-[90px]">
                Beyond earth
                <br />
                and ( its ) familiar boundaries
              </h1>
              <span
                className="font-condiment absolute -top-2 right-0 -rotate-1 text-[24px] normal-case text-neon opacity-90 sm:top-2 sm:text-[36px] lg:text-[48px]"
                style={{ mixBlendMode: 'exclusion' }}
              >
                Nft collection
              </span>
            </div>
          </div>

          {/* Mobile social icons */}
          <div className="flex justify-center gap-3 pb-10 lg:hidden">
            {SOCIALS.map((Icon, i) => (
              <GlassIconButton key={i} Icon={Icon} className="h-14 w-14 rounded-[1rem]" />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 — ABOUT / INTRO ================= */}
      <section className="relative w-full overflow-hidden">
        <BgVideo src={VIDEOS.about} className="absolute inset-0 h-full w-full object-cover" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1831px] flex-col justify-between px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          {/* Top row */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="relative inline-block">
              <h2 className="font-grotesk text-[32px] uppercase leading-[1] text-cream sm:text-[44px] lg:text-[60px]">
                Hello!
                <br />
                I'm orbis
              </h2>
              <span
                className="font-condiment absolute -bottom-3 right-0 -rotate-2 text-[36px] normal-case text-neon opacity-90 lg:-bottom-6 lg:text-[68px]"
                style={{ mixBlendMode: 'exclusion' }}
              >
                Orbis
              </span>
            </div>
            <p className="max-w-[266px] font-mono text-[14px] uppercase text-cream lg:text-[16px]">
              {ABOUT_TEXT}
            </p>
          </div>

          {/* Bottom row — decorative, near-invisible duplicates */}
          <div className="mt-16 flex justify-between">
            <div className="space-y-4">
              <p className="max-w-[266px] font-mono text-[14px] uppercase text-space opacity-10 lg:text-[16px] lg:text-cream">
                {ABOUT_TEXT}
              </p>
              <p className="max-w-[266px] font-mono text-[14px] uppercase text-space opacity-10 lg:text-[16px] lg:text-cream">
                {ABOUT_TEXT}
              </p>
            </div>
            <div className="hidden space-y-4 lg:block">
              <p className="max-w-[266px] font-mono text-[16px] uppercase text-cream opacity-10">
                {ABOUT_TEXT}
              </p>
              <p className="max-w-[266px] font-mono text-[16px] uppercase text-cream opacity-10">
                {ABOUT_TEXT}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3 — NFT COLLECTION ================= */}
      <section className="w-full bg-space py-16 lg:py-24">
        <div className="mx-auto max-w-[1831px] px-5 sm:px-8 lg:px-12">
          {/* Header row */}
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-grotesk text-[32px] uppercase leading-[1.05] text-cream sm:text-[44px] lg:text-[60px]">
              Collection of
              <span className="ml-12 block sm:ml-24 lg:ml-32">
                <span className="font-condiment normal-case text-neon">Space</span> objects
              </span>
            </h2>

            {/* SEE ALL CREATORS */}
            <button type="button" className="text-left text-cream">
              <div className="flex items-end gap-3">
                <span className="font-grotesk text-[32px] uppercase leading-[0.9] sm:text-[44px] lg:text-[60px]">
                  SEE
                </span>
                <span className="flex flex-col font-grotesk text-[20px] uppercase leading-[0.95] sm:text-[28px] lg:text-[36px]">
                  <span>ALL</span>
                  <span>CREATORS</span>
                </span>
              </div>
              <div className="mt-2 h-[6px] w-full bg-neon lg:h-[10px]" />
            </button>
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => (
              <NftCard key={c.src} src={c.src} score={c.score} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 4 — CTA / FINAL ================= */}
      <section className="relative w-full">
        {/* Native-aspect video (NOT cover) */}
        <BgVideo src={VIDEOS.cta} className="block h-auto w-full" />

        {/* Right-aligned text block */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="relative px-5 text-right lg:pl-[15%] lg:pr-[20%]">
            <span
              className="font-condiment absolute -top-6 left-0 text-[17px] normal-case text-neon opacity-90 sm:-top-10 md:-top-14 lg:-top-20 lg:text-[68px]"
              style={{ mixBlendMode: 'exclusion' }}
            >
              Go beyond
            </span>
            <h2 className="font-grotesk text-[16px] uppercase leading-[1.05] text-cream sm:text-[32px] md:text-[44px] lg:text-[60px]">
              <span className="mb-4 block sm:mb-8 lg:mb-12">JOIN US.</span>
              <span className="block">REVEAL WHAT'S HIDDEN.</span>
              <span className="block">DEFINE WHAT'S NEXT.</span>
              <span className="block">FOLLOW THE SIGNAL.</span>
            </h2>
          </div>
        </div>

        {/* Bottom-left vertical social panel */}
        <div className="liquid-glass absolute bottom-[12%] left-[8%] flex flex-col overflow-hidden rounded-[0.5rem] sm:bottom-[16%] lg:bottom-[20%] lg:rounded-[1.25rem]">
          {SOCIALS.map((Icon, i) => (
            <a
              key={i}
              href="#"
              className={`flex h-[12vw] w-[14vw] items-center justify-center transition hover:bg-white/10 sm:h-[5rem] sm:w-[14.375rem] md:h-[4.5rem] md:w-[10.78125rem] lg:h-[6.5rem] lg:w-[16.77rem] ${
                i < SOCIALS.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              <Icon className="h-5 w-5 text-cream" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </section>

      {/* ================= TEXTURE OVERLAY (above everything) ================= */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          backgroundImage: 'url(/texture.svg)',
          backgroundSize: 'cover',
          mixBlendMode: 'lighten',
          opacity: 0.6,
        }}
      />
    </div>
  )
}
