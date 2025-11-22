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

// INTERFACES
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

  // error states untuk UI validation
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();

  // isi data awal
  useEffect(() => {
    if (profile) {
      setNumberPhone(profile.No_Hp || '');
      setEmail(profile.Email || '');
    }
  }, [profile]);

  // VALIDASI PHONE
  useEffect(() => {
    if (!numberPhone.trim()) {
      setPhoneError('Nomor telepon wajib diisi');
    } else if (numberPhone.length < 10) {
      setPhoneError('Nomor telepon terlalu pendek');
    } else if (numberPhone.length > 13) {
      setPhoneError('Nomor telepon terlalu panjang');
    } else {
      setPhoneError(undefined);
    }
  }, [numberPhone]);

  // VALIDASI EMAIL
  useEffect(() => {
    const emailVal = email.trim();

    if (!emailVal) {
      setEmailError('Email wajib diisi');
      return;
    }

    const simpleRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!simpleRegex.test(emailVal)) {
      setEmailError('Format email tidak valid');
    } else {
      setEmailError(undefined);
    }
  }, [email]);

  // HANDLE SAVE
  const handleSave = async (canSubmit: boolean) => {
    if (!canSubmit) return;

    try {
      const cleanedPhone = validationNumber(numberPhone, 13);
      const cleanedEmail = validationEmail(email).trim();

      const user = firebaseAuth.currentUser;
      if (!user) throw new Error('User tidak ditemukan.');

      const isEmailChanged = cleanedEmail !== user.email;

      // re-auth jika email berubah
      if (isEmailChanged) {
        const { idToken } = await GoogleSignin.getTokens();
        const credential = GoogleAuthProvider.credential(idToken);
        await user.reauthenticateWithCredential(credential);

        await user.verifyBeforeUpdateEmail(cleanedEmail, {
          url: 'https://ptspbmkgmobile.page.link',
          handleCodeInApp: true,
          android: {
            packageName: 'com.ptsp.mobile',
            installApp: true,
            minimumVersion: '1',
          },
        });

        await showAlertMessage(
          '📧 Email verifikasi telah dikirim ke email baru kamu.',
          '',
          'warning'
        );
      }

      // update Firestore
      const uid = user.uid;
      const collectionName =
        profile?.tipe === 'perorangan' ? 'perorangan' : 'perusahaan';

      const data: UpdateSecurityData = {
        No_Hp: cleanedPhone,
        Email: cleanedEmail,
      };

      await db.collection(collectionName).doc(uid).update(data);

      await showAlertMessage('Data keamanan berhasil disimpan.', '', 'success');
      onClose();

      if (isEmailChanged) router.back();
    } catch (err: any) {
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

  // nilai submit dari luar UI
  const canSubmit = !phoneError && !emailError;

  return {
    type: profile?.tipe || null,
    profile,
    loading,
    numberPhone,
    setNumberPhone,
    email,
    setEmail,
    phoneError,
    emailError,
    canSubmit,
    handleSave,
  };
};
