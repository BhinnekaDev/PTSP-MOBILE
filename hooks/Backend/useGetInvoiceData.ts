import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import type {
  OrderDetail,
  AjukanDetail,
  ItemKeranjang,
} from '@/interfaces/statusOrderDetailProps';
import type { UserProfile } from '@/hooks/Backend/useGetUserProfile';

export const useGetInvoiceData = (idPemesanan?: string) => {
  const [detail, setDetail] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idPemesanan) return;

    setLoading(true);

    const unsubscribe = db
      .collection('pemesanan')
      .doc(idPemesanan)
      .onSnapshot(async (docSnap) => {
        if (!docSnap.exists) {
          setDetail(null);
          setLoading(false);
          return;
        }

        const pemesananData = docSnap.data();
        const idAjukan = pemesananData?.ID_Ajukan;
        const idUser = pemesananData?.ID_Pengguna;

        // Ambil data user
        let userProfile: UserProfile | null = null;
        const peroranganSnap = await db
          .collection('perorangan')
          .doc(idUser)
          .get();
        const perusahaanSnap = await db
          .collection('perusahaan')
          .doc(idUser)
          .get();

        if (peroranganSnap.exists())
          userProfile = {
            ...(peroranganSnap.data() as any),
            tipe: 'perorangan',
          };
        else if (perusahaanSnap.exists())
          userProfile = {
            ...(perusahaanSnap.data() as any),
            tipe: 'perusahaan',
          };

        // Ambil data ajukan
        let ajukanData: AjukanDetail | null = null;
        if (idAjukan) {
          const ajukanSnap = await db.collection('ajukan').doc(idAjukan).get();
          if (ajukanSnap.exists())
            ajukanData = {
              ...(ajukanSnap.data() as AjukanDetail),
              id: ajukanSnap.id,
            };
        }

        // Ambil keranjang
        const keranjangRaw: any[] = pemesananData?.Data_Keranjang || [];
        const keranjangData: ItemKeranjang[] = keranjangRaw.map((item) => ({
          Nama: item.Nama,
          Kuantitas: item.Kuantitas,
          Pemilik: item.Pemilik,
          Total_Harga: item.Total_Harga,
          Nomor_VA: item.Nomor_VA,
          ID_Penerimaan: item.ID_Penerimaan,
          Harga: item.Harga,
        }));

        setDetail({
          idPemesanan: docSnap.id,
          Status_Pembayaran: pemesananData?.Status_Pembayaran,
          Status_Pembuatan: pemesananData?.Status_Pembuatan,
          Status_Pesanan: pemesananData?.Status_Pesanan,
          Status_Pengisian_IKM: pemesananData?.Status_Pengisian_IKM,
          Tanggal_Pemesanan: pemesananData?.Tanggal_Pemesanan || null,
          Nomor_VA: pemesananData?.Nomor_VA,
          Keterangan: pemesananData?.Keterangan,
          Total_Harga_Pesanan: pemesananData?.Total_Harga_Pesanan,
          user: userProfile,
          ajukan: ajukanData,
          keranjang: keranjangData,
          ID_Transaksi: pemesananData?.ID_Transaksi || null,
        });

        setLoading(false);
      });

    return () => unsubscribe();
  }, [idPemesanan]);

  return { detail, loading };
};
