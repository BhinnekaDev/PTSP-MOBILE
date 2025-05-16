<<<<<<< HEAD
import { useState } from "react";
import { View } from "react-native";
import SplashScreen from "@/app/screens/splashScreen";
import WelcomeScreen from "@/app/screens/welcomeScreen";
import LoginScreen from "@/app/screens/loginScreen";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <View className="flex-1">
      {showSplash ? (
        <SplashScreen onAnimationEnd={() => setShowSplash(false)} />
      ) : showWelcome ? (
        <WelcomeScreen onFinish={() => setShowWelcome(false)} />
      ) : (
        <LoginScreen />
      )}
=======
import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-yellow-500">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity className="bg-blue-500 text-2xl px-4 py-2 rounded" onPress={() => router.push("/(tabs)/home")}>
        <Text>Go To Profile</Text>
      </TouchableOpacity>
>>>>>>> bhinnekadev24/bhi-334-halaman-profil-pengguna
    </View>
  );
}
