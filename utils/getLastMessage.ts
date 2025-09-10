import { FirestoreMessage } from '@/interfaces/messagesProps';

export const getLastMessage = (pesan: FirestoreMessage): string => {
  const { isi, namaFile, urlFile } = pesan;

  return (namaFile || urlFile) && isi
    ? `🖼️ ${namaFile || 'File'} ${isi}`
    : namaFile || urlFile
      ? `🖼️ ${namaFile || 'File'}`
      : isi
        ? isi
        : 'Pesan tanpa teks';
};
