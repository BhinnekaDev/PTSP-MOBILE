import { useEffect, useState } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';

type GetPeroranganProfile = {
  Email: string;
  Nama_Lengkap: string;
  No_Identitas: string;
  Jenis_Kelamin: string;
  Pekerjaan: string;
  Pendidikan_Terakhir: string;
  No_Hp: string;
  Tanggal_Pembuatan_Akun?: string | Date;
};

type GetPerusahaanProfile = {
  Email: string;
  Email_Perusahaan: string;
  Nama_Lengkap: string;
  Nama_Perusahaan: string;
  NPWP_Perusahaan: string;
  No_Identitas: string;
  No_Hp: string;
  No_Hp_Perusahaan: string;
  Jenis_Kelamin: string;
  Pekerjaan: string;
  Pendidikan_Terakhir: string;
  Alamat_Perusahaan: string;
  Kabupaten_Kota_Perusahaan: string;
  Provinsi_Perusahaan: string;
  Tanggal_Pembuatan_Akun?: string | Date;
};

type UserProfile =
  | (GetPeroranganProfile & { tipe: 'perorangan' })
  | (GetPerusahaanProfile & { tipe: 'perusahaan' })
  | null;

export const useGetUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = firebaseAuth.currentUser;
        if (!user) throw new Error('User belum login');
        const uid = user.uid;

        const peroranganSnap = await db.collection('perorangan').doc(uid).get();
        if (peroranganSnap.exists()) {
          setProfile({
            ...(peroranganSnap.data() as GetPeroranganProfile),
            tipe: 'perorangan',
          });
          return;
        }

        const perusahaanSnap = await db.collection('perusahaan').doc(uid).get();
        if (perusahaanSnap.exists()) {
          setProfile({
            ...(perusahaanSnap.data() as GetPerusahaanProfile),
            tipe: 'perusahaan',
          });
          return;
        }

        setProfile(null);
      } catch (err) {
        console.error('❌ Gagal mengambil profil pengguna:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
};
