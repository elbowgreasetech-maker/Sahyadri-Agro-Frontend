import { useEffect, useRef } from 'react'
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
    accent: '#2d6e47',
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
    accent: '#c8920a',
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
    accent: '#2d6e47',
  },
  {
    id: 'black-pepper',
    name: 'Black Pepper',
    tagline: 'Bold spice from coastal India',
    short: 'Premium Malabar and Tellicherry black pepper — sun-dried, machine-cleaned, and sorted for uniform piperine content and bold aroma.',
    long: 'Sourced from the spice-rich Konkan coast and Kerala highlands, our black pepper is carefully harvested at peak maturity, sun-dried to optimal moisture levels, and machine-cleaned to remove impurities. Available in Malabar Garbled, Malabar Ungarbled, and Tellicherry Extra Bold grades. Packed in food-safe PP woven bags or vacuum-sealed for freshness retention.',
    varieties: ['Malabar Garbled','Malabar Ungarbled','Tellicherry Bold','Tellicherry Extra Bold'],
    packaging: ['25 kg PP woven bags','50 kg bulk bags','Vacuum-sealed retail packs'],
    moq: '500 kg',
    img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=900&q=80',
    accent: '#c8920a',
  },
]

export default function Products({ onOpenQuote }) {
  const heroRef = useRef(null)
  const productRefs = useRef([])

  useEffect(() => {
    // Load GSAP for enhancement only — content is visible by default
    if (window.gsap) { initGSAP(); return; }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    script.onerror = () => {} // fail silently
    script.onload = () => {
      const scrollScript = document.createElement('script')
      scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
      scrollScript.onerror = () => initGSAP() // run without ScrollTrigger
      scrollScript.onload = initGSAP
      document.head.appendChild(scrollScript)
    }
    document.head.appendChild(script)

    function initGSAP() {
      const { gsap } = window
      const ScrollTrigger = window.ScrollTrigger
      if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

      // Hero text reveal using fromTo (never leaves items at opacity:0)
      const heroEl = heroRef.current
      if (heroEl) {
        gsap.fromTo(
          heroEl.querySelectorAll('.gsap-hero-item'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.1 }
        )
      }

      // Product cards scroll reveal with fromTo
      productRefs.current.forEach((el, i) => {
        if (!el || !ScrollTrigger) return
        const isEven = i % 2 === 0

        const imgEl = el.querySelector('.prod-img')
        const textEl = el.querySelector('.prod-text')
        if (imgEl) {
          gsap.fromTo(imgEl,
            { x: isEven ? -50 : 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
          )
        }
        if (textEl) {
          gsap.fromTo(textEl,
            { x: isEven ? 50 : -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
          )
        }
        const tags = el.querySelectorAll('.prod-tag')
        if (tags.length) {
          gsap.fromTo(tags,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, delay: 0.3, ease: 'back.out(1.5)',
              scrollTrigger: { trigger: el, start: 'top 75%', once: true } }
          )
        }
      })
    }

    return () => {
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      {/* ── Hero Banner ── */}
      <div className="prod-hero" ref={heroRef}>
        <div className="prod-hero__bg" />
        <div className="prod-hero__overlay" />
        {/* Decorative SVG grain lines */}
        <svg className="prod-hero__svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <line key={i} x1={i * 180 - 50} y1="0" x2={i * 180 + 100} y2="300"
              stroke="#c8920a" strokeWidth="1" strokeOpacity="0.12" />
          ))}
        </svg>
        <div className="section-wrap relative" style={{ zIndex: 2 }}>
          <span className="gsap-hero-item eyebrow-badge">Our Catalog</span>
          <h1 className="gsap-hero-item prod-hero__title">
            Four product lines.<br/>One uncompromising standard.
          </h1>
          <p className="gsap-hero-item prod-hero__sub">
            Every grain, kernel, and spice we ship is sourced, cleaned, and packed under one roof.
          </p>
        </div>
      </div>

      {/* ── Product count strip ── */}
      <div className="prod-count-strip">
        {PRODUCTS.map(p => (
          <a key={p.id} href={`#${p.id}`} className="prod-count-item">
            <span className="prod-count-dot" style={{ background: p.accent }} />
            {p.name}
          </a>
        ))}
      </div>

      {/* ── Product list ── */}
      <section className="prod-list">
        <div className="section-wrap prod-list__inner">
          {PRODUCTS.map(({ id, name, tagline, short, long, varieties, packaging, moq, img, accent }, i) => (
            <article
              key={id}
              id={id}
              ref={el => productRefs.current[i] = el}
              className={`prod-article ${i % 2 !== 0 ? 'prod-article--flip' : ''}`}
            >
              {/* Image */}
              <div className="prod-img">
                <div className="prod-img__inner">
                  <img src={img} alt={name} />
                  <div className="prod-img__shine" />
                </div>
                <div className="prod-img__number" style={{ color: accent }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Text */}
              <div className="prod-text">
                <span className="prod-tagline" style={{ color: accent, borderColor: accent + '40', background: accent + '10' }}>
                  {tagline}
                </span>
                <h2 className="prod-name">{name}</h2>
                <p className="prod-short">{short}</p>
                <p className="prod-long">{long}</p>

                <div className="prod-meta">
                  <div>
                    <p className="prod-meta__label">Varieties</p>
                    <div className="prod-tags">
                      {varieties.map(v => (
                        <span key={v} className="prod-tag prod-tag--green">{v}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="prod-meta__label">Packaging</p>
                    <div className="prod-tags">
                      {packaging.map(p => (
                        <span key={p} className="prod-tag prod-tag--gold">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="prod-moq">
                  <span>MOQ</span>
                  <strong>{moq}</strong>
                </div>

                <button
                  onClick={() => onOpenQuote(id)}
                  className="prod-cta"
                  style={{ '--cta-bg': accent }}
                >
                  Enquire Now
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Private label CTA ── */}
      <section className="prod-label-cta">
        <div className="section-wrap prod-label-cta__inner">
          <div className="prod-label-cta__text">
            <h2>Need private-label packaging?</h2>
            <p>Full custom branding on all product lines — bags, tins, cartons — with your logo, language, and market-specific compliance.</p>
          </div>
          <button onClick={() => onOpenQuote()} className="prod-label-cta__btn">
            Discuss Private Label
          </button>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .prod-hero {
          position: relative;
          padding: 9rem 0 5rem;
          overflow: hidden;
          background: #12231a;
        }
        .prod-hero__bg {
          position: absolute; inset: 0;
         background-image: url('https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1600&q=60');
          background-size: cover; background-position: center;
          opacity: 0.18;
        }
        .prod-hero__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(120deg,rgba(18,35,26,.95) 0%,rgba(18,35,26,.75) 60%,transparent 100%);
        }
        .prod-hero__svg {
          position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }
        .eyebrow-badge {
          display: inline-block;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #e8a20c; border: 1px solid rgba(232,162,12,.4);
          background: rgba(232,162,12,.1); padding: 5px 14px; border-radius: 999px;
          margin-bottom: 1.2rem;
        }
        .prod-hero__title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700;
          color: #fff; line-height: 1.15; margin-bottom: 1rem;
        }
        .prod-hero__sub {
          color: rgba(255,255,255,.65); font-size: 1.05rem; max-width: 52ch;
        }

        /* ── Count strip ── */
        .prod-count-strip {
          display: flex; gap: 0; overflow-x: auto;
          background: #fff; border-bottom: 1px solid rgba(46,125,50,.12);
          scrollbar-width: none;
        }
        .prod-count-strip::-webkit-scrollbar { display: none; }
        .prod-count-item {
          flex: 1; min-width: 160px; display: flex; align-items: center; gap: 8px;
          padding: 14px 20px; font-size: 0.82rem; font-weight: 600;
          color: #3a4a3d; text-decoration: none; white-space: nowrap;
          border-right: 1px solid rgba(46,125,50,.1);
          transition: background .2s, color .2s;
        }
        .prod-count-item:hover { background: #f4f6f0; color: #2d6e47; }
        .prod-count-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        /* ── List ── */
        .prod-list { padding: 5rem 0; background: #fbfbf7; }
        .prod-list__inner { display: flex; flex-direction: column; gap: 6rem; }

        .prod-article {
          display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center;
        }
        .prod-article--flip .prod-img { order: 2; }
        .prod-article--flip .prod-text { order: 1; }

        .prod-img { position: relative; }
        .prod-img__inner {
          border-radius: 20px; overflow: hidden; position: relative;
          box-shadow: 0 20px 50px rgba(27,94,32,.16);
        }
        .prod-img__inner img {
          width: 100%; height: 380px; object-fit: cover;
          transition: transform .8s cubic-bezier(.25,.46,.45,.94);
        }
        .prod-img__inner:hover img { transform: scale(1.05); }
        .prod-img__shine {
          position: absolute; inset: 0;
          background: linear-gradient(135deg,rgba(255,255,255,.12) 0%,transparent 60%);
          pointer-events: none;
        }
        .prod-img__number {
          position: absolute; top: -18px; left: 24px;
          font-family: var(--font-display, Georgia, serif);
          font-size: 5rem; font-weight: 800; opacity: 0.18; line-height: 1;
          pointer-events: none; user-select: none;
        }

        .prod-tagline {
          display: inline-block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 999px; border: 1px solid;
          margin-bottom: 0.75rem;
        }
        .prod-name {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.6rem, 2.4vw, 2.2rem); font-weight: 700;
          color: #1a1f1b; margin-bottom: 0.75rem; line-height: 1.15;
        }
        .prod-short { color: #3a4a3d; margin-bottom: 0.5rem; line-height: 1.65; }
        .prod-long { color: #6b7b6e; font-size: 0.92rem; margin-bottom: 1.5rem; line-height: 1.7; }

        .prod-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .prod-meta__label {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #6b7b6e; margin-bottom: 0.5rem;
        }
        .prod-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .prod-tag {
          font-size: 0.72rem; font-weight: 600; padding: 3px 10px;
          border-radius: 6px; border: 1px solid;
        }
        .prod-tag--green {
          background: #e8f5e9; color: #2d6e47; border-color: #a5d6a7;
        }
        .prod-tag--gold {
          background: #fffde7; color: #c8920a; border-color: #ffe082;
        }

        .prod-moq {
          display: flex; align-items: center; gap: 12px;
          background: #f4f6f0; border-radius: 10px; padding: 10px 16px;
          margin-bottom: 1.5rem;
        }
        .prod-moq span {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #6b7b6e;
        }
        .prod-moq strong { font-size: 0.9rem; color: #1a1f1b; }

        .prod-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          background: var(--cta-bg, #2d6e47); color: #fff;
          font-size: 0.9rem; font-weight: 600; border: none; cursor: pointer;
          transition: transform .25s, box-shadow .25s, opacity .2s;
          box-shadow: 0 6px 20px rgba(0,0,0,.18);
        }
        .prod-cta svg { width: 16px; height: 16px; transition: transform .25s; }
        .prod-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.22); }
        .prod-cta:hover svg { transform: translateX(4px); }

        /* ── Private label CTA ── */
        .prod-label-cta {
          background: linear-gradient(120deg,#12231a 0%,#1b3a28 100%);
          padding: 5rem 0;
        }
        .prod-label-cta__inner {
          display: flex; align-items: center; justify-content: space-between; gap: 2rem;
          flex-wrap: wrap;
        }
        .prod-label-cta__text h2 {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.5rem, 2.5vw, 2.2rem); color: #fff; margin-bottom: 0.5rem;
        }
        .prod-label-cta__text p { color: rgba(255,255,255,.65); max-width: 48ch; font-size: 0.95rem; }
        .prod-label-cta__btn {
          flex-shrink: 0;
          padding: 14px 32px; border-radius: 999px;
          background: linear-gradient(135deg,#e8a20c,#c8920a);
          color: #1a1f1b; font-weight: 700; font-size: 0.95rem;
          border: none; cursor: pointer;
          transition: transform .25s, box-shadow .25s;
          box-shadow: 0 8px 24px rgba(200,146,10,.4);
        }
        .prod-label-cta__btn:hover { transform: translateY(-3px); box-shadow: 0 14px 35px rgba(200,146,10,.5); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .prod-article, .prod-article--flip { grid-template-columns: 1fr; gap: 2rem; }
          .prod-article--flip .prod-img, .prod-article--flip .prod-text { order: unset; }
          .prod-img__inner img { height: 260px; }
          .prod-img__number { font-size: 3.5rem; }
        }
      `}</style>

      <BackToTop />
    </>
  )
}
