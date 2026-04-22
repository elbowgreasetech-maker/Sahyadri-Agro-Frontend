import './Process.css';

const ICONS = {
  sprout: (
    <path d="M12 22V12M12 12c0-3 2-5 5-5h2c0 3-2 5-5 5h-2zm0 0c0-3-2-5-5-5H5c0 3 2 5 5 5h2z" />
  ),
  sparkles: (
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zm6 12l.8 2.4L21 18l-2.2.6L18 21l-.8-2.4L15 18l2.2-.6L18 15z" />
  ),
  'shield-check': (
    <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4zm-1 14l-3-3 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6z" />
  ),
  package: (
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.5 8 12 11.7 5.5 8 12 4.3zM5 9.7l6 3.4v7.5l-6-3.4V9.7zm14 0v7.5l-6 3.4v-7.5l6-3.4z" />
  ),
  ship: (
    <path d="M3 17l3-9h12l3 9-9 5-9-5zm9-13l5 4H7l5-4zm-9 16l9 3 9-3-2-1-7 2-7-2-2 1z" />
  ),
};

export default function Process({ steps = [] }) {
  return (
    <section id="process" className="process">
      <div className="container">
        <header className="process__header">
          <span className="eyebrow">Farm to Port</span>
          <h2>A traceable five-step process</h2>
          <p>From the field to the freight container, every step happens under our control — or our partners' verified control.</p>
        </header>

        <ol className="process__timeline">
          {steps.length === 0 && [1, 2, 3, 4, 5].map((n) => (
            <li key={n} className="process__step process__step--skeleton" aria-hidden="true">
              <div className="process__step-num">{String(n).padStart(2, '0')}</div>
            </li>
          ))}

          {steps.map((s) => (
            <li key={s.step} className="process__step">
              <div className="process__step-num">{String(s.step).padStart(2, '0')}</div>
              <div className="process__step-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {ICONS[s.icon] || <circle cx="12" cy="12" r="6" />}
                </svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
