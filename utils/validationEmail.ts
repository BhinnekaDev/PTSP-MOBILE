// 🔹 NORMALISASI EMAIL
export const validationEmail = (input: string) => {
  return input.replace(/[^a-zA-Z0-9@.]/g, '');
};

// 🔹 VALIDASI ERROR EMAIL
export const validateEmailError = (email: string): string | undefined => {
  const clean = email?.trim();
  const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!clean) return 'Email wajib diisi';
  if (!simpleEmailRegex.test(clean)) return 'Format email tidak valid';
  return undefined;
};
