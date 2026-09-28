import { useCallback, useState } from 'react';
import IconDefaults from './components/ui/icons';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
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
    <SmoothScroll>
      <ActiveSectionProvider>
        {/* One provider sets the weight, size, and colour every icon inherits,
            so no individual icon has to choose any of those by hand. */}
        <IconDefaults>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-body focus:text-paper"
          >
            {ui.skipToContent}
          </a>

          {/* One navigation object serves every width. It is the same island on
              a phone and on a desktop; only the arrangement of the links inside
              it changes, which is why there is no second mobile implementation
              to drift out of step. */}
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
        </IconDefaults>
      </ActiveSectionProvider>
    </SmoothScroll>
  );
}
