import React from 'react';
import { View, ScrollView, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

// COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';
import SubmissionStatusSection from '@/components/submissionStatusSection';
import PaymentStatusSection from '@/components/paymentStatusSection';
import CreationStatusSection from '@/components/creationStatusSection';
import OrderCompletionStatusSection from '@/components/orderStatusCompletionSection';

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
    <View className="flex-1 bg-gray-50">
      <NavCartOrder
        text="Pesanan"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      <ScrollView
        className="flex-1 px-4 py-3"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#1475BA', '#FFFFFF', '#6BBC3F']}
          className="overflow-hidden rounded-xl"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="w-full p-5">
            {/* Judul Utama */}
            <Text
              className="mb-1 text-center text-lg text-white"
              style={{ fontFamily: 'LexBold' }}
            >
              Tracking Pesanan Anda
            </Text>
            <View className="mb-5">
              <View className="self-center rounded-full border border-white/30 bg-white/20 px-3 py-1 backdrop-blur-sm">
                <Text className="text-sm font-medium tracking-wide text-white">
                  ID: {id}
                </Text>
              </View>
            </View>

            {/* Tanggal Pemesanan */}
            <View className="mb-6 flex-row items-center justify-center gap-1">
              <Text
                className="text-sm text-white/80"
                style={{ fontFamily: 'LexRegular' }}
              >
                Dipesan pada:
              </Text>
              <Text
                className="text-sm font-medium text-white"
                style={{ fontFamily: 'LexRegular' }}
              >
                {detail.Tanggal_Pemesanan.toDate().toLocaleString()}
              </Text>
            </View>

            {/* Timeline Status */}
            <View className="relative mb-10 flex-col py-6">
              <View
                className="absolute left-8 w-px rounded-sm bg-yellow-400"
                style={{
                  top: '12%',
                  height: '76%',
                  shadowColor: '#FBBF24',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              />

              {/* Pembungkus Semua Item */}
              <View className="flex-col space-y-6 pl-2">
                {/* STATUS PENGAJUAN */}
                <SubmissionStatusSection detail={detail} />

                {/* STATUS PEMBAYARAN */}
                <PaymentStatusSection detail={detail} />

                {/* STATUS PEMBUATAN */}
                <CreationStatusSection detail={detail} />

                {/* STATUS PESANAN SELESAI */}
                <OrderCompletionStatusSection detail={detail} />
              </View>
            </View>

            {/* Alamat Pengiriman */}
            <View className="mb-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <View className="mb-3 flex-row items-center gap-2">
                <Ionicons name="location-outline" size={18} color="#1475BA" />
                <Text className="font-semibold text-gray-800">
                  Alamat Pengiriman
                </Text>
              </View>

              {detail.user?.tipe === 'perorangan' && (
                <View className="mt-4 space-y-3">
                  {/* Nama Lengkap */}
                  <View className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <View className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                      <FontAwesome6 name="user" size={16} color="#1475BA" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">
                        Nama Lengkap
                      </Text>
                      <Text className="text-sm font-medium text-gray-800">
                        {detail.user.Nama_Lengkap}
                      </Text>
                    </View>
                  </View>

                  {/* Nomor HP */}
                  <View className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <View className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                      <FontAwesome6 name="phone" size={16} color="#0A7F3F" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Nomor HP</Text>
                      <Text className="text-sm text-gray-800">
                        {detail.user.No_Hp}
                      </Text>
                    </View>
                  </View>

                  {/* Email */}
                  <View className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <View className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                      <FontAwesome6 name="envelope" size={16} color="#D97706" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Email</Text>
                      <Text className="text-sm text-gray-800">
                        {detail.user.Email}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {detail.user?.tipe === 'perusahaan' && (
                <View className="mt-4 space-y-3">
                  {/* Nama Perusahaan */}
                  <View className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <View className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                      <FontAwesome6 name="building" size={16} color="#0A7F3F" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">
                        Nama Perusahaan
                      </Text>
                      <Text className="text-sm font-medium text-gray-800">
                        {detail.user.Nama_Perusahaan}
                      </Text>
                    </View>
                  </View>

                  {/* No HP Perusahaan */}
                  <View className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <View className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                      <FontAwesome6 name="phone" size={16} color="#0A7F3F" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">
                        Nomor HP Perusahaan
                      </Text>
                      <Text className="text-sm text-gray-800">
                        {detail.user.No_Hp_Perusahaan}
                      </Text>
                    </View>
                  </View>

                  {/* Email Pribadi */}
                  <View className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <View className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                      <FontAwesome6 name="user" size={16} color="#1475BA" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">
                        Email Pribadi
                      </Text>
                      <Text className="text-sm text-gray-800">
                        {detail.user.Email}
                      </Text>
                    </View>
                  </View>

                  {/* Email Perusahaan (jika ada) */}
                  {detail.user.Email_Perusahaan && (
                    <View className="flex-row items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                      <View className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                        <FontAwesome6
                          name="building"
                          size={16}
                          color="#0A7F3F"
                        />
                      </View>
                      <View>
                        <Text className="text-xs text-gray-500">
                          Email Perusahaan
                        </Text>
                        <Text className="text-sm text-gray-800">
                          {detail.user.Email_Perusahaan}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Alamat Perusahaan */}
                  <View className="flex-row items-start rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <View className="mr-3 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
                      <FontAwesome6 name="map-pin" size={16} color="#BE123C" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">
                        Alamat Perusahaan
                      </Text>
                      <Text className="text-sm text-gray-800">
                        {detail.user.Alamat_Perusahaan}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Ringkasan Pesanan */}
            <View className="mb-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <View className="mb-3 flex-row items-center gap-2">
                <Ionicons name="receipt-outline" size={18} color="#0A7F3F" />
                <Text className="font-semibold text-gray-800">
                  Ringkasan Pesanan
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Total Pesanan</Text>
                <Text className="font-bold text-emerald-600">
                  Rp{detail.Total_Harga_Pesanan?.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>

            {/* Detail Pesanan Lengkap */}
            <View className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <View className="mb-5 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="receipt-outline" size={18} color="#0A7F3F" />
                  <Text className="font-semibold text-gray-800">
                    Detail Pesanan
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Text className="text-xs text-gray-500">ID:</Text>
                  <Text className="font-mono text-xs font-medium text-gray-700">
                    {id}
                  </Text>
                </View>
              </View>

              <View className="space-y-4">
                {detail.keranjang.map((item, index) => (
                  <View
                    key={index}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    {/* Nomor VA (jika berbayar) */}
                    {detail.ajukan?.Jenis_Ajukan !== 'Gratis' &&
                      item.Nomor_VA && (
                        <View className="mb-3 w-fit flex-row items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
                          <FontAwesome6
                            name="barcode"
                            size={12}
                            color="#1475BA"
                          />
                          <Text className="font-mono text-xs font-medium text-blue-700">
                            VA: {item.Nomor_VA}
                          </Text>
                        </View>
                      )}

                    {/* Nama Produk */}
                    <Text className="mb-1 text-base font-semibold text-gray-800">
                      {item.Nama}
                    </Text>

                    {/* Pemilik */}
                    <View className="mb-3 flex-row items-center gap-1.5">
                      <Entypo name="user" size={12} color="#6B7280" />
                      <Text className="text-xs text-gray-600">
                        Pemilik: {item.Pemilik}
                      </Text>
                    </View>

                    {/* Garis pemisah halus */}
                    <View className="mb-3 h-px w-full bg-gray-100" />

                    {/* Qty & Harga dalam baris bawah yang rapi */}
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-1.5">
                        <Ionicons
                          name="cube-outline"
                          size={14}
                          color="#6B7280"
                        />
                        <Text className="text-sm text-gray-700">
                          Qty:{' '}
                          <Text className="font-medium">x{item.Kuantitas}</Text>
                        </Text>
                      </View>

                      <Text className="text-base font-bold text-emerald-600">
                        Rp{item.Total_Harga.toLocaleString('id-ID')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Tombol Cek Invoice – diperbarui agar lebih menyatu */}
              <View className="mt-6 flex-row justify-end">
                <ButtonCustom
                  classNameContainer="bg-[#1475BA] rounded-xl py-2.5 px-5"
                  text="CEK INVOICE"
                  textClassName="text-sm font-semibold text-white"
                  textStyle={{ fontFamily: 'LexSemiBold' }}
                  iconRight={
                    <Ionicons name="arrow-forward" size={16} color="white" />
                  }
                  onPress={() => {
                    router.push({
                      pathname: '/screens/invoiceScreen',
                      params: { idPemesanan: detail.idPemesanan },
                    });
                  }}
                  isTouchable={true}
                  containerStyle={{
                    shadowColor: '#1475BA',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                />
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Tombol Animasi (Tetap di bawah, tapi tidak di dalam ScrollView) */}
        {showButtonPlus && (
          <Animated.View
            style={{
              transform: [{ translateX: animatedValue }],
              position: 'absolute',
              bottom: 20,
              right: 20,
              zIndex: 10,
            }}
          >
            <ButtonCustom
              classNameContainer="bg-[#1475BA] rounded-full py-3 px-6"
              iconLeft={<Entypo name="plus" size={20} color="white" />}
              text="Tambah"
              textClassName="text-base text-white ml-1"
              textStyle={{ fontFamily: 'LexSemiBold' }}
              onPress={() => alert('Tambah')}
              isTouchable={true}
              containerStyle={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            />
          </Animated.View>
        )}
      </ScrollView>

      {/* Footer Bar */}
      <View className="h-2 w-full bg-[#1475BA]" />
    </View>
  );
}
