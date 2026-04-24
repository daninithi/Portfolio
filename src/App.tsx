import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gradientImg from './assets/gradient.png'

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      <img className="img-gradient" src={gradientImg} alt="gradient" />
      <div className="layer-blur"></div>
      <div className="container">
        <main>
          <Header />
          <Hero />
        </main>
      </div>
    </>
  )
}

export default App
               