import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import BackToTop from '../components/BackToTop'

const STEPS = [
  { n:1, icon:'M12 22V12M12 12c0-3 2-5 5-5h2c0 3-2 5-5 5h-2zm0 0c0-3-2-5-5-5H5c0 3 2 5 5 5h2z', title:'Sourcing from Farms', desc:'Direct procurement from trusted farmer networks across Maharashtra, Punjab, Gujarat, and Kerala — with traceability records for every batch.', detail:'We partner with over 200 verified farmer groups, paying fair farm-gate prices to ensure consistent quality and reliable supply.' },
  { n:2, icon:'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z', title:'Cleaning & Polishing', desc:'Multi-stage destoning, sortex color sorting, and polishing on calibrated industrial lines.', detail:'Our sortex machines use optical and infrared sensing to remove discoloured grains, foreign matter, and damaged kernels with 99.9% accuracy.' },
  { n:3, icon:'M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4zm-1 14l-3-3 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6z', title:'Quality Check', desc:'Lab testing for moisture, broken percentage, foreign matter, and microbial load on every batch.', detail:'In-house NABL-aligned lab processes 12+ quality parameters per batch. COA and test reports provided with every shipment.' },
  { n:4, icon:'M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.5 8 12 11.7 5.5 8 12 4.3zM5 9.7l6 3.4v7.5l-6-3.4V9.7zm14 0v7.5l-6 3.4v-7.5l6-3.4z', title:'Packaging', desc:'Food-grade jute, PP, and vacuum packaging — including custom private-label options.', detail:'Available in 5 kg to 50 kg bags, 10/22.68 kg vacuum tins, and custom retail pouches. All packaging meets EU, Gulf, and US import standards.' },
  { n:5, icon:'M3 17l3-9h12l3 9-9 5-9-5zm9-13l5 4H7l5-4zm-9 16l9 3 9-3-2-1-7 2-7-2-2 1z', title:'Export Worldwide', desc:'CIF / FOB shipping with full export documentation through Mumbai, Mundra, and Nhava Sheva ports.', detail:'Phytosanitary certificate, Bill of Lading, Certificate of Origin, APEDA RCMC, and all destination-specific documents handled in-house.' },
]

export default function Process() {
  useReveal([])

  // Animate the vertical timeline line
  useEffect(() => {
    const line = document.getElementById('timeline-line')
    if (!line) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { line.classList.add('drawn'); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(line)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="relative pt-32 pb-16 bg-forest-600 overflow-hidden">
        <div className="section-wrap relative">
          <span className="eyebrow text-gold-400 border border-gold-400/40 bg-gold-400/10">Farm to Port</span>
          <h1 className="font-serif text-white" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>A traceable<br/>five-step process</h1>
        </div>
      </div>
      <div className="gold-divider" />

      <section className="py-20 bg-forest-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage:'radial-gradient(circle at 15% 80%,rgba(200,146,10,.4) 0%,transparent 50%),radial-gradient(circle at 85% 20%,rgba(200,146,10,.3) 0%,transparent 45%)' }} />
        <div className="section-wrap max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div
              id="timeline-line"
              className="process-line absolute left-10 top-8 bottom-8 w-0.5 bg-white/20"
            />
            <ol className="flex flex-col gap-0">
              {STEPS.map(({ n, icon, title, desc, detail }, i) => (
                <li
                  key={n}
                  data-reveal
                  className={`reveal reveal-left delay-${i+1} flex gap-6 py-8`}
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-20 h-20 rounded-full bg-white/8 border-2 border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-gold-500/20">
                      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white/50" style={{ fill:'rgba(200,146,10,0.9)' }}>
                        <path d={icon}/>
                      </svg>
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center text-ink text-[.6rem] font-bold">
                      {String(n).padStart(2,'0')}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-4">
                    <h3 className="font-serif text-white text-xl mb-2">{title}</h3>
                    <p className="text-white/70 mb-3">{desc}</p>
                    <p className="text-white/50 text-sm">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Quality strip */}
      <section className="py-16 bg-white">
        <div className="section-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t:'In-House Lab', d:'NABL-aligned testing for 12+ quality parameters per batch. Full COA with every shipment.' },
              { t:'Sortex Technology', d:'Optical and infrared sorting removes 99.9% of foreign matter and discoloured kernels.' },
              { t:'Full Documentation', d:'Phytosanitary, COO, Bill of Lading, APEDA RCMC — all handled in-house, zero outsourcing.' },
            ].map(({ t, d }, i) => (
              <div key={t} data-reveal className={`reveal reveal-up delay-${i+1} p-6 bg-cream rounded-xl border border-cream-dark`}>
                <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-forest-600" />
                </div>
                <h3 className="font-serif text-ink text-lg mb-2">{t}</h3>
                <p className="text-ink-muted text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  )
}
