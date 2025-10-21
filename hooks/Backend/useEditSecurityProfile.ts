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

// OUR INTERFACES
import {
  GetPeroranganProfile,
  GetPerusahaanProfile,
} from '@/interfaces/getUserProfileProps';

// UTILS
import { validationEmail } from '@/utils/validationEmail';
import { validationNumber } from '@/utils/validationNumber';
import { showAlertMessage } from '@/utils/showAlertMessage';

type UpdateSecurityData =
  | Pick<GetPeroranganProfile, 'No_Hp' | 'Email'>
  | Pick<GetPerusahaanProfile, 'No_Hp' | 'Email'>;

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
      const cleanedPhone = validationNumber(numberPhone, 13);
      const cleanedEmail = validationEmail(email);

      if (!cleanedPhone.trim() || !cleanedEmail.trim()) {
        await showAlertMessage('Semua kolom wajib diisi.', '', 'error');
        return;
      }

      if (cleanedPhone.length < 10 || cleanedPhone.length > 13) {
        await showAlertMessage(
          'Nomor HP harus terdiri dari 10–13 digit angka.',
          '',
          'error'
        );
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanedEmail)) {
        await showAlertMessage('Format email tidak valid.', '', 'error');
        return;
      }

      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User tidak ditemukan.');

      const isEmailChanged = cleanedEmail.trim() !== user.email;

      if (isEmailChanged) {
        const { idToken } = await GoogleSignin.getTokens();
        const credential = GoogleAuthProvider.credential(idToken);
        await user.reauthenticateWithCredential(credential);

        await user.verifyBeforeUpdateEmail(cleanedEmail.trim(), {
          url: 'https://ptspbmkgmobile.page.link',
          handleCodeInApp: true,
          android: {
            packageName: 'com.ptsp.mobile',
            installApp: true,
            minimumVersion: '1',
          },
        });

        await showAlertMessage(
          '📧 Email verifikasi telah dikirim ke email baru kamu. Silakan cek dan klik link verifikasi untuk menyelesaikan perubahan email.',
          '',
          'warning'
        );
        // console.log('verifyBeforeUpdateEmail dijalankan');
      }

      const uid = user.uid;
      const collectionName =
        profile?.tipe === 'perorangan' ? 'perorangan' : 'perusahaan';

      const data: UpdateSecurityData = {
        No_Hp: cleanedPhone,
        Email: cleanedEmail.trim(),
      };

      // console.log('📝 Mengupdate Firestore dengan data:', data);
      await db.collection(collectionName).doc(uid).update(data);
      // console.log('✅ Firestore berhasil diupdate');

      await showAlertMessage('Data keamanan berhasil disimpan.', '', 'success');
      onClose();

      if (isEmailChanged) router.back();
    } catch (err: any) {
      // console.log('❌ Masuk ke blok catch error');
      // console.error('Gagal menyimpan data keamanan:', err);

      if (err.code === 'auth/requires-recent-login') {
        await showAlertMessage(
          '⚠️ Demi keamanan, silakan login ulang untuk ubah email.',
          '',
          'warning'
        );
      } else if (err.code === 'auth/email-already-in-use') {
        await showAlertMessage(
          '⚠️ Email ini sudah digunakan oleh akun lain.',
          '',
          'warning'
        );
      } else {
        await showAlertMessage(
          err.message || 'Terjadi kesalahan saat menyimpan data keamanan.',
          '',
          'error'
        );
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
