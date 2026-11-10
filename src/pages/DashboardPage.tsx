import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock3, Loader2, LogOut, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CampusXLogo from '@/components/brand/CampusXLogo';
import AmbientBackground from '@/components/layout/AmbientBackground';
import { signOut } from '@/lib/auth';
import { fetchOwnProfile } from '@/lib/profile';
import { useAuth } from '@/hooks/useAuth';

type ProfileState =
  | { status: 'loading' }
  | { status: 'ready'; fullName: string | null }
  | { status: 'error'; message: string };

const CARD_MOTION = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;
  const email = user?.email ?? '';
  const emailVerified = Boolean(user?.email_confirmed_at);
  const metadataName = typeof user?.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : null;

  const [profile, setProfile] = useState<ProfileState>({ status: 'loading' });
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    fetchOwnProfile(userId).then((result) => {
      if (!active) return;
      setProfile(result.ok ? { status: 'ready', fullName: result.fullName } : { status: 'error', message: result.message });
    });
    return () => {
      active = false;
    };
  }, [userId]);

  const displayName = (profile.status === 'ready' && profile.fullName) || metadataName || email.split('@')[0] || 'there';
  const firstName = displayName.split(' ')[0];

  async function handleSignOut() {
    setSigningOut(true);
    setSignOutError(null);
    const result = await signOut();
    if (!result.ok) {
      setSigningOut(false);
      setSignOutError(result.message);
      return;
    }
    navigate('/login', { replace: true });
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <AmbientBackground />

      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <div className="glass-strong mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3">
          <CampusXLogo />
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden min-w-0 items-center gap-2 truncate text-sm text-white/75 sm:flex">
              <Mail className="h-4 w-4 shrink-0 text-electric-300" aria-hidden="true" />
              <span className="truncate">{email}</span>
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signingOut ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LogOut className="h-4 w-4" aria-hidden="true" />}
              {signingOut ? 'Logging out…' : 'Log out'}
            </button>
          </div>
        </div>
        {signOutError && (
          <p role="alert" className="mx-auto mt-3 max-w-6xl text-center text-sm text-rose-200">
            {signOutError}
          </p>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <motion.section
          {...CARD_MOTION}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3"
        >
          <span className="eyebrow w-fit">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Your CampusX dashboard
          </span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Welcome back, <span className="text-gradient">{firstName}</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            Your account is secure and only you can see it. Profile setup and discovery arrive in the next stages.
          </p>
        </motion.section>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <motion.article
            {...CARD_MOTION}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex flex-col gap-4 rounded-3xl p-6"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-electric-500/40 to-violet-600/40 ring-1 ring-white/15">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold">Account</h2>
              <p className="mt-1 break-all text-sm text-white/70">{email}</p>
            </div>
            {emailVerified ? (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mint-400/15 px-3 py-1 text-xs font-semibold text-mint-300">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Email verified
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-300">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                Email not verified
              </span>
            )}
          </motion.article>

          <motion.article
            {...CARD_MOTION}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex flex-col gap-4 rounded-3xl p-6"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-pink-400/30 to-violet-600/40 ring-1 ring-white/15">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold">Profile</h2>
              {profile.status === 'loading' && (
                <p className="mt-1 flex items-center gap-2 text-sm text-white/70">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Loading your profile…
                </p>
              )}
              {profile.status === 'ready' && (
                <p className="mt-1 text-sm text-white/70">{profile.fullName ?? 'Add your name in the profile setup.'}</p>
              )}
              {profile.status === 'error' && (
                <p role="alert" className="mt-1 text-sm text-rose-200">
                  {profile.message}
                </p>
              )}
            </div>
          </motion.article>

          <motion.article
            {...CARD_MOTION}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex flex-col gap-4 rounded-3xl p-6"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.08] ring-1 ring-white/15">
              <ShieldCheck className="h-5 w-5 text-electric-300" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold">VIT-AP verification</h2>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Student verification is required before you can join the campus community. It is coming in the next stage.
              </p>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );
}
