import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
// LIB
import {
  firebaseAuth,
  db,
  GoogleAuthProvider,
  GoogleSignin,
} from '@/lib/firebase';

// HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';

// UTILS
import { isValidEmail } from '@/utils/validationEmail';

type UpdateSecurityData = {
  No_Hp: string;
  Email: string;
};

export const useEditSecurityProfile = (onClose: () => void) => {
  const router = useRouter();
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
      // VALIDASI INPUT
      if (!numberPhone.trim() || !email.trim()) {
        alert('❌ Semua kolom wajib diisi.');
        return;
      }

      if (numberPhone.length < 10 || numberPhone.length > 13) {
        alert('❌ Nomor HP harus terdiri dari 10–13 digit angka.');
        return;
      }

      if (!isValidEmail(email)) {
        alert('❌ Format email tidak valid.');
        return;
      }

      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User tidak ditemukan.');

      const isEmailChanged = email.trim() !== user.email;

      // Jika email berubah, lakukan re-auth dan kirim verifikasi
      if (isEmailChanged) {
        const { idToken } = await GoogleSignin.getTokens();
        const credential = GoogleAuthProvider.credential(idToken);
        await user.reauthenticateWithCredential(credential);

        await user.verifyBeforeUpdateEmail(email.trim(), {
          url: 'https://ptspbmkgmobile.page.link',
          handleCodeInApp: true,
          android: {
            packageName: 'com.ptsp.mobile',
            installApp: true,
            minimumVersion: '1',
          },
        });

        alert(
          '📧 Email verifikasi telah dikirim ke email baru kamu. Silakan cek dan klik link verifikasi untuk menyelesaikan perubahan email.'
        );
        console.log('✅ verifyBeforeUpdateEmail dijalankan');
      }

      // Update Firestore TANPA kondisi khusus
      const uid = user.uid;
      const collectionName =
        profile?.tipe === 'perorangan' ? 'perorangan' : 'perusahaan';

      const data: UpdateSecurityData = {
        No_Hp: numberPhone,
        Email: email.trim(),
      };

      console.log('📝 Mengupdate Firestore dengan data:', data);
      await db.collection(collectionName).doc(uid).update(data);
      console.log('✅ Firestore berhasil diupdate');

      alert('✅ Data keamanan berhasil disimpan.');
      onClose();

      // Kembali hanya jika email berubah (untuk menghindari bug routing)
      if (isEmailChanged) router.back();
    } catch (err: any) {
      console.log('❌ Masuk ke blok catch error');
      console.error('Gagal menyimpan data keamanan:', err);

      if (err.code === 'auth/requires-recent-login') {
        alert('⚠️ Demi keamanan, silakan login ulang untuk ubah email.');
      } else if (err.code === 'auth/email-already-in-use') {
        alert('⚠️ Email ini sudah digunakan oleh akun lain.');
      } else {
        alert(err.message || 'Terjadi kesalahan saat menyimpan data keamanan.');
      }
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
