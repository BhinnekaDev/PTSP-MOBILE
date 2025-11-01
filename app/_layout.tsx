import '@/global.css';
import { useLoadFont } from '@/hooks/Frontend/useLoadFonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  Animated,
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';

export default function RootLayout() {
  const fontLoaded = useLoadFont();

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
  }

  const slideInUp = (
    animValue: Animated.Value,
    position: 'top' | 'bottom' | 'center'
  ) => {
    const translateY = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });

    return {
      transform: [{ translateY }],
      opacity: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {Platform.OS === 'ios' && (
        <View style={{ height: 44, backgroundColor: '#1475BA' }} />
      )}

      <StatusBar
        backgroundColor="#1475BA"
        barStyle="light-content"
        translucent={false}
      />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />

      <FlashMessage
        position="top"
        floating
        transitionConfig={slideInUp}
        style={{
          zIndex: 9999,
          borderRadius: 12,
          margin: 16,
          paddingVertical: 10,
          paddingHorizontal: 16,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          overflow: 'hidden',
        }}
        titleStyle={{
          fontFamily: 'LexBold',
          fontSize: 16,
          color: '#fff',
        }}
        textStyle={{
          fontFamily: 'LexRegular',
          fontSize: 14,
          color: '#fff',
        }}
      />
    </GestureHandlerRootView>
  );
}
