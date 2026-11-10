/*
# Create profiles table linked to sign-in accounts

1. New Tables
- `profiles`
  - `id` (uuid, primary key): the same id as the account in Supabase Authentication.
  - `full_name` (text): display name entered at sign-up, limited to 120 characters.
  - `created_at` (timestamp): when the profile was created.

2. Automation
- A trigger creates a profile automatically whenever a new account is registered.
- Existing accounts without a profile are backfilled once.

3. Security
- Row Level Security is enabled on `profiles`.
- Signed-in users can read only their own profile. No client write access is granted.
- The trigger function is not callable by app users (EXECUTE revoked from public, anon and authenticated).

4. Important Notes
- Profile edits will be added with the profile feature in a later stage.
*/

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '' CHECK (char_length(full_name) <= 120),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.profiles TO authenticated;

DROP POLICY IF EXISTS "select_own_profile" ON public.profiles;
CREATE POLICY "select_own_profile" ON public.profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, left(COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 120))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO public.profiles (id, full_name)
SELECT u.id, left(COALESCE(u.raw_user_meta_data->>'full_name', ''), 120)
FROM auth.users u
ON CONFLICT (id) DO NOTHING;
