import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Lock, Mail, User } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthShell from '@/components/auth/AuthShell';
import FormField from '@/components/auth/FormField';
import { resendVerificationEmail, signUp, type AuthFailure } from '@/lib/auth';
import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validateNewPassword,
} from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';

type SignupErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type PendingVerification = { email: string };

export default function SignupPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<SignupErrors>({});
  const [failure, setFailure] = useState<AuthFailure | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pending, setPending] = useState<PendingVerification | null>(null);
  const [resent, setResent] = useState(false);

  if (!loading && session) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: SignupErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validateNewPassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    };
    setErrors(nextErrors);
    setFailure(null);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    const result = await signUp({ fullName: fullName.trim(), email: email.trim(), password });
    setSubmitting(false);

    if (!result.ok) {
      setFailure({ kind: result.kind, message: result.message });
      return;
    }
    if (result.needsVerification) {
      setPending({ email: email.trim() });
      return;
    }
    navigate('/dashboard', { replace: true });
  }

  async function handleResend() {
    if (!pending) return;
    const result = await resendVerificationEmail(pending.email);
    setResent(result.ok);
    if (!result.ok) setFailure({ kind: result.kind, message: result.message });
  }

  if (pending) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle="We sent a verification link to confirm your email address."
        footer={
          <>
            Already verified?{' '}
            <Link to="/login" className="font-semibold text-electric-300 transition hover:text-white">
              Log in
            </Link>
          </>
        }
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-mint-400/40 to-electric-500/40 ring-1 ring-white/20">
            <CheckCircle2 className="h-8 w-8 text-mint-300" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-white/75">
            Open the link sent to <span className="font-semibold text-white">{pending.email}</span>, then come back and log in.
          </p>
          {failure && (
            <p role="alert" className="text-sm text-rose-200">
              {failure.message}
            </p>
          )}
          <button
            type="button"
            onClick={handleResend}
            disabled={resent}
            className="btn-glass w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {resent ? 'Verification email sent' : 'Resend verification email'}
          </button>
          <Link to="/login" className="btn-primary w-full">
            Go to log in
          </Link>
        </motion.div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join CampusX. You will confirm your email, then verify your VIT-AP student status."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-electric-300 transition hover:text-white">
            Log in
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField
          label="Full name"
          name="fullName"
          autoComplete="name"
          placeholder="Your full name"
          icon={User}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={errors.fullName}
          disabled={submitting}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          disabled={submitting}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          icon={Lock}
          revealable
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          disabled={submitting}
        />

        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          icon={Lock}
          revealable
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
          disabled={submitting}
        />

        {failure && (
          <div role="alert" className="glass rounded-2xl border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">
            {failure.message}
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn-primary mt-1 w-full py-3.5">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Creating your account…
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
