import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import BackToTop from '../components/BackToTop'

const PRODUCTS = ['Premium Indian Rice','Whole Cashew Kernels','Premium Almonds','Other / multiple']

export default function Contact() {
  useReveal([])
  const [form, setForm] = useState({ name:'', email:'', product:'', message:'' })
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

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
      if (!res.ok || !data.ok) {
        setStatus('error')
        return
      }
      setStatus('ok')
      setForm({ name:'', email:'', product:'', message:'' })
    } catch {
      // Demo fallback — show success without real backend
      setStatus('ok')
      setForm({ name:'', email:'', product:'', message:'' })
    }
  }

  return (
    <>
      <div className="relative pt-32 pb-16 bg-forest-600">
        <div className="section-wrap relative">
          <span className="eyebrow text-gold-400 border border-gold-400/40 bg-gold-400/10">Talk to Us</span>
          <h1 className="font-serif text-white" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>Let's discuss<br/>your next container.</h1>
        </div>
      </div>
      <div className="gold-divider" />

      <section className="py-20 bg-cream">
        <div className="section-wrap grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form */}
          <div className="lg:col-span-3" data-reveal>
            <div className="reveal reveal-left bg-white rounded-2xl p-8 border border-cream-dark shadow-sm">
              <h2 className="font-serif text-ink text-2xl mb-1">Send an Enquiry</h2>
              <p className="text-ink-muted text-sm mb-6">We typically reply within one business day with a detailed quotation.</p>

              {status === 'ok' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-forest-600 fill-none" strokeWidth="2">
                      <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-2">Message Sent!</h3>
                  <p className="text-ink-muted text-sm">Our export team will contact you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-5 text-sm text-forest-600 underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your name" type="text" value={form.name} onChange={set('name')} placeholder="Jane Importer" required />
                    <Field label="Email address" type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Product of interest</label>
                    <select value={form.product} onChange={set('product')}
                      className="bg-cream border border-cream-dark rounded-lg px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest-500 transition-colors">
                      <option value="">Choose a product…</option>
                      {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Message</label>
                    <textarea
                      value={form.message} onChange={set('message')} rows={5} required
                      placeholder="Tell us about your destination port, target quantity, packaging needs, timelines…"
                      className="bg-cream border border-cream-dark rounded-lg px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest-500 transition-colors resize-none"
                    />
                  </div>
                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">
                      Something went wrong — please try again or email us directly.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center justify-center gap-2 py-3 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-500 transition-colors disabled:opacity-70"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
                    {status !== 'sending' && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2.5">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Side info */}
          <aside className="lg:col-span-2 flex flex-col gap-4 pt-2">
            {[
              {
                icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.7a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12 12 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12 12 0 002.81.7A2 2 0 0122 16.92z',
                title: 'Call our export desk',
                val: '+91 98XX-XXXXXX',
                href: 'tel:+919800000000',
              },
              {
                icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
                title: 'Email',
                val: 'info@sahyadriagro.com',
                href: 'mailto:info@sahyadriagro.com',
              },
              {
                icon: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z',
                title: 'Office address',
                val: 'Plot 24, MIDC Industrial Area, Pune, Maharashtra 411019, India',
                href: null,
              },
            ].map(({ icon, title, val, href }, i) => (
              <div key={title} data-reveal className={`reveal reveal-right delay-${i+1} flex items-start gap-4 p-4 bg-white rounded-xl border border-cream-dark`}>
                <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-forest-600 fill-none" strokeWidth="1.8">
                    <path d={icon} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <strong className="block text-sm text-ink mb-0.5">{title}</strong>
                  {href ? (
                    <a href={href} className="text-sm text-forest-600 no-underline hover:underline">{val}</a>
                  ) : (
                    <span className="text-sm text-ink-muted">{val}</span>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/919800000000"
              target="_blank"
              rel="noreferrer"
              data-reveal
              className="reveal reveal-up delay-4 flex items-center gap-4 p-4 bg-[#e8f9f0] rounded-xl border border-[#b2dfdb] no-underline hover:-translate-y-1 transition-transform"
            >
              <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
                </svg>
              </div>
              <div>
                <strong className="block text-sm text-ink">Chat on WhatsApp</strong>
                <span className="text-xs text-ink-muted">Fastest way to a quote</span>
              </div>
            </a>
          </aside>
        </div>
      </section>

      <BackToTop />
    </>
  )
}

function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</label>
      <input {...props} className="bg-cream border border-cream-dark rounded-lg px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest-500 transition-colors"/>
    </div>
  )
}
