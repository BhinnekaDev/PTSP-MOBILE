import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// OUR ICON
import Ionicons from "@expo/vector-icons/Ionicons";
// OUR COMPONENTS
import ButtonCustom from "@/components/buttonCustom";

export default function EditProfile() {
  return (
    <LinearGradient
      colors={["#1475BA", "#399385", "#6BBC3F"]} //
      start={[0, 0]}
      end={[1, 1]}
      locations={[0.04, 0.45, 1]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View className="w-full px-12">
        <View className="bg-white px-4 py-6 rounded-lg">
          <View className="items-center">
            <ButtonCustom
              classNameContainer="flex-row  items-center justify-center w-full py-3 bg-red-500 rounded-lg"
              iconLeft={<Ionicons name="arrow-back-circle" size={24} color="black" />}
              text="Pesanan Saya"
              textClassName="text-white text-lg text-center"
              onPress={() => alert("Pesanan Saya")}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
