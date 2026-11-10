import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, MessagesSquare, UserPlus } from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const STEPS = [
  {
    icon: ShieldCheck,
    title: 'Verify your VIT-AP status',
    text: 'Sign up with any personal email, then confirm you are a VIT-AP student before joining the community.',
  },
  {
    icon: Sparkles,
    title: 'Build your profile',
    text: 'Add your course, branch, year, interests and photos. Choose what you want from friendship and dating.',
  },
  {
    icon: UserPlus,
    title: 'Discover and connect',
    text: 'Swipe through verified students, send likes or friend requests, and see who likes you back.',
  },
  {
    icon: MessagesSquare,
    title: 'Start your story',
    text: 'Once you match or connect, chat in real time, share moments, and grow your circle on campus.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From sign-up to your <span className="text-gradient">first connection</span> in four steps.
            </>
          }
        />

        <ol className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative rounded-3xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.08] ring-1 ring-white/15">
                  <Icon className="h-5 w-5 text-electric-300" aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-semibold text-white/40">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
