import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  db,
  firebaseAuth,
  GoogleAuthProvider,
  GoogleSignin,
  statusCodes,
} from '@/lib/firebase';
import '@/lib/auth/googleConfig';

// HOOKS & UTILS
import { useInternetStatus } from '@/hooks/Backend/useInternetStatus';
import { showAlertMessage } from '@/utils/showAlertMessage';

export const useGoogleLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isConnected } = useInternetStatus(); // 🌐 Pantau status internet realtime

  const checkUserRegistration = async (uid: string) => {
    const peroranganRef = db.collection('perorangan').doc(uid);
    const perusahaanRef = db.collection('perusahaan').doc(uid);
    const [peroranganDoc, perusahaanDoc] = await Promise.all([
      peroranganRef.get(),
      perusahaanRef.get(),
    ]);
    if (peroranganDoc.exists()) return 'perorangan';
    if (perusahaanDoc.exists()) return 'perusahaan';
    return null;
  };

  const signIn = async () => {
    try {
      // 🚫 Jika tidak ada koneksi internet, hentikan proses
      if (!isConnected) {
        await showAlertMessage(
          'Tidak Ada Koneksi Internet',
          'Periksa Wi-Fi atau Data Seluler Anda sebelum mencoba login.',
          'error'
        );
        return;
      }

      setLoading(true);

      // 🟡 Alert loading
      await showAlertMessage(
        'Memproses Login...',
        'Mohon tunggu sebentar',
        'warning',
        { duration: 3000 }
      );

      // ⏳ Delay supaya terasa “loading” di UI
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Step 1: Google Sign-In
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo || userInfo.type === 'cancelled') {
        console.log('❎ Login dibatalkan oleh pengguna.');
        return;
      }

      // Step 2: Firebase Sign-In
      const { idToken } = await GoogleSignin.getTokens();
      if (!idToken)
        throw new Error('ID Token tidak ditemukan setelah login Google.');

      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential =
        await firebaseAuth.signInWithCredential(credential);
      const user = userCredential.user;

      console.log('🔥 Login Firebase berhasil:', user.email);

      // Step 3: Cek user di Firestore
      const registrationStatus = await checkUserRegistration(user.uid);

      if (
        registrationStatus === 'perorangan' ||
        registrationStatus === 'perusahaan'
      ) {
        // Ambil nama lengkap dari dokumen
        const docRef = db.collection(registrationStatus).doc(user.uid);
        const docSnap = await docRef.get();
        const fullName =
          docSnap.exists() && docSnap.data()?.nama_lengkap
            ? docSnap.data()?.nama_lengkap
            : (user.displayName ?? 'Pengguna');

        await showAlertMessage(
          'Berhasil Login!',
          `Selamat datang kembali, ${fullName}`,
          'success'
        );
        router.replace('/(tabs)/home');
      } else {
        await showAlertMessage(
          'Akun Baru Ditemukan',
          'Silakan lengkapi data registrasi Anda terlebih dahulu.',
          'warning'
        );
        router.replace('/screens/registerScreen');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('❎ User membatalkan login.');
        return;
      }

      console.error('❌ Login gagal:', error);
      await showAlertMessage(
        'Login Gagal',
        error?.message ?? 'Terjadi kesalahan saat login.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};
