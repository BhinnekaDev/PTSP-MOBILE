import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

// OUR ICONS
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import { LinearGradient } from "expo-linear-gradient";

// OUR COMPONENTS
import Button from "@/components/button";

// OUR INTERFACES
import { ButtonCustomProps } from "@/interfaces/buttonCustomProps";

export default function ClimatologyProduct({
  count = 1, //
  onPressRightIcon,
}: ButtonCustomProps) {
  return (
    <View className="flex-1">
      <View className="bg-[#1475BA] flex-row justify-between w-full items-center px-4 py-4 rounded-b-[10px] shadow-md">
        <TouchableOpacity onPress={() => router.back()} className="rounded-full p-1 mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="bg-white flex-row justify-between flex-1 items-center pl-3 rounded-full">
          <TextInput className="flex-1 py-1" placeholder="Cari" style={{ fontFamily: "LexRegular" }} />
          <TouchableOpacity className="bg-[#72C02C] rounded-full py-2 px-3">
            <Octicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-4 ml-12 items-center">
          <TouchableOpacity activeOpacity={0.3} className="p-1" onPress={() => router.push("/screens/cartOrderScreen")}>
            <MaterialIcons name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={onPressRightIcon} className="p-1">
            <Ionicons name="chatbubbles-outline" size={28} color="white" />
            {count > 0 && (
              <View className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-[10px]" style={{ fontFamily: "LexBold" }}>
                  {count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 px-4 pt-4">
        <LinearGradient
          colors={["#1475BA", "#fff", "#6BBC3F"]}
          className="flex-1 items-center rounded-full"
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 8,
          }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontFamily: "LexBold" }} className="text-2xl text-center mt-4">
              Informasi
            </Text>
            <Text style={{ fontFamily: "LexMedium" }} className="text-md text-center mt-1 uppercase mb-4">
              Stasiun Klimatologi
            </Text>
            <View className="items-center justify-center my-3 gap-6">
              <View className="border-2 border-black bg-white w-80 h-72 rounded-lg items-center justify-center gap-4">
                <FontAwesome6 name="cloud-bolt" size={60} color="#6BBC3F" />
                <Text style={{ fontFamily: "LexMedium" }} className="text-center text-md">
                  ATLAS WINDROSE WILAYAH INDONESIA PERIODE 1981-2010
                </Text>
                <Text style={{ fontFamily: "LexRegular" }} className="text-center text-lg">
                  Rp 1.500.000
                </Text>
                <Button style="bg-[#1475BA] px-4 py-2 rounded-full" textStyle="text-xs text-white uppercase" icon={<Ionicons name="cart-outline" size={20} color="white" />}>
                  Masukan Ke Keranjang
                </Button>
              </View>
            </View>
            <View className="items-center justify-center my-3 gap-6">
              <View className="border-2 border-black bg-white w-80 h-72 rounded-lg items-center justify-center gap-4">
                <FontAwesome6 name="cloud-bolt" size={60} color="#6BBC3F" />
                <Text style={{ fontFamily: "LexMedium" }} className="text-center text-md">
                  KARBON MONOKSIDA (CO)
                </Text>
                <Text style={{ fontFamily: "LexRegular" }} className="text-center text-lg">
                  Rp 1.500.000
                </Text>
                <Button style="bg-[#1475BA] px-4 py-2 rounded-full" textStyle="text-xs text-white uppercase" icon={<Ionicons name="cart-outline" size={20} color="white" />}>
                  Masukan Ke Keranjang
                </Button>
              </View>
            </View>
            <View className="items-center justify-center my-3 gap-6">
              <View className="border-2 border-black bg-white w-80 h-72 rounded-lg items-center justify-center gap-4">
                <FontAwesome6 name="cloud-bolt" size={60} color="#6BBC3F" />
                <Text style={{ fontFamily: "LexMedium" }} className="text-center text-md">
                  KARBON MONOKSIDA (CO)
                </Text>
                <Text style={{ fontFamily: "LexRegular" }} className="text-center text-lg">
                  Rp 1.500.000
                </Text>
                <Button style="bg-[#1475BA] px-4 py-2 rounded-full" textStyle="text-xs text-white uppercase" icon={<Ionicons name="cart-outline" size={20} color="white" />}>
                  Masukan Ke Keranjang
                </Button>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
}
