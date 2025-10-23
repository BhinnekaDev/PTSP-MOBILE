import React from 'react';
import { View, TextInput, TouchableOpacity,Text } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// OUR COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import ButtonShopAndChat from '@/components/buttonShopAndChat';

// CONSTANTS
import { navbarTitleScreenMap } from '@/constants/navbarScreenTitles';

// INTERFACE
import { ButtonCustomProps } from '@/interfaces/buttonCustomProps';

export default function NavbarForScreens({
  subText,
  textClassName,
  isTouchable = true,
}: ButtonCustomProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTitle = (pathname: string) =>
    Object.entries(navbarTitleScreenMap).find(([path]) =>
      pathname.includes(path)
    )?.[1] || 'Layar Umum';

  const currentTitle = getCurrentTitle(pathname);


  const isDetailProductPage = pathname?.includes(
    '/screens/productDetailScreen'
  );

  return (
    <View
      className="bg-[#1475BA]"
      style={{
        paddingTop: hp(5),
        borderBottomLeftRadius: hp(1.2),
        borderBottomRightRadius: hp(1.2),
        paddingBottom: hp(2),
        paddingHorizontal: wp(4),
      }}
    >
      {/* 🔙 Baris pertama: tombol kembali + judul + tombol kanan */}
      <View className="flex-row items-center justify-between">
        <View style={{ flex: 1 }}>
          <ButtonCustom
            classNameContainer="py-0"
            isTouchable={isTouchable}
            text={currentTitle}
            iconLeft={<AntDesign name="arrowleft" size={wp(6)} color="white" />}
            onPressLeftIcon={() => router.back()}
            textClassName={`text-white pl-5 ${textClassName}`}
            textStyle={{
              fontFamily: 'LexBold',
              fontSize: Math.min(Math.max(wp(10), 20), 28),
            }}
            containerStyle={{
              width: wp(85),
            }}
          />
          {subText && (
            <Text
              style={{
                position: 'absolute',
                left: wp(10),
                bottom: -hp(1),
                fontFamily: 'LexRegular',
                fontSize: Math.min(Math.max(wp(5), 16), 20),
                color: 'white',
              }}
            >
              {subText}
            </Text>
          )}
        </View>

        {/* 💬 Tombol Shop & Chat */}
        <ButtonShopAndChat />
      </View>

      {/* 🔍 Baris kedua: Search bar khusus halaman Detail Produk */}
      {isDetailProductPage && (
        <View
          className="mt-3 flex-row items-center rounded-full bg-white"
          style={{
            paddingLeft: wp(3),
            height: hp(5.5),
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
      )}
    </View>
  );
}
