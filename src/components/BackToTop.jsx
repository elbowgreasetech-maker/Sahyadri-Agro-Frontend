import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-forest-600 flex items-center justify-center z-50 shadow-lg hover:bg-forest-500 transition-all duration-300 border-none cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none" strokeWidth="2.5">
        <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
