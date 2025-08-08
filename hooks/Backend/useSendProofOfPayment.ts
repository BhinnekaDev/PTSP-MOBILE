import {
  firebaseAuth,
  firebaseStorage,
  db,
  serverTimestamp,
} from '@/lib/firebase';
import { UploadFileProps } from '@/interfaces/uploadFileProps';

type SendProofParams = {
  paymentID: string;
  uploadedFiles: Record<string, UploadFileProps[]>;
};

export const useSendProofOfPayment = () => {
  const handleSendProof = async ({
    paymentID,
    uploadedFiles,
  }: SendProofParams) => {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error('User tidak ditemukan.');

    const pemesananRef = db.collection('pemesanan').doc(paymentID);
    const pemesananSnap = await pemesananRef.get();
    const pemesananData = pemesananSnap.data();

    if (!pemesananData || !pemesananData.ID_Transaksi) {
      throw new Error('ID Transaksi tidak ditemukan di pemesanan.');
    }

    const idTransaksi = pemesananData.ID_Transaksi;
    const transaksiRef = db.collection('transaksi').doc(idTransaksi);
    const transaksiSnap = await transaksiRef.get();
    const transaksiData = transaksiSnap.data();

    const folderPath = `Bukti_Pembayaran`;
    const folderRef = firebaseStorage.ref(folderPath);

    // Ambil file lama dari Firestore
    const oldUrls: string[] = transaksiData?.Bukti_Pembayaran || [];

    // Ambil semua file di folder Bukti_Pembayaran
    const allFiles = await folderRef.listAll();

    // Hapus hanya file yang memiliki token cocok dari URL lama
    const getTokenFromUrl = (url: string) => {
      const tokenMatch = url.match(/token=([a-zA-Z0-9\-]+)/);
      return tokenMatch?.[1] || null;
    };

    const oldTokens = oldUrls
      .map((url) => getTokenFromUrl(url))
      .filter(Boolean);

    const deletePromises = allFiles.items.map(async (item) => {
      const url = await item.getDownloadURL();
      const token = getTokenFromUrl(url);

      if (token && oldTokens.includes(token)) {
        await item.delete();
      }
    });

    await Promise.all(deletePromises);

    // Upload file baru
    const fileUrls: string[] = [];

    for (const [, files] of Object.entries(uploadedFiles)) {
      for (const file of files) {
        if (!file.base64) continue;

        const uniqueFileName = `Bukti Pembayaran-${Date.now()}-${file.name}`;
        const filePath = `${folderPath}/${uniqueFileName}`;
        const fileRef = firebaseStorage.ref(filePath);

        await fileRef.putString(file.base64, 'base64', {
          contentType: file.mimeType,
        });

        const downloadUrl = await fileRef.getDownloadURL();
        fileUrls.push(downloadUrl);
      }
    }

    // Update transaksi
    await transaksiRef.set(
      {
        Bukti_Pembayaran: fileUrls,
        Tanggal_Pengiriman_Bukti: serverTimestamp(),
      },
      { merge: true }
    );

    // Update status di pemesanan
    await pemesananRef.update({
      Status_Pembayaran: 'Sedang Ditinjau',
    });
  };

  return { handleSendProof };
};
