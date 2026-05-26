import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Process from './pages/Process'
import GlobalReach from './pages/GlobalReach'
import Contact from './pages/Contact'

export default function App() {
  const [scrollPct, setScrollPct] = useState(0)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [presetProduct, setPresetProduct] = useState(null)
  const { pathname } = useLocation()

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setScrollPct((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function openQuote(product = null) {
    setPresetProduct(product)
    setQuoteOpen(true)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] pointer-events-none"
        style={{
          width: `${scrollPct}%`,
          background: 'linear-gradient(90deg,#c8920a,#2d6e47)',
          transition: 'width 0.05s linear',
        }}
      />

      <Navbar onOpenQuote={() => openQuote()} />

      <main>
        <Routes>
          <Route path="/"        element={<Home    onOpenQuote={openQuote} />} />
          <Route path="/about"   element={<About />} />
          <Route path="/products" element={<Products onOpenQuote={openQuote} />} />
          <Route path="/process" element={<Process />} />
          <Route path="/reach"   element={<GlobalReach />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      {quoteOpen && (
        <QuoteModal
          presetProduct={presetProduct}
          onClose={() => setQuoteOpen(false)}
        />
      )}
    </>
  )
}
