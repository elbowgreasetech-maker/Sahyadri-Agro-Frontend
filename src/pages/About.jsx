import { useReveal, useCounters } from '../hooks/useReveal'
import BackToTop from '../components/BackToTop'

const CERTS = ['FSSAI Licensed','APEDA Registered','ISO 22000:2018','HACCP Compliant','IEC Certified']

export default function About() {
  useReveal([])
  useCounters()

  return (
    <>
      {/* Hero banner */}
      <div className="relative pt-32 pb-16 bg-forest-600 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1400&q=70')", backgroundSize:'cover', backgroundPosition:'center 40%' }} />
        <div className="section-wrap relative">
          <span className="eyebrow text-gold-400 border border-gold-400/40 bg-gold-400/10">About the Company</span>
          <h1 className="font-serif text-white" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>Rooted in India's farmlands.<br/><em className="text-gold-400">Trusted</em> across the world.</h1>
        </div>
      </div>
      <div className="gold-divider" />

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="section-wrap grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="eyebrow" data-reveal>Our Story</span>
            <h2 className="font-serif text-ink mb-5" data-reveal>Built on the belief that India's fields deserve the world's tables.</h2>
            <p className="text-ink-muted mb-4" data-reveal>
              Sahyadri Agro India Pvt. Ltd. is an export-first agro company founded on a single conviction: that India's farmers grow some of the finest grains and nuts on earth — and that the world deserves to taste them at their best.
            </p>
            <p className="text-ink-muted mb-6" data-reveal>
              We work directly with growers across Maharashtra, Punjab, Gujarat, and Kerala, then process every kilogram on calibrated polishing, sorting, and packaging lines built to international standards. The result is product you can put on a shelf in Dubai, Hamburg, or Singapore with full confidence.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              {[
                { title:'Export Quality',         sub:'Sortex-cleaned, lab-tested on every batch' },
                { title:'Global Shipping',        sub:'FOB / CIF worldwide from major Indian ports' },
                { title:'Certified Processing',   sub:'ISO 22000 · HACCP compliant processing lines' },
              ].map(({ title, sub }, i) => (
                <div key={title} data-reveal className={`reveal reveal-up delay-${i+1} flex items-start gap-3 p-4 bg-forest-50 rounded-lg border-l-4 border-forest-600`}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-forest-600 fill-none mt-0.5 flex-shrink-0" strokeWidth="2">
                    <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong className="block text-sm text-ink mb-0.5">{title}</strong>
                    <span className="text-sm text-ink-muted">{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats panel */}
          <div className="flex flex-col gap-5">
            {[
              { target:7,   suffix:'+',  label:'Years of export experience', sub:'Since 2018, shipping to 25+ countries.' },
              { target:200, suffix:' MT', label:'Monthly processing capacity', sub:'Across rice, cashew, and almond lines.' },
              { target:24,  suffix:'hr',  label:'RFQ response time', sub:'From enquiry to detailed quote.' },
              { target:25,  suffix:'+',  label:'Countries served', sub:'Middle East, Europe, Asia, Africa & Americas.' },
            ].map(({ target, suffix, label, sub }, i) => (
              <div key={label} data-reveal className={`reveal reveal-right delay-${i+1} bg-cream rounded-xl p-5 border border-cream-dark relative overflow-hidden`}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-400 to-forest-600 rounded-l-xl" />
                <div
                  data-counter data-target={target} data-suffix={suffix}
                  className="font-serif text-forest-600 leading-none mb-2"
                  style={{ fontSize:'2.5rem', fontWeight:700 }}
                >
                  0{suffix}
                </div>
                <strong className="block text-ink text-sm mb-1">{label}</strong>
                <p className="text-ink-muted text-sm max-w-none">{sub}</p>
              </div>
            ))}

            {/* Certs */}
            <div data-reveal className="reveal reveal-up mt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted block mb-3">Certified by</span>
              <div className="flex flex-wrap gap-2">
                {CERTS.map((c) => (
                  <span key={c} className="px-3 py-1.5 bg-forest-50 text-forest-600 text-xs font-semibold rounded-full border border-forest-100">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team image strip */}
      <section className="py-16 bg-cream">
        <div className="section-wrap text-center">
          <span className="eyebrow" data-reveal>Our Reach</span>
          <h2 className="font-serif text-ink mb-12" data-reveal>From farm to freight — every step in our hands.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
              'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&q=80',
              'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&q=80',
              'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80',
            ].map((src, i) => (
              <div key={i} data-reveal className={`reveal reveal-scale delay-${i+1} rounded-xl overflow-hidden aspect-square`}>
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  )
}
