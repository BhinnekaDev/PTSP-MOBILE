import React, { useState, useCallback } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { usePathname } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';

// OUR COMPONENTS
import ButtonShopAndChat from '@/components/buttonShopAndChat';

export default function NavbarForTabs() {
  const pathname = usePathname();
  const isProductPage = pathname?.includes('/product');

  // Jangan tampilkan navbar di halaman profile
  if (pathname?.includes('/profile')) {
    return null;
  }
  return (
    <View
      className="bg-[#1475BA] shadow-md"
      style={{
        width: wp('100%'),
        paddingTop: hp('6%'),
        paddingBottom: hp('2%'),
        paddingHorizontal: wp('4%'),
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {/* ✅ Pembungkus utama agar sejajar di semua mode */}
      <View
        className="flex-row items-center justify-between"
        style={{
          height: hp(6),
        }}
      >
        {/* ✅ Kiri: Logo / Search */}
        <View className="flex-1 flex-row items-center">
          {isProductPage ? (
            // 🔍 Search bar khusus halaman Product
            <View
              className="flex-1 flex-row items-center rounded-full bg-white"
              style={{
                paddingLeft: wp(3),
                height: hp(5.5),
                marginRight: wp(3),
              }}
            >
              <TextInput
                className="flex-1"
                placeholder="Cari produk..."
                placeholderTextColor="gray"
                style={{
                  fontFamily: 'LexRegular',
                  fontSize: wp(3.6),
                  paddingVertical: 0,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                className="rounded-full bg-[#72C02C]"
                style={{
                  paddingVertical: hp(0.8),
                  paddingHorizontal: wp(3),
                  marginRight: wp(1.5),
                }}
              >
                <Octicons name="search" size={wp(4.8)} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            // 🖼️ Logo untuk halaman lain
            <Image
              source={require('@/assets/images/HomeScreen/logo.png')}
              style={{
                height: hp('5.5%'),
                width: wp('40%'),
                resizeMode: 'contain',
              }}
            />
          )}
        </View>

        {/* ✅ Kanan: tombol Shop & Chat (selalu ada) */}
        <View className="flex-row items-center" style={{ gap: wp('4%') }}>
          <ButtonShopAndChat />
        </View>
      </View>
    </View>
  );
}
