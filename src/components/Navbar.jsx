import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/about',    label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/process',  label: 'Process' },
  { to: '/reach',    label: 'Global Reach' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-wrap flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img
            src="/logo-nav.png"
            alt="Sahyadri Agro India Logo"
            className="h-12 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-2 rounded text-sm font-medium transition-colors duration-200 no-underline ${
                  isActive
                    ? scrolled
                      ? 'text-forest-600 bg-forest-50'
                      : 'text-gold-300 bg-white/15'
                    : scrolled
                      ? 'text-ink-mid hover:text-forest-600 hover:bg-forest-50'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={onOpenQuote}
            className={`ml-2 px-4 py-2 text-sm font-medium rounded transition-colors duration-200 ${
              scrolled
                ? 'bg-forest-600 text-white hover:bg-forest-500'
                : 'bg-gold-500 text-ink hover:bg-gold-400'
            }`}
          >
            Get Quote
          </button>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] rounded transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] rounded transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] rounded transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="section-wrap pb-4 flex flex-col gap-1 bg-cream/95">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded text-sm font-medium no-underline ${
                  isActive ? 'text-forest-600 bg-forest-50' : 'text-ink-mid'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => { setOpen(false); onOpenQuote() }}
            className="mt-2 px-4 py-2 bg-forest-600 text-white text-sm font-medium rounded"
          >
            Get Quote
          </button>
        </nav>
      </div>
    </header>
  )
}
