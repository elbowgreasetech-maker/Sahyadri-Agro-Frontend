import { useMemo, useState } from 'react';
import './GlobalReach.css';

/**
 * Stylized world-map of major export hubs. Coordinates are hand-picked
 * (lat/long → SVG x/y in a 1000×500 viewBox using equirectangular projection).
 */
const HUBS = [
  { region: 'Middle East',   country: 'Dubai, UAE',        x: 632, y: 233 },
  { region: 'Middle East',   country: 'Riyadh, KSA',       x: 615, y: 235 },
  { region: 'Middle East',   country: 'Doha, Qatar',       x: 627, y: 232 },
  { region: 'Europe',        country: 'Hamburg, Germany',  x: 521, y: 153 },
  { region: 'Europe',        country: 'London, UK',        x: 495, y: 150 },
  { region: 'Europe',        country: 'Rotterdam, NL',     x: 510, y: 152 },
  { region: 'Asia',          country: 'Singapore',         x: 757, y: 305 },
  { region: 'Asia',          country: 'Tokyo, Japan',      x: 870, y: 200 },
  { region: 'Asia',          country: 'Hong Kong',         x: 815, y: 245 },
  { region: 'Africa',        country: 'Cape Town, ZA',     x: 545, y: 380 },
  { region: 'Africa',        country: 'Mombasa, Kenya',    x: 600, y: 320 },
  { region: 'North America', country: 'New York, USA',     x: 285, y: 195 },
  { region: 'North America', country: 'Toronto, Canada',   x: 270, y: 180 },
];

const ORIGIN = { x: 700, y: 250, label: 'Pune, India' }; // approximate

export default function GlobalReach({ markets = [] }) {
  const [active, setActive] = useState(null);

  const totalCountries = useMemo(
    () => markets.reduce((sum, m) => sum + m.countries.length, 0),
    [markets]
  );

  return (
    <section id="reach" className="reach">
      <div className="container">
        <header className="reach__header">
          <span className="eyebrow">Global Reach</span>
          <h2>Serving clients across the<br /><em>Middle East, Europe & Asia</em></h2>
          <p>From the port of Mumbai to {totalCountries || '25+'} countries — and growing every quarter.</p>
        </header>

        <div className="reach__layout">
          {/* Map */}
          <div className="reach__map-wrap">
            <svg
              viewBox="0 0 1000 500"
              className="reach__map"
              aria-label="World map showing Sahyadri Agro export destinations"
            >
              <defs>
                <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.9" fill="#A5D6A7" opacity="0.45" />
                </pattern>
                <radialGradient id="hubGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#FFA000" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#FFA000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Dotted continent silhouettes — minimal, decorative */}
              <g opacity="0.9">
                {/* Africa */}
                <path d="M510 230 Q540 220 560 240 Q590 260 600 320 Q580 380 540 400 Q510 380 500 320 Q495 270 510 230 Z" fill="url(#dots)" />
                {/* Europe */}
                <path d="M470 130 Q510 120 545 140 Q565 165 540 185 Q500 195 470 180 Q455 155 470 130 Z" fill="url(#dots)" />
                {/* Asia */}
                <path d="M580 130 Q680 110 800 140 Q880 180 870 240 Q820 280 760 290 Q680 270 600 230 Q570 180 580 130 Z" fill="url(#dots)" />
                {/* India subcontinent */}
                <path d="M680 220 Q710 230 720 280 Q700 305 685 290 Q670 260 680 220 Z" fill="url(#dots)" />
                {/* North America */}
                <path d="M150 130 Q230 110 320 140 Q360 180 320 220 Q240 240 180 220 Q140 180 150 130 Z" fill="url(#dots)" />
                {/* South America */}
                <path d="M280 280 Q330 290 340 350 Q320 410 290 410 Q265 370 270 320 Q275 295 280 280 Z" fill="url(#dots)" />
                {/* Australia */}
                <path d="M820 350 Q870 345 890 370 Q880 395 840 395 Q815 380 820 350 Z" fill="url(#dots)" />
              </g>

              {/* Origin (India) */}
              <g>
                <circle cx={ORIGIN.x} cy={ORIGIN.y} r="22" fill="url(#hubGlow)" />
                <circle cx={ORIGIN.x} cy={ORIGIN.y} r="8" fill="#2E7D32" stroke="#FBC02D" strokeWidth="2.5" />
                <text x={ORIGIN.x} y={ORIGIN.y + 26} textAnchor="middle" className="reach__origin-label">
                  {ORIGIN.label}
                </text>
              </g>

              {/* Curved shipping routes from India to each hub */}
              {HUBS.map((h, i) => {
                const midX = (ORIGIN.x + h.x) / 2;
                const midY = Math.min(ORIGIN.y, h.y) - Math.abs(h.x - ORIGIN.x) * 0.25;
                const isActive = active === i;
                return (
                  <path
                    key={i}
                    d={`M${ORIGIN.x},${ORIGIN.y} Q${midX},${midY} ${h.x},${h.y}`}
                    fill="none"
                    stroke={isActive ? '#FFA000' : '#FBC02D'}
                    strokeWidth={isActive ? 1.6 : 0.9}
                    strokeDasharray="4 4"
                    opacity={isActive ? 1 : 0.5}
                  />
                );
              })}

              {/* Destination hubs */}
              {HUBS.map((h, i) => {
                const isActive = active === i;
                return (
                  <g
                    key={h.country}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isActive && <circle cx={h.x} cy={h.y} r="14" fill="url(#hubGlow)" />}
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r={isActive ? 6 : 4.5}
                      fill="#FBC02D"
                      stroke="#2E7D32"
                      strokeWidth="1.5"
                    />
                    {isActive && (
                      <text x={h.x} y={h.y - 12} textAnchor="middle" className="reach__hub-label">
                        {h.country}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Region list */}
          <aside className="reach__list">
            {(markets.length > 0 ? markets : []).map((m) => (
              <div key={m.region} className="reach__region">
                <h3>{m.region}</h3>
                <p>{m.countries.join(' · ')}</p>
              </div>
            ))}
            {markets.length === 0 && (
              <div className="reach__region reach__region--ghost">
                <p>Loading export markets…</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
