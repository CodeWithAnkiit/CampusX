/*
# Restrict profiles table to read-only access for signed-in users

1. Modified Tables
- `profiles`: removed the default write permissions (insert, update, delete) and all access for the anonymous role that the platform granted automatically on new tables.

2. Security
- Signed-in users can only SELECT their own profile row (existing policy).
- The anonymous role has no access to profiles.
- Profile rows are created only by the sign-up trigger, which runs with elevated rights.

3. Important Notes
- Profile editing will be added later with an explicit column-level grant and matching policies.
*/

REVOKE ALL ON public.profiles FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM authenticated;
GRANT SELECT ON public.profiles TO authenticated;
