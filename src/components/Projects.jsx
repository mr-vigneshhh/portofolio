import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'ATTENDWISE',
    category: 'WEB APPLICATION',
    description: 'AttendWise is an attendance-tracking project designed to help monitor attendance and the 75% attendance requirement.',
    url: 'https://pvtvigg-attendance.vercel.app/',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)',
    accent: '#38BDF8',
  },
  {
    num: '02',
    title: 'ELECTIONFLOW',
    category: 'HACKATHON PROJECT',
    description: 'An election-related digital project developed for a college hackathon.',
    url: 'https://election-flow.vercel.app/',
    achievement: { rank: '#1', score: '96.93 / 100', label: 'RANK #1 AMONG 123 PARTICIPANTS' },
    gradient: 'linear-gradient(135deg, #1a0505 0%, #3d0f0f 50%, #1a0505 100%)',
    accent: '#dc2626',
  },
  {
    num: '03',
    title: 'PVT.VIGG',
    category: 'DIGITAL CREATIVE AGENCY',
    description: 'A digital creative agency project showcasing creative and digital services.',
    url: 'https://pvtvigg.vercel.app/',
    gradient: 'linear-gradient(135deg, #050f05 0%, #0f2d0f 50%, #050f05 100%)',
    accent: '#22c55e',
  },
]

function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        }
      )
    }, cardRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={cardRef} className="project-card opacity-0">
      {/* Project visual */}
      <a href={project.url} target="_blank" rel="noopener noreferrer"
        className="group relative block w-full rounded-xl overflow-hidden mb-6 md:mb-8 cursor-pointer"
        style={{ aspectRatio: '16/10' }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

        <div className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ background: project.gradient, transform: hovered ? 'scale(1.05)' : 'scale(1)' }}>

          {/* Large number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading font-bold leading-none select-none" style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', color: 'rgba(255,255,255,0.03)' }}>
              {project.num}
            </span>
          </div>

          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${project.accent}30 1px, transparent 1px), linear-gradient(90deg, ${project.accent}30 1px, transparent 1px)`,
            backgroundSize: '50px 50px', opacity: 0.06,
          }} />

          {/* Title watermark */}
          <div className="absolute bottom-8 left-8">
            <h3 className="font-heading font-bold tracking-tight" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'rgba(255,255,255,0.08)' }}>
              {project.title}
            </h3>
          </div>

          {/* Accent dot */}
          <div className="absolute top-6 right-6 w-3 h-3 rounded-full" style={{ backgroundColor: project.accent, opacity: 0.7 }} />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', opacity: hovered ? 1 : 0 }}>
            <span className="flex items-center gap-2 font-body text-sm tracking-[0.2em] uppercase" style={{ color: '#ffffff' }}>
              VIEW PROJECT <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </a>

      {/* Project info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="font-body text-xs tracking-[0.3em]" style={{ color: project.accent }}>{project.num}</span>
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: '#A6B1C2' }}>{project.category}</span>
          </div>
          <h3 className="font-heading font-bold tracking-tight mb-2" style={{ color: '#E8EDF5', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {project.title}
          </h3>
          <p className="font-body text-sm leading-relaxed max-w-[400px]" style={{ color: '#A6B1C2' }}>
            {project.description}
          </p>

          {/* Achievement badge */}
          {project.achievement && (
            <div className="mt-5 inline-flex items-center gap-5 px-6 py-4 rounded-lg"
              style={{ border: '1px solid rgba(220,38,38,0.3)', backgroundColor: 'rgba(220,38,38,0.05)' }}>
              <div>
                <span className="font-heading text-2xl font-bold block" style={{ color: '#dc2626' }}>
                  RANK {project.achievement.rank}
                </span>
                <span className="font-body text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: '#A6B1C2' }}>
                  {project.achievement.label}
                </span>
              </div>
              <div className="w-[1px] h-12" style={{ backgroundColor: 'rgba(220,38,38,0.2)' }} />
              <div className="text-center">
                <span className="font-heading text-xl font-bold block" style={{ color: '#E8EDF5' }}>
                  {project.achievement.score}
                </span>
                <span className="font-body text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: '#A6B1C2' }}>
                  AI DASHBOARD
                </span>
              </div>
            </div>
          )}
        </div>

        <a href={project.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase pb-1 self-start md:mt-2 transition-all duration-300"
          style={{ color: '#A6B1C2', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          onMouseEnter={e => { e.target.style.color = '#E8EDF5'; e.target.style.borderBottomColor = 'rgba(59,130,246,0.5)' }}
          onMouseLeave={e => { e.target.style.color = '#A6B1C2'; e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)' }}>
          VIEW PROJECT <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const headingRefs = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      headingRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: i * 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-16" style={{ backgroundColor: '#080B12' }}>
      {/* Watermark */}
      <div className="absolute top-8 right-8 md:right-16 opacity-[0.03]">
        <span className="font-heading text-[15rem] md:text-[25rem] font-bold leading-none" style={{ color: '#E8EDF5' }}>03</span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 md:mb-32">
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[0] = el} className="font-heading font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ color: '#E8EDF5', fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              SELECTED
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 ref={el => headingRefs.current[1] = el} className="font-heading text-outline font-bold leading-[0.85] tracking-[-0.04em] opacity-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              WORK<span style={{ color: '#38BDF8' }}>.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
