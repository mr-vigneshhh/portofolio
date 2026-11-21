import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const subjects = [
  { num: '01', title: 'PYTHON', description: 'Exploring programming fundamentals, logical thinking, and problem-solving.' },
  { num: '02', title: 'COMPUTER NETWORKS', description: 'Understanding networking concepts, protocols, network architecture, and communication.' },
  { num: '03', title: 'OPERATING SYSTEMS', description: 'Exploring operating system fundamentals, system management, and how computers work.' },
]

export default function Learning() {
  const sectionRef = useRef(null)
  const headingRefs = useRef([])
  const cardRefs = useRef([])

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

      cardRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el, { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-16" style={{ backgroundColor: '#080B12' }}>
      <div className="absolute top-8 right-8 md:right-16 opacity-[0.03]">
        <span className="font-heading text-[15rem] md:text-[25rem] font-bold leading-none" style={{ color: '#E8EDF5' }}>05</span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-24">
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[0] = el} className="font-heading font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ color: '#E8EDF5', fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              ALWAYS
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[1] = el} className="font-heading text-outline font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              LEARNING<span style={{ color: '#38BDF8' }}>.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
          {subjects.map((subject, i) => (
            <div key={subject.num} ref={el => cardRefs.current[i] = el}
              className="group relative p-8 md:p-10 rounded-xl opacity-0 transition-all duration-500"
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(17,17,17,0.5)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'
                e.currentTarget.style.backgroundColor = 'rgba(17,17,17,0.9)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.backgroundColor = 'rgba(17,17,17,0.5)'
              }}>

              <span className="font-heading font-bold leading-none block mb-5 transition-colors duration-500"
                style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', color: 'rgba(255,255,255,0.03)' }}>
                {subject.num}
              </span>

              <h3 className="font-heading font-bold tracking-[0.05em] mb-4 transition-colors duration-300"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#E8EDF5' }}
                onMouseEnter={e => e.target.style.color = '#38BDF8'}
                onMouseLeave={e => e.target.style.color = '#E8EDF5'}>
                {subject.title}
              </h3>

              <div className="w-8 h-[1px] mb-4 transition-all duration-500 group-hover:w-12" style={{ backgroundColor: 'rgba(59,130,246,0.3)' }} />

              <p className="font-body text-sm leading-relaxed" style={{ color: '#A6B1C2' }}>
                {subject.description}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body text-xs tracking-[0.2em] uppercase mt-12 text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Currently studying — not professional qualifications
        </p>
      </div>
    </section>
  )
}
