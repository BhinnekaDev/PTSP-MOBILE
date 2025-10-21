import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// OUR COMPONENT
import ButtonCustom from '@/components/buttonCustom';
import ButtonShopAndChat from '@/components/buttonShopAndChat';

// OUR INTERFACES
import { ButtonCustomProps } from '@/interfaces/buttonCustomProps';

type NavCartOrderProps = ButtonCustomProps & {
  subText?: string; // ✅ tambahan: teks kecil di bawah
};

export default function NavCartOrder({
  text,
  subText,
  textClassName,
  onPressLeftIcon,
  isTouchable = true,
}: NavCartOrderProps) {
  return (
    <View
      className="relative flex-row items-center bg-[#1475BA]"
      style={{
        paddingTop: hp(5),
        borderBottomLeftRadius: hp(1.2),
        borderBottomRightRadius: hp(1.2),
        paddingVertical: hp(2),
        paddingBottom: hp(1.7),
        paddingRight: wp(4),
      }}
    >
      {/* Kiri: Tombol + Teks */}
      <View style={{ flex: 1 }}>
        <ButtonCustom
          classNameContainer="py-0"
          isTouchable={isTouchable}
          text={text}
          iconLeft={<AntDesign name="arrowleft" size={wp(6)} color="white" />}
          onPressLeftIcon={onPressLeftIcon}
          textClassName={`text-white pl-5 ${textClassName}`}
          textStyle={{
            fontFamily: 'LexBold',
            fontSize: Math.min(Math.max(wp(10), 20), 28),
          }}
          containerStyle={{
            width: wp(85),
          }}
        />

        {/* ✅ Subteks di luar ButtonCustom */}
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

      {/* ✅ Selalu tampil: Button Shop & Chat */}
      <ButtonShopAndChat />
    </View>
  );
}
