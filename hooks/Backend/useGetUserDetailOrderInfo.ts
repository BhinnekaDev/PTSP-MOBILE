import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

export const useGetUserDetailOrderInfo = (idPemesanan: string) => {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idPemesanan) return;

    const fetchDetail = async () => {
      try {
        const docSnap = await db.collection('pemesanan').doc(idPemesanan).get();
        if (!docSnap.exists) throw new Error('Pemesanan tidak ditemukan');

        const pemesananData = docSnap.data();

        let ajukanData = null;
        if (pemesananData?.ID_Ajukan) {
          const ajukanSnap = await db
            .collection('ajukan')
            .doc(pemesananData.ID_Ajukan)
            .get();
          ajukanData = ajukanSnap.exists() ? ajukanSnap.data() : null;
        }

        setDetail({
          id: docSnap.id,
          ...pemesananData,
          ajukan: ajukanData,
        });
      } catch (err) {
        console.error('❌ Gagal fetch detail pemesanan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [idPemesanan]);

  return { detail, loading };
};
