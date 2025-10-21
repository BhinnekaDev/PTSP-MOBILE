import { Image, Animated, View, Text, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// OUR COMPONENTS
import Button from '@/components/button';

// OUR HOOKS
import { useGoogleLogin } from '@/hooks/Backend/useGoogleLogin';

export default function LoginScreen() {
  const vectorTranslateY = useRef(new Animated.Value(-300)).current;
  const textTranslateX = useRef(new Animated.Value(400)).current;
  const buttonTranslateX = useRef(new Animated.Value(-400)).current;

  const { signIn, loading } = useGoogleLogin();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(vectorTranslateY, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateX, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(buttonTranslateX, {
        toValue: 0,
        duration: 600,
        delay: 100,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    });
  }, [vectorTranslateY, textTranslateX, buttonTranslateX]);

  return (
    <View className="flex-1 items-center justify-center overflow-hidden">
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#1475BA', '#36918A', '#6BBC3F']}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      <Animated.View
        className="items-center justify-center"
        style={{ transform: [{ translateY: vectorTranslateY }] }}
      >
        <Image
          source={require('@/assets/images/LoginScreen/vector.png')}
          className="h-80 w-80"
        />
      </Animated.View>

      <View className="mt-7 items-center justify-center">
        <Animated.View style={{ transform: [{ translateX: textTranslateX }] }}>
          <Text
            className="text-center text-2xl text-white"
            style={{ fontFamily: 'LexBold' }}
          >
            PTSP Mobile {'\n'} hadir untuk kemudahan Anda!
          </Text>
          <Text
            className="py-6 text-center text-sm text-white"
            style={{ fontFamily: 'LexRegular' }}
          >
            Akses layanan informasi cuaca, gempa, dan tsunami {'\n'} langsung
            dari genggaman Anda. Praktis, cepat, dan {'\n'} terpercaya!
          </Text>
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateX: buttonTranslateX }] }}
        >
          <Button
            style={`px-4 py-3 mt-9 rounded-md flex-row justify-center items-center ${
              loading ? 'bg-gray-400' : 'bg-[#73BF40]'
            }`}
            textStyle="text-white"
            iconPosition="left"
            image={require('@/assets/images/LoginScreen/google.png')} // tetap tampil
            onPress={!loading ? signIn : undefined} // tidak bisa diklik saat loading
            disabled={loading} // disable native interaksi
          >
            {loading ? 'Sedang Masuk...' : 'Masuk Menggunakan Google aja'}
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}
