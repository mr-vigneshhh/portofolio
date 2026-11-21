import { useState, useCallback } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PortfolioIntro from './components/PortfolioIntro'
import About from './components/About'
import Projects from './components/Projects'
import TechInterests from './components/TechInterests'
import Learning from './components/Learning'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
    document.body.style.overflow = 'auto'
  }, [])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}
      <div style={{ overflow: isLoading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Hero />
          <PortfolioIntro />
          <About />
          <Projects />
          <TechInterests />
          <Learning />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
