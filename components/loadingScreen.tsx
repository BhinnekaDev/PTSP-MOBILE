import React, { ReactNode } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface LoadingScreenProps {
  message?: string;
  children?: ReactNode; // pastikan children adalah React element, bukan string
}

export default function LoadingScreen({
  message,
  children,
}: LoadingScreenProps) {
  return (
    <View
      className="flex-1 items-center justify-center bg-[#1475BA]"
      style={{ width: wp(100), height: hp(100) }}
    >
      <ActivityIndicator size="large" color="white" />

      {/* Semua string literal harus di dalam <Text> */}
      <Text
        style={{
          color: 'white',
          fontSize: wp(4),
          marginTop: hp(2),
          fontFamily: 'LexBold',
          textAlign: 'center',
        }}
      >
        {message ?? 'Memeriksa koneksi...'}
      </Text>

      {/* render children, tapi pastikan children bukan string murni */}
      {children ? <View className="mt-4">{children}</View> : null}
    </View>
  );
}
