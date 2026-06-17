import { Fragment, useEffect, useRef, useState } from 'react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'

const NAV_ITEMS = ['Labs', 'Studio', 'Openings', 'Shop']

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

const PILL_LABELS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
]

const EMAIL = 'hello@mainframe.co'

/* ------------------------------------------------------------------ *
 * Video scrubbing — decoded-frame cache (GPU capture, universal)
 *
 * Seeking an MP4 by `currentTime` re-decodes from the nearest keyframe on
 * every move, which stutters badly during fast motion (turning the head).
 * Instead we decode the clip ONCE on load by playing it muted and sampling
 * frames on a plain requestAnimationFrame loop into a cache of small canvases
 * (capture = `drawImage(video -> canvas)`, which is GPU-accelerated and costs
 * almost nothing on the main thread). Scrubbing then just draws the nearest
 * cached frame to the screen canvas — instant in both directions.
 *
 * This deliberately avoids requestVideoFrameCallback, createImageBitmap and
 * CORS (a display-only canvas may be tainted) so the fast path engages in
 * every browser. Live `currentTime` seeking remains only as a last resort if
 * the clip can't be played at all.
 * ------------------------------------------------------------------ */

const SENSITIVITY = 0.8 // mouse-delta -> seconds-of-video factor (per spec)
const EASE = 0.2 // how quickly the shown time glides toward the target
const CAPTURE_RATE = 1.25 // play-through speed while caching frames
const TARGET_FPS = 24 // cached frames per second of video
const MAX_FRAMES = 200 // hard cap on cached frames (memory)
const MAX_CAP_W = 1280 // hard cap on cached frame width (memory / quality)
const MEM_BUDGET = 384 * 1024 * 1024 // ~ upper bound on cache size in bytes (quality knob)

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

/**
 * Reveals `text` one character at a time. After `startDelay` ms an interval
 * ticks every `speed` ms appending the next character until the string is
 * complete. Returns the revealed slice plus a `done` flag.
 */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    let interval: ReturnType<typeof setInterval> | undefined

    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

