import React from "react";
import { View, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import NavCartOrder from "@/components/navCartOrder";

export default function CartOrderScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white gap-4">
      <NavCartOrder
        text="Keranjang Saya" //
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />
      <View className="flex-1  px-4   ">
        <LinearGradient
          colors={["#1475BA", "#FFFFFF", "#6BBC3F"]} //
          style={{ flex: 1, borderRadius: 12 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-1 w-full ">
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
              {/* Kartu Produk */}
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>ATLAS WINDROSE WILAYAH INDONESIA</Text>
                  <Text style={{ fontSize: 12 }}>PERIODE 1981–2010</Text>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>Rp 1.500.000</Text>
              </View>
            </ScrollView>

            {/* BUTTON FIXED DI BAGIAN BAWAH */}
            <View className="absolute bottom-6 w-full px-10">
              <ButtonCustom
                classNameContainer="bg-[#1475BA] py-3 rounded-lg" //
                text="Ajukan Sekarang"
                textClassName="text-[20px] text-center text-white"
                onPress={() => alert("Ajukan Sekarang")}
                isTouchable={false}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
      {/* BAR BAWAH */}
      <View
        style={{
          height: "4%",
          backgroundColor: "#1475BA",
          width: "100%",
        }}
      />
    </View>
  );
}
