import CampusXLogo from '@/components/brand/CampusXLogo';

const FOOTER_LINKS = [
  { label: 'Why CampusX', href: '#why' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Discover', href: '#discover' },
  { label: 'Safety', href: '#safety' },
  { label: 'FAQ', href: '#faq' },
];

export default function SiteFooter() {
  return (
    <footer className="relative mt-12 border-t border-white/10 bg-ink-900/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div className="flex flex-col gap-5">
          <CampusXLogo />
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Your Campus. Your Connections. Your Story. A private social discovery platform for verified students of VIT-AP University.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-2">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-white/75 transition-colors duration-300 hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 CampusX. Made for VIT-AP students.</p>
          <p>Personal emails are never shown publicly.</p>
        </div>
      </div>
    </footer>
  );
}
