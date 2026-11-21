import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const wavePaths = [
  'M-80 150 C 180 10 330 30 470 180 S 760 430 980 260 S 1260 40 1510 170',
  'M-80 170 C 180 30 330 50 470 200 S 760 450 980 280 S 1260 60 1510 190',
  'M-80 190 C 180 50 330 70 470 220 S 760 470 980 300 S 1260 80 1510 210',
  'M-80 210 C 180 70 330 90 470 240 S 760 490 980 320 S 1260 100 1510 230',
  'M-80 230 C 180 90 330 110 470 260 S 760 510 980 340 S 1260 120 1510 250',
  'M-80 250 C 180 110 330 130 470 280 S 760 530 980 360 S 1260 140 1510 270',
  'M-80 270 C 180 130 330 150 470 300 S 760 550 980 380 S 1260 160 1510 290',
  'M-80 290 C 180 150 330 170 470 320 S 760 570 980 400 S 1260 180 1510 310',
  'M-80 310 C 180 170 330 190 470 340 S 760 590 980 420 S 1260 200 1510 330',
  'M-80 330 C 180 190 330 210 470 360 S 760 610 980 440 S 1260 220 1510 350',
  'M-80 350 C 180 210 330 230 470 380 S 760 630 980 460 S 1260 240 1510 370',
  'M-80 370 C 180 230 330 250 470 400 S 760 650 980 480 S 1260 260 1510 390',
  'M-80 390 C 180 250 330 270 470 420 S 760 670 980 500 S 1260 280 1510 410',
]

function WireframeWaves() {
  return (
    <svg className="hero-waves" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#164bff" stopOpacity=".05" />
          <stop offset="48%" stopColor="#245bff" stopOpacity=".72" />
          <stop offset="100%" stopColor="#a020ff" stopOpacity=".85" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#waveStroke)" strokeWidth="1.15">
        {wavePaths.map((d, i) => <path key={i} d={d} transform={`translate(0 ${i * 17 - 75})`} />)}
        {wavePaths.slice(0, 9).map((d, i) => <path key={`lower-${i}`} d={d} transform={`translate(-30 ${i * 18 + 410}) scale(1 .72)`} opacity=".55" />)}
      </g>
    </svg>
  )
}

function PcDesk() {
  return (
    <div className="pc-scene" aria-label="RGB developer workstation illustration">
      <div className="pc-aura" />
      <div className="pc-monitor">
        <div className="monitor-top"><span /><span /><span /><small>VIGNESH / workspace</small></div>
        <div className="monitor-screen">
          <div className="code-sidebar"><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="code-content">
            <b><em>const</em> developer = {'{'}</b>
            <span>  name: <strong>'Vignesh'</strong>,</span>
            <span>  role: <strong>'Creative Developer'</strong>,</span>
            <span>  skills: [<strong>'React'</strong>, <strong>'JavaScript'</strong>],</span>
            <span>  exploring: <strong>'AI + Web'</strong></span>
            <b>{'}'}</b>
            <div className="terminal-lines"><i /><i /><i /><i /></div>
          </div>
        </div>
        <div className="monitor-chin"><span>V</span></div>
        <div className="monitor-neck" />
        <div className="monitor-foot" />
      </div>
      <div className="pc-speaker speaker-left"><i /><i /></div>
      <div className="pc-speaker speaker-right"><i /><i /></div>
      <div className="pc-tower">
        <div className="tower-glass">
          <div className="fan fan-one"><i /></div>
          <div className="fan fan-two"><i /></div>
          <div className="fan fan-three"><i /></div>
          <div className="tower-gpu" />
        </div>
        <div className="tower-front" />
      </div>
      <div className="pc-desk">
        <div className="keyboard"><span /></div>
        <div className="mouse" />
        <div className="desk-edge" />
      </div>
      <div className="pc-reflection" />
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const titleLines = useRef([])
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const visualRef = useRef(null)
  const scrollRef = useRef(null)
  const socialRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 })
      titleLines.current.forEach((line, i) => {
        if (!line) return
        tl.fromTo(line, { y: 90, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power4.out'
        }, 0.12 + i * 0.1)
      })
      tl.fromTo([subtitleRef.current, descRef.current, socialRef.current], {
        y: 22, opacity: 0
      }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out'
      }, 0.55)
      tl.fromTo(visualRef.current, {
        x: 55, opacity: 0, scale: 0.94
      }, {
        x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out'
      }, 0.35)
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.1)

      gsap.to(visualRef.current, {
        y: -9, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero-home">
      <WireframeWaves />
      <div className="hero-vignette" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-heading">
            <div className="hero-title-mask"><h1 ref={el => titleLines.current[0] = el}>VIGNESH</h1></div>
            <div className="hero-title-mask"><h2 ref={el => titleLines.current[1] = el} className="hero-creative">DIGITAL</h2></div>
            <div className="hero-title-mask"><h2 ref={el => titleLines.current[2] = el}>DEVELOPER<span>.</span></h2></div>
          </div>

          <p ref={subtitleRef} className="hero-kicker">
            STUDENT DEVELOPER <i /> CREATIVE TECHNOLOGIST  <i />       ㅤㅤㅤ ㅤㅤㅤㅤ PROJECT BUILDER
          </p>
          <p ref={descRef} className="hero-description">
            Building digital experiences. Exploring AI. Turning ideas into reality.
          </p>

          <div ref={socialRef} className="hero-socials">
            <a href="https://github.com/mr-vigneshhh" target="_blank" rel="noreferrer">
              <span className="social-icon">⌘</span> GitHub
            </a>
            <a href="https://www.linkedin.com/in/vignesh-%E2%80%8E-517878402" target="_blank" rel="noreferrer">
              <span className="social-icon">in</span> LinkedIn
            </a>
          </div>
        </div>

        <div ref={visualRef} className="hero-visual">
          <PcDesk />
          <div className="hero-visual-caption"><span /> DESIGNING & BUILDING DIGITAL EXPERIENCES</div>
        </div>
      </div>

      <div className="hero-side-mark"><span>V</span><small>CREATIVE · DEVELOPER · VIBE CODER</small></div>
      <a className="hero-scroll" href="#portfolio-intro" ref={scrollRef}>
        <span className="scroll-mouse"><i /></span>
        <span>SCROLL DOWN</span>
      </a>
      <div className="hero-bottom-marquee">
        VIGNESH • CREATIVE DEVELOPER • VIBE CODER • AI ENTHUSIAST • PROJECT BUILDER •
      </div>
    </section>
  )
}
