import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Lock, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingProfileCards from '@/components/landing/FloatingProfileCards';

function TiltStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 18 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 18 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative h-[520px] [perspective:1200px] sm:h-[600px] lg:h-[680px]"
    >
      <motion.div
        aria-hidden="true"
        style={{ rotateX, rotateY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
      >
        <div className="relative h-72 w-72 sm:h-96 sm:w-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-500/70 via-violet-600/60 to-pink-400/60 opacity-70 blur-3xl" />
          <div className="absolute inset-8 rounded-full border border-white/20 bg-gradient-to-br from-white/25 via-white/5 to-transparent shadow-glass-lg backdrop-blur-xl" />
          <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-electric-300 via-violet-500 to-pink-400 opacity-80 blur-[2px]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-electric-300/40 [transform:rotateX(72deg)]"
          >
            <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-electric-300 shadow-glow" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-pink-300/40 [transform:rotateY(70deg)]"
          >
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-pink-300" />
          </motion.div>
          <div className="absolute left-[18%] top-[14%] h-10 w-10 rounded-full bg-gradient-to-br from-white/60 to-transparent blur-[1px]" />
        </div>
      </motion.div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

const TRUST_POINTS = [
  { icon: ShieldCheck, label: 'VIT-AP verified' },
  { icon: Lock, label: 'Private by default' },
  { icon: Users, label: '18+ community' },
];

export default function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-screen lg:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
            </span>
            Built exclusively for VIT-AP students
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Your Campus.
            <br />
            <span className="text-gradient">Your Connections.</span>
            <br />
            Your Story.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            Meet people, discover connections, and find your circle at VIT-AP.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Link to="/signup" className="btn-primary px-7 py-3.5">
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="#discover" className="btn-glass px-7 py-3.5">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Explore CampusX
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
          >
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white/75">
                <Icon className="h-4 w-4 text-electric-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <TiltStage>
          <FloatingProfileCards />
        </TiltStage>
      </div>
    </section>
  );
}
