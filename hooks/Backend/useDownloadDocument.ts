import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { db, firebaseAuth } from '@/lib/firebase';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import type { ItemKeranjang } from '@/interfaces/statusOrderDetailProps';

export const useDownloadDocument = () => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async (fileUrl: string) => {
    const fileName = fileUrl.split('%2F').pop()?.split('?')[0] || 'document';
    const localUri = `${FileSystem.documentDirectory}${fileName}`;
    const { uri } = await FileSystem.downloadAsync(fileUrl, localUri);

    if (Platform.OS !== 'web') {
      await Sharing.shareAsync(uri);
    } else {
      window.open(fileUrl, '_blank');
    }

    return fileName;
  };

  const downloadAllFromKeranjang = async (keranjang: ItemKeranjang[]) => {
    if (!keranjang || keranjang.length === 0) {
      Alert.alert('Info', 'Keranjang kosong, tidak ada dokumen untuk diunduh.');
      return;
    }

    setLoading(true);

    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User belum login');

      // Ambil ID_Penerimaan unik dari keranjang
      const uniqueIds = Array.from(
        new Set(keranjang.map((k) => k.ID_Penerimaan))
      );

      const downloadedFiles: string[] = [];

      for (const id of uniqueIds) {
        const docSnap = await db.collection('penerimaan').doc(id).get();
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.File) {
            // jangan filter dengan ID_Pengguna dulu
            const fileName = await downloadFile(data.File);
            downloadedFiles.push(fileName);
          }
        }
      }

      if (downloadedFiles.length === 0) {
        Alert.alert('Info', 'Tidak ada dokumen untuk diunduh.');
      } else {
        Alert.alert(
          'Sukses',
          `Dokumen berikut berhasil diunduh:\n${downloadedFiles.join('\n')}`
        );
      }
    } catch (error: any) {
      console.error('Gagal unduh dokumen:', error);
      Alert.alert(
        'Gagal',
        error.message || 'Terjadi kesalahan saat mengunduh dokumen.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { downloadAllFromKeranjang, loading };
};
