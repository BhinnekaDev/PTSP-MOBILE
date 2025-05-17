import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function HomeTabs() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center text-black">
      <TouchableOpacity onPress={() => router.push("/screens/cartOrderScreen")} className="text-black bg-green-400 p-10">
        <Text>Fitur Keranjang</Text>
      </TouchableOpacity>
    </View>
  );
}
