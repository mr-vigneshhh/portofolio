import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)
  const counterRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) { onComplete(); return }

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            document.body.style.overflow = ''
            onComplete()
          },
        })
      },
    })

    const counter = { value: 0 }
    tl.to(counter, {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(counter.value)
      },
    }, 0)

    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.2, ease: 'power2.inOut', transformOrigin: 'left center' },
      0
    )

    tl.fromTo(textRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
      0.2
    )

    tl.to({}, { duration: 0.4 })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ backgroundColor: '#080B12' }}>
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative flex flex-col items-center gap-8">
        <div ref={textRef} className="opacity-0 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-[0.3em] uppercase" style={{ color: '#E8EDF5' }}>
            VIGNESH<span className="text-sm align-super ml-1" style={{ color: '#38BDF8' }}>®</span>
          </h1>
          <p className="font-body text-xs tracking-[0.4em] mt-3 uppercase" style={{ color: '#A6B1C2' }}>
            Portfolio 2026
          </p>
        </div>

        <div className="w-[200px] md:w-[300px] h-[1px] relative overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
          <div ref={lineRef} className="absolute inset-0" style={{ backgroundColor: '#38BDF8', transform: 'scaleX(0)' }} />
        </div>

        <span ref={counterRef} className="font-body text-xs tracking-[0.5em] tabular-nums" style={{ color: '#A6B1C2' }}>0</span>
      </div>
    </div>
  )
}
