import { useEffect, useState } from 'react';
import './QuoteModal.css';

const INCOTERMS = ['FOB', 'CIF', 'CFR', 'EXW', 'DAP'];

export default function QuoteModal({ products, presetProductId, onClose }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', productId: presetProductId || (products[0]?.id || ''),
    quantity: '', incoterm: 'FOB', notes: '', website: '',
  });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  // Lock background scroll while open + close on Esc
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // If parent passes a different preset later, sync it.
  useEffect(() => {
    if (presetProductId) setForm((f) => ({ ...f, productId: presetProductId }));
  }, [presetProductId]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', msg: '' });
    try {
      const res = await fetch('/api/quote', {
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
    } catch {
      setStatus({ state: 'error', msg: 'Network error — please try again.' });
    }
  }

  const showSuccess = status.state === 'ok';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="modal__header">
          <span className="eyebrow">Request a Quote</span>
          <h2 id="quote-title">Tell us about your order</h2>
          <p>We'll respond within 24 hours with detailed pricing, packaging options, and shipping timelines.</p>
        </div>

        {showSuccess ? (
          <div className="modal__success">
            <div className="modal__success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Quote request received</h3>
            <p>{status.msg}</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="modal__form" onSubmit={submit} noValidate>
            <input
              type="text" name="website" autoComplete="off" tabIndex={-1}
              value={form.website} onChange={update('website')}
              style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true"
            />

            <div className="modal__row">
              <Field label="Full name" required>
                <input type="text" required value={form.name} onChange={update('name')} placeholder="Jane Importer" />
              </Field>
              <Field label="Company">
                <input type="text" value={form.company} onChange={update('company')} placeholder="Acme Foods Ltd." />
              </Field>
            </div>

            <div className="modal__row">
              <Field label="Email" required>
                <input type="email" required value={form.email} onChange={update('email')} placeholder="jane@company.com" />
              </Field>
              <Field label="Phone">
                <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+971 50 000 0000" />
              </Field>
            </div>

            <div className="modal__row">
              <Field label="Destination country" required>
                <input type="text" required value={form.country} onChange={update('country')} placeholder="United Arab Emirates" />
              </Field>
              <Field label="Incoterm">
                <select value={form.incoterm} onChange={update('incoterm')}>
                  {INCOTERMS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>
            </div>

            <div className="modal__row">
              <Field label="Product" required>
                <select required value={form.productId} onChange={update('productId')}>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </Field>
              <Field label="Quantity" required>
                <input type="text" required value={form.quantity} onChange={update('quantity')} placeholder="25 MT / 1 FCL" />
              </Field>
            </div>

            <Field label="Additional notes">
              <textarea
                rows="3" value={form.notes} onChange={update('notes')}
                placeholder="Packaging preferences, delivery timeline, private-label requirements…"
              />
            </Field>

            {status.state === 'error' && <div className="contact__alert contact__alert--err">{status.msg}</div>}

            <div className="modal__actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={status.state === 'sending'}>
                {status.state === 'sending' ? 'Sending…' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="modal__field">
      <label>{label}{required && <span className="modal__req">*</span>}</label>
      {children}
    </div>
  );
}
