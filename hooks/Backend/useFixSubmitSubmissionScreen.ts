import {
  firebaseAuth,
  firebaseStorage,
  db,
  serverTimestamp,
} from '@/lib/firebase';

import { UploadFileProps } from '@/interfaces/uploadFileProps';

type FixSubmissionParams = {
  ajukanID: string;
  namaAjukan: string;
  uploadedFiles: Record<string, UploadFileProps>;
  jenisAjukan: string;
};

export const useFixSubmissionScreen = () => {
  const handleFixSubmission = async ({
    ajukanID,
    namaAjukan,
    uploadedFiles,
  }: FixSubmissionParams) => {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error('User tidak ditemukan.');

    const ajukanRef = db.collection('ajukan').doc(ajukanID);
    const ajukanSnap = await ajukanRef.get();
    const ajukanData = ajukanSnap.data();
    if (!ajukanData) throw new Error('Data ajukan tidak ditemukan.');

    // ✅ Hapus semua file lama di folder baru
    const folderRef = firebaseStorage.ref(`File_Ajukan/${ajukanID}`);
    const existingFiles = await folderRef.listAll();
    await Promise.all(existingFiles.items.map((item) => item.delete()));
    console.log('🗑️ File lama dihapus dari:', `File_Ajukan/${ajukanID}`);

    // ✅ Upload file baru
    const fileUrls: string[] = [];
    for (const [, file] of Object.entries(uploadedFiles)) {
      if (!file.base64) continue;

      const path = `File_Ajukan/${ajukanID}/${file.name}`;
      const fileRef = firebaseStorage.ref(path);

      await fileRef.putString(file.base64, 'base64', {
        contentType: file.mimeType,
      });

      const downloadURL = await fileRef.getDownloadURL();
      fileUrls.push(downloadURL);
    }

    // ✅ Update data ajukan
    await ajukanRef.update({
      File_Ajukan: fileUrls,
      Status_Ajukan: 'Sedang Ditinjau',
      Tanggal_Pengajuan_Ulang: serverTimestamp(),
    });

    // ✅ Update status pemesanan
    const jenis = ajukanData.Jenis_Ajukan;
    const statusBaru =
      jenis === 'Berbayar' ? 'Menunggu Pembayaran' : 'Sedang Ditinjau';

    const pemesananSnap = await db
      .collection('pemesanan')
      .where('ID_Ajukan', '==', ajukanID)
      .get();

    await Promise.all(
      pemesananSnap.docs.map((doc) =>
        doc.ref.update({ Status_Pemesanan: statusBaru })
      )
    );

    console.log('✅ Pengajuan berhasil diperbarui.');
  };

  return { handleFixSubmission };
};
