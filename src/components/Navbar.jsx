import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const linksRef = useRef([])

  const links = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'GITHUB', href: 'https://github.com/mr-vigneshhh', external: true },
  ]

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 3.2 }
    )
  }, [])

  useEffect(() => {
    if (!menuRef.current) return
    if (isOpen) {
      gsap.to(menuRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power4.inOut' })
      gsap.fromTo(linksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      )
    } else {
      gsap.to(menuRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power4.inOut' })
    }
  }, [isOpen])

  const handleClick = (e, href) => {
    if (href.startsWith('http')) { setIsOpen(false); return }
    if (!href.startsWith('http')) {
      e.preventDefault()
      setIsOpen(false)
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 opacity-0" style={{ mixBlendMode: 'difference' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-heading text-sm md:text-base font-bold tracking-[0.2em]" style={{ color: '#ffffff' }}>
          VIGNESH<span className="text-xs align-super" style={{ color: '#ffffff' }}>®</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a key={link.label} href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleClick(e, link.href)}
              className="font-body text-[0.7rem] tracking-[0.25em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-toggle md:hidden flex flex-col gap-[6px] z-[60]" aria-label="Toggle menu" aria-expanded={isOpen} aria-controls="mobile-navigation">
          <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#ffffff', transform: isOpen ? 'rotate(45deg) translateY(7.5px)' : 'none' }} />
          <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#ffffff', opacity: isOpen ? 0 : 1 }} />
          <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#ffffff', transform: isOpen ? 'rotate(-45deg) translateY(-7.5px)' : 'none' }} />
        </button>
      </nav>

      <div id="mobile-navigation" ref={menuRef} className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8 md:hidden"
        style={{ backgroundColor: '#080B12', clipPath: 'inset(0% 0% 100% 0%)' }}>
        {links.map((link, i) => (
          <a key={link.label} ref={(el) => (linksRef.current[i] = el)} href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            onClick={(e) => handleClick(e, link.href)}
            className="font-heading text-3xl font-bold tracking-[0.15em] transition-colors duration-300"
            style={{ color: '#E8EDF5' }}
            onMouseEnter={e => e.target.style.color = '#38BDF8'}
            onMouseLeave={e => e.target.style.color = '#E8EDF5'}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
