import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";

const webClientId = Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID;

if (!webClientId) {
  console.warn("❌ GOOGLE_WEB_CLIENT_ID tidak ditemukan. Cek app.config.ts atau .env");
} else {
  GoogleSignin.configure({
    webClientId,
  });
}
