import "@/global.css";
import { Stack } from "expo-router";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";

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
      {/* STATUS BAR UNTUK IOS */}
      {Platform.OS === "ios" && <View style={{ height: 44, backgroundColor: "#1475BA" }} />}

      {/* STATUS BAR UNTUK ANDROID*/}
      <StatusBar backgroundColor="#1475BA" barStyle="light-content" translucent={false} />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </>
  );
}
