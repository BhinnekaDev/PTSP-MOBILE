import "@/global.css";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { Stack } from "expo-router";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";

export default function RootLayout() {
  const fontLoaded = useLoadFont();

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
  }

  return (
    <>
      {/* STATUS BAR UNTUK IOS ATAS*/}
      {Platform.OS === "ios" && <View style={{ height: 44, backgroundColor: "#1475BA" }} />}

      {/* STATUS BAR UNTUK ANDROID*/}
      <StatusBar backgroundColor="#1475BA" barStyle="light-content" translucent={false} />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </>
  );
}
