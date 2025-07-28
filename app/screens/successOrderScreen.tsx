import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

export default function SuccessOrderScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#A7CBE5]">
      {/* ✅ Animasi Zoom-in dengan Bounce untuk Gambar */}
      <Animatable.View
        className="h-40 w-40 items-center"
        animation="bounceIn"
        duration={800}
        delay={200}
      >
        <Image
          source={require('@/assets/images/success.png')}
          className="h-full w-full"
          resizeMode="contain"
        />
      </Animatable.View>

      {/* ✅ Animasi Fade-in untuk Text */}
      <Animatable.View
        className="mt-3 items-center justify-center"
        animation="fadeIn"
        duration={1000}
        delay={1600}
      >
        <Text
          className="text-center text-3xl text-black"
          style={{ fontFamily: 'LexBold' }}
        >
          Pesanan Anda Berhasil Dibuat!
        </Text>
      </Animatable.View>

      <Animatable.View
        className="mt-3 items-center justify-center"
        animation="fadeIn"
        duration={1000}
        delay={1800}
      >
        <Text
          className="text-md text-center text-black"
          style={{ fontFamily: 'LexMedium' }}
        >
          Kami sedang memproses layanan yang Anda ajukan.{'\n'}Silakan cek
          detail pemesanan di bawah ini!
        </Text>
      </Animatable.View>

      {/* ✅ Animasi Slide-in untuk Tombol */}
      <Animatable.View animation="fadeInRight" delay={2400} duration={800}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/screens/orderScreen')}
          className="mt-8 rounded-xl bg-[#1475BA] px-10 py-3"
        >
          <Text
            className="text-sm uppercase text-white"
            style={{ fontFamily: 'LexMedium' }}
          >
            Lihat Pesanan Saya
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
