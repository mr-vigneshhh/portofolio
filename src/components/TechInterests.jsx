import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const technologies = [
  'HTML', 'CSS', 'JAVASCRIPT', 'PYTHON', 'SQL', 'GITHUB', 'AI-ASSISTED DEVELOPMENT',
]

export default function TechInterests() {
  const sectionRef = useRef(null)
  const headingRefs = useRef([])
  const itemRefs = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      headingRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el, { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: i * 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
      })

      itemRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el, { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-16" style={{ backgroundColor: '#101827' }}>
      <div className="absolute top-8 right-8 md:right-16 opacity-[0.03]">
        <span className="font-heading text-[15rem] md:text-[25rem] font-bold leading-none" style={{ color: '#E8EDF5' }}>04</span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-24">
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[0] = el} className="font-heading font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ color: '#E8EDF5', fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              TECHNOLOGY
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[1] = el} className="font-heading text-outline font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              & EXPERIMENTS<span style={{ color: '#38BDF8' }}>.</span>
            </h2>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {technologies.map((tech, i) => (
            <div key={tech} ref={el => itemRefs.current[i] = el}
              className="group flex items-center justify-between py-5 md:py-7 px-3 cursor-default opacity-0 transition-all duration-300"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.03)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div className="flex items-center gap-6 md:gap-8">
                <span className="font-body text-xs tracking-[0.3em] tabular-nums w-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-heading font-semibold tracking-[0.05em] transition-colors duration-300"
                  style={{ color: '#E8EDF5', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                  onMouseEnter={e => e.target.style.color = '#38BDF8'}
                  onMouseLeave={e => e.target.style.color = '#E8EDF5'}>
                  {tech}
                </span>
              </div>
              <div className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#38BDF8' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
