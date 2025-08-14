import { useState, useEffect } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';
import { ikmData, stepsData } from '@/constants/dataIkm';

export type IKMType = 'KualitasLayanan' | 'HarapanKonsumen';

export interface IKMResponse {
  Nama_Pertanyaan: string;
  KualitasLayanan: string;
  HarapanKonsumen: string;
  id: number;
  name: string;
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

  // Inisialisasi ikmResponses dari stepsData
  useEffect(() => {
    const initialResponses: IKMResponse[] = [];
    stepsData.forEach((step, stepIndex) => {
      step.forEach((question, questionIndex) => {
        initialResponses.push({
          Nama_Pertanyaan: question.title,
          KualitasLayanan: '',
          HarapanKonsumen: '',
          id: stepIndex * 100 + questionIndex + 1,
          name: question.title,
        });
      });
    });
    setIkmResponses(initialResponses);
  }, []);

  // Cek apakah user sudah submit
  useEffect(() => {
    const checkSubmission = async () => {
      const user = firebaseAuth.currentUser;
      if (!user) return;

      const snapshot = await db
        .collection('ikm')
        .where('uid', '==', user.uid)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        setAlreadySubmitted(true);
      }
    };

    checkSubmission();
  }, []);

  // Toggle checklist opsi di step pertama
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

  // Set jawaban KualitasLayanan / HarapanKonsumen untuk pertanyaan tertentu
  const handleSetResponse = (
    type: 'KualitasLayanan' | 'HarapanKonsumen',
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

  // Submit ke Firestore
  const handleSubmitIKM = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User belum login');
      if (alreadySubmitted) throw new Error('Anda sudah pernah mengisi IKM');

      if (Object.keys(opsiYangDipilih).length === 0) {
        throw new Error('Pilih setidaknya satu opsi di langkah pertama');
      }

      await db.collection('ikm').add({
        uid: user.uid,
        Opsi_Yang_Dipilih: opsiYangDipilih,
        ikmResponses,
      });

      setOpsiYangDipilih({});
      setIkmResponses([]);
      setAlreadySubmitted(true);
      console.log('IKM berhasil disimpan!');
    } catch (error) {
      console.error('Gagal simpan IKM:', error);
      throw error;
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
