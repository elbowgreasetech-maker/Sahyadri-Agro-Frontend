import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Products from './components/Products.jsx';
import Process from './components/Process.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import GlobalReach from './components/GlobalReach.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import QuoteModal from './components/QuoteModal.jsx';

export default function App() {
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [presetProductId, setPresetProductId] = useState(null);

  // Pull company + product data from the Node backend on mount.
  useEffect(() => {
    fetch('/api/company')
      .then((r) => r.json())
      .then((d) => d.ok && setCompany(d.company))
      .catch(() => {});

    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => d.ok && setProducts(d.products))
      .catch(() => {});
  }, []);

  function openQuote(productId = null) {
    setPresetProductId(productId);
    setQuoteOpen(true);
  }

  return (
    <>
      <Navbar onOpenQuote={() => openQuote()} />
      <main>
        <Hero onOpenQuote={() => openQuote()} />
        <About company={company} />
        <Products products={products} onEnquire={openQuote} />
        <Process steps={company?.process} />
        <WhyChooseUs items={company?.whyChooseUs} />
        <GlobalReach markets={company?.exportMarkets} />
        <Contact company={company} products={products} />
      </main>
      <Footer company={company} />

      {quoteOpen && (
        <QuoteModal
          products={products}
          presetProductId={presetProductId}
          onClose={() => setQuoteOpen(false)}
        />
      )}
    </>
  );
}
