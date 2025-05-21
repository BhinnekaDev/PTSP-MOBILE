import "@/global.css";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { Stack } from "expo-router";
<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
=======
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
>>>>>>> bhinnekadev24/bhi-338-fitur-checkout

export default function RootLayout() {
  const fontsLoaded = useLoadFont();

<<<<<<< HEAD
  if (!fontsLoaded) {
=======
  if (!fontLoaded) {
>>>>>>> bhinnekadev24/bhi-338-fitur-checkout
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
  }

  return (
    <>
<<<<<<< HEAD
      <StatusBar backgroundColor="#1475BA" style="light" />
      <Stack screenOptions={{ headerShown: false }} />
=======
      {/* STATUS BAR UNTUK IOS */}
      {Platform.OS === "ios" && <View style={{ height: 44, backgroundColor: "#1475BA" }} />}

      {/* STATUS BAR UNTUK ANDROID*/}
      <StatusBar backgroundColor="#1475BA" barStyle="light-content" translucent={false} />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
>>>>>>> bhinnekadev24/bhi-338-fitur-checkout
    </>
  );
}
