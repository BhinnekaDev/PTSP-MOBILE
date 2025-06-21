import '@/global.css';
import { useLoadFont } from '@/hooks/Frontend/useLoadFonts';
import { Stack } from 'expo-router';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';

const { width } = Dimensions.get('window');

export default function RootLayout() {
  const fontLoaded = useLoadFont();

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
  }

  const customTransition = {
    in: (animValue: Animated.Value) => {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    out: (animValue: Animated.Value) => {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    },
    get: (animationValue: Animated.Value, isEntering: boolean) => {
      const translateX = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [width, 0],
      });

      return {
        transform: [
          {
            translateX: translateX,
          },
        ],
        opacity: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      };
    },
  };

  return (
    <>
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
        transitionConfig={() => customTransition}
        style={{ zIndex: 9999, overflow: 'hidden' }}
      />
    </>
  );
}
