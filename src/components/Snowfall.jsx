import { useEffect, useRef } from 'react'

export default function Snowfall() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    let flakes = []
    let fragments = []

    const BURST_RADIUS = 70
    const FRAGMENTS_PER_FLAKE = reduceMotion ? 3 : 7

    function targetFlakeCount() {
      const area = width * height
      const count = Math.round(area / 9000)
      const base = Math.max(50, Math.min(reduceMotion ? 60 : 150, count))
      return base
    }

    function makeFlake(atTop = true) {
      const r = Math.random() * 2.4 + 1
      return {
        x: Math.random() * width,
        y: atTop ? -Math.random() * height : Math.random() * height,
        r,
        speedY: (reduceMotion ? 0.3 : 0.5) + Math.random() * (reduceMotion ? 0.5 : 1.1) + r * 0.15,
        swayAmp: Math.random() * 0.7 + 0.2,
        swayFreq: Math.random() * 0.012 + 0.004,
        swayOffset: Math.random() * 1000,
        opacity: Math.random() * 0.5 + 0.4,
      }
    }

    function seedFlakes() {
      const n = targetFlakeCount()
      flakes = new Array(n).fill(0).map(() => makeFlake(false))
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedFlakes()
    }

    function spawnBurst(x, y) {
      for (let i = 0; i < FRAGMENTS_PER_FLAKE; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2.6 + 0.8
        fragments.push({
          x,
          y,
          r: Math.random() * 1.4 + 0.6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1, // slight upward pop before gravity takes it
          life: 1,
          decay: Math.random() * 0.012 + 0.012,
        })
      }
    }

    function handlePointerDown(e) {
      const rect = canvas.getBoundingClientRect()
      const px = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
      const py = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top

      let hit = false
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i]
        const dx = f.x - px
        const dy = f.y - py
        if (dx * dx + dy * dy <= BURST_RADIUS * BURST_RADIUS) {
          spawnBurst(f.x, f.y)
          flakes.splice(i, 1)
          flakes.push(makeFlake(true)) // replace so density stays constant
          hit = true
        }
      }
      // small feedback burst at the point even if no flake was near
      if (!hit) spawnBurst(px, py)
    }

    let raf = null
    let t = 0

    function tick() {
      t += 1
      ctx.clearRect(0, 0, width, height)

      // falling flakes
      ctx.fillStyle = '#E8F6FF'
      for (const f of flakes) {
        f.y += f.speedY
        f.x += Math.sin((t + f.swayOffset) * f.swayFreq) * f.swayAmp

        if (f.y - f.r > height) {
          f.y = -f.r
          f.x = Math.random() * width
        }
        if (f.x < -5) f.x = width + 5
        if (f.x > width + 5) f.x = -5

        ctx.globalAlpha = f.opacity
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // burst fragments
      ctx.fillStyle = '#9FD8EA'
      for (let i = fragments.length - 1; i >= 0; i--) {
        const p = fragments[i]
        p.vy += 0.05 // gravity
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) {
          fragments.splice(i, 1)
          continue
        }

        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('touchstart', handlePointerDown, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
