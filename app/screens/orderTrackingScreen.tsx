import React from 'react';
import { View, ScrollView, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// OUR ICONS
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';

// OUR CONSTANTS
import dataPesanan from '@/constants/dataPesanan';

// OUR HOOKS
import useAjukanTransition from '@/hooks/Frontend/orderScreen/useAnimationButtonPlus';

export default function OrderScreen() {
  const router = useRouter();
  const { showButtonPlus, animatedValue } = useAjukanTransition();
  const item = dataPesanan;

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
            <Text
              className="self-center text-[20px]"
              style={{ fontFamily: 'LexBold' }}
            >
              Tracking Pesanan Anda
            </Text>
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
                30/04/2025, 7:30 PM
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
                    {/* item 1 */}
                    <View className="z-10 mb-10 flex flex-row items-start">
                      <View
                        className="mr-5 rounded-full bg-[#72C02C] p-3"
                        style={{
                          width: 48,
                          height: 48,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <AntDesign name="filetext1" size={24} color="black" />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="mb-2 text-base font-bold text-black"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Pesanan Dibuat
                        </Text>
                        <View
                          className="mb-1 flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Jenis Kegiatan :
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            {item.jenisKegiatan}
                          </Text>
                        </View>
                        <View
                          className="mb-1 flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Status Pengajuan :
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            {item.statusPengajuan}
                          </Text>
                        </View>
                        <View
                          className="flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Tanggal Pengajuan :
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          ></Text>
                        </View>
                      </View>
                    </View>

                    {/* item 2 */}
                    <View className="z-10 mb-10 flex flex-row items-start">
                      <View
                        className="mr-5 rounded-full bg-[#72C02C] p-3"
                        style={{
                          width: 48,
                          height: 48,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <FontAwesome name="dollar" size={24} color="black" />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="mb-2 text-base font-bold text-black"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Status Pembayaran
                        </Text>
                        <View
                          className="mb-1 flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Status Pembayaran :{' '}
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            {item.statusPembayaran}
                          </Text>
                        </View>
                        <View
                          className="flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Tanggal Pembayaran :
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            {item.tanggalPembayaran}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* item 3 */}
                    <View className="z-10 mb-10 flex flex-row items-start">
                      <View
                        className="mr-5 rounded-full bg-[#72C02C] p-3"
                        style={{
                          width: 48,
                          height: 48,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <AntDesign name="inbox" size={24} color="black" />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="mb-2 text-base font-bold text-black"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Status Pembuatan
                        </Text>
                        <View
                          className="flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Status Pembuatan :
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            {item.statusPembuatan}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* item 4 */}
                    <View className="z-10 flex flex-row items-start">
                      <View
                        className="mr-5 rounded-full bg-[#72C02C] p-3"
                        style={{
                          width: 48,
                          height: 48,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <FontAwesome name="send" size={24} color="black" />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="mb-2 text-base font-bold text-black"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Pesanan Selesai
                        </Text>
                        <View
                          className="mb-1 flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Status Pengisian IKM :
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            {item.statusIKM}
                          </Text>
                        </View>
                        <View
                          className="flex-row items-center gap-2"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            Status Pesanan :
                          </Text>
                          <Text
                            style={{ fontFamily: 'LexRegular', flexShrink: 1 }}
                          >
                            {item.statusPesanan}
                          </Text>
                        </View>
                      </View>
                    </View>
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
                      <Text>{item.alamatPengiriman.nama}</Text>
                      <Text>{item.alamatPengiriman.telepon}</Text>
                      <Text>{item.alamatPengiriman.email}</Text>
                    </View>

                    {/* Ringkasan Pesanan - lebar lebih kecil */}
                    <View
                      className="gap-2 rounded-[10px] border-2 border-[#73BF40] bg-white p-4"
                      style={{ flex: 1 }}
                    >
                      <Text className="mb-2 font-bold">Ringkasan Pesanan</Text>
                      <View className="flex-row flex-wrap justify-between">
                        <Text>Total Pesanan:</Text>
                        <Text>{item.totalPesanan}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Baris 2: Nomor Pesanan full lebar */}
                  <View className="mb-10 rounded-[10px] border-2 border-[#73BF40] bg-white p-4">
                    <View
                      className="flex-row items-center gap-2"
                      style={{ flexWrap: 'wrap' }}
                    >
                      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>
                        Nomor Pesanan :
                      </Text>
                      <Text style={{ fontFamily: 'LexRegular', flexShrink: 1 }}>
                        {item.nomorPesanan}
                      </Text>
                    </View>

                    {/* Informasi dengan jarak antar item (space-between) */}
                    <View className="mb-4 mt-4 flex-row justify-between">
                      <Text>Informasi</Text>
                      <Text>{item.informasi}</Text>
                    </View>

                    {/* Virtual account produk */}
                    <View>
                      <Text className="mb-2 font-bold">
                        Virtual Account Produk:
                      </Text>
                      <View className="flex-row items-center justify-between">
                        <Text>{item.totalPesanan}</Text>
                        <Text>x1</Text>
                        <Text>{item.totalPesanan}</Text>
                      </View>
                    </View>

                    {/* Garis horizontal */}
                    <View className="my-4 border-t border-gray-300" />

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
