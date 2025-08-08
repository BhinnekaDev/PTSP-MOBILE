import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  ActivityIndicator,
} from 'react-native';

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

      <View className="flex-1">
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
              <View className="w-full items-center justify-center">
                <Text
                  className="py-4 text-[18px] text-black"
                  style={{ fontFamily: 'LexMedium' }}
                >
                  Pesanan #{index + 1}
                </Text>
              </View>
              <View className="gap-4 px-4 pb-6">
                <View className="flex-row items-center justify-between">
                  <Text style={{ fontFamily: 'LexSemiBold' }}>
                    Status Pesanan
                  </Text>
                  <Text
                    style={{ fontFamily: 'LexRegular' }}
                    className={`rounded-md px-2 ${
                      item.statusPesanan === 'Selesai'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {item.statusPesanan}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text style={{ fontFamily: 'LexSemiBold' }}>
                    Status Pembayaran
                  </Text>
                  <Text
                    style={{ fontFamily: 'LexRegular' }}
                    className={`rounded-md px-2 ${
                      item.statusPembayaran === 'Selesai'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {item.statusPembayaran}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="date-range" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Tanggal Pemesanan:
                    </Text>
                  </View>
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
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="date-range" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Tanggal Pemesanan:
                    </Text>
                  </View>
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
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="date-range" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Tanggal Pengajuan:
                    </Text>
                  </View>
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
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons
                      name="confirmation-number"
                      size={20}
                      color="black"
                    />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      ID Pesanan:
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'LexRegular' }}>{item.id}</Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="person-sharp" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Nama Lengkap:
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'LexRegular' }}>
                    {orderInfo?.namaLengkap}
                  </Text>
                </View>

                {orderInfo?.tipe === 'perusahaan' && (
                  <>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-1">
                        <Entypo name="home" size={20} color="black" />
                        <Text style={{ fontFamily: 'LexSemiBold' }}>
                          Nama Perusahaan:
                        </Text>
                      </View>
                      <Text style={{ fontFamily: 'LexRegular' }}>
                        {orderInfo.namaPerusahaan}
                      </Text>
                    </View>
                  </>
                )}

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="email" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>Email:</Text>
                  </View>
                  <Text style={{ fontFamily: 'LexRegular' }}>
                    {orderInfo?.tipe === 'perusahaan'
                      ? `${orderInfo.email} / ${orderInfo.emailPerusahaan}`
                      : orderInfo?.email}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="call" size={20} color="black" />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>No HP:</Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>
                      {orderInfo?.tipe === 'perusahaan'
                        ? `${orderInfo.noHp} / ${orderInfo.noHpPerusahaan}`
                        : orderInfo?.noHp}
                    </Text>
                  </View>
                </View>
                {/* Tombol lihat detail (nanti aktifin sesuai instruksi kamu berikutnya) */}
                <View className="mt-2">
                  <ButtonCustom
                    classNameContainer="bg-[#1475BA] rounded-[10px] w-72 self-center"
                    text="Lihat Detail"
                    textClassName="text-[14px] text-center text-white"
                    textStyle={{ fontFamily: 'LexSemiBold' }}
                    isTouchable={true}
                    onPress={() => {
                      // console.log('ID : ====>', item.id);
                      router.push({
                        pathname: '/screens/orderTrackingScreen',
                        params: { id: item.id },
                      });
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

      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
