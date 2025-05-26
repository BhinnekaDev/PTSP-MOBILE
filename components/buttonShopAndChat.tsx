// components/HeaderIcons.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

type ButtonShopAndChatProps = {
  showButtonShop?: boolean;
  showButtonChat?: boolean;
  showShopCount?: number;
  showhatCount?: number;
};

export default function ButtonShopAndChat({
  showButtonShop = true, //
  showButtonChat = true,
  showShopCount = 1,
  showhatCount = 2,
}: ButtonShopAndChatProps) {
  const router = useRouter();

  return (
    <View className="flex-row gap-4 items-center">
      {/* Icon Shop */}
      {showButtonShop && (
        <TouchableOpacity activeOpacity={0.3} className="p-1 relative" onPress={() => router.push("/screens/cartOrderScreen")}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          {showShopCount > 0 && (
            <View className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-[11px] font-bold">{showShopCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      {/* Icon Chat */}
      {showButtonChat && (
        <TouchableOpacity activeOpacity={0.7} className="p-1 relative" onPress={() => router.push("/screens/chatScreen")}>
          <Ionicons name="chatbubbles-outline" size={28} color="white" />
          {showhatCount > 0 && (
            <View className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-[10px]" style={{ fontFamily: "LexBold" }}>
                {showhatCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
