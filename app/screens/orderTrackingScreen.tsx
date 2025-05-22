import React from "react";
import { View, ScrollView, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// OUR ICONS
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import NavCartOrder from "@/components/navCartOrder";

// OUR HOOKS
import useAjukanTransition from "@/hooks/Frontend/orderScreen/useAnimationButtonPlus";

export default function OrderScreen() {
  const router = useRouter();
  const { showButtonPlus, animatedValue } = useAjukanTransition();

  return (
    <View className="flex-1 bg-white gap-4">
      <NavCartOrder text="Pesanan" textClassName="ml-4 text-left" onPressLeftIcon={() => router.back()} isTouchable={false} />

      <View className="flex-1 px-4">
        <LinearGradient colors={["#1475BA", "#FFFFFF", "#6BBC3F"]} style={{ flex: 1, borderRadius: 12 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View className="flex-1 w-full py-6">
            <Text className="text-[20px] self-center" style={{ fontFamily: "LexBold" }}>
              Tracking Pesanan Anda
            </Text>
            <View className="flex-row items-center gap-2 self-center">
              <Text className="text-[13px]" style={{ fontFamily: "LexRegular" }}>
                Dipesan pada tanggal :{" "}
              </Text>
              <Text className="text-[13px]" style={{ fontFamily: "LexRegular" }}>
                30/04/2025, 7:30 PM
              </Text>
            </View>

            <ScrollView contentContainerStyle={{ width: "100%", padding: 10 }} showsVerticalScrollIndicator={false}>
              {/* TRACKING PESANAN */}
              <View className=" mb-10 flex-col relative py-6">
                {/* garis vertikal di tengah ikon */}
                <View
                  className="absolute w-[2px] bg-black"
                  style={{
                    left: 25,
                    top: "10%", // contoh: 10% dari tinggi parent container
                    height: "80%", // contoh: garis vertikal tinggi 70% dari parent
                  }}
                />

                {/* PEMBUNGKUS SEMUA ITEM */}
                <View className="flex-col">
                  {/* item 1 */}
                  <View className="flex flex-row items-start mb-10 z-10">
                    <View className="bg-[#72C02C] rounded-full p-3 mr-5" style={{ width: 48, height: 48, justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                      <AntDesign name="filetext1" size={24} color="black" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-black text-base mb-2" numberOfLines={1} ellipsizeMode="tail">
                        Pesanan Dibuat
                      </Text>
                      <View className="flex-row items-center gap-2 mb-1" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Jenis Kegiatan :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>12/12/2023</Text>
                      </View>
                      <View className="flex-row items-center gap-2 mb-1" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Status Pengajuan :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Sedang Ditinjau</Text>
                      </View>
                      <View className="flex-row items-center gap-2" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Tanggal Pengajuan :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>05/22/2025, 10:00 AM</Text>
                      </View>
                    </View>
                  </View>

                  {/* item 2 */}
                  <View className="flex flex-row items-start mb-10 z-10">
                    <View className="bg-[#72C02C] rounded-full p-3 mr-5" style={{ width: 48, height: 48, justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                      <FontAwesome name="dollar" size={24} color="black" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-black text-base mb-2" numberOfLines={1} ellipsizeMode="tail">
                        Status Pembayaran
                      </Text>
                      <View className="flex-row items-center gap-2 mb-1" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Status Pembayaran :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Menunggu Pembayaran</Text>
                      </View>
                      <View className="flex-row items-center gap-2" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Tanggal Pembayaran :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Sedang Ditinjau</Text>
                      </View>
                    </View>
                  </View>

                  {/* item 3 */}
                  <View className="flex flex-row items-start mb-10 z-10">
                    <View className="bg-[#72C02C] rounded-full p-3 mr-5" style={{ width: 48, height: 48, justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                      <AntDesign name="inbox" size={24} color="black" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-black text-base mb-2" numberOfLines={1} ellipsizeMode="tail">
                        Status Pembuatan
                      </Text>
                      <View className="flex-row items-center gap-2" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Status Pembuatan :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Status Pembuatan</Text>
                      </View>
                    </View>
                  </View>

                  {/* item 4 */}
                  <View className="flex flex-row items-start z-10">
                    <View className="bg-[#72C02C] rounded-full p-3 mr-5" style={{ width: 48, height: 48, justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                      <FontAwesome name="send" size={24} color="black" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-black text-base mb-2" numberOfLines={1} ellipsizeMode="tail">
                        Pesanan Selesai
                      </Text>
                      <View className="flex-row items-center gap-2 mb-1" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Status Pengisian IKM :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>IKM Belum Diisi</Text>
                      </View>
                      <View className="flex-row items-center gap-2" style={{ flexWrap: "wrap" }}>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Status Pesanan :</Text>
                        <Text style={{ fontFamily: "LexRegular", flexShrink: 1 }}>Pesanan Belum Selesai</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-col ">
                {/* Baris 1: Alamat Pengiriman dan Ringkasan Pesanan sejajar horizontal */}
                <View className="flex flex-row gap-2 mb-10">
                  {/* Alamat Pengiriman */}
                  <View className="bg-white rounded-[10px] flex-1 border-[#D9D9D9] border-2 p-4">
                    <Text className="font-bold mb-2">Alamat Pengiriman</Text>
                    <Text>Adrian Musa Alfauzan</Text>
                    <Text>Nomor HP: 08123456789</Text>
                    <Text>Email: emailpengguna@example.com</Text>
                  </View>

                  {/* Ringkasan Pesanan */}
                  <View className="bg-white rounded-[10px] flex-1 border-[#D9D9D9] border-2 p-4">
                    <Text className="font-bold mb-2">Ringkasan Pesanan</Text>
                    <View className="flex-row justify-between">
                      <Text>Total Pesanan:</Text>
                      <Text>1.500.000</Text>
                    </View>
                  </View>
                </View>

                {/* Baris 2: Nomor Pesanan full lebar */}
                <View className="bg-white rounded-[10px] border-[#D9D9D9] border-2 p-4 mb-10">
                  <Text className="font-bold mb-2">Nomor Pesanan</Text>
                  <Text>No Pesanan: bla blab la</Text>
                  <Text>Tanggal Pemesanan: 22/05/2025, 10:00 AM</Text>

                  {/* Informasi dengan jarak antar item (space-between) */}
                  <View className="flex-row justify-between mt-4 mb-4">
                    <Text>Informasi:</Text>
                    <Text>Klimatologi</Text>
                  </View>

                  {/* Virtual account produk */}
                  <View>
                    <Text className="font-bold mb-2">Virtual Account Produk:</Text>
                    <View className="flex-row justify-between items-center">
                      <Text>1.500.000</Text>
                      <Text>x1</Text>
                      <Text>1.500.000</Text>
                    </View>
                  </View>

                  {/* Garis horizontal */}
                  <View className="border-t border-gray-300 mt-4" />
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
