export const validationFullString = (nama: string, maxLength?: number): string => {
  // Hapus semua karakter selain huruf dan spasi
  return nama.replace(/[^A-Za-z\s]/g, "").slice(0, maxLength);
};
