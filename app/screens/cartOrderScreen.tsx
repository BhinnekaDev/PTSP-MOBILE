import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
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
              <View className="bg-white rounded-[12px] p-6 shadow flex-col gap-10 border-black border-2">
                {/* ICON DAN TEKS */}
                <View className="flex-row items-center gap-3">
                  <Image source={require("@/assets/images/CartCheckoutScreen/Checkout.png")} className="w-14 h-14" resizeMode="contain" />
                  <Text className="font-bold text-[14px] flex-1">ATLAS WINDROSE WILAYAH INDONESIA PERIODE 1981–2010</Text>
                </View>

                {/* HARGA */}
                <Text className="font-bold text-[12px] self-end">Rp 1.500.000</Text>
              </View>
            </ScrollView>

            {/* BUTTON FIXED DI BAGIAN BAWAH */}
            <View className="flex bottom-6 w-full flex-row justify-between gap-2 px-2">
              <View className="flex flex-row items-center bg-[#1475BA] py-3 rounded-[10px] px-4 flex-1 justify-between">
                <Text className="text-white " style={{ fontFamily: "LexSemiBold" }}>
                  Total Harga
                </Text>
                <Text className="text-white  ml-4" style={{ fontFamily: "LexSemiBold" }}>
                  1.500.000
                </Text>
              </View>

              <ButtonCustom
                classNameContainer="bg-[#1475BA] py-3 rounded-[10px] w-[120px]"
                text="Lanjutkan Pemesanan"
                textClassName="text-[11px] text-center text-white"
                onPress={() => router.push("/screens/submissionScreen")}
                textStyle={{ fontFamily: "LexSemiBold" }}
                isTouchable={true}
                containerStyle={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 }, // hanya ke bawah
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4, // Android
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
      {/* BAR BAWAH */}
      <View className="w-full bg-[#1475BA] h-[4%]" />
    </View>
  );
}
