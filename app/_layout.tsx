import "@/global.css";
import { Stack } from "expo-router";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const fontLoaded = useLoadFont();

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
