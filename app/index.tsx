import { useState } from 'react';
import { View, LogBox } from 'react-native';

import SplashScreen from '@/app/screens/splashScreen';
import WelcomeScreen from '@/app/screens/welcomeScreen';
import LoginScreen from '@/app/screens/loginScreen';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  LogBox.ignoreLogs([]); // pastikan semua log muncul
  LogBox.ignoreAllLogs(false);
  return (
    <View className="flex-1">
      {showSplash ? (
        <SplashScreen onAnimationEnd={() => setShowSplash(false)} /> //
      ) : showWelcome ? (
        <WelcomeScreen onFinish={() => setShowWelcome(false)} />
      ) : (
        <LoginScreen />
      )}
    </View>
  );
}
