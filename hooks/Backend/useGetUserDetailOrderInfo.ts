import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

// OUR PROPS
import type {
  OrderDetail,
  AjukanDetail,
} from '@/interfaces/statusOrderDetailProps';

export const useGetUserDetailOrderInfo = (idPemesanan: string) => {
  const [detail, setDetail] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idPemesanan) return;

    const fetchDetail = async () => {
      try {
        const docSnap = await db.collection('pemesanan').doc(idPemesanan).get();
        if (!docSnap.exists || !docSnap.data()) {
          throw new Error('Pemesanan tidak ditemukan atau kosong');
        }

        const pemesananData = docSnap.data()!;

        let ajukanData: AjukanDetail | null = null;
        if (pemesananData?.ID_Ajukan) {
          const ajukanSnap = await db
            .collection('ajukan')
            .doc(pemesananData.ID_Ajukan)
            .get();
          if (ajukanSnap.exists()) {
            const data = ajukanSnap.data() as AjukanDetail;
            ajukanData = {
              ...data,
              id: ajukanSnap.id, // ✅ Tambahkan ID dokumen ajukan di sini!
            };
          }
        }

        if (pemesananData && ajukanData) {
          setDetail({
            Status_Pembayaran: pemesananData.Status_Pembayaran,
            Status_Pembuatan: pemesananData.Status_Pembuatan,
            Status_Pesanan: pemesananData.Status_Pesanan,
            Status_Pengisian_IKM: pemesananData.Status_Pengisian_IKM,
            Tanggal_Pemesanan: pemesananData.Tanggal_Pemesanan,
            ajukan: ajukanData, // sudah termasuk id
          });
        }
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
