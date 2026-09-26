import { useCallback, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Work from './components/sections/Work';
import Capabilities from './components/sections/Capabilities';
import Thinking from './components/sections/Thinking';
import Philosophy from './components/sections/Philosophy';
import Contact from './components/sections/Contact';
import ContactModal from './components/ui/ContactModal';
import { ActiveSectionProvider } from './hooks/useActiveSection';
import { ui } from './data/content';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  return (
    <ActiveSectionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-body focus:text-on-accent"
      >
        {ui.skipToContent}
      </a>

      <Header onContact={openContact} />

      <main id="main">
        <Hero onContact={openContact} />
        <About />
        <Work />
        <Capabilities />
        <Thinking />
        <Philosophy />
        <Contact onContact={openContact} />
      </main>

      <Footer />

      <ContactModal open={isContactOpen} onClose={closeContact} />
    </ActiveSectionProvider>
  );
}
