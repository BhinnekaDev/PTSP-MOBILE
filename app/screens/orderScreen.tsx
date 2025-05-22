import React from "react";
import { View, ScrollView, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// OUR ICONS
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

// COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import NavCartOrder from "@/components/navCartOrder";

// OUR HOOKS
import useAjukanTransition from "@/hooks/Frontend/orderScreen/useAnimationButtonPlus";

export default function OrderScreen() {
  const router = useRouter();
  const { showButtonPlus, animatedValue, animatedOpacity } = useAjukanTransition();

  return (
    <View className="flex-1 bg-white gap-4">
      <NavCartOrder text="Pesanan" textClassName="ml-4 text-left" onPressLeftIcon={() => router.back()} isTouchable={false} />

      <View className="flex-1 px-4">
        <LinearGradient colors={["#1475BA", "#FFFFFF", "#6BBC3F"]} style={{ flex: 1, borderRadius: 12 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View className="flex-1 w-full py-6">
            <Text className="font-bold text-[20px] self-center" style={{ fontFamily: "LexBold" }}>
              Pesanan Anda
            </Text>

            <ScrollView contentContainerStyle={{ padding: 14 }} showsVerticalScrollIndicator={false}>
              {/* FORM PENGAJUAN KEGIATAN */}
              <View className="bg-white rounded-[10px] flex-col border-[#D9D9D9] border-2 mb-10">
                <View className="bg-[#D9D9D9] rounded-t-[4px] rounded-b-[10px] w-full py-2 flex items-center justify-center">
                  <Text className="text-[18px] text-black py-4" style={{ fontFamily: "LexMedium" }}>
                    Tracking Pesanan
                  </Text>
                </View>

                {/* PEMBUNGKUS DATA TRACKING PESANAN */}
                <View className="py-4 px-4 pb-4 gap-4">
                  {/* NOMOR PESANAN */}
                  <View className="flex-row ">
                    <Text className="text-[14px]" style={{ fontFamily: "LexSemiBold" }}>
                      Nomor Pesanan :{" "}
                    </Text>
                    <Text className="text-[14px]" style={{ fontFamily: "LexSemiBold" }}>
                      12938912839128
                    </Text>
                  </View>

                  {/* TANGGAL PEMESANAN */}
                  <View className="  flex-row items-center gap-2">
                    <MaterialIcons name="date-range" size={24} color="black" />
                    <Text style={{ fontFamily: "LexRegular" }}>Tanggal Pemesanan : </Text>
                    <Text style={{ fontFamily: "LexRegular" }}>12/12/2023 </Text>
                  </View>

                  {/* TANGGAL PENGAJUAN */}
                  <View className="  flex-row items-center gap-2">
                    <MaterialIcons name="date-range" size={24} color="black" />
                    <Text style={{ fontFamily: "LexRegular" }}>Tanggal Pengajuan : </Text>
                    <Text style={{ fontFamily: "LexRegular" }}>12/12/2023 </Text>
                  </View>

                  {/* NAMA LENGKAP */}
                  <View className=" flex-row items-center gap-2 ">
                    <Ionicons name="person-sharp" size={24} color="black" />
                    <View>
                      <Text style={{ fontFamily: "LexRegular" }}>Nama Lengkap : </Text>
                      <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }} className="underline">
                        adrianmusaalfauzan@gmail.com
                      </Text>
                    </View>
                  </View>

                  {/* NAMA PERUSAHAAN */}
                  <View className=" flex-row items-center gap-2 ">
                    <Entypo name="home" size={24} color="black" />
                    <View>
                      <Text style={{ fontFamily: "LexRegular" }}>Nama Perusahaan : </Text>
                      <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }} className="underline">
                        adrianmusaalfauzan@gmail.com
                      </Text>
                    </View>
                  </View>

                  {/* NOMOR TELEPON */}
                  <View className="  flex-row items-center gap-2">
                    <MaterialIcons name="call" size={24} color="black" />
                    <Text style={{ fontFamily: "LexRegular" }}>91823981293 </Text>
                  </View>
                </View>

                {/* TOMBOL AJUKAN SEKARANG */}
                <View className="w-[80%] self-center py-4">
                  <ButtonCustom
                    classNameContainer="bg-[#1475BA] py-3 rounded-[10px]" //
                    text="LIHAT DETAIL"
                    textClassName="text-[14px] text-center text-white"
                    textStyle={{ fontFamily: "LexSemiBold" }}
                    isTouchable={true}
                    onPress={() => router.push("/screens/orderTrackingScreen")}
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
            </ScrollView>

            {/* TOMBOL AJUKAN SEKARANG */}

            {showButtonPlus && (
              <Animated.View
                style={{
                  transform: [{ translateX: animatedValue }],
                  alignSelf: "flex-end",
                  marginHorizontal: 16,
                  opacity: animatedOpacity,
                }}
              >
                <ButtonCustom
                  classNameContainer="bg-[#1475BA] rounded-[10px] py-1 w-[160px]"
                  iconLeft={<Entypo name="plus" size={32} color="white" />}
                  text="Tambah"
                  textClassName="text-[20px] text-center text-white"
                  textStyle={{ fontFamily: "LexSemiBold" }}
                  onPress={() => alert("Tambah")}
                  isTouchable={true}
                  containerStyle={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 4,
                  }}
                />
              </Animated.View>
            )}
          </View>
        </LinearGradient>
      </View>

      {/* BAR BAWAH */}
      <View className="w-full bg-[#1475BA] h-[4%]" />
    </View>
  );
}
