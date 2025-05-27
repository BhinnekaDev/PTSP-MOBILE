export const validationEmail = (input: string): string => {
  // Hanya izinkan karakter huruf, angka, titik, underscore, persen, plus, minus dan @, tanpa spasi
  const allowedChars = /^[a-zA-Z0-9._%+-@]*$/;
  if (allowedChars.test(input)) {
    return input;
  }
  return input.slice(0, -1); // hapus karakter terakhir yang tidak valid
};
