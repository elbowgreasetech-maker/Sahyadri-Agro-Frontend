import { Link } from 'react-router-dom'

const EXPLORE = [
  { to: '/about',    label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/process',  label: 'Process' },
  { to: '/reach',    label: 'Global Reach' },
  { to: '/contact',  label: 'Contact' },
]
const CATALOG = [
  { to: '/products', label: 'Premium Rice' },
  { to: '/products', label: 'Whole Cashews' },
  { to: '/products', label: 'Almonds' },
  { to: '/products', label: 'Black Pepper' },
  { to: '/contact',  label: 'Private Labelling' },
  { to: '/contact',  label: 'Bulk Orders' },
]

export default function Footer() {
  return (
    <footer className="bg-ink pt-14 pb-0">
      <div className="section-wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-nav.png" alt="Sahyadri Agro India" className="h-14 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-[260px]">
              Premium Indian rice, cashews & almonds — exported worldwide with full APEDA & FSSAI compliance.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'LinkedIn', d: 'M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2c.7-1.2 2-2 4-2 3 0 4 2 4 5v7h-4v-6c0-1.5-.5-2.5-2-2.5s-2 1-2 2.5v6h-4V8z' },
                { label: 'Instagram', d: 'M7 2h10c2.8 0 5 2.2 5 5v10c0 2.8-2.2 5-5 5H7c-2.8 0-5-2.2-5-5V7c0-2.8 2.2-5 5-5zm5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6-3a1 1 0 110 2 1 1 0 010-2z' },
              ].map(({ label, d }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-forest-500 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/60"><path d={d}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Explore</h4>
            {EXPLORE.map(({ to, label }) => (
              <Link key={label} to={to} className="block text-white/50 text-sm mb-2 hover:text-gold-400 no-underline transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Catalog</h4>
            {CATALOG.map(({ to, label }) => (
              <Link key={label} to={to} className="block text-white/50 text-sm mb-2 hover:text-gold-400 no-underline transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Get in Touch</h4>
            <a href="tel:+919096040702" className="block text-white/50 text-sm mb-2 hover:text-gold-400 no-underline transition-colors">+91 90960 40702</a>
            <a href="mailto:vilas.salvi@sahyadri.net" className="block text-white/50 text-sm mb-2 hover:text-gold-400 no-underline transition-colors">vilas.salvi@sahyadri.net</a>
            <Link to="/contact" className="block text-white/50 text-sm mb-2 hover:text-gold-400 no-underline transition-colors">Request a quote</Link>
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              A-9, Sai Tukaram Tower, Behind Gurunanak School<br />
              Rambaug Lane-4, Kalyan West – 421301<br />
              Maharashtra, India
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Sahyadri Agro India Pvt. Ltd. All rights reserved.</p>
          <p className="text-white/30 text-xs">🌾 From Indian fields to global tables.</p>
        </div>
      </div>
    </footer>
  )
}
