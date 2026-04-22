import './WhyChooseUs.css';

const ICONS = [
  // polishing
  <path key="i1" d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />,
  // expertise (briefcase/badge)
  <path key="i2" d="M9 4h6v2h4v14H5V6h4V4zm2 2v0h2V4h-2v2zM7 8v10h10V8H7z" />,
  // pricing (currency)
  <path key="i3" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15.5v1.5h-2v-1.5c-1.7-.4-3-1.7-3-3.5h2c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5S13.3 12.5 12.5 12.5h-1c-1.9 0-3.5-1.6-3.5-3.5 0-1.8 1.3-3.1 3-3.5V4h2v1.5c1.7.4 3 1.7 3 3.5h-2c0-.8-.7-1.5-1.5-1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c1.9 0 3.5 1.6 3.5 3.5 0 1.8-1.3 3.1-3 3.5z" />,
  // bulk (boxes)
  <path key="i4" d="M3 7l4-4 4 4v8H3V7zm10 0l4-4 4 4v14h-8V7zM5 9v4h4V9H5zm10 0v10h4V9h-4z" />,
  // logistics (truck)
  <path key="i5" d="M3 6h11v9h-1.5a2.5 2.5 0 11-5 0H6a2.5 2.5 0 11-3-2.5V6zm12 3h3l3 3v3.5a2.5 2.5 0 11-5 0H15V9zm-7 6.5a1 1 0 102 0 1 1 0 00-2 0zm9 0a1 1 0 102 0 1 1 0 00-2 0z" />,
  // certified
  <path key="i6" d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4zm-1 14l-3-3 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6z" />,
];

export default function WhyChooseUs({ items = [] }) {
  return (
    <section className="why">
      <div className="container">
        <div className="why__layout">
          <header className="why__header">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Six reasons importers keep coming back</h2>
            <p>We sweat the operational details so your container ships on time, every time — and your customers come back for the next order.</p>
          </header>

          <div className="why__grid">
            {(items.length > 0 ? items : Array(6).fill(null)).map((it, i) => (
              <div key={i} className={`why__card ${!it ? 'why__card--skeleton' : ''}`}>
                <div className="why__icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">{ICONS[i % ICONS.length]}</svg>
                </div>
                <h3>{it?.title || '—'}</h3>
                <p>{it?.description || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
