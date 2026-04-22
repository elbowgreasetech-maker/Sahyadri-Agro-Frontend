import { useEffect, useState } from 'react';
import './Navbar.css';
import Logo from './Logo.jsx';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about',    label: 'About' },
    { href: '#products', label: 'Products' },
    { href: '#process',  label: 'Process' },
    { href: '#reach',    label: 'Global Reach' },
    { href: '#contact',  label: 'Contact' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand" aria-label="Sahyadri Agro home">
          <Logo />
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">Sahyadri Agro</span>
            <span className="navbar__brand-tag">India Pvt. Ltd.</span>
          </div>
        </a>

        <nav className={`navbar__nav ${open ? 'navbar__nav--open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <button className="btn btn-primary navbar__cta" onClick={() => { setOpen(false); onOpenQuote(); }}>
            Get Quote
          </button>
        </nav>

        <button
          className="navbar__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
