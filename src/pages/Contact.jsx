import { useState, useEffect, useRef } from 'react'
import BackToTop from '../components/BackToTop'

const PRODUCTS = [
  'Premium Indian Rice',
  'Whole Cashew Kernels',
  'Premium Almonds',
  'Black Pepper',
  'Other / multiple',
]

const OFFICES = [
  {
    type: 'Registered Office',
    company: 'SAHYADRI AGRO INDIA PRIVATE LIMITED',
    lines: [
      'A-9, Sai Tukaram Tower,',
      'Behind Gurunanak School,',
      'Rambaug Lane-4, Kalyan West – 421301',
      'Maharashtra, India',
    ],
    phones: ['+91 9096040702', '+91 8452847837'],
    emails: [],
    mapQ: 'Sai+Tukaram+Tower+Kalyan+West+Maharashtra+India',
  },
  {
    type: 'Manufacturing Office',
    company: 'SAHYADRI AGRO INDIA PRIVATE LIMITED',
    lines: [
      'Block No. 742, At Post Nigundal,',
      'Taluka Guhagar, Dist. Ratnagiri,',
      'Maharashtra, India',
    ],
    phones: ['+91 9096040702', '+91 8452847837'],
    emails: ['vilas.salvi@sahyadri.net', 'riya.salvi@sahyadri.net'],
    mapQ: 'Guhagar+Ratnagiri+Maharashtra+India',
  },
]

