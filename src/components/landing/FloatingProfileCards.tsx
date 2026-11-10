import { motion } from 'framer-motion';
import { BadgeCheck, GraduationCap, Sparkles } from 'lucide-react';

type ShowcaseProfile = {
  name: string;
  age: number;
  course: string;
  year: string;
  interests: string[];
  match: number;
  image: string;
  alt: string;
};

const PROFILES: ShowcaseProfile[] = [
  {
    name: 'Ananya',
    age: 20,
    course: 'B.Tech CSE',
    year: 'Year 3',
    interests: ['Design', 'Coffee', 'Hackathons'],
    match: 94,
    image: 'https://images.pexels.com/photos/5538007/pexels-photo-5538007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Smiling student standing with a laptop against a brick wall',
  },
  {
    name: 'Rohan',
    age: 21,
    course: 'B.Tech ECE',
    year: 'Year 4',
    interests: ['Photography', 'Chess', 'Jazz'],
    match: 88,
    image: 'https://images.pexels.com/photos/12467946/pexels-photo-12467946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Young man leaning on a railing in front of a glass building',
  },
  {
    name: 'Meera',
    age: 19,
    course: 'MBA',
    year: 'Year 1',
    interests: ['Startups', 'Running', 'Books'],
    match: 91,
    image: 'https://images.pexels.com/photos/3793238/pexels-photo-3793238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Young woman smiling while holding a book outdoors',
  },
];

const FLOAT_POSITIONS = [
  'left-0 top-2 w-[58%] sm:left-4 sm:w-[52%]',
  'right-0 top-24 w-[56%] sm:right-2 sm:w-[50%]',
  'left-[12%] bottom-0 w-[54%] sm:left-[18%] sm:w-[48%]',
];

export default function FloatingProfileCards() {
  return (
    <div className="relative h-[460px] w-full sm:h-[520px]">
      {PROFILES.map((profile, index) => (
        <motion.article
          key={profile.name}
          className={`absolute ${FLOAT_POSITIONS[index]}`}
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6 + index * 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="glass overflow-hidden rounded-3xl p-2.5 shadow-glass-lg"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img src={profile.image} alt={profile.alt} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink-950/60 px-2.5 py-1 text-xs font-semibold text-mint-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {profile.match}% match
              </span>
              <div className="absolute inset-x-3 bottom-3">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {profile.name}, {profile.age}
                  </h3>
                  <BadgeCheck className="h-4 w-4 text-electric-300" role="img" aria-label="Verified student" />
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/75">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                  {profile.course} · {profile.year}
                </p>
                <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
                  {profile.interests.map((interest) => (
                    <span key={interest} className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] text-white backdrop-blur-md">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.article>
      ))}
    </div>
  );
}
