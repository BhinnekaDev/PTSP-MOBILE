import { Timestamp } from '@react-native-firebase/firestore';

export interface AjukanDetail {
  Nama_Ajukan: string;
  Jenis_Ajukan: string;
  Status_Ajukan: string;
  Tanggal_Pembuatan_Ajukan: Timestamp;
  Keterangan_Ditolak?: string;
  Tanggal_Masuk?: Timestamp;
  Tanggal_Kadaluwarsa?: Timestamp;
  Keterangan?: string;
  id?: string;
}

export interface OrderDetail {
  Status_Pembayaran: string;
  Status_Pembuatan: string;
  Status_Pesanan: string;
  Status_Pengisian_IKM: string;
  Tanggal_Pemesanan: Timestamp;
  ajukan: AjukanDetail;
}

export interface StatusOrderDetail {
  detail: OrderDetail;
}
