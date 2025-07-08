import {
  db,
  firebaseAuth,
  serverTimestamp,
  firebaseStorage,
} from '@/lib/firebase';
import { showMessage } from 'react-native-flash-message';

interface SubmitSubmissionOptions {
  selectedJenis: string;
  jenisAjukan: string;
  uploadedFiles: Record<
    string,
    {
      name: string;
      base64: string | null;
      mimeType: string;
      size: number;
    }
  >;
}

export const useSubmitSubmission = () => {
  const submit = async ({
    selectedJenis,
    jenisAjukan,
    uploadedFiles,
  }: SubmitSubmissionOptions) => {
    const user = firebaseAuth.currentUser;
    if (!user) {
      showMessage({
        message: 'Login Diperlukan',
        description: 'Silakan login untuk melakukan pengajuan.',
        type: 'warning',
      });
      return;
    }

    try {
      // 🔽 Upload semua file ke Firebase Storage
      const fileUrls: string[] = [];
      for (const [, file] of Object.entries(uploadedFiles)) {
        if (!file.base64) continue; // skip kalau base64 kosong
        const path = `ajukan/${user.uid}/${Date.now()}_${file.name}`;
        const ref = firebaseStorage.ref(path);
        await ref.putString(file.base64, 'base64', {
          contentType: file.mimeType,
        });
        const url = await ref.getDownloadURL();
        fileUrls.push(url);
      }

      // 🔽 Buat dokumen di koleksi "ajukan"
      const ajukanDoc = await db.collection('ajukan').add({
        Jenis_Ajukan: jenisAjukan,
        Nama_Ajukan: selectedJenis,
        File_Ajukan: fileUrls,
        Status_Ajuan: 'Menunggu',
        Tanggal_Pembuatan_Ajukan: serverTimestamp(),
      });

      // 🔽 Ambil data keranjang langsung dari Firestore
      const cartDoc = await db.collection('keranjang').doc(user.uid).get();
      let cartData: any[] = [];
      if (cartDoc.exists()) {
        const data = cartDoc.data();
        const informasiItems = data?.Informasi || [];
        const jasaItems = data?.Jasa || [];
        cartData = [...informasiItems, ...jasaItems];
      }

      // 🔽 Hitung total harga
      const totalHarga = cartData.reduce((total, item) => {
        return total + (item.Total_Harga || 0);
      }, 0);

      // 🔽 Buat dokumen di koleksi "pemesanan"
      await db.collection('pemesanan').add({
        ID_Ajukan: ajukanDoc.id,
        ID_Pengguna: user.uid,
        Data_Keranjang: cartData,
        Status_Pesanan: 'Menunggu',
        Status_Pembuatan: 'Belum Diproses',
        Status_Pembayaran: jenisAjukan,
        Tanggal_Pemesanan: serverTimestamp(),
        Total_Harga_Pesanan: totalHarga,
      });

      // 🔽 Hapus data keranjang setelah submit
      await db.collection('keranjang').doc(user.uid).delete();

      // ✅ Sukses
      showMessage({
        message: 'Pengajuan Berhasil',
        description: 'Data berhasil dikirim dan keranjang telah dikosongkan.',
        type: 'success',
      });
    } catch (error: any) {
      console.error('❌ Error saat submit pengajuan:', error);
      showMessage({
        message: 'Terjadi Kesalahan',
        description: error.message || 'Gagal submit pengajuan.',
        type: 'danger',
      });
    }
  };

  return { submit };
};
