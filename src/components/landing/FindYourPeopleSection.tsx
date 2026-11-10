import { motion } from 'framer-motion';
import { Handshake, HeartHandshake, Users } from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const PATHS = [
  {
    icon: Users,
    title: 'Friendships',
    text: 'Find study partners, club mates, hostel neighbours and people who share your hobbies.',
    tags: ['Study groups', 'Clubs', 'Sports', 'Music'],
  },
  {
    icon: HeartHandshake,
    title: 'Dating',
    text: 'Set your dating preferences and meet verified students who are looking for something real.',
    tags: ['Verified only', 'Age 18+', 'Your pace'],
  },
  {
    icon: Handshake,
    title: 'Connections',
    text: 'Send friend requests, accept or reject them, and keep a tidy list of the people you know.',
    tags: ['Requests', 'Connection list', 'Unmatch anytime'],
  },
];

export default function FindYourPeopleSection() {
  return (
    <section className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Find your people"
          title={
            <>
              Friends, more, or <span className="text-gradient">both at once.</span>
            </>
          }
          description="Tell CampusX what you are looking for. Friendship and dating preferences stay separate, so every connection feels intentional."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {PATHS.map(({ icon: Icon, title, text, tags }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass flex flex-col rounded-3xl p-7"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/50 to-electric-500/40 ring-1 ring-white/15">
                <Icon className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
