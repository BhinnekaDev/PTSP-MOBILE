import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import type {
  OrderDetail,
  AjukanDetail,
  ItemKeranjang,
} from '@/interfaces/statusOrderDetailProps';

export const useGetUserDetailOrderInfo = (idPemesanan: string) => {
  const [detail, setDetail] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { profile: userProfile, loading: loadingProfile } = useGetUserProfile();

  useEffect(() => {
    if (!idPemesanan || loadingProfile) return;

    let unsubscribeAjukan: (() => void) | null = null;

    const unsubscribePemesanan = db
      .collection('pemesanan')
      .doc(idPemesanan)
      .onSnapshot(async (docSnap) => {
        if (!docSnap.exists || !docSnap.data()) {
          console.warn('❌ Dokumen pemesanan tidak ditemukan');
          setDetail(null);
          setLoading(false);
          return;
        }

        const pemesananData = docSnap.data();
        const idAjukan = pemesananData?.ID_Ajukan;

        const buildDetail = (ajukanData: AjukanDetail | null) => {
          const keranjangData: ItemKeranjang[] =
            pemesananData?.Data_Keranjang || [];

          setDetail({
            idPemesanan: docSnap.id,
            Status_Pembayaran: pemesananData?.Status_Pembayaran,
            Status_Pembuatan: pemesananData?.Status_Pembuatan,
            Status_Pesanan: pemesananData?.Status_Pesanan,
            Status_Pengisian_IKM: pemesananData?.Status_Pengisian_IKM,
            Tanggal_Pemesanan: pemesananData?.Tanggal_Pemesanan,
            Nomor_VA: pemesananData?.Nomor_VA,
            ajukan: ajukanData,
            keranjang: keranjangData,
            user: userProfile,
            Keterangan: pemesananData?.Keterangan || '',
          });
          setLoading(false);
        };

        if (idAjukan) {
          if (unsubscribeAjukan) unsubscribeAjukan();

          unsubscribeAjukan = db
            .collection('ajukan')
            .doc(idAjukan)
            .onSnapshot((ajukanSnap) => {
              if (ajukanSnap.exists()) {
                const ajukanData = ajukanSnap.data() as AjukanDetail;
                ajukanData.id = ajukanSnap.id;
                buildDetail(ajukanData);
              } else {
                buildDetail(null);
              }
            });
        } else {
          if (unsubscribeAjukan) unsubscribeAjukan();
          buildDetail(null);
        }
      });

    return () => {
      unsubscribePemesanan();
      if (unsubscribeAjukan) unsubscribeAjukan();
    };
  }, [idPemesanan, loadingProfile, userProfile]);

  return { detail, loading };
};
