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

    // 1. Hapus folder awal: File_Ajukan/{user.uid}/{namaAjukan}
    const safeNamaAjukan = namaAjukan.replace(/[^\w\s-]/gi, '');
    const oldFolderPath = `File_Ajukan/${user.uid}/${safeNamaAjukan}`;
    const oldFolderRef = firebaseStorage.ref(oldFolderPath);
    const oldFiles = await oldFolderRef.listAll();

    if (oldFiles.items.length) {
      // console.log(
      //   `🧹 Menghapus ${oldFiles.items.length} file dari ${oldFolderPath}`
      // );
      await Promise.all(oldFiles.items.map((item) => item.delete()));
    }

    // 2. Hapus file sebelumnya dari path baru: File_Ajukan/{ajukanID}
    const newFolderPath = `File_Ajukan/${ajukanID}`;
    const newFolderRef = firebaseStorage.ref(newFolderPath);
    const existingFiles = await newFolderRef.listAll();

    if (existingFiles.items.length) {
      // console.log(
      //   `🧹 Menghapus ${existingFiles.items.length} file dari ${newFolderPath}`
      // );
      await Promise.all(existingFiles.items.map((item) => item.delete()));
    }

    // 3. Upload file baru ke path baru
    const uploadedUrls: string[] = [];

    for (const [key, file] of Object.entries(uploadedFiles)) {
      if (!file.base64) continue;

      const path = `${newFolderPath}/${key}-${file.name}`;
      const fileRef = firebaseStorage.ref(path);

      await fileRef.putString(file.base64, 'base64', {
        contentType: file.mimeType,
      });

      const downloadURL = await fileRef.getDownloadURL();
      uploadedUrls.push(downloadURL);

      // console.log(`✅ File ${key}: ${file.name} di-upload ke ${path}`);
    }

    // 4. Update dokumen 'ajukan'
    await ajukanRef.update({
      File_Ajukan: uploadedUrls,
      Status_Ajukan: 'Sedang Ditinjau',
      Tanggal_Pengajuan_Ulang: serverTimestamp(),
    });
    // console.log('📦 Dokumen ajukan berhasil diperbarui.');

    // 5. Update status pada 'pemesanan'
    const jenis = ajukanData.Jenis_Ajukan;
    const statusPemesanan =
      jenis === 'Berbayar' ? 'Menunggu Pembayaran' : 'Sedang Ditinjau';

    const pemesananSnap = await db
      .collection('pemesanan')
      .where('ID_Ajukan', '==', ajukanID)
      .get();

    await Promise.all(
      pemesananSnap.docs.map((doc) =>
        doc.ref.update({ Status_Pemesanan: statusPemesanan })
      )
    );

    // console.log('📦 Dokumen pemesanan berhasil diperbarui.');
  };

  return { handleFixSubmission };
};
