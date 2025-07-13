interface CartItemProps {
  ID_Informasi?: string;
  ID_Jasa?: string;
  Nama: string;
  Harga: number;
  Kuantitas: number;
  Total_Harga: number;
  Pemilik: string;
  Jenis_Produk?: 'Informasi' | 'Jasa';
}

export default CartItemProps;
