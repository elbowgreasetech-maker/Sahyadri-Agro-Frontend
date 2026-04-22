import './Footer.css';
import Logo from './Logo.jsx';

export default function Footer({ company }) {
  const year = new Date().getFullYear();
  const phone = company?.contact?.phone   ?? '+91 98XXXXXXXX';
  const email = company?.contact?.email   ?? 'info@sahyadriagro.com';

  return (
    <footer className="footer">
      <div className="field-stripe" aria-hidden="true" />

      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <Logo size={50} />
            <div>
              <strong>Sahyadri Agro</strong>
              <span>India Pvt. Ltd.</span>
            </div>
          </div>
          <p className="footer__tag">Premium Indian rice, cashews & almonds — exported worldwide with full APEDA & FSSAI compliance.</p>

          <div className="footer__socials">
            <SocialLink label="LinkedIn" href="#">
              <path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2c.7-1.2 2-2 4-2 3 0 4 2 4 5v7h-4v-6c0-1.5-.5-2.5-2-2.5s-2 1-2 2.5v6h-4V8z" />
            </SocialLink>
            <SocialLink label="Instagram" href="#">
              <path d="M7 2h10c2.8 0 5 2.2 5 5v10c0 2.8-2.2 5-5 5H7c-2.8 0-5-2.2-5-5V7c0-2.8 2.2-5 5-5zm5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6-3a1 1 0 110 2 1 1 0 010-2z" />
            </SocialLink>
            <SocialLink label="Facebook" href="#">
              <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.3h-1.2c-1.2 0-1.6.7-1.6 1.5V12H16l-.4 3h-2.2v7A10 10 0 0022 12z" />
            </SocialLink>
            <SocialLink label="WhatsApp" href={`https://wa.me/${(company?.contact?.whatsapp ?? phone).replace(/[^0-9]/g, '')}`}>
              <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </SocialLink>
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <a href="#about">About Us</a>
          <a href="#products">Products</a>
          <a href="#process">Process</a>
          <a href="#reach">Global Reach</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer__col">
          <h4>Catalog</h4>
          <a href="#products">Premium Rice</a>
          <a href="#products">Whole Cashews</a>
          <a href="#products">Almonds</a>
          <a href="#contact">Private Labelling</a>
          <a href="#contact">Bulk Orders</a>
        </div>

        <div className="footer__col">
          <h4>Get in touch</h4>
          <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href="#contact">Request a quote</a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Sahyadri Agro India Pvt. Ltd. All rights reserved.</p>
          <p className="footer__bottom-tag">
            🌾 From Indian fields to global tables.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ label, href, children }) {
  return (
    <a href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      <svg viewBox="0 0 24 24" fill="currentColor">{children}</svg>
    </a>
  );
}
