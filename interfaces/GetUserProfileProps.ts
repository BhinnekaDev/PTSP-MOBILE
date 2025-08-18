// statusOrderDetailProps.ts

import { Timestamp } from '@react-native-firebase/firestore';

export type GetPeroranganProfile = {
  Email: string;
  Nama_Lengkap: string;
  No_Identitas: string;
  Jenis_Kelamin: string;
  Pekerjaan: string;
  Pendidikan_Terakhir: string;
  No_Hp: string;
  Tanggal_Pembuatan_Akun?: string | Date;
};

export type GetPerusahaanProfile = {
  Email: string;
  Email_Perusahaan: string;
  Nama_Lengkap: string;
  Nama_Perusahaan: string;
  NPWP_Perusahaan: string;
  No_Identitas: string;
  No_Hp: string;
  No_Hp_Perusahaan: string;
  Jenis_Kelamin: string;
  Pekerjaan: string;
  Pendidikan_Terakhir: string;
  Alamat_Perusahaan: string;
  Kabupaten_Kota_Perusahaan: string;
  Provinsi_Perusahaan: string;
  Tanggal_Pembuatan_Akun?: string | Date;
};

// Untuk detail keranjang
export interface ItemKeranjang {
  Nama: string;
  Kuantitas: number;
  Pemilik: string;
  Total_Harga: number;
  Nomor_VA?: string;
  ID_Penerimaan: string;
}

// Untuk detail ajukan
export interface AjukanDetail {
  id?: string;
  Nama_Ajukan: string;
  Jenis_Ajukan: string;
  Status_Ajukan: string;
  Tanggal_Pembuatan_Ajukan: Timestamp;
  Tanggal_Masuk?: Timestamp;
  Tanggal_Kadaluwarsa?: Timestamp;
  Keterangan?: string;
}

// Detail pesanan lengkap
export interface OrderDetail {
  idPemesanan: string;
  Nomor_VA?: string;
  Status_Pembayaran: string;
  Status_Pembuatan: string;
  Status_Pesanan: string;
  Status_Pengisian_IKM: string;
  Tanggal_Pemesanan: Timestamp;
  ajukan: AjukanDetail | null;
  keranjang: ItemKeranjang[];
  userPerorangan?: GetPeroranganProfile | null;
  userPerusahaan?: GetPerusahaanProfile | null;
  Keterangan?: string;
  Total_Harga_Pesanan?: number;
}

// Props untuk component
export interface StatusOrderDetailProps {
  detail: OrderDetail;
}
