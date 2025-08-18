import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter, useLocalSearchParams } from 'expo-router';

// COMPONENTS
import NavCartOrder from '@/components/navCartOrder';

// OUR CONSTANTS
import { invoiceTabs } from '@/constants/invoiceTabs';

// HOOKS
import { useTabAnimation } from '@/hooks/Frontend/useAnimatedTab/useTabAnimation';
import { useGetInvoiceData } from '@/hooks/Backend/useGetInvoiceData';
// OUR UTILS
import { getCategoryIcon } from '@/components/getCategoryIcon';

export default function InvoiceScreen() {
  const router = useRouter();
  const { activeTab, translateX, tabWidth, onTabPress, onLayoutParent } =
    useTabAnimation(invoiceTabs, 'Pemesan');
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const { idPemesanan } = useLocalSearchParams<{ idPemesanan: string }>();
  const { detail: invoiceDetail, loading } = useGetInvoiceData(idPemesanan);

  return (
    <View className="flex-1 bg-[#A7CBE5]">
      {/* NAVBAR */}
      <NavCartOrder
        text="Dokumen Pesanan"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      {/* Header Info */}
      <View className="mx-4 my-4 items-center rounded-2xl bg-gray-100 p-4">
        {/* Nomor Pesanan dan Status */}
        <View className="mb-3 items-center">
          <Text className="text-center text-sm text-gray-500">
            Nomor Pesanan
          </Text>
          <Text className="text-center text-2xl font-semibold">
            {invoiceDetail?.idPemesanan || 'Null'}
          </Text>

          <Text className="rounded-lg bg-green-400 p-1 px-4 text-center text-white">
            Lunas
          </Text>
        </View>

        <View className="w-full flex-row justify-between px-4">
          {/* TANGGAL PEMBAYARAN */}
          <View className="flex-col items-center">
            <Text className="text-sm text-gray-500">Tanggal Pembayaran</Text>
            <Text className="text-base font-semibold">12/11/25</Text>
          </View>

          {/* TOTAL PESANAN */}
          <View className="flex-col items-center">
            <Text className="text-sm text-gray-500">Total Pesanan</Text>
            <Text className="text-base font-semibold">
              Rp {invoiceDetail?.Total_Harga_Pesanan?.toLocaleString() || '0'}
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="mx-4 my-1 rounded-2xl bg-gray-100 p-2">
        <View className="overflow-hidden rounded-2xl">
          <View className="flex-row" onLayout={onLayoutParent}>
            {/* Indicator */}
            {tabWidth > 0 && (
              <Animated.View
                style={{
                  position: 'absolute',
                  width: tabWidth,
                  height: '100%',
                  backgroundColor: '#1475BA',
                  borderRadius: 16,
                  transform: [{ translateX }],
                }}
              />
            )}

            {invoiceTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => onTabPress(tab)}
                  style={{ flex: 1, alignItems: 'center', paddingVertical: 12 }}
                >
                  <Text
                    style={{
                      color: isActive ? 'white' : 'black',
                      fontWeight: isActive ? 'bold' : 'normal',
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* CONTENTS */}
      <View className="flex-1 bg-[#A7CBE5] p-4">
        {/* DETAIL PEMESANAN */}
        {activeTab === 'Pemesan' && (
          <View className="mb-4 rounded-2xl bg-gray-50 p-5 shadow-md">
            {/* Header */}
            <Text className="mb-4 text-lg font-semibold text-gray-700">
              Detail Pemesan
            </Text>

            {/* Nomor Pesanan & Nomor Ajukan */}
            <View className="mb-4 flex-row justify-between">
              <View className="mr-2 flex-1">
                <Text className="mb-1 text-sm text-gray-500">
                  Nomor Pesanan
                </Text>
                <Text className="text-base font-medium text-gray-800">
                  {invoiceDetail?.idPemesanan || 'Null'}
                </Text>
              </View>
              <View className="ml-2 flex-1">
                <Text className="mb-1 text-sm text-gray-500">Nomor Ajukan</Text>
                <Text className="text-base font-medium text-gray-800">
                  {invoiceDetail?.ajukan?.id || '-'}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="my-1 h-px bg-gray-200" />

            {/* Email */}
            <View className="mt-3 w-full">
              {/* Email Pribadi */}
              {invoiceDetail?.user?.tipe === 'perorangan' && (
                <View className="mb-2">
                  <Text className="mb-1 text-sm text-gray-500">
                    Email Pribadi
                  </Text>
                  <View className="flex-row items-center rounded-lg bg-gray-100 p-2">
                    <Text className="mr-2 text-base">📧</Text>
                    <Text className="flex-shrink text-base font-semibold text-gray-800">
                      {invoiceDetail.user.Email}
                    </Text>
                  </View>
                </View>
              )}

              {/* Email Perusahaan */}
              {invoiceDetail?.user?.tipe === 'perusahaan' && (
                <View className="mb-2">
                  <View>
                    <Text className="mb-1 text-sm text-gray-500">
                      Email Pribadi
                    </Text>
                    <View className="flex-row items-center rounded-lg bg-gray-100 p-2">
                      <Text className="mr-2 text-base">📧</Text>
                      <Text className="flex-shrink text-base font-semibold text-gray-800">
                        {invoiceDetail.user.Email || 'Null'}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="mb-1 text-sm text-gray-500">
                      Email Perusahaan
                    </Text>
                    <View className="flex-row items-center rounded-lg bg-gray-100 p-2">
                      <Text className="mr-2 text-base">📧</Text>
                      <Text className="flex-shrink text-base font-semibold text-gray-800">
                        {invoiceDetail.user.Email_Perusahaan || 'Null'}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Detail Produk */}
        {activeTab === 'Produk' && (
          <View className="mb-4 rounded-2xl bg-gray-50 p-5 shadow-md">
            {/* Header */}
            <Text className="mb-4 text-lg font-semibold text-gray-700">
              Detail Produk
            </Text>

            {/* Scrollable List Produk */}
            <ScrollView
              style={{ maxHeight: 400 }}
              showsVerticalScrollIndicator={true}
            >
              {invoiceDetail?.keranjang.map((item, idx) => {
                return (
                  <View
                    key={idx}
                    className="mb-4 flex-row rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    {/* Icon Produk */}
                    <View className="mr-4 h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                      <View className="h-[200px] w-full shadow-xl">
                        <Image
                          source={require('@/assets/images/ProductScreen/bg-icon.png')}
                          className="h-full w-full rounded-[20px] object-cover"
                        />
                        <View className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 px-2">
                          {getCategoryIcon(item.Pemilik)}
                        </View>
                      </View>
                    </View>

                    {/* Detail Produk */}
                    <View className="flex-1 justify-between">
                      {/* Pemilik dan Harga */}
                      <View className="mb-1 flex-row items-start justify-between">
                        <Text className="text-sm text-gray-500">
                          {item.Pemilik}
                        </Text>
                        <Text className="text-sm font-semibold text-green-600">
                          Rps {item.Harga.toLocaleString()}
                        </Text>
                      </View>

                      {/* Nama Produk */}
                      <TouchableOpacity
                        className="mb-1 flex-row items-center justify-between"
                        onPress={() =>
                          setExpandedItems((prev) => ({
                            ...prev,
                            [idx]: !prev[idx],
                          }))
                        }
                      >
                        <Text
                          className="flex-1 text-base font-semibold"
                          numberOfLines={expandedItems[idx] ? undefined : 1}
                          ellipsizeMode="tail"
                        >
                          {item.Nama}
                        </Text>

                        <FontAwesome6
                          name={expandedItems[idx] ? 'caret-up' : 'caret-down'}
                          size={16}
                          color="gray"
                        />
                      </TouchableOpacity>

                      {/* Info tambahan */}
                      <View className="mb-1 flex-row flex-wrap justify-between">
                        <Text className="flex-shrink text-sm text-gray-600">
                          Total/Produk: Rp {item.Total_Harga.toLocaleString()}
                        </Text>
                        <Text className="flex-shrink text-sm text-gray-600">
                          Qty: {item.Kuantitas}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Detail Penerima */}
        {activeTab === 'Penerima' && invoiceDetail?.user && (
          <View className="mb-4 rounded-2xl bg-gray-100 p-4">
            <Text className="mb-4 text-lg font-semibold text-gray-700">
              Detail Penerima
            </Text>

            <View className="flex-row items-center justify-between">
              {/* Nama Lengkap */}
              <View className="flex-1 flex-row items-center">
                <View className="mr-3 p-3">
                  <FontAwesome6 name="user" size={24} color="#1475BA" />
                </View>
                <View>
                  <Text className="text-sm text-gray-500">Nama Lengkap</Text>
                  <Text className="text-base font-semibold text-gray-800">
                    {invoiceDetail.user.Nama_Lengkap}
                  </Text>
                </View>
              </View>

              {/* Nama Perusahaan (jika tipe perusahaan) */}
              <View className="flex-1 flex-row items-center justify-end">
                <View className="mr-3 p-3">
                  <FontAwesome6 name="building" size={24} color="#0A7F3F" />
                </View>
                <View className="items-end">
                  <Text className="text-sm text-gray-500">Nama Perusahaan</Text>
                  <Text className="text-base font-semibold text-gray-800">
                    {invoiceDetail.user.tipe === 'perusahaan'
                      ? invoiceDetail.user.Nama_Perusahaan
                      : '-'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
