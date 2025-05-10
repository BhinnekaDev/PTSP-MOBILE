import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#1475BA" style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
