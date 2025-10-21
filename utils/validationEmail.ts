export const validationEmail = (input: string) => {
  // hapus semua karakter kecuali huruf, angka, @, .
  return input.replace(/[^a-zA-Z0-9@.]/g, '');
};
