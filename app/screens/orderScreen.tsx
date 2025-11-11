import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import ButtonCustom from '@/components/buttonCustom';
import useAjukanTransition from '@/hooks/Frontend/orderScreen/useAnimationButtonPlus';
import { useGetUserOrderInfo } from '@/hooks/Backend/useGetUserOrderInfo';

export default function OrderScreen() {
  const router = useRouter();
  const { showButtonPlus, animatedValue, animatedOpacity } =
    useAjukanTransition();
  const { listPemesanan, loading } = useGetUserOrderInfo();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#EAF3FA]">
        <ActivityIndicator size="large" color="#1475BA" />
      </View>
    );
  }

  return (
    <View className="flex-1 gap-4">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {listPemesanan.length === 0 ? (
          <View className="mt-10 items-center justify-center">
            <Ionicons name="file-tray-outline" size={48} color="#9CA3AF" />
            <Text
              className="mt-4 text-center text-[16px] text-gray-500"
              style={{ fontFamily: 'LexRegular' }}
            >
              Belum ada pesanan.
            </Text>
          </View>
        ) : (
          listPemesanan.map((item, index) => (
            <View
              key={item.id}
              className="mb-6 overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white shadow-md"
            >
              {/* Header */}
              <View className="rounded-t-2xl bg-[#1475BA] py-3">
                <Text
                  className="text-center text-[18px] text-white"
                  style={{ fontFamily: 'LexSemiBold' }}
                >
                  Pesanan #{index + 1}
                </Text>
              </View>

              {/* Content */}
              <View className="gap-4 px-5 py-5">
                {/* Status */}
                <View className="flex-row justify-between">
                  <Text style={{ fontFamily: 'LexSemiBold' }}>
                    Status Pesanan
                  </Text>
                  <Text
                    className={`rounded-md px-2 py-0.5 text-[13px] ${
                      item.statusPesanan === 'Selesai'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                    style={{ fontFamily: 'LexRegular' }}
                  >
                    {item.statusPesanan}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text style={{ fontFamily: 'LexSemiBold' }}>
                    Status Pembayaran
                  </Text>
                  <Text
                    className={`rounded-md px-2 py-0.5 text-[13px] ${
                      item.statusPembayaran === 'Lunas'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                    style={{ fontFamily: 'LexRegular' }}
                  >
                    {item.statusPembayaran}
                  </Text>
                </View>

                <View className="my-1 border-b border-gray-200" />

                {/* Dates */}
                <View className="flex-row justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons
                      name="date-range"
                      size={18}
                      color="#1475BA"
                    />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      Tanggal Pemesanan:
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: 'LexRegular' }}
                    className="text-gray-600"
                  >
                    {item.tanggalPemesanan.toDate().toLocaleString()}
                  </Text>
                </View>

                {item.tanggalPengajuan && (
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center gap-1">
                      <MaterialIcons
                        name="event-available"
                        size={18}
                        color="#1475BA"
                      />
                      <Text style={{ fontFamily: 'LexSemiBold' }}>
                        Tanggal Pengajuan:
                      </Text>
                    </View>
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="text-gray-600"
                    >
                      {item.tanggalPengajuan.toDate().toLocaleString()}
                    </Text>
                  </View>
                )}

                <View className="flex-row justify-between">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons
                      name="confirmation-number"
                      size={18}
                      color="#1475BA"
                    />
                    <Text style={{ fontFamily: 'LexSemiBold' }}>
                      ID Pesanan:
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'LexRegular' }}>{item.id}</Text>
                </View>

                <View className="my-1 border-b border-gray-200" />

                {/* Button */}
                <View className="mt-4 flex-row justify-end">
                  <ButtonCustom
                    classNameContainer="bg-[#1475BA] rounded-[10px] py-2 px-4"
                    text="Lihat Detail"
                    textClassName="text-[15px] text-center text-white"
                    textStyle={{ fontFamily: 'LexSemiBold' }}
                    isTouchable={true}
                    onPress={() =>
                      router.push({
                        pathname: '/screens/orderTrackingScreen',
                        params: { id: item.id },
                      })
                    }
                    containerStyle={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.15,
                      shadowRadius: 3,
                      elevation: 3,
                    }}
                  />
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Tombol Tambah */}
      {showButtonPlus && (
        <Animated.View
          style={{
            transform: [{ translateX: animatedValue }],
            opacity: animatedOpacity,
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}
        >
          <ButtonCustom
            classNameContainer="bg-[#1475BA] rounded-[12px] py-2 w-[160px]"
            iconLeft={<Entypo name="plus" size={26} color="white" />}
            text="Tambah"
            textClassName="text-[18px] text-center text-white"
            textStyle={{ fontFamily: 'LexSemiBold' }}
            onPress={() => alert('Tambah')}
            isTouchable={true}
            containerStyle={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 4,
            }}
          />
        </Animated.View>
      )}

      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
