import { supabase } from '@/lib/supabase';

type ProfileResult =
  | { ok: true; fullName: string | null }
  | { ok: false; message: string };

export async function fetchOwnProfile(userId: string): Promise<ProfileResult> {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    return { ok: false, message: 'We could not load your profile. Please refresh the page.' };
  }

  const fullName = data && typeof data.full_name === 'string' && data.full_name.trim() !== '' ? data.full_name : null;
  return { ok: true, fullName };
}
