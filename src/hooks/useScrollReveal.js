import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !ref.current) return

    const {
      y = 60,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
      stagger = 0,
      children = false,
    } = options

    const target = children ? ref.current.children : ref.current

    gsap.fromTo(target,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [])

  return ref
}
