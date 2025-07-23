import { showMessage } from 'react-native-flash-message';
import {
  db,
  firebaseAuth,
  serverTimestamp,
  firebaseStorage,
} from '@/lib/firebase';

// OUR CONSTANTS
import { submissionOptions } from '@/constants/submissionOptions';

// OUR PROPS
import CartItemProps from '@/interfaces/cartItemProps';

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

// 🔽 Generate ID_Transaksi unik maksimal 16 digit
const generateIdTransaksi = (length = 16) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  while (result.length < length) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

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
      // 🔽 Ambil label kegiatan dari submissionOptions
      const selectedData = submissionOptions.find(
        (item) => `${item.label} (${item.jenisAjukan})` === selectedJenis
      );

      if (!selectedData) {
        showMessage({
          message: 'Data Tidak Valid',
          description: 'Jenis kegiatan yang dipilih tidak dikenali.',
          type: 'danger',
        });
        return;
      }

      const namaAjukan = selectedData?.label || 'Unknown';

      // 🔽 Upload semua file ke Firebase Storage
      const fileUrls: string[] = [];
      for (const [, file] of Object.entries(uploadedFiles)) {
        if (!file.base64) continue; // skip kalau base64 kosong
        const safeNamaAjukan = namaAjukan.replace(/[^\w\s-]/gi, '');
        const path = `File_Ajukan/${user.uid}/${safeNamaAjukan}/${Date.now()}_${file.name}`;
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
        Nama_Ajukan: selectedData.label,
        File_Ajukan: fileUrls,
        Status_Ajukan: 'Sedang Ditinjau',
        Tanggal_Pembuatan_Ajukan: serverTimestamp(),
      });

      // 🔽 Ambil data keranjang langsung dari Firestore
      const cartDoc = await db.collection('keranjang').doc(user.uid).get();
      let cartData: CartItemProps[] = [];
      if (cartDoc.exists()) {
        const data = cartDoc.data();

        const informasiItems: CartItemProps[] = (data?.Informasi || []).map(
          (item: Omit<CartItemProps, 'Jenis_Produk'>) => ({
            ...item,
            Jenis_Produk: 'Informasi',
          })
        );

        const jasaItems: CartItemProps[] = (data?.Jasa || []).map(
          (item: Omit<CartItemProps, 'Jenis_Produk'>) => ({
            ...item,
            Jenis_Produk: 'Jasa',
          })
        );

        cartData = [...informasiItems, ...jasaItems];
      }

      // 🔽 Hitung total harga
      const totalHarga = cartData.reduce((total, item) => {
        return total + (item.Total_Harga || 0);
      }, 0);

      const sanitizedCartData = cartData.map((item) => {
        const baseItem = {
          Nama: item.Nama,
          Harga: item.Harga,
          Kuantitas: item.Kuantitas,
          Total_Harga: item.Total_Harga,
          Pemilik: item.Pemilik,
          Jenis_Produk: item.ID_Informasi ? 'Informasi' : 'Jasa',
        };

        if (jenisAjukan === 'Berbayar') {
          return {
            ...baseItem,
            Nomor_VA: '', // hanya kalau berbayar
          };
        }

        return baseItem; // kalau gratis, tidak ada Nomor_VA
      });

      // 🔽 Siapkan data pemesanan
      const pemesananData: any = {
        ID_Ajukan: ajukanDoc.id,
        ID_Pengguna: user.uid,
        Data_Keranjang: sanitizedCartData,
        Status_Pembuatan: 'Menunggu Pembuatan',
        Status_Pesanan: 'Belum Selesai',
        Status_Pembayaran: 'Menunggu Pembayaran',
        Tanggal_Pemesanan: serverTimestamp(),
        Total_Harga_Pesanan: totalHarga,
      };

      // 🔽 Tambahkan ID_Transaksi jika jenisAjukan adalah 'Berbayar'
      if (jenisAjukan === 'Berbayar') {
        pemesananData.ID_Transaksi = generateIdTransaksi();
      }

      // 🔽 Buat dokumen di koleksi "pemesanan"
      await db.collection('pemesanan').add(pemesananData);

      // 🔽 Hapus data keranjang setelah submit
      await db.collection('keranjang').doc(user.uid).update({
        Informasi: [],
        Jasa: [],
      });

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
