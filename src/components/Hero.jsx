import './Hero.css';

export default function Hero({ onOpenQuote }) {
  return (
    <section id="top" className="hero">
      {/* Background layers: photo + green/gold gradient overlay + decorative wheat SVG */}
      <div className="hero__bg">
        <div className="hero__bg-image" />
        <div className="hero__bg-overlay" />
        <svg className="hero__bg-pattern" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="sunGlow" cx="0.85" cy="0.15" r="0.4">
              <stop offset="0" stopColor="#FBC02D" stopOpacity="0.45" />
              <stop offset="1" stopColor="#FBC02D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#sunGlow)" />
        </svg>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow reveal reveal-1">Sahyadri Agro India Pvt. Ltd.</span>

        <h1 className="hero__title reveal reveal-2">
  Premium Indian
  <span className="hero__title-accent"> Rice </span>
  &amp;
  <span className="hero__title-accent"> Black Pepper </span>
  Exported Worldwide
</h1>

          <p className="hero__subtitle reveal reveal-3">
            Processed, polished, and quality-checked for global standards — from the
            fields of India to ports across the Middle East, Europe, and Asia.
          </p>

          <div className="hero__ctas reveal reveal-4">
            <button className="btn btn-primary" onClick={onOpenQuote}>
              Get Quote
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="#contact" className="btn btn-secondary">Contact Us</a>
          </div>

          <div className="hero__stats reveal reveal-4">
            <Stat number="25+" label="Export markets" />
            <Stat number="200 MT" label="Monthly capacity" />
            <Stat number="100%" label="APEDA certified" />
          </div>
        </div>

        {/* Right-side decorative card stack */}
        <div className="hero__visual reveal reveal-3" aria-hidden="true">
          <div className="hero__card hero__card--1">
            <div className="hero__card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80')" }} />
            <div className="hero__card-label">
              <span>01</span>
              <strong>Premium Rice</strong>
            </div>
          </div>
          <div className="hero__card hero__card--2">
            <div className="hero__card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80')" }} />
            <div className="hero__card-label">
              <span>02</span>
              <strong>Black Pepper</strong>
            </div>
          </div>

          <div className="hero__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>FSSAI · APEDA</strong>
              <span>Export-grade quality</span>
            </div>
          </div>
        </div>
      </div>

      <div className="field-stripe hero__stripe" aria-hidden="true" />
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div className="hero__stat">
      <strong>{number}</strong>
      <span>{label}</span>
    </div>
  );
}
