import { useState } from 'react';
import './Contact.css';

export default function Contact({ company, products = [] }) {
  const [form, setForm] = useState({ name: '', email: '', product: '', message: '', website: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' }); // idle | sending | ok | error

  const phone   = company?.contact?.phone   ?? '+91 98XXXXXXXX';
  const email   = company?.contact?.email   ?? 'info@sahyadriagro.com';
  const wa      = (company?.contact?.whatsapp ?? phone).replace(/[^0-9]/g, '');
  const addr    = company?.contact?.address;

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', msg: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const errMsg = data.errors?.[0]?.msg || data.error || 'Something went wrong.';
        setStatus({ state: 'error', msg: errMsg });
        return;
      }
      setStatus({ state: 'ok', msg: data.message });
      setForm({ name: '', email: '', product: '', message: '', website: '' });
    } catch {
      setStatus({ state: 'error', msg: 'Network error — please try again.' });
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <header className="contact__header">
          <span className="eyebrow">Talk to Us</span>
          <h2>Let's discuss your next container.</h2>
          <p>Tell us what you need — we typically reply within one business day with a detailed quotation and full export documentation overview.</p>
        </header>

        <div className="contact__grid">
          {/* Form */}
          <form className="contact__form" onSubmit={submit} noValidate>
            {/* Honeypot — hidden from real users */}
            <input
              type="text" name="website" autoComplete="off" tabIndex={-1}
              value={form.website} onChange={update('website')}
              style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true"
            />

            <div className="contact__field">
              <label htmlFor="c-name">Your name</label>
              <input
                id="c-name" type="text" required
                value={form.name} onChange={update('name')}
                placeholder="Jane Importer"
              />
            </div>

            <div className="contact__field">
              <label htmlFor="c-email">Email address</label>
              <input
                id="c-email" type="email" required
                value={form.email} onChange={update('email')}
                placeholder="jane@company.com"
              />
            </div>

            <div className="contact__field">
              <label htmlFor="c-product">Product of interest</label>
              <select id="c-product" value={form.product} onChange={update('product')}>
                <option value="">Choose a product…</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
                <option value="Other / multiple">Other / multiple</option>
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message" rows="5" required minLength={10}
                value={form.message} onChange={update('message')}
                placeholder="Tell us about your destination port, target quantity, packaging needs, timelines…"
              />
            </div>

            {status.state === 'ok' && (
              <div className="contact__alert contact__alert--ok">{status.msg}</div>
            )}
            {status.state === 'error' && (
              <div className="contact__alert contact__alert--err">{status.msg}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary contact__submit"
              disabled={status.state === 'sending'}
            >
              {status.state === 'sending' ? 'Sending…' : 'Send Enquiry'}
              {status.state !== 'sending' && (
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </form>

          {/* Side info */}
          <aside className="contact__side">
            <div className="contact__card">
              <div className="contact__card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <strong>Call our export desk</strong>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </div>
            </div>

            <a className="contact__card contact__card--wa" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
              <div className="contact__card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
              </div>
              <div>
                <strong>Chat on WhatsApp</strong>
                <span>Fastest way to a quote</span>
              </div>
            </a>

            <div className="contact__card">
              <div className="contact__card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z M4 4l8 8 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>

            <div className="contact__card contact__card--addr">
              <div className="contact__card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <strong>Office address</strong>
                {addr ? (
                  <span>
                    {addr.line1}<br />
                    {addr.line2}<br />
                    {addr.city}, {addr.state} {addr.postalCode}<br />
                    {addr.country}
                  </span>
                ) : <span>Pune, Maharashtra, India</span>}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
