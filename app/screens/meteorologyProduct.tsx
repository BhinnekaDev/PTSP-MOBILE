import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// OUR COMPONENTS
import Button from '@/components/button';
import ButtonShopAndChat from '@/components/buttonShopAndChat';
import { ProductCardInfoButton } from '@/components/productCardInfoButton'; // Import komponen info button

// OUR UTILS
import { getHeaderPaddingVertical } from '@/utils/platformStyleAndroidIos';

// OUR HOOKS
import { useGetMeteorologyProducts } from '@/hooks/Backend/useGetMeteorologyProducts'; // Untuk data produk
import { usePopupAnimation } from '@/hooks/Frontend/popUpInfoCard/usePopupAnimation'; // Import hook animasi pop-up baru

export default function MeteorologyProduct() {
  const headerPaddingVertical = getHeaderPaddingVertical();
  const { products, loading, error } = useGetMeteorologyProducts();
  const { activePopupIndex, togglePopup, closePopup, fadeAnim } =
    usePopupAnimation();

  return (
    <View className="flex-1">
      <View
        className={`w-full flex-row items-center justify-between rounded-b-[10px] bg-[#1475BA] px-4 shadow-md ${headerPaddingVertical}`}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 rounded-full p-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center justify-between rounded-full bg-white pl-3">
          <TextInput
            className="flex-1 py-1"
            placeholder="Cari"
            style={{ fontFamily: 'LexRegular' }}
          />
          <TouchableOpacity className="rounded-full bg-[#72C02C] px-3 py-2">
            <Octicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="ml-12 flex-row items-center gap-4">
          <ButtonShopAndChat />
        </View>
      </View>

      <View className="flex-1 px-4 pt-4">
        <LinearGradient
          colors={['#1475BA', '#fff', '#6BBC3F']}
          className="flex-1 items-center rounded-full"
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 8,
          }}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => {
              // Panggil closePopup dari hook
              if (activePopupIndex !== null) {
                closePopup();
              }
            }}
            scrollEventThrottle={16}
          >
            <Text
              style={{ fontFamily: 'LexBold' }}
              className="mt-4 text-center text-2xl"
            >
              Informasi
            </Text>
            <Text
              style={{ fontFamily: 'LexMedium' }}
              className="text-md mb-4 mt-1 text-center uppercase"
            >
              Stasiun Meteorologi
            </Text>

            {loading ? (
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-center text-black"
              >
                Memuat produk...
              </Text>
            ) : error ? (
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-center text-red-500"
              >
                {error}
              </Text>
            ) : products.length > 0 ? (
              products.map((item, index) => (
                <View
                  key={index}
                  className="my-3 items-center justify-center gap-6"
                >
                  <View className="relative h-72 w-80 items-center justify-center gap-4 rounded-lg border-2 border-black bg-white">
                    {/* BUTTON INFO CARD */}
                    <ProductCardInfoButton
                      productIndex={index} // Teruskan indeks produk
                      activePopupIndex={activePopupIndex}
                      togglePopup={togglePopup}
                      fadeAnim={fadeAnim}
                      closePopup={closePopup}
                    />

                    <FontAwesome6 name="mountain" size={60} color="#6BBC3F" />
                    <Text
                      style={{ fontFamily: 'LexMedium' }}
                      className="text-md text-center"
                    >
                      {item.Nama}
                    </Text>
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="text-center text-lg"
                    >
                      Rp {item.Harga.toLocaleString('id-ID')}
                    </Text>
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="text-center text-sm"
                    >
                      {item.Deskripsi}
                    </Text>
                    <Button
                      style="bg-[#1475BA] px-4 py-2 rounded-full"
                      textStyle="text-xs text-white uppercase"
                      icon={
                        <Ionicons name="cart-outline" size={20} color="white" />
                      }
                      onPress={() =>
                        console.log('Tambahkan ke keranjang:', item.Nama)
                      }
                    >
                      Masukan Ke Keranjang
                    </Button>
                  </View>
                </View>
              ))
            ) : (
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-center text-black"
              >
                Tidak ada produk meteorologi ditemukan.
              </Text>
            )}
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
}