export default function MainframeHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pillsVisible, setPillsVisible] = useState(false)
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT)

  // Reveal the action pills 400ms after load — independent of the typewriter.
  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  // Decode-once frame cache (GPU drawImage capture) + canvas scrubbing.
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let disposed = false
    let rafId = 0
    let mode: 'cache' | 'live' = 'cache'
    const frames: { t: number; c: HTMLCanvasElement }[] = []
    let duration = 0
    let prevX: number | null = null
    let targetTime = 0
    let displayTime = 0
    let lastIdx = -1

    // Capture state (set when the play-through begins).
    let capturing = false
    let frameCount = 0
    let capW = 0
    let capH = 0
    let spacing = 0
    let nextT = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const sizeCanvas = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * dpr))
      canvas.height = Math.max(1, Math.round(window.innerHeight * dpr))
      lastIdx = -1 // force a redraw at the new size
    }
    sizeCanvas()

    // Draw a source with `object-fit: cover` + `object-position: 70% center`.
    const drawSource = (src: CanvasImageSource, sw: number, sh: number) => {
      if (!sw || !sh) return
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / sw, ch / sh)
      const dw = sw * scale
      const dh = sh * scale
      ctx.drawImage(src, (cw - dw) * 0.7, (ch - dh) * 0.5, dw, dh)
    }

    // Nearest cached frame to `time` (frames are kept sorted by t).
    const nearestIndex = (time: number) => {
      let lo = 0
      let hi = frames.length - 1
      while (lo < hi) {
        const mid = (lo + hi) >> 1
        if (frames[mid].t < time) lo = mid + 1
        else hi = mid
      }
      if (lo > 0 && Math.abs(frames[lo - 1].t - time) <= Math.abs(frames[lo].t - time)) return lo - 1
      return lo
    }

    const maxCachedTime = () => (frames.length ? frames[frames.length - 1].t : 0)

    const makeTile = (w: number, h: number) => {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      return c
    }

    // Snapshot the current video frame into a small canvas (GPU blit).
    const captureFrameAt = (t: number) => {
      const tile = makeTile(capW, capH)
      const tctx = tile.getContext('2d')
      if (!tctx) return
      tctx.drawImage(video, 0, 0, capW, capH)
      frames.push({ t, c: tile })
      // currentTime is ~monotonic during forward playback; keep sorted anyway.
      let i = frames.length - 1
      while (i > 0 && frames[i - 1].t > frames[i].t) {
        const tmp = frames[i - 1]
        frames[i - 1] = frames[i]
        frames[i] = tmp
        i -= 1
      }
    }

    let liveSeeking = false
    const onSeeked = () => {
      liveSeeking = false
    }

    const loop = () => {
      if (disposed) return

      if (mode === 'cache') {
        // ---- sample the playing video into the cache (warm-up) ----
        if (capturing) {
          const t = video.currentTime
          if (t + 1e-3 >= nextT && frames.length < frameCount) {
            nextT += spacing
            captureFrameAt(t)
          }
          if (video.ended || frames.length >= frameCount) {
            capturing = false
            video.pause()
          }
        }
        // ---- render the scrub position from the cache ----
        const tgt = clamp(targetTime, 0, maxCachedTime())
        displayTime += (tgt - displayTime) * EASE
        if (Math.abs(tgt - displayTime) < 0.0005) displayTime = tgt
        if (frames.length) {
          const idx = nearestIndex(displayTime)
          if (idx !== lastIdx) {
            const f = frames[idx]
            drawSource(f.c, f.c.width, f.c.height)
            lastIdx = idx
          }
        }
      } else {
        // ---- last-resort fallback: live currentTime seek, same canvas ----
        const tgt = clamp(targetTime, 0, duration)
        displayTime += (tgt - displayTime) * EASE
        if (!liveSeeking && Math.abs(video.currentTime - displayTime) > 0.02) {
          liveSeeking = true
          video.currentTime = displayTime
        }
        drawSource(video, video.videoWidth, video.videoHeight)
      }

      rafId = requestAnimationFrame(loop)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!duration) return
      if (prevX === null) {
        prevX = e.clientX
        return
      }
      const delta = e.clientX - prevX
      prevX = e.clientX
      targetTime = clamp(targetTime + (delta / window.innerWidth) * SENSITIVITY * duration, 0, duration)
    }

    const onResize = () => {
      sizeCanvas()
      if (mode === 'cache' && frames.length) {
        const f = frames[nearestIndex(displayTime)]
        drawSource(f.c, f.c.width, f.c.height)
      }
    }

    const startLiveFallback = () => {
      if (disposed || mode === 'live') return
      mode = 'live'
      capturing = false
      duration = video.duration || duration
      video.pause()
      video.playbackRate = 1
      video.addEventListener('seeked', onSeeked)
    }

    const startCacheCapture = () => {
      duration = video.duration
      const nativeW = video.videoWidth
      const nativeH = video.videoHeight
      if (!duration || !isFinite(duration) || !nativeW || !nativeH) {
        startLiveFallback()
        return
      }

      drawSource(video, nativeW, nativeH) // show first frame immediately

      const aspect = nativeH / nativeW
      frameCount = Math.min(MAX_FRAMES, Math.max(2, Math.ceil(duration * TARGET_FPS)))
      capW = Math.min(nativeW, MAX_CAP_W)
      capH = Math.round(capW * aspect)
      const estMem = frameCount * capW * capH * 4
      if (estMem > MEM_BUDGET) {
        const s = Math.sqrt(MEM_BUDGET / estMem)
        capW = Math.max(320, Math.floor(capW * s))
        capH = Math.round(capW * aspect)
      }
      spacing = duration / frameCount
      nextT = 0

      video.muted = true
      video.playbackRate = CAPTURE_RATE
      capturing = true
      video.play().catch(startLiveFallback)
    }

    const onLoaded = () => {
      if (!disposed && mode === 'cache' && !capturing && !frames.length) startCacheCapture()
    }
    if (video.readyState >= 2 && video.duration) startCacheCapture()
    else video.addEventListener('loadeddata', onLoaded, { once: true })

    rafId = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      video.removeEventListener('loadeddata', onLoaded)
      video.removeEventListener('seeked', onSeeked)
      cancelAnimationFrame(rafId)
      video.pause()
      frames.length = 0
    }
  }, [])

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL)
  }

  return (
    <>
      {/* Source video — decoded once into a frame cache, then occluded by the
          canvas. Only drawn directly in the live-seek fallback. */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
          pointerEvents: 'none',
        }}
      />

      {/* Scrub surface — draws the nearest cached frame for the mouse position. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ---------- Navbar ---------- */}
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center text-[23px] text-black">
          {NAV_ITEMS.map((item, i) => (
            <Fragment key={item}>
              <a href="#" className="hover:opacity-60 transition-opacity">
                {item}
              </a>
              {i < NAV_ITEMS.length - 1 && <span>,&nbsp;</span>}
            </Fragment>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#"
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px]"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* ---------- Mobile overlay ---------- */}
      <div
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href="#"
            className="text-[32px] font-medium text-black"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <a
          href="#"
          className="text-[32px] font-medium text-black underline underline-offset-2"
          onClick={() => setMenuOpen(false)}
        >
          Get in touch
        </a>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#000',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* 2. Typewriter line */}
          <p
            className="text-black mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: 54,
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          {/* 3. Action pills (fade up 400ms after load) */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {PILL_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors duration-200"
              >
                {label}
              </button>
            ))}

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center whitespace-nowrap text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">{EMAIL}</span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <rect x="3" y="3" width="13" height="13" rx="2" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
