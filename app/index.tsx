// app/index.tsx
import { useState } from "react";
import { View } from "react-native";
import SplashScreen from "@/app/screens/splashScreen";
import WelcomeScreen from "@/app/screens/welcomeScreen";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View className="flex-1">
      {showSplash ? (
        <SplashScreen onAnimationEnd={() => setShowSplash(false)} />
      ) : (
        <WelcomeScreen />
      )}
    </View>
  );
}
