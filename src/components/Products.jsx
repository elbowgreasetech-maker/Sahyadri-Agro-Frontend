import './Products.css';

export default function Products({ products, onEnquire }) {
  return (
    <section id="products" className="products">
      <div className="container">
        <header className="products__header">
          <span className="eyebrow">Our Catalog</span>
          <h2>Three product lines.<br />One uncompromising standard.</h2>
          <p>
            Every grain and kernel we ship is sourced, cleaned, polished, and
            packed under one roof — so traceability is real, not a marketing line.
          </p>
        </header>

        <div className="products__grid">
          {products.length === 0 && <ProductSkeletons />}
          {products.map((p, i) => (
            <article key={p.id} className="product-card" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
              <div className="product-card__img-wrap">
                <img src={p.image} alt={p.name} loading="lazy" />
                <div className="product-card__tag">{p.tagline}</div>
              </div>

              <div className="product-card__body">
                <h3>{p.name}</h3>
                <p>{p.shortDescription}</p>

                <ul className="product-card__meta">
                  <li>
                    <strong>Varieties:</strong>
                    <span>{p.varieties.slice(0, 3).join(' · ')}</span>
                  </li>
                  <li>
                    <strong>MOQ:</strong>
                    <span>{p.minimumOrder}</span>
                  </li>
                </ul>

                <button
                  className="btn btn-primary product-card__cta"
                  onClick={() => onEnquire(p.id)}
                >
                  Enquire Now
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSkeletons() {
  return [0, 1, 2].map((i) => (
    <div key={i} className="product-card product-card--skeleton" aria-hidden="true">
      <div className="product-card__img-wrap" />
      <div className="product-card__body">
        <div className="skeleton-line" style={{ width: '70%' }} />
        <div className="skeleton-line" style={{ width: '95%' }} />
        <div className="skeleton-line" style={{ width: '80%' }} />
      </div>
    </div>
  ));
}
