import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CampusXLogo from '@/components/brand/CampusXLogo';
import AmbientBackground from '@/components/layout/AmbientBackground';

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <AmbientBackground />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6">
        <header className="flex items-center justify-between">
          <Link to="/" aria-label="CampusX home" className="rounded-xl transition hover:opacity-90">
            <CampusXLogo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/75 transition hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glow-border glass-strong w-full max-w-md rounded-[2rem] p-7 shadow-glass-lg sm:p-9"
          >
            <div className="mb-8 flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
              <p className="text-sm leading-relaxed text-white/70">{subtitle}</p>
            </div>
            {children}
          </motion.div>
        </main>

        <footer className="pb-2 text-center text-sm text-white/70">{footer}</footer>
      </div>
    </div>
  );
}
