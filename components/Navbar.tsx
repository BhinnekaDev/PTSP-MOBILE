import React from 'react';
import { View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ButtonShopAndChat from '@/components/buttonShopAndChat';

export default function Navbar() {
  return (
    <View
      className="flex-row items-center justify-between bg-[#1475BA] shadow-md"
      style={{
        width: wp('100%'),
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingTop: hp('5%'),
        paddingBottom: hp('2%'),
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {/* Logo */}
      <Image
        source={require('@/assets/images/HomeScreen/logo.png')}
        style={{
          height: hp('6%'),
          width: wp('40%'),
          resizeMode: 'contain',
        }}
      />

      {/* Button Shop & Chat */}
      <View className="flex-row items-center" style={{ gap: wp('4%') }}>
        <ButtonShopAndChat />
      </View>
    </View>
  );
}
