import { useEffect, useState } from 'react';

// LIB
import { firebaseAuth, db } from '@/lib/firebase';

// HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';

// UTILS
import { isValidEmail } from '@/utils/validationEmail';

type UpdateSecurityData = {
  No_Hp: string;
  Email: string;
};

export const useEditSecurityProfile = (onClose: () => void) => {
  const { profile, loading } = useGetUserProfile();

  const [numberPhone, setNumberPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profile) {
      setNumberPhone(profile.No_Hp || '');
      setEmail(profile.Email || '');
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      // VALIDASI SEMUA INPUT
      if (!numberPhone.trim() || !email.trim()) {
        alert('❌ Semua kolom wajib diisi.');
        return;
      }

      // VALIDASI FORMAL NOMOR HP
      if (numberPhone.length < 10 || numberPhone.length > 13) {
        alert('❌ Nomor HP harus terdiri dari 10–13 digit angka.');
        return;
      }

      // VALIDASI FORMAL EMAIL
      if (!isValidEmail(email)) {
        alert('❌ Format email tidak valid.');
        return;
      }

      //   BERDASARKAN USER LOGIN
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User tidak ditemukan.');

      const uid = user.uid;
      const collectionName =
        profile?.tipe === 'perorangan' ? 'perorangan' : 'perusahaan';

      const data: UpdateSecurityData = {
        No_Hp: numberPhone,
        Email: email.trim(),
      };

      await db.collection(collectionName).doc(uid).update(data);

      alert('✅ Data keamanan berhasil disimpan.');
      onClose();
    } catch (err) {
      console.error('❌ Gagal menyimpan data keamanan:', err);
      alert('Terjadi kesalahan saat menyimpan data keamanan.');
    }
  };

  return {
    type: profile?.tipe || null,
    profile,
    loading,
    numberPhone,
    setNumberPhone,
    email,
    setEmail,
    handleSave,
  };
};
