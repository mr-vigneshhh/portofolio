import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { label: 'GITHUB', href: 'https://github.com/mr-vigneshhh' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/vignesh-%E2%80%8E-517878402' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/pvt.vigg/' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRefs = useRef([])
  const textRef = useRef(null)
  const linksRef = useRef([])
  const dividerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
      })

      headingRefs.current.forEach((el, i) => {
        if (!el) return
        tl.fromTo(el, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, i * 0.15)
      })

      tl.fromTo(textRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'left center' }, '-=0.3')

      linksRef.current.forEach((el, i) => {
        if (!el) return
        tl.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, `-=${0.4 - i * 0.05}`)
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-16" style={{ backgroundColor: '#101827' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.08) 0%, transparent 60%)',
      }} />

      <div className="absolute top-8 right-8 md:right-16 opacity-[0.03]">
        <span className="font-heading text-[15rem] md:text-[25rem] font-bold leading-none" style={{ color: '#E8EDF5' }}>06</span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-8 md:mb-12">
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[0] = el} className="font-heading font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ color: '#E8EDF5', fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}>
              HAVE AN
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[1] = el} className="font-heading text-outline font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}>
              IDEA<span style={{ color: '#2b3dff' }}>?</span>
            </h2>
          </div>
        </div>

        <p ref={textRef} className="font-body text-base md:text-lg max-w-[500px] leading-relaxed mb-12 md:mb-16 opacity-0" style={{ color: '#A6B1C2' }}>
          Let's connect, exchange ideas, and build something meaningful.
        </p>

        <div ref={dividerRef} className="w-full h-[1px] mb-12 origin-left" style={{ backgroundColor: 'rgba(255,255,255,0.1)', transform: 'scaleX(0)' }} />

        <div className="flex flex-col gap-2">
          {socialLinks.map((link, i) => (
            <a key={link.label} ref={el => linksRef.current[i] = el} href={link.href} target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 md:py-7 opacity-0 transition-all duration-300 px-3 rounded-lg"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.03)'; e.currentTarget.style.borderBottomColor = 'rgba(59,130,246,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.08)' }}>
              <span className="font-heading font-bold tracking-[0.05em] transition-colors duration-300"
                style={{ color: '#E8EDF5', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                onMouseEnter={e => e.target.style.color = '#38BDF8'}
                onMouseLeave={e => e.target.style.color = '#E8EDF5'}>
                {link.label}
              </span>
              <ArrowUpRight size={24} className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: '#A6B1C2' }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
