import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// OUR ICON
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    <View className="flex-row items-center gap-4">
      {/* Icon Shop */}
      {showButtonShop && (
        <TouchableOpacity
          activeOpacity={0.3}
          className="relative p-1"
          onPress={() => router.push('/screens/cartOrderScreen')}
        >
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          {cartCount > 0 && (
            <View className="absolute -right-1.5 -top-1.5 h-5 w-5 items-center justify-center rounded-full bg-red-500">
              <Text className="text-[11px] font-bold text-white">
                {cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      {/* Icon Chat */}
      {showButtonChat && (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative p-1"
          onPress={() => router.push('/screens/chatScreen')}
        >
          <Ionicons name="chatbubbles-outline" size={28} color="white" />
          {unreadCount > 0 && (
            <View className="absolute -right-1.5 -top-1.5 h-5 w-5 items-center justify-center rounded-full bg-red-500">
              <Text
                className="text-[10px] text-white"
                style={{ fontFamily: 'LexBold' }}
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
