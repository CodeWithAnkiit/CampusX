import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import CampusXLogo from '@/components/brand/CampusXLogo';

const NAV_LINKS = [
  { label: 'Why CampusX', href: '#why' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Discover', href: '#discover' },
  { label: 'Safety', href: '#safety' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={`mx-auto max-w-6xl rounded-2xl px-4 py-3 transition-all duration-500 ${
          scrolled ? 'glass-strong' : 'glass'
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#top" aria-label="CampusX home" onClick={closeMenu}>
            <CampusXLogo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-white/70 transition duration-300 hover:bg-white/[0.08] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/80 transition duration-300 hover:bg-white/[0.08] hover:text-white md:inline-flex"
            >
              Log in
            </Link>
            <Link to="/signup" className="btn-primary hidden px-5 py-2.5 md:inline-flex">
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-white transition hover:bg-white/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-300 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 pt-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-3 text-base text-white/80 transition hover:bg-white/[0.08] hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="btn-glass w-full"
                  >
                    Log in
                  </Link>
                  <Link to="/signup" onClick={closeMenu} className="btn-primary w-full">
                    Get Started
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
