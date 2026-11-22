import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 md:py-16 px-6 md:px-12 lg:px-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#080B12' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="font-heading text-lg md:text-xl font-bold tracking-[0.15em] mb-2" style={{ color: '#E8EDF5' }}>
              VIGNESH<span className="text-xs align-super ml-1" style={{ color: '#38BDF8' }}>®</span>
            </h3>
            <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: '#A6B1C2' }}>
              AI Explorer | AI Enthusiast & Project Builder
            </p>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: 'GITHUB', href: 'https://github.com/mr-vigneshhh' },
              { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/vignesh-%E2%80%8E-517878402' },
              { label: 'INSTAGRAM', href: 'https://www.instagram.com/pvt.vigg/' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="font-body text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300"
                style={{ color: '#A6B1C2' }}
                onMouseEnter={e => e.target.style.color = '#E8EDF5'}
                onMouseLeave={e => e.target.style.color = '#A6B1C2'}>
                {link.label}
              </a>
            ))}
          </div>

          <button onClick={scrollToTop}
            className="group flex items-center gap-2 font-body text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: '#A6B1C2' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E8EDF5'}
            onMouseLeave={e => e.currentTarget.style.color = '#A6B1C2'}
            aria-label="Back to top">
            BACK TO TOP
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2026 VIGNESH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
