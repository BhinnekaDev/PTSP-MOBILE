import { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface SubmitSubmissionProps {
  jenisAjukan: 'Gratis' | 'Berbayar';
  namaAjukan: string;
  fileAjukan: string[]; // array of file URLs
  dataKeranjang: any[]; // isi dari dokumen `keranjang`
  totalHarga: number;
}

export function useSubmitSubmission() {
  const [loading, setLoading] = useState(false);

  const submitSubmission = async ({
    jenisAjukan,
    namaAjukan,
    fileAjukan,
    dataKeranjang,
    totalHarga,
  }: SubmitSubmissionProps) => {
    setLoading(true);
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User belum login.');

      const userId = user.uid;
      const now = new Date();

      // 1️⃣ Buat dokumen `ajukan`
      const ajukanRef = await firestore().collection('ajukan').add({
        Jenis_Ajukan: jenisAjukan,
        Nama_Ajukan: namaAjukan,
        File_Ajukan: fileAjukan,
        Status_Ajuan: 'Sedang Ditinjau',
        Tanggal_Pembuatan_Ajukan: now,
      });

      // 2️⃣ Buat dokumen `pemesanan`
      await firestore()
        .collection('pemesanan')
        .add({
          ID_Ajukan: ajukanRef.id,
          ID_Pengguna: userId,
          Data_Keranjang: dataKeranjang,
          Status_Pesanan: 'Menunggu Pembayaran',
          Status_Pembuatan: 'Menunggu',
          Status_Pembayaran:
            jenisAjukan === 'Berbayar' ? 'Belum Dibayar' : 'Gratis',
          Tanggal_Pemesanan: now,
          Total_Harga_Pesanan: totalHarga,
        });

      // 3️⃣ Hapus keranjang user
      await firestore().collection('keranjang').doc(userId).delete();

      Alert.alert('Sukses', 'Pengajuan dan pemesanan berhasil dibuat.');
      return { success: true };
    } catch (error: any) {
      console.error('Gagal membuat pengajuan:', error);
      Alert.alert(
        'Gagal',
        error.message || 'Terjadi kesalahan saat mengajukan.'
      );
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { submitSubmission, loading };
}
