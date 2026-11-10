import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, UserCheck, Zap } from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const REASONS = [
  {
    icon: UserCheck,
    title: 'Only VIT-AP people',
    text: 'Every member verifies their student status, so every profile you see belongs to someone on your campus.',
  },
  {
    icon: Sparkles,
    title: 'Real compatibility',
    text: 'Courses, interests, hobbies and friendship or dating preferences shape who you meet next.',
  },
  {
    icon: MessageCircle,
    title: 'Conversations that start',
    text: 'Mutual likes and accepted requests open a private, real-time chat space made for students.',
  },
  {
    icon: Zap,
    title: 'Built to feel effortless',
    text: 'A fast, fluid experience designed for quick swipes on the bus, in the library, or between classes.',
  },
];

export default function WhySection() {
  return (
    <section id="why" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why CampusX?"
          title={
            <>
              Campus life, <span className="text-gradient">designed around people.</span>
            </>
          }
          description="Most apps are built for everyone and feel like no one. CampusX is built only for VIT-AP, so every connection starts with shared context."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition-colors duration-500 hover:bg-white/[0.09]"
            >
              <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric-500/20 blur-3xl transition duration-500 group-hover:bg-violet-500/30" />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-electric-500/40 to-violet-600/40 ring-1 ring-white/15">
                <Icon className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 text-lg font-semibold text-white">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/65">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
