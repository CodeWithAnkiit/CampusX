import { motion } from 'framer-motion';
import { Orbit } from 'lucide-react';

export default function SessionLoader() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="relative h-24 w-24">
        <motion.span
          className="absolute inset-0 rounded-full border border-electric-300/50"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border border-violet-400/50"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, delay: 0.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-0 grid place-items-center rounded-full bg-gradient-to-br from-electric-500 via-violet-600 to-pink-400 shadow-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Orbit className="h-9 w-9 text-white" aria-hidden="true" />
        </motion.div>
      </div>
      <p className="text-sm font-medium tracking-wide text-white/70">Loading your CampusX session…</p>
    </div>
  );
}
