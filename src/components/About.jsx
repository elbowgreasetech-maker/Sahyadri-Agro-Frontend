import './About.css';

export default function About({ company }) {
  const certs = company?.certifications ?? [];

  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <div className="about__copy">
          <span className="eyebrow">About the Company</span>
          <h2>Rooted in India's farmlands. <em>Trusted</em> across the world.</h2>
          <p>
            Sahyadri Agro India Pvt. Ltd. is an export-first agro company founded
            on a single conviction: that India's farmers grow some of the finest
            grains and nuts on earth — and that the world deserves to taste them
            at their best.
          </p>
          <p>
            We work directly with growers across Maharashtra, Punjab, Gujarat, and
            Kerala, then process every kilogram on calibrated polishing,
            sorting, and packaging lines built to international standards. The
            result is product you can put on a shelf in Dubai, Hamburg, or
            Singapore with full confidence.
          </p>

          <div className="about__badges">
            <Badge title="Export Quality" sub="Sortex-cleaned, lab-tested" />
            <Badge title="Global Shipping" sub="FOB / CIF worldwide" />
            <Badge title="Certified Processing" sub="ISO 22000 · HACCP" />
          </div>
        </div>

        <aside className="about__panel">
          <div className="about__panel-card">
            <div className="about__panel-row">
              <span className="about__panel-num">07+</span>
              <div>
                <strong>Years of export experience</strong>
                <p>Since 2018, shipping to 25+ countries.</p>
              </div>
            </div>
            <div className="about__panel-row">
              <span className="about__panel-num">200<small>MT</small></span>
              <div>
                <strong>Monthly processing capacity</strong>
                <p>Across rice, cashew, and almond lines.</p>
              </div>
            </div>
            <div className="about__panel-row">
              <span className="about__panel-num">24<small>hr</small></span>
              <div>
                <strong>RFQ response time</strong>
                <p>From enquiry to detailed quote.</p>
              </div>
            </div>
          </div>

          <div className="about__certs">
            <span className="about__certs-label">Certified by</span>
            <div className="about__certs-list">
              {certs.length > 0
                ? certs.map((c) => <span key={c} className="about__chip">{c}</span>)
                : <span className="about__chip about__chip--ghost">Loading…</span>}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Badge({ title, sub }) {
  return (
    <div className="about__badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <strong>{title}</strong>
        <span>{sub}</span>
      </div>
    </div>
  );
}
