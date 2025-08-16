import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { db } from '@/lib/firebase';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import type { ItemKeranjang } from '@/interfaces/statusOrderDetailProps';

export const useDownloadDocument = () => {
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Download dokumen tunggal dari koleksi penerimaan berdasarkan ID_Penerimaan
   */
  const downloadDocument = async (idPenerimaan: string) => {
    try {
      setLoading(true);

      const docRef = db.collection('penerimaan').doc(idPenerimaan);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        throw new Error('Dokumen penerimaan tidak ditemukan');
      }

      const data = docSnap.data();
      const fileUrl = data?.File;

      if (!fileUrl) {
        throw new Error('File tidak tersedia');
      }

      const fileName = fileUrl.split('%2F').pop()?.split('?')[0] || 'document';
      const localUri = `${FileSystem.documentDirectory}${fileName}`;

      const { uri } = await FileSystem.downloadAsync(fileUrl, localUri);

      if (Platform.OS === 'web') {
        window.open(fileUrl, '_blank');
      } else {
        await Sharing.shareAsync(uri);
      }

      setLoading(false);
      Alert.alert('Sukses', `Dokumen "${fileName}" berhasil diunduh!`);
    } catch (error: any) {
      setLoading(false);
      console.error('Gagal unduh dokumen:', error);
      Alert.alert(
        'Gagal',
        error.message || 'Terjadi kesalahan saat mengunduh dokumen.'
      );
    }
  };

  /**
   * Download semua dokumen dari keranjang
   */
  const downloadAllFromKeranjang = async (keranjang: ItemKeranjang[]) => {
    if (!keranjang || keranjang.length === 0) {
      Alert.alert('Info', 'Keranjang kosong, tidak ada dokumen untuk diunduh.');
      return;
    }

    for (const item of keranjang) {
      await downloadDocument(item.ID_Penerimaan);
    }
  };

  return { downloadDocument, downloadAllFromKeranjang, loading };
};
