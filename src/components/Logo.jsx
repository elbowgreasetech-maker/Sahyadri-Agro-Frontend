/**
 * Stylized SVG mark for Sahyadri Agro — sun + grain + green field motif.
 * Inspired by the brand logo but redrawn so it renders crisply at any size.
 */
export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sahyadri Agro logo"
    >
      <defs>
        <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBC02D" />
          <stop offset="1" stopColor="#FFA000" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#66BB6A" />
          <stop offset="1" stopColor="#2E7D32" />
        </linearGradient>
        <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBC02D" />
          <stop offset="1" stopColor="#66BB6A" />
        </linearGradient>
      </defs>

      {/* Outer green ring */}
      <circle cx="32" cy="34" r="26" fill="none" stroke="url(#leaf)" strokeWidth="3.5" />

      {/* Sun rays at top */}
      <g fill="url(#sun)">
        <polygon points="20,12 22,4 24,12" />
        <polygon points="26,9 29,2 31,10" />
        <polygon points="33,8 35,1 37,9" />
        <polygon points="39,9 42,2 43,10" />
        <polygon points="45,12 48,5 47,13" />
      </g>

      {/* Sun disc */}
      <circle cx="34" cy="22" r="8" fill="url(#sun)" />

      {/* Field stripes (bottom curve of logo) */}
      <path d="M10 44 Q32 38 54 44 L54 56 Q32 50 10 56 Z" fill="url(#field)" opacity="0.95" />
      <path d="M10 50 Q32 44 54 50 L54 58 Q32 52 10 58 Z" fill="#2E7D32" opacity="0.85" />

      {/* Wheat stalk */}
      <line x1="30" y1="44" x2="30" y2="28" stroke="#2E7D32" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="30" cy="30" rx="2.2" ry="1.2" fill="#FBC02D" transform="rotate(-30 30 30)" />
      <ellipse cx="30" cy="34" rx="2.2" ry="1.2" fill="#FBC02D" transform="rotate(30 30 34)" />
      <ellipse cx="30" cy="38" rx="2.2" ry="1.2" fill="#FBC02D" transform="rotate(-30 30 38)" />
    </svg>
  );
}
