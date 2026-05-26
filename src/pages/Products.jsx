import { useReveal } from '../hooks/useReveal'
import BackToTop from '../components/BackToTop'

const PRODUCTS = [
  {
    id: 'rice',
    name: 'Premium Indian Rice',
    tagline: 'Basmati & Non-Basmati varieties',
    short: 'Long-grain aromatic Basmati and a wide range of non-Basmati varieties, sortex-cleaned and polished to international export standards.',
    long: 'Sourced from the fertile plains of northern and western India, our rice is steam-processed, sortex-cleaned, and graded for uniformity. Available in 1121, Pusa, Sharbati, Sona Masoori, IR-64, and parboiled grades. Packed in 5 kg, 10 kg, 25 kg, and 50 kg bags as well as private-label jute packaging.',
    varieties: ['1121 Basmati','Pusa Basmati','Sharbati','Sona Masoori','IR-64 Parboiled'],
    packaging: ['5 kg','10 kg','25 kg','50 kg','Private label'],
    moq: '1 × 20ft FCL (~25 MT)',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80',
  },
  {
    id: 'cashews',
    name: 'Whole Cashew Kernels',
    tagline: 'W180, W240, W320 grades',
    short: 'Plump, ivory-white cashew kernels processed in food-grade facilities and vacuum-packed for export freshness.',
    long: 'Our cashews are sourced primarily from the Konkan and southern coastal belts, processed under hygienic conditions, and graded as per AFI specifications. Available in whole grades (W180, W240, W320, W450) and broken grades. Vacuum packed in 10 kg / 22.68 kg tins inside cartons for long shelf life.',
    varieties: ['W180','W240','W320','W450','Splits & Pieces'],
    packaging: ['10 kg vacuum tin','22.68 kg vacuum tin','Custom retail packs'],
    moq: '1 MT',
    img: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=900&q=80',
  },
  {
    id: 'almonds',
    name: 'Premium Almonds',
    tagline: 'California & Mamra varieties',
    short: 'Crunchy, naturally sweet almonds — available raw, blanched, or roasted — graded by size and packed for export.',
    long: 'We supply premium California almonds (Nonpareil, Carmel, Independence) and Indian Mamra almonds. Cleaned, sorted, and metal-detected before packaging. Available raw in shell, shelled whole, blanched, sliced, or roasted on request.',
    varieties: ['California Nonpareil','Carmel','Independence','Mamra'],
    packaging: ['10 kg cartons','22.68 kg cartons','Retail-ready pouches'],
    moq: '500 kg',
    img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=900&q=80',
  },
]

export default function Products({ onOpenQuote }) {
  useReveal([])

  return (
    <>
      <div className="relative pt-32 pb-16 bg-forest-600 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1400&q=60')", backgroundSize:'cover' }} />
        <div className="section-wrap relative">
          <span className="eyebrow text-gold-400 border border-gold-400/40 bg-gold-400/10">Our Catalog</span>
          <h1 className="font-serif text-white" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>Three product lines.<br/>One uncompromising standard.</h1>
        </div>
      </div>
      <div className="gold-divider" />

      <section className="py-20 bg-cream">
        <div className="section-wrap flex flex-col gap-20">
          {PRODUCTS.map(({ id, name, tagline, short, long, varieties, packaging, moq, img }, i) => (
            <article
              key={id}
              id={id}
              data-reveal
              className={`reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}
            >
              {/* Image */}
              <div className={`rounded-2xl overflow-hidden shadow-xl ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <img src={img} alt={name} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"/>
              </div>

              {/* Text */}
              <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold-500 bg-gold-50 px-3 py-1 rounded-full mb-3">{tagline}</span>
                <h2 className="font-serif text-ink text-3xl mb-3">{name}</h2>
                <p className="text-ink-muted mb-3">{short}</p>
                <p className="text-ink-muted text-sm mb-6">{long}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted block mb-2">Varieties</span>
                    <div className="flex flex-wrap gap-1.5">
                      {varieties.map((v) => <span key={v} className="text-xs px-2 py-1 bg-forest-50 text-forest-600 rounded font-medium border border-forest-100">{v}</span>)}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted block mb-2">Packaging</span>
                    <div className="flex flex-wrap gap-1.5">
                      {packaging.map((p) => <span key={p} className="text-xs px-2 py-1 bg-gold-50 text-gold-600 rounded font-medium border border-gold-100">{p}</span>)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-cream-dark rounded-lg mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">MOQ</span>
                  <strong className="text-ink text-sm">{moq}</strong>
                </div>

                <button
                  onClick={() => onOpenQuote(id)}
                  className="flex items-center gap-2 px-6 py-3 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-500 transition-colors"
                >
                  Enquire Now
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Private label */}
      <section className="bg-forest-600 py-16">
        <div className="section-wrap text-center">
          <h2 className="font-serif text-white text-3xl mb-3" data-reveal>Need private-label packaging?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto" data-reveal>We offer full custom branding on all product lines — bags, tins, cartons — with your logo, language, and market-specific compliance.</p>
          <button onClick={() => onOpenQuote()} className="px-8 py-3 bg-gold-500 text-ink font-semibold rounded hover:bg-gold-400 transition-colors" data-reveal>
            Discuss Private Label
          </button>
        </div>
      </section>

      <BackToTop />
    </>
  )
}
