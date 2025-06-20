export type ProductType = 'informasi' | 'jasa';

export type ProductData = {
  Deskripsi: string;
  Harga: number;
  Nama: string;
  Pemilik: string;
  Status: string;
  id: string; // Ensure this is present
};
