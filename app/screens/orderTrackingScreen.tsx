import React from 'react';
import { View, ScrollView, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';

// OUR ICONS
import Entypo from '@expo/vector-icons/Entypo';

// COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';
import SubmissionStatusSection from '@/components/submissionStatusSection';
import PaymentStatusSection from '@/components/paymentStatusSection';
import CreationStatusSection from '@/components/creationStatusSection';
import OrderStatusSection from '@/components/orderStatusCompletionSection';

// OUR HOOKS
import useAjukanTransition from '@/hooks/Frontend/orderScreen/useAnimationButtonPlus';
import { useGetUserDetailOrderInfo } from '@/hooks/Backend/useGetUserDetailOrderInfo';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { showButtonPlus, animatedValue } = useAjukanTransition();
  const { detail, loading } = useGetUserDetailOrderInfo(String(id));

  if (loading) return <Text>Loading...</Text>;
  if (!detail) return <Text>Data tidak ditemukan</Text>;

  return (
    <View className="flex-1 gap-4 bg-white">
      <NavCartOrder
        text="Pesanan"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      <View className="flex-1 px-4">
        <LinearGradient
          colors={['#1475BA', '#FFFFFF', '#6BBC3F']}
          style={{ flex: 1, borderRadius: 12 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="w-full flex-1 py-6">
            <Text>Detail untuk ID Pesanan: {id}</Text>

            {/* TITLE TRACKING PESANAN ANDA */}
            <Text
              className="self-center text-[20px]"
              style={{ fontFamily: 'LexBold' }}
            >
              Tracking Pesanan Anda
            </Text>

            {/* TANGGAL PEMESANAN */}
            <View className="flex-row items-center gap-2 self-center">
              <Text
                className="text-[13px]"
                style={{ fontFamily: 'LexRegular' }}
              >
                Dipesan pada tanggal :{' '}
              </Text>
              <Text
                className="text-[13px]"
                style={{ fontFamily: 'LexRegular' }}
              >
                {detail.Tanggal_Pemesanan.toDate().toLocaleString()}
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={{ width: '100%', padding: 10 }}
              showsVerticalScrollIndicator={false}
            >
              {/* TRACKING PESANAN */}
              <View>
                <View className="relative mb-10 flex-col py-6">
                  {/* garis vertikal di tengah ikon */}
                  <View
                    className="absolute w-[2px] bg-black"
                    style={{
                      left: 25,
                      top: '10%', // contoh: 10% dari tinggi parent container
                      height: '80%', // contoh: garis vertikal tinggi 70% dari parent
                    }}
                  />

                  {/* PEMBUNGKUS SEMUA ITEM */}
                  <View className="flex-col">
                    {/* STATUS PENGAJUAN */}
                    <SubmissionStatusSection detail={detail} />

                    {/* STATUS PEMBAYARAN */}
                    <PaymentStatusSection detail={detail} />

                    {/* STATUS PEMBUATAN */}
                    <CreationStatusSection detail={detail} />

                    {/* STATUS PESANAN SELESAI */}
                    <OrderStatusSection detail={detail} />
                  </View>
                </View>

                <View className="flex-col">
                  {/* Baris 1: Alamat Pengiriman dan Ringkasan Pesanan sejajar horizontal */}
                  <View className="mb-10 flex flex-row gap-2">
                    {/* Alamat Pengiriman - lebar lebih besar */}
                    <View
                      className="gap-2 rounded-[10px] border-2 border-[#73BF40] bg-white p-4"
                      style={{ flex: 2 }}
                    >
                      <Text className="mb-2 font-bold">Alamat Pengiriman</Text>
                      {detail.user?.tipe === 'perorangan' && (
                        <>
                          <Text>{detail.user.Nama_Lengkap}</Text>
                          <Text>{detail.user.No_Hp}</Text>
                          <Text>{detail.user.Email}</Text>
                        </>
                      )}

                      {detail.user?.tipe === 'perusahaan' && (
                        <>
                          <Text>{detail.user.Nama_Perusahaan}</Text>
                          <Text>{detail.user.No_Hp_Perusahaan}</Text>
                          <Text>{detail.user.Email}</Text>
                          <Text>{detail.user.Email_Perusahaan}</Text>
                          <Text>{detail.user.Alamat_Perusahaan}</Text>
                        </>
                      )}
                    </View>

                    {/* Ringkasan Pesanan - lebar lebih kecil */}
                    <View
                      className="gap-2 rounded-[10px] border-2 border-[#73BF40] bg-white p-4"
                      style={{ flex: 1 }}
                    >
                      <Text className="mb-2 font-bold">Ringkasan Pesanan</Text>
                      <View className="flex-row flex-wrap justify-between">
                        <Text>Total Pesanan:</Text>
                        <Text className="font-bold">
                          Rp
                          {detail?.keranjang
                            ?.reduce(
                              (acc, item) => acc + (item.Total_Harga || 0),
                              0
                            )
                            .toLocaleString('id-ID')}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Baris 2: Nomor Pesanan full lebar */}
                  <View className="mb-10 rounded-[10px] border-2 border-[#73BF40] bg-white p-4">
                    <View
                      className="flex-row items-center"
                      style={{ flexWrap: 'wrap' }}
                    >
                      {/* NOMOR PESANAN */}
                      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>
                        Nomor Pesanan :
                      </Text>
                      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>
                        {id}
                      </Text>

                      {/* TANGGAL PEMESANAN */}
                      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>
                        Dipesan pada tanggal :{' '}
                      </Text>
                      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>
                        {detail.Tanggal_Pemesanan.toDate().toLocaleString()}
                      </Text>
                    </View>

                    {/* DATA PEMESANAN DARI DETAIL KERAN*/}
                    <View>
                      {detail.keranjang.map((item, index) => (
                        <View
                          key={index}
                          className="mb-2 border-b border-gray-200 pb-2"
                          style={{ flexDirection: 'column' }}
                        >
                          {/* Nomor VA di baris terpisah */}
                          {detail.ajukan?.Jenis_Ajukan !== 'Gratis' &&
                            item.Nomor_VA && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'gray',
                                  flexWrap: 'wrap',
                                }}
                              >
                                Nomor VA: {item.Nomor_VA}
                              </Text>
                            )}

                          {/* Baris utama */}
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <View style={{ flex: 2 }}>
                              <Text className="font-semibold">{item.Nama}</Text>
                              <Text className="text-xs text-gray-600">
                                Pemilik: {item.Pemilik}
                              </Text>
                            </View>
                            <Text style={{ flex: 1, textAlign: 'center' }}>
                              x{item.Kuantitas}
                            </Text>
                            <Text style={{ flex: 1, textAlign: 'right' }}>
                              Rp{item.Total_Harga.toLocaleString('id-ID')}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    <ButtonCustom
                      classNameContainer="bg-[#1475BA] rounded-[10px] py-1 w-[160px] self-end"
                      text="CEK INVOICE"
                      textClassName="text-[13px] text-center text-white"
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
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* TOMBOL AJUKAN SEKARANG */}

            {showButtonPlus && (
              <Animated.View
                style={{
                  transform: [{ translateX: animatedValue }],
                  alignSelf: 'flex-end',
                  marginHorizontal: 16,
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
        </LinearGradient>
      </View>

      {/* BAR BAWAH */}
      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
