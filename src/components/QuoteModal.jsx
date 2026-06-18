import { useEffect, useState } from 'react'

const PRODUCTS = [
  'Premium Indian Rice',
  'Whole Cashew Kernels',
  'Premium Almonds',
  'Black Pepper',
  'Other / multiple',
]

export default function QuoteModal({ presetProduct, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', product: presetProduct || '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 bg-ink/70 z-[2000] flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream flex items-center justify-center text-ink hover:bg-cream-dark transition-colors border-none cursor-pointer text-lg"
        >
          ✕
        </button>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-forest-600 fill-none stroke-2">
                <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-serif text-2xl mb-2">Quote Request Sent!</h2>
            <p className="text-ink-muted text-sm">Our export team will respond within 24 hours with a detailed quotation.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2 bg-forest-600 text-white rounded font-medium text-sm hover:bg-forest-500 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl mb-1">Request a Quote</h2>
            <p className="text-ink-muted text-sm mb-6">Our team replies within 24 hours with full documentation.</p>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <Field label="Your name" type="text" value={form.name} onChange={set('name')} placeholder="Jane Importer" required />
              <Field label="Email address" type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" required />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-ink-mid">Product</label>
                <select value={form.product} onChange={set('product')} className="bg-cream border border-cream-dark rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-forest-500">
                  <option value="">Choose…</option>
                  {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-ink-mid">Destination & quantity</label>
                <textarea
                  value={form.message} onChange={set('message')} rows={3}
                  placeholder="e.g. Port of Dubai, 2 × 20ft FCL, monthly…"
                  className="bg-cream border border-cream-dark rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-forest-500 resize-none"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-500 transition-colors flex items-center justify-center gap-2">
                Submit Request
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-ink-mid">{label}</label>
      <input {...props} className="bg-cream border border-cream-dark rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-forest-500" />
    </div>
  )
}
