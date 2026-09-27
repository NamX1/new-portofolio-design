import { useCallback, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Introduction from './components/sections/Introduction';
import Build from './components/sections/Build';
import Ledger from './components/sections/Ledger';
import Thinking from './components/sections/Thinking';
import Philosophy from './components/sections/Philosophy';
import Now from './components/sections/Now';
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-[3px] focus:bg-vermilion-deep focus:px-5 focus:py-3 focus:text-body focus:text-paper"
      >
        {ui.skipToContent}
      </a>

      <Header onContact={openContact} />

      <main id="main">
        <Hero onContact={openContact} />
        <Introduction />
        <Build />
        <Ledger />
        <Thinking />
        <Philosophy />
        <Now />
        <Contact onContact={openContact} />
      </main>

      <Footer />

      <ContactModal open={isContactOpen} onClose={closeContact} />
    </ActiveSectionProvider>
  );
}
