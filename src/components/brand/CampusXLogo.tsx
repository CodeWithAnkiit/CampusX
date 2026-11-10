import { Orbit } from 'lucide-react';

type CampusXLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function CampusXLogo({ className = '', showWordmark = true }: CampusXLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-400 via-violet-500 to-pink-400 shadow-glow">
        <Orbit className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden="true" />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          Campus<span className="text-gradient">X</span>
        </span>
      )}
    </div>
  );
}
