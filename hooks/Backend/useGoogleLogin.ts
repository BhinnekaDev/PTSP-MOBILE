import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";

const webClientId = Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID;

if (!webClientId) {
  console.warn("❌ GOOGLE_WEB_CLIENT_ID tidak ditemukan. Cek app.config.js atau app.json");
} else {
  GoogleSignin.configure({
    webClientId,
  });
}

export const useGoogleLogin = () => {
  const router = useRouter();

  const signIn = async () => {
    try {
      console.log("Mulai login dengan Google...");

      const userInfo = await GoogleSignin.signIn();
      console.log("User info:", userInfo);

      const { idToken } = await GoogleSignin.getTokens();
      console.log("ID Token:", idToken);

      if (!idToken) throw new Error("ID Token tidak ditemukan.");

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log("Login Firebase berhasil:", userCredential.user);

      router.replace("/screens/registerScreen");
    } catch (error: any) {
      console.error("Login gagal:", error);
      alert(`Login gagal: ${error?.message ?? "Terjadi kesalahan (error kosong)."}`);
    }
  };

  return { signIn };
};
