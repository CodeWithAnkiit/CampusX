import { useState, type FormEvent } from 'react';
import { Loader2, Lock, Mail, MailCheck } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthShell from '@/components/auth/AuthShell';
import FormField from '@/components/auth/FormField';
import { resendVerificationEmail, signIn, type AuthFailure } from '@/lib/auth';
import { validateEmail, validateLoginPassword } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';

type LoginErrors = {
  email?: string;
  password?: string;
};

type ResendState = 'idle' | 'sending' | 'sent' | 'failed';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading } = useAuth();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [failure, setFailure] = useState<AuthFailure | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resendState, setResendState] = useState<ResendState>('idle');

  if (!loading && session) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: LoginErrors = {
      email: validateEmail(email),
      password: validateLoginPassword(password),
    };
    setErrors(nextErrors);
    setFailure(null);
    setResendState('idle');
    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);

    if (!result.ok) {
      setFailure({ kind: result.kind, message: result.message });
      return;
    }
    navigate(redirectTo, { replace: true });
  }

  async function handleResend() {
    setResendState('sending');
    const result = await resendVerificationEmail(email.trim());
    setResendState(result.ok ? 'sent' : 'failed');
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue to your CampusX dashboard."
      footer={
        <>
          New to CampusX?{' '}
          <Link to="/signup" className="font-semibold text-electric-300 transition hover:text-white">
            Create an account
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          autoComplete="current-password"
          placeholder="Your password"
          icon={Lock}
          revealable
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          disabled={submitting}
        />

        {failure && (
          <div role="alert" className="glass flex flex-col gap-3 rounded-2xl border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">
            <p>{failure.message}</p>
            {failure.kind === 'email_unverified' && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendState === 'sending' || resendState === 'sent'}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resendState === 'sending' ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    <MailCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {resendState === 'sent' ? 'Verification email sent' : 'Resend verification email'}
                </button>
                {resendState === 'failed' && <span className="text-xs text-rose-200">Could not send it. Try again shortly.</span>}
              </div>
            )}
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn-primary mt-1 w-full py-3.5">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Logging you in…
            </>
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
