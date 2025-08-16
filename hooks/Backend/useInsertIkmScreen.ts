import { useState, useEffect } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';
import { router } from 'expo-router';
import { Alert } from 'react-native';

// OUR CONSTANTS
import { ikmData, stepsData } from '@/constants/dataIkm';

export type IKMType = 'KualitasLayanan' | 'HarapanKonsumen';

export interface IKMResponse {
  Nama_Pertanyaan: string;
  KualitasLayanan: string;
  HarapanKonsumen: string;
  id: number;
  Name: string;
}

interface OpsiYangDipilihMap {
  [category: string]: string[];
}

export const useInsertIkmScreen = () => {
  const [opsiYangDipilih, setOpsiYangDipilih] = useState<OpsiYangDipilihMap>(
    {}
  );
  const [ikmResponses, setIkmResponses] = useState<IKMResponse[]>([]);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // Inisialisasi jawaban awal
  useEffect(() => {
    const initialResponses: IKMResponse[] = stepsData
      .flatMap((step) => step)
      .map((question, index) => ({
        Nama_Pertanyaan: question.title,
        KualitasLayanan: '',
        HarapanKonsumen: '',
        id: index + 1, // langsung urut 1,2,3…
        Name: question.title,
      }));

    setIkmResponses(initialResponses);
  }, []);

  // Toggle checklist opsi
  const handleSelectOpsi = (item: string) => {
    setOpsiYangDipilih((prev) => {
      const category = ikmData.find((cat) =>
        cat.items.includes(item)
      )?.category;
      if (!category) return prev;

      const itemsInCategory = prev[category] || [];
      const exists = itemsInCategory.includes(item);

      return {
        ...prev,
        [category]: exists
          ? itemsInCategory.filter((i) => i !== item)
          : [...itemsInCategory, item],
      };
    });
  };

  // Set jawaban KualitasLayanan / HarapanKonsumen
  const handleSetResponse = (
    type: IKMType,
    value: string,
    questionTitle: string
  ) => {
    setIkmResponses((prev) =>
      prev.map((resp) =>
        resp.Nama_Pertanyaan === questionTitle
          ? { ...resp, [type]: value }
          : resp
      )
    );
  };

  // Submit IKM
  const handleSubmitIKM = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User belum login');

      if (Object.keys(opsiYangDipilih).length === 0)
        throw new Error('Pilih setidaknya satu opsi');

      const pemesananSnapshot = await db
        .collection('pemesanan')
        .where('ID_Pengguna', '==', user.uid)
        .limit(1)
        .get();

      if (pemesananSnapshot.empty) {
        throw new Error('Pemesanan user tidak ditemukan');
      }

      const idPemesanan = pemesananSnapshot.docs[0].id;

      await db.collection('ikm').doc(idPemesanan).set({
        Opsi_Yang_Dipilih: opsiYangDipilih,
        ikmResponses,
      });

      await db.collection('pemesanan').doc(idPemesanan).update({
        Status_Pengisian_IKM: 'Telah Diisi',
        Status_Pesanan: 'Selesai',
      });

      setOpsiYangDipilih({});
      setIkmResponses([]);
      setAlreadySubmitted(true);

      // Alert sukses dan kembali
      Alert.alert('Sukses', 'IKM berhasil disimpan.');
      router.back();
    } catch (error: any) {
      console.error('Gagal simpan IKM:', error);
      Alert.alert('Gagal', error.message || 'Terjadi kesalahan.');
    }
  };

  return {
    opsiYangDipilih,
    ikmResponses,
    alreadySubmitted,
    handleSelectOpsi,
    handleSetResponse,
    handleSubmitIKM,
  };
};
