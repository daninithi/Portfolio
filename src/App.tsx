import { useEffect, useLayoutEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import NumberRain from './components/NumberRain'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ProjectPage from './projects/ProjectPage'
import { PROJECTS } from './projects/data'
import { useProjectRoute } from './projects/route'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  // "#/projects/<slug>" shows that project's own page; anything else shows the home page
  const slug = useProjectRoute()
  const project = PROJECTS.find((p) => p.slug === slug)

  useEffect(() => {
    AOS.init();
  }, [])

  // Switching between home and a project page
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('project-view', Boolean(project))
    if (project) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (sessionStorage.getItem('returnToProjects')) {
      // Coming back from a project page: land on the Projects section again
      sessionStorage.removeItem('returnToProjects')
      document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    AOS.refreshHard() // pick up the elements that were just shown
  }, [project])

  // On big screens, one mouse-wheel / trackpad scroll moves a whole section
  // (hero -> skills and back), with a smooth slide. Same screen sizes as the
  // scroll-snap rule in App.css.
  useEffect(() => {
    const bigScreen = matchMedia('(min-width: 1101px) and (min-height: 600px)')
    let locked = false

    const onWheel = (e: WheelEvent) => {
      if (!bigScreen.matches || e.ctrlKey) return // ctrlKey = pinch-zoom
      if (document.documentElement.classList.contains('project-view')) return // project pages scroll normally

      const sections = [...document.querySelectorAll<HTMLElement>('main, section')]
      const headerH = document.querySelector('header')?.offsetHeight ?? 0
      // Which section is closest to the top right now?
      const current = sections.reduce((best, s, i) =>
        Math.abs(s.getBoundingClientRect().top - headerH) <
        Math.abs(sections[best].getBoundingClientRect().top - headerH) ? i : best, 0)
      const down = e.deltaY > 0

      // If this section is taller than the screen, scroll through it normally first
      const rect = sections[current].getBoundingClientRect()
      if (!locked && (down ? rect.bottom > innerHeight + 4 : rect.top < headerH - 4)) return

      e.preventDefault()
      if (locked || Math.abs(e.deltaY) < 4) return

      const next = sections[current + (down ? 1 : -1)]
      if (!next) return

      locked = true
      next.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => { locked = false }, 900) // ignore the rest of this swipe
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  if (project) return <ProjectPage project={project} />

  return (
    <>
      <NumberRain />
      <Header />
      <div className="container">
        <main>
          <Hero />
        </main>
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  )
}

export default App
               