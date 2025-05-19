import "@/global.css";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const fontsLoaded = useLoadFont();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#1475BA" style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
