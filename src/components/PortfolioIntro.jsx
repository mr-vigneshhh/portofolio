import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PortfolioIntro() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const yearRef = useRef(null)
  const introLabelRef = useRef(null)
  const textRef = useRef(null)
  const dividerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })

      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'left center' }, 0)
      tl.fromTo(headingRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.1)
      tl.fromTo(yearRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, 0.25)
      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'left center' }, 0.4)
      tl.fromTo(introLabelRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.5)
      tl.fromTo(textRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.6)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio-intro" ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-16 overflow-hidden" style={{ backgroundColor: '#080B12' }}>
      {/* Top separator line */}
      <div ref={lineRef} className="absolute top-0 left-6 md:left-12 lg:left-16 right-6 md:right-12 lg:right-16 h-[1px]" style={{ backgroundColor: 'rgba(59,130,246,0.2)', transform: 'scaleX(0)' }} />

      {/* Large watermark number */}
      <div className="absolute top-8 right-8 md:right-16 opacity-[0.03]">
        <span className="font-heading text-[15rem] md:text-[25rem] font-bold leading-none" style={{ color: '#E8EDF5' }}>01</span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="overflow-hidden">
              <h2 ref={headingRef} className="font-heading font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
                style={{ color: '#E8EDF5', fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                PORTFOLIO
              </h2>
            </div>
            <div className="overflow-hidden mt-2">
              <p ref={yearRef} className="font-heading text-outline font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                2026
              </p>
            </div>
          </div>

          <div className="lg:pt-8">
            <div ref={dividerRef} className="w-full h-[1px] mb-8 origin-left" style={{ backgroundColor: 'rgba(255,255,255,0.1)', transform: 'scaleX(0)' }} />
            <p ref={introLabelRef} className="font-body text-xs tracking-[0.3em] uppercase mb-6 opacity-0" style={{ color: '#38BDF8' }}>
              INTRODUCTION
            </p>
            <div ref={textRef} className="opacity-0">
              <p className="font-body text-base md:text-lg leading-relaxed mb-6" style={{ color: '#A6B1C2' }}>
                I'm Vignesh, a BCA student and aspiring developer exploring the intersection of technology, creativity, and artificial intelligence.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: '#A6B1C2' }}>
                I enjoy experimenting with ideas, building practical projects, and continuously improving my development skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
