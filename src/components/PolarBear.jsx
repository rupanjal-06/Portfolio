import { useEffect, useState } from 'react'

let sharedCtx = null
function getAudioContext() {
  if (!sharedCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return null
    sharedCtx = new AudioContextClass()
  }
  return sharedCtx
}

// Synthesizes a short, low rumbling "growl" — no audio file needed.
function playGrowl() {
  const ctx = getAudioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') ctx.resume()

  const now = ctx.currentTime
  const duration = 0.7

  const osc = ctx.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(150, now)
  osc.frequency.exponentialRampToValueAtTime(55, now + duration)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(500, now)
  filter.frequency.exponentialRampToValueAtTime(160, now + duration)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + duration)

  // gravelly texture layer under the tone
  const bufferSize = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = 'lowpass'
  noiseFilter.frequency.value = 300

  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.12, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  noise.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(ctx.destination)
  noise.start(now)
}

export default function PolarBear() {
  const [growling, setGrowling] = useState(false)

  useEffect(() => {
    // Browsers require a user gesture before audio can play — unlock the
    // shared AudioContext on the first click/tap anywhere on the page.
    function unlock() {
      getAudioContext()?.resume()
      window.removeEventListener('pointerdown', unlock)
    }
    window.addEventListener('pointerdown', unlock)
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  function handleHover() {
    try {
      playGrowl()
    } catch {
      // audio unavailable — fail silently, the visual still plays
    }
    setGrowling(true)
    setTimeout(() => setGrowling(false), 500)
  }

  return (
    <section aria-label="Polar bear" className="relative z-10 flex justify-center py-12">
      <button
        type="button"
        onMouseEnter={handleHover}
        onFocus={handleHover}
        aria-label="Hover the polar bear to hear it growl"
        className="group relative focus:outline-none"
      >
        <span
          className="absolute -bottom-2 left-1/2 h-6 w-40 -translate-x-1/2 rounded-[50%] bg-snowlight/10 blur-md"
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 200 170"
          className={`relative h-32 w-36 md:h-40 md:w-44 drop-shadow-[0_10px_25px_rgba(232,246,255,0.15)] transition-transform ${
            growling ? 'animate-bearShake' : 'group-hover:scale-105'
          }`}
          aria-hidden="true"
        >
          <circle cx="55" cy="42" r="20" fill="#F4FBFF" />
          <circle cx="145" cy="42" r="20" fill="#F4FBFF" />
          <circle cx="55" cy="42" r="9" fill="#DCEEF6" />
          <circle cx="145" cy="42" r="9" fill="#DCEEF6" />

          <circle cx="100" cy="85" r="62" fill="#F8FCFF" />
          <ellipse cx="100" cy="108" rx="34" ry="26" fill="#FFFFFF" />

          <circle cx="80" cy="80" r="5" fill="#13233A" />
          <circle cx="120" cy="80" r="5" fill="#13233A" />
          <ellipse cx="100" cy="100" rx="9" ry="6.5" fill="#13233A" />

          <path
            d={growling ? 'M100,105 Q100,122 84,124 M100,105 Q100,122 116,124' : 'M100,107 Q100,118 88,120 M100,107 Q100,118 112,120'}
            stroke="#13233A"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <span className="mt-3 block font-mono text-[11px] tracking-widest text-mute/70 uppercase text-center">
          hover the bear
        </span>
      </button>
    </section>
  )
}
