import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// OUR ICONS
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

// COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';

// OUR HOOKS
import useAjukanTransition from '@/hooks/Frontend/orderScreen/useAnimationButtonPlus';
import { useGetUserOrderInfo } from '@/hooks/Backend/useGetUserOrderInfo';

export default function OrderScreen() {
  const router = useRouter();
  const { showButtonPlus, animatedValue, animatedOpacity } =
    useAjukanTransition();

  // ✅ Gunakan hook profil
  const { orderInfo, listPemesanan, loading } = useGetUserOrderInfo();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6BBC3F" />
      </View>
    );
  }
  return (
    <View className="flex-1 gap-4 bg-[#A7CBE5]">
      <NavCartOrder
        text="Pesanan"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      <View className="flex-1 px-4">
        <View className="w-full flex-1 py-6">
          <Text
            className="self-center text-[20px] font-bold"
            style={{ fontFamily: 'LexBold' }}
          >
            Pesanan Anda
          </Text>

          <ScrollView
            contentContainerStyle={{ padding: 14 }}
            showsVerticalScrollIndicator={false}
          >
            {listPemesanan.length === 0 && (
              <Text
                className="text-center text-[16px] text-gray-500"
                style={{ fontFamily: 'LexRegular' }}
              >
                Belum ada pesanan.
              </Text>
            )}

            {listPemesanan.map((item, index) => (
              <View
                key={item.id}
                className="mb-6 rounded-[10px] border-2 border-[#D9D9D9] bg-white"
              >
                <View className="flex w-full items-center justify-center rounded-b-[10px] rounded-t-[4px] bg-[#D9D9D9] py-2">
                  <Text
                    className="py-4 text-[18px] text-black"
                    style={{ fontFamily: 'LexMedium' }}
                  >
                    Pesanan #{index + 1}
                  </Text>
                </View>

                <View className="gap-4 px-4 py-4 pb-4">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons
                      name="confirmation-number"
                      size={20}
                      color="black"
                    />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      ID Pesanan:
                    </Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>{item.id}</Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="date-range" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Tanggal Pemesanan:
                    </Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>
                      {item.tanggalPemesanan.toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                        timeZone: 'Asia/Jakarta',
                      })}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="date-range" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Tanggal Pengajuan:
                    </Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>
                      {item.tanggalPengajuan?.toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                        timeZone: 'Asia/Jakarta',
                      })}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Ionicons name="person-sharp" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Nama Lengkap:
                    </Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>
                      {orderInfo?.namaLengkap}
                    </Text>
                  </View>

                  {orderInfo?.tipe === 'perusahaan' && (
                    <>
                      <View className="flex-row items-center gap-2">
                        <Entypo name="home" size={20} color="black" />
                        <Text style={{ fontFamily: 'LexSemiBold' }}>
                          Nama Perusahaan:
                        </Text>
                        <Text style={{ fontFamily: 'LexRegular' }}>
                          {orderInfo.namaPerusahaan}
                        </Text>
                      </View>
                    </>
                  )}

                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="email" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>Email:</Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>
                      {orderInfo?.tipe === 'perusahaan'
                        ? `${orderInfo.email} / ${orderInfo.emailPerusahaan}`
                        : orderInfo?.email}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="call" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>No HP:</Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>
                      {orderInfo?.tipe === 'perusahaan'
                        ? `${orderInfo.noHp} / ${orderInfo.noHpPerusahaan}`
                        : orderInfo?.noHp}
                    </Text>
                  </View>
                  {/* Tombol lihat detail (nanti aktifin sesuai instruksi kamu berikutnya) */}
                  <View className="mt-2">
                    <ButtonCustom
                      classNameContainer="bg-[#1475BA] py-2 rounded-[10px]"
                      text="Lihat Detail"
                      textClassName="text-[14px] text-center text-white"
                      textStyle={{ fontFamily: 'LexSemiBold' }}
                      isTouchable={true}
                      onPress={() => {
                        // nanti pasang logic navigate ke detail
                        alert(`Detail pesanan ${item.id}`);
                      }}
                      containerStyle={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 3,
                      }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* TOMBOL TAMBAH */}
          {showButtonPlus && (
            <Animated.View
              style={{
                transform: [{ translateX: animatedValue }],
                alignSelf: 'flex-end',
                marginHorizontal: 16,
                opacity: animatedOpacity,
              }}
            >
              <ButtonCustom
                classNameContainer="bg-[#1475BA] rounded-[10px] py-1 w-[160px]"
                iconLeft={<Entypo name="plus" size={32} color="white" />}
                text="Tambah"
                textClassName="text-[20px] text-center text-white"
                textStyle={{ fontFamily: 'LexSemiBold' }}
                onPress={() => alert('Tambah')}
                isTouchable={true}
                containerStyle={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                }}
              />
            </Animated.View>
          )}
        </View>
      </View>

      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
