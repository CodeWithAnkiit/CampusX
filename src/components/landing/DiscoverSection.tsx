import { motion } from 'framer-motion';
import { Heart, Hand, SlidersHorizontal, Star } from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const CHIPS = ['Photography', 'Hackathons', 'Football', 'Indie music', 'Anime', 'Startups'];

const FEATURES = [
  { icon: Heart, label: 'Like or pass with a tap or a swipe' },
  { icon: SlidersHorizontal, label: 'Filter by course, year and interests' },
  { icon: Star, label: 'Mutual likes unlock an instant match' },
];

export default function DiscoverSection() {
  return (
    <section id="discover" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            eyebrow="Discover new people"
            title={
              <>
                Swipe through <span className="text-gradient">people who get campus life.</span>
              </>
            }
            description="Premium profile cards show who someone is, what they study and what lights them up. Only verified, adult VIT-AP students appear in your feed."
          />
          <ul className="flex flex-col gap-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric-500/40 to-pink-400/30">
                  <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white/85">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glow-border relative mx-auto w-full max-w-md rounded-[2rem]"
        >
          <div className="glass-strong rounded-[2rem] p-4 shadow-glass-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-electric-600/50 via-violet-700/40 to-pink-500/40">
              <img
                src="https://images.pexels.com/photos/5554257/pexels-photo-5554257.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Classmates walking together across a university park"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-electric-300">Preview</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">Friends who study, build and explore</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CHIPS.map((chip) => (
                    <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="absolute -bottom-4 -right-4 hidden rounded-2xl bg-mint-400/95 px-4 py-2 text-sm font-semibold text-ink-950 shadow-glass sm:flex sm:items-center sm:gap-2">
            <Hand className="h-4 w-4" aria-hidden="true" />
            It’s a match
          </span>
        </motion.div>
      </div>
    </section>
  );
}
