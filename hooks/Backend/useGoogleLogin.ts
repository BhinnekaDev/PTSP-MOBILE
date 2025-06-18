import { useRouter } from 'expo-router';
import { db, firebaseAuth, GoogleAuthProvider } from '@/lib/firebase';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import '@/lib/auth/googleConfig';

export const useGoogleLogin = () => {
  const router = useRouter();

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
      console.log('▶️ Mulai login dengan Google...');

      // Step 1: Login Google
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo || userInfo.type === 'cancelled') {
        console.log('❎ Login dibatalkan oleh pengguna.');
        return;
      }

      // Step 2: Ambil ID token dan autentikasi Firebase
      const { idToken } = await GoogleSignin.getTokens();
      if (!idToken)
        throw new Error('ID Token tidak ditemukan setelah login Google.');

      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential =
        await firebaseAuth.signInWithCredential(credential);
      const user = userCredential.user;

      console.log('🔥 Login Firebase berhasil:', user.email);

      // Step 3: Cek apakah user sudah terdaftar di db
      const registrationStatus = await checkUserRegistration(user.uid);

      if (
        registrationStatus === 'perorangan' ||
        registrationStatus === 'perusahaan'
      ) {
        console.log(
          `✅ User terdaftar sebagai ${registrationStatus} → arahkan ke Home`
        );
        router.replace('/(tabs)/home');
      } else {
        console.log(
          '🆕 User belum terdaftar → arahkan ke pemilihan form register'
        );
        router.replace('/screens/registerScreen');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('❎ User membatalkan login (statusCodes).');
        return;
      }

      console.error('❌ Login gagal:', error);
      alert(
        `Login gagal: ${error?.message ?? 'Terjadi kesalahan saat login.'}`
      );
    }
  };

  return { signIn };
};
