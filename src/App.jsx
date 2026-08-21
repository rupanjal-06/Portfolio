import CustomCursor from './components/CustomCursor.jsx'
import Snowfall from './components/Snowfall.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import PolarBear from './components/PolarBear.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Snowfall />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
        <PolarBear />
      </main>
      <Footer />
    </div>
  )
}
