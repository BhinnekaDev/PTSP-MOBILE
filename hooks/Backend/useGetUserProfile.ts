import { useEffect, useState } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';
import type {
  GetPeroranganProfile,
  GetPerusahaanProfile,
} from '@/interfaces/GetUserProfileProps';

export type UserProfile =
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
