import { db, firebaseAuth, serverTimestamp } from '@/lib/firebase';

type IndividualData = {
  Nama_Lengkap: string;
  Jenis_Kelamin: string;
  Pekerjaan: string;
  Pendidikan_Terakhir: string;
  No_Hp: string;
};

export const useIndividualRegister = () => {
  const register = async (data: IndividualData) => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User belum login');

      const now = serverTimestamp();

      await db
        .collection('perorangan')
        .doc(user.uid)
        .set({
          Email: user.email,
          ...data,
          Tanggal_Pembuatan_Akun: now,
        });

      console.log('✅ Registrasi perorangan berhasil disimpan ke Firestore');
    } catch (error) {
      console.error('❌ Gagal menyimpan registrasi:', error);
      throw error;
    }
  };

  const fetchCurrentUserData = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User belum login');

      const doc = await db.collection('perorangan').doc(user.uid).get();

      if (!doc.exists) {
        console.log('📭 Data tidak ditemukan');
        return null;
      }

      const data = doc.data();
      console.log('📦 Data User Terkini:', data);
      return data;
    } catch (error) {
      console.error('❌ Gagal mengambil data perorangan terkini:', error);
      throw error;
    }
  };

  return { register, fetchCurrentUserData };
};
