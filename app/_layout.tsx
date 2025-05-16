import "@/global.css";
import { Stack } from "expo-router";
<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { ActivityIndicator, View } from "react-native";
=======
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { StatusBar } from "expo-status-bar";
>>>>>>> bhinnekadev24/bhi-334-halaman-profil-pengguna

export default function RootLayout() {
  const fontLoaded = useLoadFont();

  if (!fontLoaded) {
<<<<<<< HEAD
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
=======
    return null;
>>>>>>> bhinnekadev24/bhi-334-halaman-profil-pengguna
  }

  return (
    <>
<<<<<<< HEAD
      <StatusBar backgroundColor="#1475BA" style="light" />
=======
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
>>>>>>> bhinnekadev24/bhi-334-halaman-profil-pengguna
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
