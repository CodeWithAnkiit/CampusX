const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): string | undefined {
  const email = value.trim();
  if (!email) return 'Enter your email address.';
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address, such as name@example.com.';
  return undefined;
}

export function validateLoginPassword(value: string): string | undefined {
  if (!value) return 'Enter your password.';
  return undefined;
}

export function validateNewPassword(value: string): string | undefined {
  if (value.length < 8) return 'Use at least 8 characters.';
  if (value.length > 72) return 'Use 72 characters or fewer.';
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Include at least one letter and one number.';
  return undefined;
}

export function validateConfirmPassword(value: string, password: string): string | undefined {
  if (!value) return 'Confirm your password.';
  if (value !== password) return 'Passwords do not match.';
  return undefined;
}

export function validateFullName(value: string): string | undefined {
  const name = value.trim();
  if (name.length < 2) return 'Enter your full name.';
  if (name.length > 80) return 'Use 80 characters or fewer.';
  return undefined;
}
