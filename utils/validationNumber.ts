// 🔹 NORMALISASI NOMOR: hanya angka + batas panjang
export const validationNumber = (input: string, maxLength?: number): string => {
  return input.replace(/[^0-9]/g, '').slice(0, maxLength);
};

// 🔹 VALIDASI ERROR NOMOR TELEPON
export const validateNumberError = (phone: string): string | undefined => {
  if (!phone?.trim()) return 'Nomor telepon wajib diisi';
  if (phone.length < 9) return 'Nomor telepon terlalu pendek';
  return undefined;
};
