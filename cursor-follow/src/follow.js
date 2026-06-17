// Cursor Follow — the background monster drifts toward the pointer.
// A mousemove sets a target offset; a rAF loop eases the video's transform
// toward it so the motion glides instead of snapping.

const video = document.querySelector('.cf-bg-video')

if (video) {
  const STRENGTH = 26 // max px the monster shifts toward the cursor
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0

  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2 * STRENGTH
    targetY = (e.clientY / window.innerHeight - 0.5) * 2 * STRENGTH
  })

  const tick = () => {
    currentX += (targetX - currentX) * 0.08
    currentY += (targetY - currentY) * 0.08
    video.style.transform = `scale(1.12) translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
