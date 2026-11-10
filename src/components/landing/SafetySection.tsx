import { motion } from 'framer-motion';
import { Ban, EyeOff, Flag, GraduationCap, Lock, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const SAFETY_ITEMS = [
  {
    icon: GraduationCap,
    title: 'Student verification',
    text: 'Access requires proof of VIT-AP student status. Personal email addresses are never shown to other members.',
  },
  {
    icon: ShieldCheck,
    title: 'Age-restricted community',
    text: 'CampusX is only open to students aged 18 and above. Underage accounts are not allowed to join.',
  },
  {
    icon: EyeOff,
    title: 'Private profile controls',
    text: 'Choose what appears in discovery and what stays hidden. Your photos and social links are yours to share.',
  },
  {
    icon: Ban,
    title: 'Block and report',
    text: 'Block anyone instantly and report behaviour that feels wrong. Reports go to a moderation-ready review queue.',
  },
  {
    icon: Lock,
    title: 'Secure by design',
    text: 'Row-level database security keeps each student’s private data limited to them, with protected photo storage.',
  },
  {
    icon: Flag,
    title: 'Delete anytime',
    text: 'Delete your account and your data whenever you choose. Nothing is kept for longer than it needs to be.',
  },
];

export default function SafetySection() {
  return (
    <section id="safety" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-14">
          <span className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-electric-500/25 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />

          <div className="relative">
            <SectionHeading
              eyebrow="Safety and privacy"
              title={
                <>
                  A community you can <span className="text-gradient">trust from day one.</span>
                </>
              }
              description="Safety is the foundation of CampusX, not an afterthought. Verification, privacy controls and moderation work together to keep the campus community real."
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SAFETY_ITEMS.map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-ink-950/40 p-5 transition-colors duration-300 hover:border-white/20"
                >
                  <Icon className="h-5 w-5 text-electric-300" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
