import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import BackToTop from '../components/BackToTop'

export default function Home({ onOpenQuote }) {
  useReveal([])
  const heroBgRef = useRef(null)

  // Parallax
  useEffect(() => {
    const fn = () => {
      if (heroBgRef.current && window.scrollY < window.innerHeight) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Floating particles
  useEffect(() => {
    const container = document.getElementById('hero-particles')
    if (!container) return
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div')
      p.style.cssText = `
        position:absolute;width:3px;height:3px;background:#e8a20c;border-radius:50%;opacity:0;
        left:${Math.random() * 55}%;bottom:${Math.random() * 40}%;
        animation:heroParticle ${6 + Math.random() * 8}s ${Math.random() * 6}s infinite ease-in-out;
      `
      container.appendChild(p)
    }
  }, [])

  // Hero stagger on load
  useEffect(() => {
    document.querySelectorAll('.hero-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), 300 + i * 160)
    })
  }, [])

  return (
    <>
      <style>{`
        @keyframes heroParticle {
          0%   { opacity:0; transform:translateY(0) scale(1); }
          20%  { opacity:.6; }
          80%  { opacity:.3; }
          100% { opacity:0; transform:translateY(-130px) scale(.3); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div
            ref={heroBgRef}
            className="absolute inset-0 bg-cover bg-[center_30%]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=85')", willChange: 'transform' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg,rgba(18,35,26,.88) 0%,rgba(18,35,26,.6) 55%,rgba(18,35,26,.2) 100%)' }} />
          <div id="hero-particles" className="absolute inset-0 overflow-hidden pointer-events-none" />
        </div>

        <div className="section-wrap relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
          {/* Copy */}
          <div>
            <span className="hero-reveal reveal reveal-up inline-block text-xs font-semibold tracking-widest uppercase text-gold-400 border border-gold-400/40 bg-gold-400/15 px-3 py-1 rounded-full mb-5">
              Sahyadri Agro India Pvt. Ltd.
            </span>
            <h1 className="hero-reveal reveal reveal-up font-serif font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)' }}>
              Premium Indian{' '}
              <span className="text-gold-400">Rice, Cashews</span>
              {' '}&amp;{' '}
              <span className="text-gold-400">Almonds</span>{' '}
              Exported Worldwide
            </h1>
            <p className="hero-reveal reveal reveal-up text-white/75 text-lg mb-8 max-w-[50ch]">
              Processed, polished, and quality-checked for global standards — from the fields of India to ports across the Middle East, Europe, and Asia.
            </p>
            <div className="hero-reveal reveal reveal-up flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => onOpenQuote()}
                className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-ink font-semibold rounded hover:bg-gold-400 transition-colors"
              >
                Get Quote
                <Arrow />
              </button>
              <Link to="/contact" className="flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-medium rounded hover:bg-white/10 transition-colors no-underline">
                Contact Us
              </Link>
            </div>
            <div className="hero-reveal reveal reveal-up flex flex-wrap gap-8">
              {[['25+','Export markets'],['200 MT','Monthly capacity'],['100%','APEDA certified']].map(([n,l]) => (
                <div key={l}>
                  <strong className="block font-serif text-[1.9rem] text-white leading-none">{n}</strong>
                  <span className="text-xs text-white/60 uppercase tracking-wider">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <div className="hidden lg:block relative h-[440px]">
            {[
              { cls:'animate-card-float-1', style:{width:'62%',height:'66%',top:0,right:0}, img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', n:'01', t:'Premium Rice' },
              { cls:'animate-card-float-2', style:{width:'52%',height:'54%',bottom:'10%',left:0}, img:'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&q=80', n:'02', t:'Whole Cashews' },
              { cls:'animate-card-float-3', style:{width:'42%',height:'40%',bottom:0,right:'8%'}, img:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80', n:'03', t:'Almonds' },
            ].map(({ cls, style, img, n, t }) => (
              <div key={n} className={`absolute rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl ${cls}`} style={style}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2" style={{ background: 'linear-gradient(0deg,rgba(0,0,0,.75),transparent)' }}>
                  <span className="text-gold-400 text-[.68rem] font-semibold">{n}</span>
                  <strong className="text-white text-sm font-serif">{t}</strong>
                </div>
              </div>
            ))}
            {/* Badge */}
            <div className="absolute top-[10%] -left-[5%] bg-cream/95 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 shadow-xl z-10">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-forest-600 fill-none flex-shrink-0" strokeWidth="2">
                <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <strong className="block text-sm text-ink font-serif">FSSAI · APEDA</strong>
                <span className="text-xs text-ink-muted">Export-grade quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 z-10">
          <div className="w-[22px] h-[34px] border-2 border-white/60 rounded-xl relative">
            <div className="scroll-wheel" />
          </div>
          <span className="text-[.7rem] tracking-widest uppercase text-white">Scroll</span>
        </div>
      </section>

      {/* ── GOLD DIVIDER ── */}
      <div className="gold-divider" />

      {/* ── HIGHLIGHTS STRIP ── */}
      <section className="bg-white py-14">
        <div className="section-wrap grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon:'M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z', title:'FSSAI & APEDA', sub:'Certified exporter' },
            { icon:'M3 6h11v9h-1.5a2.5 2.5 0 11-5 0H6a2.5 2.5 0 11-3-2.5V6zm12 3h3l3 3v3.5a2.5 2.5 0 11-5 0H15V9z', title:'FOB / CIF Worldwide', sub:'Global shipping' },
            { icon:'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16', title:'200 MT / Month', sub:'Processing capacity' },
            { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'ISO 22000 · HACCP', sub:'Quality assured' },
          ].map(({ icon, title, sub }, i) => (
            <div
              key={title}
              data-reveal className={`reveal reveal-up delay-${i+1} flex flex-col items-center text-center p-5 rounded-xl bg-cream border border-cream-dark`}
            >
              <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-forest-600 fill-none" strokeWidth="1.8">
                  <path d={icon} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <strong className="font-serif text-ink text-[.95rem] block mb-1">{title}</strong>
              <span className="text-xs text-ink-muted">{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS PREVIEW ── */}
      <section className="py-20 bg-cream">
        <div className="section-wrap">
          <div className="text-center mb-12">
            <span className="eyebrow" data-reveal data-reveal-class="reveal reveal-up">Our Catalog</span>
            <h2 className="font-serif text-ink mb-3" data-reveal data-reveal-class="reveal reveal-up delay-1">Three product lines.<br/>One uncompromising standard.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {PRODUCTS_DATA.map(({ id, name, tagline, img, moq }, i) => (
              <article
                key={id}
                data-reveal
                className={`reveal reveal-up delay-${i+1} bg-white rounded-2xl overflow-hidden border border-cream-dark card-lift`}
              >
                <div className="h-52 overflow-hidden relative">
                  <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy"/>
                  <div className="absolute top-3 left-3 bg-forest-600/85 text-white text-xs font-semibold tracking-wide px-3 py-1 rounded-full">{tagline}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-ink mb-2">{name}</h3>
                  <p className="text-xs text-ink-muted mb-4">MOQ: {moq}</p>
                  <button onClick={() => onOpenQuote(id)} className="w-full py-2.5 bg-forest-600 text-white text-sm font-medium rounded-lg hover:bg-forest-500 transition-colors flex items-center justify-center gap-2">
                    Enquire Now <Arrow />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10" data-reveal>
            <Link to="/products" className="reveal reveal-up inline-flex items-center gap-2 px-6 py-3 border-2 border-forest-600 text-forest-600 font-medium rounded hover:bg-forest-600 hover:text-white transition-colors no-underline">
              View Full Catalog <Arrow cls="stroke-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-forest-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=60')", backgroundSize: 'cover' }} />
        <div className="section-wrap relative text-center">
          <span className="eyebrow text-gold-400 border border-gold-400/40 bg-gold-400/10" data-reveal>Ready to Source?</span>
          <h2 className="font-serif text-white text-3xl md:text-4xl mb-4" data-reveal>Start your export enquiry today.</h2>
          <p className="text-white/70 mb-8 mx-auto max-w-xl" data-reveal>We respond to every RFQ within 24 hours with a competitive quotation and full export documentation overview.</p>
          <div className="flex flex-wrap gap-4 justify-center" data-reveal>
            <button onClick={() => onOpenQuote()} className="px-8 py-3 bg-gold-500 text-ink font-semibold rounded hover:bg-gold-400 transition-colors flex items-center gap-2">
              Get a Quote <Arrow />
            </button>
            <Link to="/contact" className="px-8 py-3 border border-white/40 text-white font-medium rounded hover:bg-white/10 transition-colors no-underline flex items-center gap-2">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  )
}

const PRODUCTS_DATA = [
  { id:'rice',    name:'Premium Indian Rice',    tagline:'Basmati & Non-Basmati', img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', moq:'1 × 20ft FCL (~25 MT)' },
  { id:'cashews', name:'Whole Cashew Kernels',   tagline:'W180, W240, W320',      img:'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&q=80', moq:'1 MT' },
  { id:'almonds', name:'Premium Almonds',        tagline:'California & Mamra',    img:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80', moq:'500 kg' },
]

function Arrow({ cls = 'stroke-white' }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none ${cls}`} strokeWidth="2.5">
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
