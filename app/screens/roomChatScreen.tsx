import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInUp,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

export default function Chat() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <View className="bg-[#1475BA] flex-row w-full items-center px-4 pt-20 pb-4 rounded-xl shadow-md gap-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full p-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="bg-gray-300 rounded-full p-2">
          <FontAwesome6 name="mountain" size={24} color="#3498DB" />
        </View>
        <View className="flex-1">
          <Text
            style={{ fontFamily: "LexBold" }}
            className="text-lg text-white"
          >
            Stasiun Meteorologi
          </Text>
          <Text style={{ fontFamily: "LexRegular" }} className="text-white">
            Online
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
      <View className="bg-[#1475BA] w-full h-7 items-center justify-center">
        <View className="bg-white w-32 h-1.5 rounded-full" />
      </View>
    </View>
  );
}
