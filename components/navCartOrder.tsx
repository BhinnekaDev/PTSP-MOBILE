import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// OUR COMPONENT
import ButtonCustom from '@/components/buttonCustom';

// OUR HOOKS
import { useUnreadMessagesCount } from '@/hooks/Backend/useUnreadMessagesCount';

// OUR INTERFACES
import { ButtonCustomProps } from '@/interfaces/buttonCustomProps';

type NavCartOrderProps = ButtonCustomProps & {
  showChatIcon?: boolean; // ✅ tambahan: untuk show/hide icon chat
};

export default function NavCartOrder({
  text,
  textClassName,
  onPressLeftIcon,
  onPressRightIcon,
  isTouchable = true,
  showChatIcon = true, // default: ditampilkan
}: NavCartOrderProps) {
  // ambil jumlah pesan belum dibaca dari hook
  const { unreadCount } = useUnreadMessagesCount();

  return (
    <View
      className="relative flex-row items-center bg-[#1475BA]"
      style={{
        paddingTop: hp(5),
        borderBottomLeftRadius: hp(1.2),
        borderBottomRightRadius: hp(1.2),
        paddingVertical: hp(2),
        paddingBottom: hp(1),
        paddingRight: wp(4),
      }}
    >
      {/* Tombol Utama */}
      <ButtonCustom
        classNameContainer="py-0"
        isTouchable={isTouchable}
        text={text}
        iconLeft={
          <AntDesign
            name="arrowleft"
            size={wp(6)} // responsive icon size
            color="white"
          />
        }
        onPressLeftIcon={onPressLeftIcon}
        textClassName={`text-white pl-5 ${textClassName}`}
        textStyle={{
          fontFamily: 'LexBold',
          fontSize: wp(4.5), // responsive font
        }}
        containerStyle={{
          width: showChatIcon ? wp(85) : wp(92), // lebih lebar kalau chat disembunyikan
        }}
      />

      {/* ✅ Icon Chat (optional) */}
      {showChatIcon && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={
            onPressRightIcon ?? (() => router.push('/screens/chatScreen'))
          }
          style={{ marginLeft: wp(3) }}
        >
          <Ionicons name="chatbubbles-outline" size={wp(7)} color="white" />
          {unreadCount > 0 && (
            <View
              style={{
                position: 'absolute',
                right: -wp(1.5),
                top: -hp(0.5),
                height: hp(2.2),
                width: hp(2.2),
                borderRadius: hp(1.1),
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'LexBold',
                  fontSize: wp(2.5),
                  color: 'white',
                }}
              >
                {unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