export default function Contact() {
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const officesRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', product: '', message: '' })
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  useEffect(() => {
    if (window.gsap) { initGSAP(); return; }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    script.onerror = () => {} // fail silently — content already visible
    script.onload = () => {
      const stScript = document.createElement('script')
      stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
      stScript.onerror = () => initGSAP()
      stScript.onload = initGSAP
      document.head.appendChild(stScript)
    }
    document.head.appendChild(script)

    function initGSAP() {
      const { gsap } = window
      const ST = window.ScrollTrigger
      if (ST) gsap.registerPlugin(ST)

      // Hero — use fromTo so items are never stuck at opacity:0
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.c-hero-item'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.14, duration: 0.9, ease: 'power3.out', delay: 0.1 }
        )
      }
      // Form
      if (formRef.current && ST) {
        gsap.fromTo(formRef.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 82%', once: true } }
        )
      }
      // Offices
      if (officesRef.current && ST) {
        gsap.fromTo(
          officesRef.current.querySelectorAll('.office-card'),
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.18, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: officesRef.current, start: 'top 80%', once: true } }
        )
      }
    }
    return () => {
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  async function submit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) { setStatus('error'); return; }
      setStatus('ok')
      setForm({ name: '', email: '', product: '', message: '' })
    } catch {
      setStatus('ok')
      setForm({ name: '', email: '', product: '', message: '' })
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <div className="contact-hero" ref={heroRef}>
        <div className="contact-hero__bg" />
        <div className="contact-hero__overlay" />
        {/* Animated SVG lines */}
        <svg className="contact-hero__svg" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8a20c" stopOpacity="0" />
              <stop offset="50%" stopColor="#e8a20c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e8a20c" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[60, 140, 220].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="1200" y2={y}
              stroke="url(#lineGrad)" strokeWidth="1" />
          ))}
          <circle cx="900" cy="100" r="180" fill="rgba(232,162,12,0.04)" />
        </svg>
        <div className="section-wrap" style={{ position: 'relative', zIndex: 2 }}>
          <span className="c-hero-item eyebrow-badge">Talk to Us</span>
          <h1 className="c-hero-item contact-hero__title">
            Let's discuss<br/>your next container.
          </h1>
          <p className="c-hero-item contact-hero__sub">
            From Kalyan to the coast — our team is ready to build your export solution.
          </p>
        </div>
      </div>

      {/* ── Form + Side ── */}
      <section className="contact-main">
        <div className="section-wrap contact-main__grid">

          {/* Form */}
          <div className="contact-form-wrap" ref={formRef}>
            <h2 className="contact-form__heading">Send an Enquiry</h2>
            <p className="contact-form__sub">We typically reply within one business day with a detailed quotation.</p>

            {status === 'ok' ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Our export team will contact you within 24 hours.</p>
                <button onClick={() => setStatus('idle')}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <div className="contact-form__row">
                  <FormField label="Your name" type="text" value={form.name} onChange={set('name')} placeholder="Jane Importer" required />
                  <FormField label="Email address" type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" required />
                </div>
                <div className="contact-field">
                  <label>Product of interest</label>
                  <select value={form.product} onChange={set('product')}>
                    <option value="">Choose a product…</option>
                    {PRODUCTS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="contact-field">
                  <label>Message</label>
                  <textarea value={form.message} onChange={set('message')} rows={5} required
                    placeholder="Tell us about your destination port, target quantity, packaging needs, timelines…" />
                </div>
                {status === 'error' && (
                  <div className="contact-error">Something went wrong — please try again or email us directly.</div>
                )}
                <button type="submit" disabled={status === 'sending'} className="contact-submit">
                  {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
                  {status !== 'sending' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick contact side */}
          <aside className="contact-side">
            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.7a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12 12 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12 12 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <strong>Call our export desk</strong>
                <a href="tel:+919096040702">+91 9096040702</a>
                <a href="tel:+918452847837" style={{ marginTop: 2 }}>+91 8452847837</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <strong>Email</strong>
                <a href="mailto:vilas.salvi@sahyadri.net">vilas.salvi@sahyadri.net</a>
                <a href="mailto:riya.salvi@sahyadri.net" style={{ marginTop: 2 }}>riya.salvi@sahyadri.net</a>
              </div>
            </div>

            <a
              href="https://wa.me/919096040702"
              target="_blank" rel="noreferrer"
              className="contact-card contact-card--wa"
            >
              <div className="contact-card__icon contact-card__icon--wa">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
                </svg>
              </div>
              <div>
                <strong>Chat on WhatsApp</strong>
                <span>Fastest way to a quote</span>
              </div>
            </a>
          </aside>
        </div>
      </section>

      {/* ── Office Addresses ── */}
      <section className="offices-section" ref={officesRef}>
        <div className="section-wrap">
          <div className="offices-header">
            <span className="eyebrow-badge eyebrow-badge--dark">Our Locations</span>
            <h2 className="offices-heading">Find us here</h2>
          </div>
          <div className="offices-grid">
            {OFFICES.map((office, i) => (
              <div key={i} className="office-card">
                {/* Map embed */}
                <div className="office-card__map">
                  <iframe
                    title={office.type}
                    src={`https://maps.google.com/maps?q=${office.mapQ}&output=embed&z=12`}
                    loading="lazy"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                  <div className="office-card__map-badge">{office.type}</div>
                </div>
                {/* Details */}
                <div className="office-card__body">
                  <div className="office-card__type">{office.type}</div>
                  <h3 className="office-card__company">{office.company}</h3>
                  <address className="office-card__addr">
                    {office.lines.map((l, j) => <span key={j}>{l}</span>)}
                  </address>
                  <div className="office-card__contacts">
                    {office.phones.length > 0 && (
                      <div className="office-card__contact-row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.7a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12 12 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12 12 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{office.phones.join(' // ')}</span>
                      </div>
                    )}
                    {office.emails.length > 0 && (
                      <div className="office-card__contact-row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{office.emails.map((em, j) => (
                          <a key={j} href={`mailto:${em}`} style={{ display: 'block', color: '#2d6e47' }}>{em}</a>
                        ))}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .contact-hero {
          position: relative; padding: 9rem 0 5rem; overflow: hidden; background: #12231a;
        }
        .contact-hero__bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=60');
          background-size: cover; background-position: center; opacity: 0.14;
        }
        .contact-hero__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, rgba(18,35,26,.95) 0%, rgba(18,35,26,.7) 60%, transparent 100%);
        }
        .contact-hero__svg {
          position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }
        .eyebrow-badge {
          display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #e8a20c; border: 1px solid rgba(232,162,12,.4);
          background: rgba(232,162,12,.1); padding: 5px 14px; border-radius: 999px; margin-bottom: 1.2rem;
        }
        .eyebrow-badge--dark {
          color: #2d6e47; border-color: rgba(45,110,71,.3); background: rgba(45,110,71,.08);
        }
        .contact-hero__title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: #fff;
          line-height: 1.15; margin-bottom: 1rem;
        }
        .contact-hero__sub { color: rgba(255,255,255,.65); font-size: 1.05rem; max-width: 50ch; }

        /* ── Main grid ── */
        .contact-main { padding: 5rem 0; background: #fbfbf7; }
        .contact-main__grid { display: grid; grid-template-columns: 3fr 2fr; gap: 3.5rem; align-items: start; }

        /* ── Form wrap ── */
        .contact-form-wrap {
          background: #fff; border-radius: 20px; padding: 2.5rem;
          box-shadow: 0 8px 30px rgba(27,94,32,.08); border: 1px solid rgba(46,125,50,.1);
        }
        .contact-form__heading {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1.6rem; color: #1a1f1b; margin-bottom: 0.35rem;
        }
        .contact-form__sub { color: #6b7b6e; font-size: 0.88rem; margin-bottom: 1.75rem; }
        .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
        .contact-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .contact-field { display: flex; flex-direction: column; gap: 5px; }
        .contact-field label {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #6b7b6e;
        }
        .contact-field input, .contact-field select, .contact-field textarea {
          background: #f4f6f0; border: 1px solid rgba(46,125,50,.15); border-radius: 10px;
          padding: 12px 16px; font-size: 0.9rem; color: #1a1f1b; font-family: inherit;
          transition: border-color .2s, box-shadow .2s; resize: none; outline: none;
        }
        .contact-field input:focus, .contact-field select:focus, .contact-field textarea:focus {
          border-color: #2d6e47; box-shadow: 0 0 0 3px rgba(45,110,71,.12);
        }
        .contact-error {
          background: #fff5f5; border: 1px solid #ffcdd2; border-radius: 8px;
          padding: 10px 14px; color: #c62828; font-size: 0.86rem;
        }
        .contact-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 28px; background: #2d6e47; color: #fff;
          font-size: 0.95rem; font-weight: 600; border: none; border-radius: 999px;
          cursor: pointer; transition: transform .25s, box-shadow .25s;
          box-shadow: 0 6px 20px rgba(45,110,71,.25);
        }
        .contact-submit svg { width: 16px; height: 16px; transition: transform .25s; }
        .contact-submit:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(45,110,71,.3); }
        .contact-submit:hover svg { transform: translateX(4px); }
        .contact-submit:disabled { opacity: .7; cursor: default; }

        .contact-success { text-align: center; padding: 3rem 1rem; }
        .contact-success__icon {
          width: 64px; height: 64px; border-radius: 50%; background: #e8f5e9;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .contact-success__icon svg { width: 32px; height: 32px; stroke: #2d6e47; }
        .contact-success h3 { font-family: var(--font-display, Georgia, serif); font-size: 1.4rem; color: #1a1f1b; margin-bottom: .5rem; }
        .contact-success p { color: #6b7b6e; font-size: 0.9rem; margin-bottom: 1rem; }
        .contact-success button {
          background: none; border: none; color: #2d6e47; font-size: 0.88rem;
          text-decoration: underline; cursor: pointer; font-family: inherit;
        }

        /* ── Side cards ── */
        .contact-side { display: flex; flex-direction: column; gap: 1rem; padding-top: 0.5rem; }
        .contact-card {
          display: flex; align-items: flex-start; gap: 14px;
          background: #fff; border-radius: 14px; padding: 1.1rem 1.25rem;
          border: 1px solid rgba(46,125,50,.1); box-shadow: 0 2px 8px rgba(27,94,32,.05);
          text-decoration: none; transition: transform .2s, box-shadow .2s;
        }
        .contact-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(27,94,32,.1); }
        .contact-card strong { display: block; font-size: 0.85rem; color: #1a1f1b; margin-bottom: 3px; }
        .contact-card a { display: block; font-size: 0.83rem; color: #2d6e47; text-decoration: none; }
        .contact-card a:hover { text-decoration: underline; }
        .contact-card span { font-size: 0.82rem; color: #6b7b6e; }
        .contact-card--wa { background: #e8faf0; border-color: #b2dfdb; }
        .contact-card__icon {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .contact-card__icon--phone { background: #e8f5e9; color: #2d6e47; }
        .contact-card__icon--email { background: #fff8e1; color: #c8920a; }
        .contact-card__icon--wa { background: #25D366; color: #fff; }
        .contact-card__icon svg { width: 18px; height: 18px; }

        /* ── Offices ── */
        .offices-section { padding: 5rem 0; background: #f4f6f0; }
        .offices-header { margin-bottom: 2.5rem; }
        .offices-heading {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.7rem, 3vw, 2.4rem); color: #1a1f1b; margin-top: 0.6rem;
        }
        .offices-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

        .office-card {
          background: #fff; border-radius: 20px;
          overflow: hidden; box-shadow: 0 8px 28px rgba(27,94,32,.1);
          border: 1px solid rgba(46,125,50,.1);
          transition: transform .3s, box-shadow .3s;
        }
        .office-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(27,94,32,.15); }

        .office-card__map { position: relative; height: 200px; }
        .office-card__map iframe { width: 100%; height: 100%; display: block; }
        .office-card__map-badge {
          position: absolute; top: 12px; left: 12px;
          background: #2d6e47; color: #fff; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 999px;
        }

        .office-card__body { padding: 1.5rem; }
        .office-card__type {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #c8920a; margin-bottom: 0.35rem;
        }
        .office-card__company {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1rem; font-weight: 700; color: #1a1f1b; margin-bottom: 0.75rem; line-height: 1.3;
        }
        .office-card__addr {
          font-style: normal; display: flex; flex-direction: column; gap: 1px;
          font-size: 0.86rem; color: #3a4a3d; line-height: 1.65; margin-bottom: 1rem;
        }
        .office-card__contacts { display: flex; flex-direction: column; gap: 6px; }
        .office-card__contact-row {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.83rem; color: #3a4a3d;
        }
        .office-card__contact-row svg { margin-top: 2px; flex-shrink: 0; color: #2d6e47; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .contact-main__grid { grid-template-columns: 1fr; }
          .offices-grid { grid-template-columns: 1fr; }
          .contact-form__row { grid-template-columns: 1fr; }
        }
      `}</style>

      <BackToTop />
    </>
  )
}

function FormField({ label, ...props }) {
  return (
    <div className="contact-field">
      <label>{label}</label>
      <input {...props} />
    </div>
  )
}
