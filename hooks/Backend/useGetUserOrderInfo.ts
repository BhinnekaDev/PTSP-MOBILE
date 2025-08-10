import { useEffect, useState } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';
import { Timestamp } from '@react-native-firebase/firestore';

type OrderInfo = {
  tipe: 'perorangan' | 'perusahaan';
  namaLengkap: string;
  namaPerusahaan?: string;
  email: string;
  emailPerusahaan?: string;
  noHp: string;
  noHpPerusahaan?: string;
};

type PemesananData = {
  idAjukan: string;
  id: string;
  statusPembayaran: string;
  tanggalPemesanan: Timestamp;
  statusPesanan: string;
  tanggalPengajuan?: Timestamp;
};

export const useGetUserOrderInfo = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [listPemesanan, setListPemesanan] = useState<PemesananData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebaseAuth.currentUser;
        if (!user) throw new Error('User belum login');

        const uid = user.uid;

        // Ambil profil
        const peroranganDoc = await db.collection('perorangan').doc(uid).get();
        if (peroranganDoc.exists()) {
          const data = peroranganDoc.data()!;
          setOrderInfo({
            tipe: 'perorangan',
            namaLengkap: data.Nama_Lengkap || '',
            email: data.Email || '',
            noHp: data.No_Hp || '',
          });
        }

        const perusahaanDoc = await db.collection('perusahaan').doc(uid).get();
        if (perusahaanDoc.exists()) {
          const data = perusahaanDoc.data()!;
          setOrderInfo({
            tipe: 'perusahaan',
            namaLengkap: data.Nama_Lengkap || '',
            namaPerusahaan: data.Nama_Perusahaan || '',
            email: data.Email || '',
            emailPerusahaan: data.Email_Perusahaan || '',
            noHp: data.No_Hp || '',
            noHpPerusahaan: data.No_Hp_Perusahaan || '',
          });
        }

        // Ambil semua pemesanan
        const pemesananSnap = await db
          .collection('pemesanan')
          .where('ID_Pengguna', '==', uid)
          .orderBy('Tanggal_Pemesanan', 'desc')
          .get();

        const list: PemesananData[] = await Promise.all(
          pemesananSnap.docs.map(async (doc) => {
            const data = doc.data();
            let tanggalPengajuan: Date | undefined = undefined;

            try {
              const ajukanDoc = await db
                .collection('ajukan')
                .doc(data.ID_Ajukan)
                .get();

              if (ajukanDoc.exists()) {
                const ajukanData = ajukanDoc.data();
                if (ajukanData?.Tanggal_Pengajuan) {
                  tanggalPengajuan = ajukanData.Tanggal_Pengajuan.toDate();
                } else if (ajukanData?.Tanggal_Pembuatan_Ajukan) {
                  tanggalPengajuan =
                    ajukanData.Tanggal_Pembuatan_Ajukan.toDate();
                }
              }
            } catch (err) {
              console.warn(`❗ Gagal ambil ajukan untuk ${doc.id}`, err);
            }

            return {
              id: doc.id,
              tanggalPemesanan: data.Tanggal_Pemesanan,
              idAjukan: data.ID_Ajukan || '',
              statusPembayaran: data.Status_Pembayaran || '',
              statusPesanan: data.Status_Pesanan || '',
              tanggalPengajuan: tanggalPengajuan
                ? Timestamp.fromDate(tanggalPengajuan)
                : undefined,
            };
          })
        );

        setListPemesanan(list);
      } catch (err) {
        console.error('❌ Gagal mengambil data user dan pemesanan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    orderInfo,
    listPemesanan,
    loading,
  };
};
