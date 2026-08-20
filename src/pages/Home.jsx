import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BackToTop from '../components/BackToTop'

const PRODUCTS_DATA = [
  { id:'rice',           name:'Premium Indian Rice', tagline:'Basmati & Non-Basmati',      img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', moq:'1 × 20ft FCL (~25 MT)' },
  { id:'cashews',        name:'Cashew Nuts',         tagline:'W180, W240, W320',            img:'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&q=80', moq:'1 MT' },
  { id:'raw-cashew-nut', name:'Raw Cashew Nut',      tagline:'Unprocessed, in-shell',        img:'https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?w=600&q=80', moq:'1 × 20ft FCL' },
  { id:'turmeric',       name:'Turmeric',            tagline:'High-curcumin finger & powder', img:'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=600&q=80', moq:'1 MT' },
  { id:'soyabean',       name:'Soyabean',            tagline:'Food & feed-grade',            img:'https://images.unsplash.com/photo-1572457224112-06d191bb6d01?w=600&q=80', moq:'1 × 20ft FCL (~25 MT)' },
  { id:'black-pepper',   name:'Black Pepper',        tagline:'Malabar & Tellicherry',        img:'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80', moq:'500 kg' },
]

export default function Home({ onOpenQuote }) {
  const heroBgRef = useRef(null)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const productGridRef = useRef(null)

  useEffect(() => {
    // Always set up parallax scroll (no GSAP needed)
    const onScroll = () => {
      if (heroBgRef.current && window.scrollY < window.innerHeight) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Load GSAP for enhancement only — content is visible by default
    if (window.gsap) { initGSAP(); }
    else {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
      s.onerror = () => {} // fail silently, content still visible
      s.onload = () => {
        const st = document.createElement('script')
        st.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
        st.onerror = () => initGSAP() // run without ScrollTrigger if it fails
        st.onload = initGSAP
        document.head.appendChild(st)
      }
      document.head.appendChild(s)
    }

    function initGSAP() {
      const { gsap } = window
      const ST = window.ScrollTrigger
      if (ST) gsap.registerPlugin(ST)

      // Use fromTo so the "from" state is applied intentionally, not left hanging
      if (heroRef.current) {
        const heroItems = ['.h-badge', '.h-title', '.h-sub', '.h-ctas']
        heroItems.forEach((sel, i) => {
          gsap.fromTo(sel,
            { y: 30 + i * 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.15 + i * 0.15, ease: 'power3.out' }
          )
        })
        gsap.fromTo('.h-stats > *',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.7, ease: 'power3.out' }
        )
        gsap.fromTo('.h-card',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, delay: 0.3, ease: 'back.out(1.2)' }
        )
        gsap.fromTo('.h-badge-cert',
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, delay: 0.8, ease: 'back.out(1.5)' }
        )
      }

      // Stat counters on scroll
      if (statsRef.current && ST) {
        statsRef.current.querySelectorAll('.stat-num').forEach(el => {
          const orig = el.textContent
          const target = parseFloat(el.dataset.target)
          gsap.fromTo({ val: 0 }, { val: 0 }, {
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            val: target, duration: 2, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].val) + (orig.includes('+') ? '+' : orig.includes('%') ? '%' : ' MT') },
            onComplete() { el.textContent = orig }
          })
        })
      }

      // Product cards scroll reveal
      if (productGridRef.current && ST) {
        gsap.fromTo(
          productGridRef.current.querySelectorAll('.prod-preview-card'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: productGridRef.current, start: 'top 82%', once: true }
          }
        )
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(232,162,12,0); }
          50%      { box-shadow: 0 0 0 14px rgba(232,162,12,0); }
        }
        @keyframes scrollWheel {
          0%   { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(10px); }
        }
        @keyframes particleFloat {
          0%   { opacity:0; transform:translateY(0) scale(1); }
          20%  { opacity:.7; }
          80%  { opacity:.3; }
          100% { opacity:0; transform:translateY(-120px) scale(.3); }
        }
        .h-card:nth-child(1) { animation: floatA 6s ease-in-out infinite; }
        .h-card:nth-child(2) { animation: floatB 7.5s ease-in-out infinite 1s; }
        .h-card:nth-child(3) { animation: floatC 8s ease-in-out infinite 2s; }
        .prod-preview-card:hover .ppc-img img { transform: scale(1.08); }
        .highlights-strip__item { transition: transform .25s, box-shadow .25s; }
        .highlights-strip__item:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(27,94,32,.12); }
      `}</style>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="home-hero">
        {/* Background */}
        <div className="home-hero__bg-wrap">
          <div
            ref={heroBgRef}
            className="home-hero__bg-img"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=85')" }}
          />
          <div className="home-hero__bg-grad" />
          {/* SVG decorative overlay */}
          <svg className="home-hero__bg-svg" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="heroGlow" cx="0.82" cy="0.2" r="0.45">
                <stop offset="0" stopColor="#e8a20c" stopOpacity="0.35"/>
                <stop offset="1" stopColor="#e8a20c" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="1400" height="800" fill="url(#heroGlow)"/>
            {/* Grid lines */}
            {[200,400,600,800,1000,1200].map((x,i) => (
              <line key={i} x1={x} y1="0" x2={x} y2="800" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04"/>
            ))}
            {[160,320,480,640].map((y,i) => (
              <line key={i} x1="0" y1={y} x2="1400" y2={y} stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04"/>
            ))}
          </svg>
          <div id="hero-particles" className="home-hero__particles" />
        </div>

        <div className="section-wrap home-hero__inner">
          {/* Copy */}
          <div className="home-hero__copy">
            <span className="h-badge home-hero__eyebrow">
              Sahyadri Agro India Pvt. Ltd.
            </span>
            <h1 className="h-title home-hero__title">
              Premium Indian{' '}
              <span className="home-hero__accent">Rice, Cashews, Turmeric, Soyabean</span>
              {' '}& <span className="home-hero__accent">Black Pepper</span>{' '}
              Exported Worldwide
            </h1>
            <p className="h-sub home-hero__sub">
              Processed, polished, and quality-checked for global standards — from the fields of India to ports across the Middle East, Europe, and Asia.
            </p>
            <div className="h-ctas home-hero__ctas">
              <button onClick={() => onOpenQuote()} className="home-hero__btn-primary">
                Get Quote
                <ArrowIcon />
              </button>
              <Link to="/contact" className="home-hero__btn-secondary">Contact Us</Link>
            </div>
            <div className="h-stats home-hero__stats">
              {[['25', '25+', 'Export markets'], ['200', '200 MT', 'Monthly capacity'], ['100', '100%', 'APEDA certified']].map(([raw, label, sub]) => (
                <div key={sub} className="home-hero__stat">
                  <strong className="stat-num" data-target={raw}>{label}</strong>
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card stack */}
          <div className="home-hero__visual" aria-hidden="true">
            {[
              { pos: { width:'60%',height:'62%',top:'2%',right:'0' }, img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', n:'01', t:'Premium Rice' },
              { pos: { width:'52%',height:'54%',bottom:'12%',left:'0' }, img:'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&q=80', n:'02', t:'Cashew Nuts' },
              { pos: { width:'42%',height:'38%',bottom:0,right:'6%' }, img:'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80', n:'03', t:'Black Pepper' },
            ].map(({ pos, img, n, t }) => (
              <div key={n} className="h-card home-hero__card" style={pos}>
                <div className="home-hero__card-img" style={{ backgroundImage: `url('${img}')` }} />
                <div className="home-hero__card-label">
                  <span>{n}</span>
                  <strong>{t}</strong>
                </div>
              </div>
            ))}
            <div className="h-badge-cert home-hero__cert-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2d6e47" strokeWidth="2" width="28" height="28">
                <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <strong>FSSAI · APEDA</strong>
                <span>Export-grade quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="home-hero__scroll-hint">
          <div className="home-hero__scroll-mouse">
            <div className="home-hero__scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ══ GOLD DIVIDER ══ */}
      <div style={{ height: 5, background: 'linear-gradient(to right,#2d6e47,#e8a20c,#2d6e47)' }} />

      {/* ══ HIGHLIGHTS STRIP ══ */}
      <section ref={statsRef} className="highlights-strip">
        <div className="section-wrap highlights-strip__grid">
          {[
            { icon:'M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z', title:'FSSAI & APEDA', sub:'Certified exporter', color:'#2d6e47' },
            { icon:'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z', title:'FOB / CIF Worldwide', sub:'Global shipping', color:'#c8920a' },
            { icon:'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z', title:'200 MT / Month', sub:'Processing capacity', color:'#2d6e47' },
            { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'ISO 22000 · HACCP', sub:'Quality assured', color:'#c8920a' },
          ].map(({ icon, title, sub, color }) => (
            <div key={title} className="highlights-strip__item">
              <div className="highlights-strip__icon" style={{ background: color + '14', color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                  <path d={icon} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRODUCTS PREVIEW ══ */}
      <section className="home-products">
        <div className="section-wrap">
          <div className="home-products__header">
            <span className="home-eyebrow">Our Catalog</span>
            <h2 className="home-products__title">Six product lines.<br/>One uncompromising standard.</h2>
          </div>
          <div className="home-products__grid" ref={productGridRef}>
            {PRODUCTS_DATA.map(({ id, name, tagline, img, moq }) => (
              <article key={id} className="prod-preview-card">
                <div className="ppc-img">
                  <img src={img} alt={name} loading="lazy"/>
                  <div className="ppc-tag">{tagline}</div>
                </div>
                <div className="ppc-body">
                  <h3>{name}</h3>
                  <p>MOQ: {moq}</p>
                  <button onClick={() => onOpenQuote(id)} className="ppc-btn">
                    Enquire Now <ArrowIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="home-products__more">
            <Link to="/products" className="home-products__more-btn">
              View Full Catalog <ArrowIcon cls="#2d6e47" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="home-cta">
        <div className="home-cta__bg" />
        <div className="section-wrap home-cta__inner">
          <span className="home-eyebrow home-eyebrow--light">Ready to Source?</span>
          <h2>Start your export enquiry today.</h2>
          <p>We respond to every RFQ within 24 hours with a competitive quotation and full export documentation overview.</p>
          <div className="home-cta__btns">
            <button onClick={() => onOpenQuote()} className="home-cta__btn-primary">
              Get a Quote <ArrowIcon />
            </button>
            <Link to="/contact" className="home-cta__btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      <BackToTop />

      <style>{`
        /* ── Hero ── */
        .home-hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden; padding-top: 80px;
        }
        .home-hero__bg-wrap { position: absolute; inset: 0; }
        .home-hero__bg-img {
          position: absolute; inset: -20%; background-size: cover;
          background-position: center 30%; will-change: transform;
        }
        .home-hero__bg-grad {
          position: absolute; inset: 0;
          background: linear-gradient(105deg,rgba(12,26,18,.92) 0%,rgba(12,26,18,.65) 55%,rgba(12,26,18,.2) 100%);
        }
        .home-hero__bg-svg {
          position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }
        .home-hero__particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }

        .home-hero__inner {
          position: relative; z-index: 2;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center; padding: 5rem 0;
        }
        .home-hero__eyebrow {
          display: inline-block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #e8a20c; border: 1px solid rgba(232,162,12,.4);
          background: rgba(232,162,12,.12); padding: 5px 14px; border-radius: 999px;
          margin-bottom: 1.2rem;
        }
        .home-hero__title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 800;
          color: #fff; line-height: 1.12; margin-bottom: 1.2rem;
        }
        .home-hero__accent { color: #e8a20c; }
        .home-hero__sub {
          color: rgba(255,255,255,.7); font-size: 1.05rem;
          max-width: 50ch; margin-bottom: 2rem; line-height: 1.7;
        }
        .home-hero__ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .home-hero__btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          background: linear-gradient(135deg,#e8a20c,#c8920a);
          color: #1a1f1b; font-weight: 700; font-size: 0.95rem;
          border: none; cursor: pointer;
          box-shadow: 0 8px 24px rgba(200,146,10,.4);
          transition: transform .25s, box-shadow .25s;
        }
        .home-hero__btn-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 35px rgba(200,146,10,.5); }
        .home-hero__btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,.4); color: #fff;
          font-weight: 600; font-size: 0.95rem; text-decoration: none;
          transition: background .2s;
        }
        .home-hero__btn-secondary:hover { background: rgba(255,255,255,.1); color: #fff; }

        .home-hero__stats { display: flex; gap: 2rem; flex-wrap: wrap; }
        .home-hero__stat { }
        .home-hero__stat strong {
          display: block; font-family: var(--font-display, Georgia, serif);
          font-size: 1.9rem; color: #fff; line-height: 1;
        }
        .home-hero__stat span { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,.55); }

        /* Cards */
        .home-hero__visual { position: relative; height: 440px; }
        .home-hero__card {
          position: absolute; border-radius: 16px; overflow: hidden;
          border: 1.5px solid rgba(255,255,255,.15);
          box-shadow: 0 20px 50px rgba(0,0,0,.4);
        }
        .home-hero__card-img { width: 100%; height: 100%; background-size: cover; background-position: center; }
        .home-hero__card-label {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 12px;
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(0deg,rgba(0,0,0,.75),transparent);
        }
        .home-hero__card-label span { font-size: 0.65rem; font-weight: 700; color: #e8a20c; }
        .home-hero__card-label strong { font-family: var(--font-display, Georgia, serif); font-size: 0.85rem; color: #fff; }

        .home-hero__cert-badge {
          position: absolute; top: 8%; left: -8%;
          display: flex; align-items: center; gap: 10px;
          background: rgba(251,251,247,.96); backdrop-filter: blur(8px);
          border-radius: 14px; padding: 10px 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,.2); z-index: 5;
        }
        .home-hero__cert-badge strong { display: block; font-size: 0.83rem; color: #1a1f1b; font-weight: 700; }
        .home-hero__cert-badge span { font-size: 0.72rem; color: #6b7b6e; }

        /* Scroll hint */
        .home-hero__scroll-hint {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          z-index: 5; opacity: .7;
        }
        .home-hero__scroll-mouse {
          width: 22px; height: 34px; border: 2px solid rgba(255,255,255,.6);
          border-radius: 11px; position: relative;
        }
        .home-hero__scroll-wheel {
          width: 4px; height: 8px; background: #e8a20c; border-radius: 2px;
          position: absolute; top: 6px; left: 50%; transform: translateX(-50%);
          animation: scrollWheel 1.6s ease infinite;
        }
        .home-hero__scroll-hint span {
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,.6);
        }

        /* ── Highlights ── */
        .highlights-strip { padding: 3.5rem 0; background: #fff; }
        .highlights-strip__grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem;
        }
        .highlights-strip__item {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 0.5rem; padding: 1.5rem 1rem; border-radius: 14px;
          background: #fbfbf7; border: 1px solid rgba(46,125,50,.1);
        }
        .highlights-strip__icon {
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; margin-bottom: 4px;
        }
        .highlights-strip__item strong { font-family: var(--font-display, Georgia, serif); font-size: 0.95rem; color: #1a1f1b; }
        .highlights-strip__item span { font-size: 0.78rem; color: #6b7b6e; }

        /* ── Products preview ── */
        .home-products { padding: 5rem 0; background: #f4f6f0; }
        .home-products__header { text-align: center; margin-bottom: 3rem; }
        .home-eyebrow {
          display: inline-block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #2d6e47; margin-bottom: 0.75rem;
        }
        .home-eyebrow--light { color: rgba(232,162,12,.9); }
        .home-products__title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.7rem, 3vw, 2.6rem); color: #1a1f1b;
        }
        .home-products__grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem;
        }
        .prod-preview-card {
          background: #fff; border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(46,125,50,.1);
          box-shadow: 0 4px 16px rgba(27,94,32,.07);
          transition: transform .3s, box-shadow .3s;
        }
        .prod-preview-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(27,94,32,.14); }
        .ppc-img { position: relative; height: 180px; overflow: hidden; }
        .ppc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s cubic-bezier(.25,.46,.45,.94); }
        .ppc-tag {
          position: absolute; top: 10px; left: 10px;
          background: rgba(45,110,71,.88); color: #fff;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em;
          padding: 3px 10px; border-radius: 999px;
        }
        .ppc-body { padding: 1.1rem 1.2rem; }
        .ppc-body h3 {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1rem; color: #1a1f1b; margin-bottom: 4px;
        }
        .ppc-body p { font-size: 0.75rem; color: #6b7b6e; margin-bottom: 0.9rem; }
        .ppc-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px; background: #2d6e47; color: #fff;
          font-size: 0.85rem; font-weight: 600; border: none; border-radius: 8px;
          cursor: pointer; transition: background .2s;
        }
        .ppc-btn:hover { background: #235639; }

        .home-products__more { text-align: center; margin-top: 2.5rem; }
        .home-products__more-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          border: 2px solid #2d6e47; color: #2d6e47;
          font-weight: 600; font-size: 0.92rem; text-decoration: none;
          transition: background .2s, color .2s;
        }
        .home-products__more-btn:hover { background: #2d6e47; color: #fff; }

        /* ── CTA Banner ── */
        .home-cta {
          position: relative; padding: 5rem 0; overflow: hidden;
          background: linear-gradient(120deg,#12231a 0%,#1b3a28 100%);
        }
        .home-cta__bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=50');
          background-size: cover; opacity: .08;
        }
        .home-cta__inner { position: relative; z-index: 2; text-align: center; }
        .home-cta__inner h2 {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.7rem, 3vw, 2.8rem); color: #fff; margin-bottom: 0.75rem;
        }
        .home-cta__inner p { color: rgba(255,255,255,.65); max-width: 50ch; margin: 0 auto 2rem; }
        .home-cta__btns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .home-cta__btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          background: linear-gradient(135deg,#e8a20c,#c8920a);
          color: #1a1f1b; font-weight: 700; font-size: 0.95rem;
          border: none; cursor: pointer;
          box-shadow: 0 8px 24px rgba(200,146,10,.4);
          transition: transform .25s, box-shadow .25s;
        }
        .home-cta__btn-primary:hover { transform: translateY(-3px); }
        .home-cta__btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,.4); color: #fff;
          font-weight: 600; font-size: 0.95rem; text-decoration: none;
          transition: background .2s;
        }
        .home-cta__btn-secondary:hover { background: rgba(255,255,255,.1); color: #fff; }

        /* ── Responsive ── */
        @media (max-width: 1050px) {
          .home-products__grid { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 780px) {
          .home-products__grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 900px) {
          .home-hero__inner { grid-template-columns: 1fr; }
          .home-hero__visual { display: none; }
          .highlights-strip__grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 560px) {
          .home-products__grid { grid-template-columns: 1fr; }
          .highlights-strip__grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  )
}

function ArrowIcon({ cls }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={cls || 'currentColor'} strokeWidth="2.5"
      style={{ width: 16, height: 16, flexShrink: 0 }}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
