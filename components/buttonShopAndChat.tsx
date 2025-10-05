import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// OUR HOOKS
import { useCartItemCount } from '@/hooks/Backend/useCartItemCount';
import { useUnreadMessagesCount } from '@/hooks/Backend/useUnreadMessagesCount';

type ButtonShopAndChatProps = {
  showButtonShop?: boolean;
  showButtonChat?: boolean;
};

export default function ButtonShopAndChat({
  showButtonShop = true,
  showButtonChat = true,
}: ButtonShopAndChatProps) {
  const router = useRouter();
  const { cartCount } = useCartItemCount();
  const { unreadCount } = useUnreadMessagesCount();

  return (
    <View
      className="flex-row items-center"
      style={{ gap: wp('3%') }} // jarak antar tombol responsif
    >
      {/* SHOP */}
      {showButtonShop && (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative"
          onPress={() => router.push('/screens/cartOrderScreen')}
          style={{ padding: wp('1%') }}
        >
          <MaterialIcons name="shopping-cart" size={hp('3%')} color="white" />
          {cartCount > 0 && (
            <View
              className="absolute items-center justify-center rounded-full bg-red-500"
              style={{
                height: hp('2.2%'),
                width: hp('2.2%'),
                top: hp('-0.7%'),
                right: wp('-1.5%'),
              }}
            >
              <Text
                className="text-white"
                style={{
                  fontSize: hp('1.2%'),
                  fontFamily: 'LexBold',
                }}
              >
                {cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      {/* CHAT */}
      {showButtonChat && (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative"
          onPress={() => router.push('/screens/chatScreen')}
          style={{ padding: wp('1%') }}
        >
          <Ionicons
            name="chatbubbles-outline"
            size={hp('3.5%')}
            color="white"
          />
          {unreadCount > 0 && (
            <View
              className="absolute items-center justify-center rounded-full bg-red-500"
              style={{
                height: hp('2.2%'),
                width: hp('2.2%'),
                top: hp('-0.7%'),
                right: wp('-1.5%'),
              }}
            >
              <Text
                className="text-white"
                style={{
                  fontSize: hp('1.2%'),
                  fontFamily: 'LexBold',
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
