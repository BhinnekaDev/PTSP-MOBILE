import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

// OUR COMPONENTS
import Button from "@/components/button";
import ButtonShopAndChat from "@/components/buttonShopAndChat";

export default function GeophysicsProduct() {
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
          <ButtonShopAndChat />
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
              Stasiun Geofisika
            </Text>
            <View className="items-center justify-center my-3 gap-6">
              <View className="border-2 border-black bg-white w-80 h-72 rounded-lg items-center justify-center gap-4">
                <Feather name="wind" size={60} color="#6BBC3F" />
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
                <Feather name="wind" size={60} color="#6BBC3F" />
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
                <Feather name="wind" size={60} color="#6BBC3F" />
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
