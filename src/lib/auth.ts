import type { AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type AuthFailureKind =
  | 'invalid_credentials'
  | 'email_unverified'
  | 'account_exists'
  | 'rate_limited'
  | 'network'
  | 'unknown';

export type AuthFailure = {
  kind: AuthFailureKind;
  message: string;
};

export type AuthResult = { ok: true } | ({ ok: false } & AuthFailure);

export type SignUpResult =
  | { ok: true; needsVerification: boolean }
  | ({ ok: false } & AuthFailure);

function classifyAuthError(error: AuthError): AuthFailure {
  if (error.name === 'AuthRetryableFetchError') {
    return { kind: 'network', message: 'We could not reach CampusX. Check your connection and try again.' };
  }

  const code = error.code as string | undefined;
  switch (code) {
    case 'invalid_credentials':
      return { kind: 'invalid_credentials', message: 'Incorrect email or password. Please try again.' };
    case 'email_not_confirmed':
      return {
        kind: 'email_unverified',
        message: 'Your email is not verified yet. Open the verification link we sent you, then log in.',
      };
    case 'user_already_exists':
    case 'email_exists':
      return { kind: 'account_exists', message: 'An account with this email already exists. Try logging in instead.' };
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return { kind: 'rate_limited', message: 'Too many attempts. Please wait a few minutes and try again.' };
    default:
      break;
  }

  if (error.message.includes('Invalid login credentials')) {
    return { kind: 'invalid_credentials', message: 'Incorrect email or password. Please try again.' };
  }
  if (error.message.includes('Email not confirmed')) {
    return {
      kind: 'email_unverified',
      message: 'Your email is not verified yet. Open the verification link we sent you, then log in.',
    };
  }
  return { kind: 'unknown', message: 'Something went wrong. Please try again in a moment.' };
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, ...classifyAuthError(error) };
  }
  return { ok: true };
}

type SignUpInput = {
  fullName: string;
  email: string;
  password: string;
};

export async function signUp({ fullName, email, password }: SignUpInput): Promise<SignUpResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  if (error) {
    return { ok: false, ...classifyAuthError(error) };
  }

  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return { ok: false, kind: 'account_exists', message: 'An account with this email already exists. Try logging in instead.' };
  }

  return { ok: true, needsVerification: data.session === null };
}

export async function resendVerificationEmail(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  });
  if (error) {
    return { ok: false, ...classifyAuthError(error) };
  }
  return { ok: true };
}

export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { ok: false, ...classifyAuthError(error) };
  }
  return { ok: true };
}
