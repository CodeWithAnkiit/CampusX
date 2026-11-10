import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/landing/SectionHeading';

const FAQS = [
  {
    question: 'Who can join CampusX?',
    answer: 'CampusX is exclusively for students of VIT-AP University who are 18 or older. You sign up with any personal email, then verify your student status before joining.',
  },
  {
    question: 'Will my personal email be visible to other students?',
    answer: 'No. Your personal email is used only for sign-in and account recovery. It is never shown on your profile or to other members.',
  },
  {
    question: 'Can I use CampusX for both friendships and dating?',
    answer: 'Yes. You choose your friendship and dating preferences separately, so you can control what kind of connections you want to see.',
  },
  {
    question: 'How do messages work?',
    answer: 'You can message someone after a mutual match or an accepted friend request. Chats support text, images, typing indicators and read receipts.',
  },
  {
    question: 'Can I block or report someone?',
    answer: 'Yes. You can block anyone at any time, and report profiles or messages. Blocked users cannot see your profile or contact you.',
  },
  {
    question: 'Can I delete my account?',
    answer: 'Yes. You can delete your account and associated data from your settings whenever you want.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Frequently asked"
          title={
            <>
              Questions, <span className="text-gradient">answered.</span>
            </>
          }
          description="Everything you need to know before you join your campus circle."
        />

        <ul className="flex flex-col gap-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <li
                key={item.question}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen ? 'border-white/20 bg-white/[0.08]' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.06]'
                } backdrop-blur-xl`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-300 rounded-2xl"
                >
                  <span className="text-base font-medium text-white">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-electric-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/70">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
