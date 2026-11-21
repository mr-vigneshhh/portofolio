import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const headingRefs = useRef([])
  const textRefs = useRef([])
  const dividerRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })

      headingRefs.current.forEach((el, i) => {
        if (!el) return
        tl.fromTo(el, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, i * 0.12)
      })

      tl.fromTo(imageRef.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, 0.1)

      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'left center' }, '-=0.5')

      textRefs.current.forEach((el, i) => {
        if (!el) return
        tl.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, `-=${0.4 - i * 0.1}`)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-16 overflow-hidden" style={{ backgroundColor: '#101827' }}>
      {/* Large watermark */}
      <div className="absolute top-8 right-8 md:right-16 opacity-[0.03]">
        <span className="font-heading text-[15rem] md:text-[25rem] font-bold leading-none" style={{ color: '#E8EDF5' }}>02</span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Heading */}
          <div className="lg:col-span-7">
            <div className="mb-16 md:mb-24">
              <div className="overflow-hidden">
                <h2 ref={el => headingRefs.current[0] = el} className="font-heading font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
                  style={{ color: '#E8EDF5', fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                  BEHIND
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 ref={el => headingRefs.current[1] = el} className="font-heading text-outline font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                  THE CODE<span style={{ color: '#38BDF8' }}>.</span>
                </h2>
              </div>
            </div>

            <div ref={dividerRef} className="w-full h-[1px] mb-12 origin-left" style={{ backgroundColor: 'rgba(255,255,255,0.1)', transform: 'scaleX(0)' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <p ref={el => textRefs.current[0] = el} className="font-body text-base md:text-lg leading-relaxed opacity-0" style={{ color: '#A6B1C2' }}>
                I'm interested in how technology transforms simple ideas into useful digital experiences. From developing web applications to experimenting with AI-assisted development, I enjoy learning by building.
              </p>
              <p ref={el => textRefs.current[1] = el} className="font-body text-base md:text-lg leading-relaxed opacity-0" style={{ color: '#A6B1C2' }}>
                I believe the best way to improve is to keep creating, experimenting, and solving real problems.
              </p>
            </div>
          </div>

          {/* Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div ref={imageRef} className="relative w-[280px] md:w-[320px] lg:w-[380px] rounded-lg overflow-hidden" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
              <img src="/vignesh.jpg" alt="Vignesh" className="w-full aspect-[3/4] object-cover object-top image-cinematic" loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent 50%)' }} />
              <div className="absolute bottom-6 left-6">
                <span className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: '#38BDF8' }}>EST. 2026</span>
              </div>
              {/* Border */}
              <div className="absolute inset-0 rounded-lg" style={{ border: '1px solid rgba(59,130,246,0.15)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
