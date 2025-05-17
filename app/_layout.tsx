import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const fontLoaded = useLoadFont();

  if (!fontLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#1475BA" style="light" />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </>
  );
}
