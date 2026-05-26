import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import BackToTop from '../components/BackToTop'

const MARKETS = [
  { region:'Middle East',   countries:'UAE · Saudi Arabia · Qatar · Kuwait · Oman · Bahrain', color:'text-gold-600' },
  { region:'Europe',        countries:'Germany · United Kingdom · Netherlands · France · Italy · Spain', color:'text-forest-600' },
  { region:'Asia',          countries:'Singapore · Malaysia · Japan · South Korea · Hong Kong', color:'text-gold-600' },
  { region:'Africa',        countries:'South Africa · Kenya · Nigeria · Egypt', color:'text-forest-600' },
  { region:'North America', countries:'United States · Canada', color:'text-gold-600' },
]

const ROUTES = [
  { d:'M700,255 Q665,220 632,233' },
  { d:'M700,255 Q658,218 615,235' },
  { d:'M700,255 Q663,222 627,232' },
  { d:'M700,255 Q600,160 521,153' },
  { d:'M700,255 Q595,155 495,150' },
  { d:'M700,255 Q728,280 757,305' },
  { d:'M700,255 Q785,218 870,200' },
  { d:'M700,255 Q490,120 285,195' },
  { d:'M700,255 Q622,337 600,320' },
]

export default function GlobalReach() {
  useReveal([])

  useEffect(() => {
    const map = document.getElementById('world-map')
    if (!map) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          document.querySelectorAll('.route-path').forEach((p, i) => {
            const len = p.getTotalLength ? p.getTotalLength() : 600
            p.style.strokeDasharray = len
            p.style.strokeDashoffset = len
            setTimeout(() => { p.style.strokeDashoffset = '0' }, i * 110)
          })
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(map)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="relative pt-32 pb-16 bg-forest-600">
        <div className="section-wrap relative">
          <span className="eyebrow text-gold-400 border border-gold-400/40 bg-gold-400/10">Global Reach</span>
          <h1 className="font-serif text-white" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>Serving clients across the<br/><em className="text-gold-400">Middle East, Europe & Asia</em></h1>
        </div>
      </div>
      <div className="gold-divider" />

      <section className="py-20 bg-cream">
        <div className="section-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Map */}
            <div className="lg:col-span-2" data-reveal>
              <div className="reveal reveal-left rounded-2xl overflow-hidden border border-cream-dark bg-white shadow-md">
                <svg viewBox="0 0 1000 500" id="world-map" className="w-full" aria-label="Export destinations map">
                  <defs>
                    <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.9" fill="#a5d6a7" opacity="0.45"/>
                    </pattern>
                  </defs>
                  <rect width="1000" height="500" fill="#f0f9f3"/>
                  {/* Continents */}
                  {[
                    'M510 230 Q540 220 560 240 Q590 260 600 320 Q580 380 540 400 Q510 380 500 320 Q495 270 510 230 Z',
                    'M470 130 Q510 120 545 140 Q565 165 540 185 Q500 195 470 180 Q455 155 470 130 Z',
                    'M580 130 Q680 110 800 140 Q880 180 870 240 Q820 280 760 290 Q680 270 600 230 Q570 180 580 130 Z',
                    'M680 220 Q710 230 720 280 Q700 305 685 290 Q670 260 680 220 Z',
                    'M150 130 Q230 110 320 140 Q360 180 320 220 Q240 240 180 220 Q140 180 150 130 Z',
                    'M280 280 Q330 290 340 350 Q320 410 290 410 Q265 370 270 320 Q275 295 280 280 Z',
                    'M820 350 Q870 345 890 370 Q880 395 840 395 Q815 380 820 350 Z',
                  ].map((d, i) => (
                    <path key={i} d={d} fill="url(#dots)" stroke="#c8e6c9" strokeWidth="1"/>
                  ))}
                  {/* Routes */}
                  {ROUTES.map(({ d }, i) => (
                    <path
                      key={i}
                      className="route-path"
                      d={d}
                      fill="none"
                      stroke={i < 3 || i === 6 ? '#c8920a' : '#1a4a2e'}
                      strokeWidth="1.3"
                      strokeDasharray="4 4"
                      opacity="0.75"
                      style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)` }}
                    />
                  ))}
                  {/* Origin */}
                  <circle cx="700" cy="255" r="20" fill="rgba(200,146,10,0.12)"/>
                  <circle cx="700" cy="255" r="8" fill="#1a4a2e" stroke="#c8920a" strokeWidth="2.5"/>
                  <text x="700" y="278" textAnchor="middle" fontSize="9" fontFamily="Outfit,sans-serif" fontWeight="700" fill="#12231a">Pune, India</text>
                  {/* Hubs */}
                  {[
                    [632,233],[615,235],[627,232],[521,153],[495,150],[757,305],[870,200],[285,195],[600,320]
                  ].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="5" fill={i<3||i===6?'#c8920a':'#1a4a2e'} stroke="white" strokeWidth="1.5"/>
                  ))}
                </svg>
              </div>
            </div>

            {/* Region list */}
            <div className="flex flex-col gap-4">
              {MARKETS.map(({ region, countries, color }, i) => (
                <div
                  key={region}
                  data-reveal
                  className={`reveal reveal-right delay-${i+1} p-4 bg-white rounded-xl border border-cream-dark border-l-4 ${color.replace('text-','border-')}`}
                >
                  <h3 className={`font-serif text-base mb-1 ${color}`}>{region}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{countries}</p>
                </div>
              ))}
              <div data-reveal className="reveal reveal-up mt-2 p-4 bg-forest-50 rounded-xl border border-forest-100 text-center">
                <span className="font-serif text-forest-600 text-2xl font-bold block">25+</span>
                <span className="text-forest-600 text-sm">Countries served worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping info */}
      <section className="py-16 bg-white">
        <div className="section-wrap">
          <div className="text-center mb-12">
            <span className="eyebrow" data-reveal>Logistics</span>
            <h2 className="font-serif text-ink" data-reveal>Shipped from major Indian ports</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { port:'Mumbai (JNPT / Nhava Sheva)', note:'Largest container port in India. Direct weekly sailings to Gulf, Europe & SE Asia.' },
              { port:'Mundra Port, Gujarat',        note:'Fastest customs clearance. Preferred for bulk FCL rice and cashew shipments.' },
              { port:'Chennai / Kochi Ports',       note:'Ideal for South India cashew and almond origins. Regular feeder vessels.' },
            ].map(({ port, note }, i) => (
              <div key={port} data-reveal className={`reveal reveal-scale delay-${i+1} p-5 bg-cream rounded-xl border border-cream-dark`}>
                <div className="w-8 h-8 rounded bg-forest-600 flex items-center justify-center mb-3">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M3 17l3-9h12l3 9-9 5-9-5zm9-13l5 4H7l5-4z"/></svg>
                </div>
                <strong className="block text-ink text-sm mb-1">{port}</strong>
                <p className="text-ink-muted text-sm">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  )
}
