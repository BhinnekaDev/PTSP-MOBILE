import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// OUR COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';

// OUR HOOKS
import { useGetCartOrderScreen } from '@/hooks/Backend/useGetCartOrderScreen';
import { useDeleteCartOrderScreen } from '@/hooks/Backend/useDeleteCartOrderScreen';
import { useUpdateCartQuantityScreen } from '@/hooks/Backend/useUpdateCartQuantityScreen';
// OUR ICONS
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CartOrderScreen() {
  const router = useRouter();
  const { cartItems, totalHarga, loading } = useGetCartOrderScreen();
  const { removeFromCart } = useDeleteCartOrderScreen();
  const { updateQuantity } = useUpdateCartQuantityScreen();
  return (
    <View className="flex-1 gap-4 bg-white">
      <NavCartOrder
        text="Keranjang Saya"
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
          <View className="w-full flex-1">
            <ScrollView
              contentContainerStyle={{ padding: 24, paddingBottom: 160 }}
              showsVerticalScrollIndicator={false}
            >
              {loading ? (
                <Text className="text-center font-bold text-black">
                  Memuat...
                </Text>
              ) : cartItems.length === 0 ? (
                <Text className="text-center font-bold text-black">
                  Keranjang kosong
                </Text>
              ) : (
                cartItems.map((item, index) => (
                  <View
                    key={index}
                    className="mb-4 flex-col gap-6 rounded-[12px] border-2 border-black bg-white p-6 shadow"
                  >
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={require('@/assets/images/CartCheckoutScreen/Checkout.png')}
                        className="h-14 w-14"
                        resizeMode="contain"
                      />
                      <Text className="flex-1 text-[14px] font-bold">
                        {item.Nama}
                      </Text>
                    </View>

                    {/* Tombol Hapus */}
                    <MaterialIcons
                      name="delete"
                      size={20}
                      color="red"
                      onPress={() => {
                        const type = item.ID_Informasi ? 'Informasi' : 'Jasa';
                        removeFromCart(
                          item.ID_Informasi || item.ID_Jasa || '',
                          type
                        );
                      }}
                    />
                    {/* Kuantitas dan Harga */}
                    <View className="flex-row items-center justify-between">
                      {/* Tombol - */}
                      <MaterialIcons
                        name="remove-circle-outline"
                        size={24}
                        color="#1475BA"
                        onPress={() => {
                          const type = item.ID_Informasi ? 'Informasi' : 'Jasa';
                          updateQuantity(
                            item.ID_Informasi || item.ID_Jasa || '',
                            type,
                            'decrement'
                          );
                        }}
                      />

                      {/* Kuantitas */}
                      <Text
                        className="text-[12px]"
                        style={{ fontFamily: 'LexSemiBold', color: 'black' }}
                      >
                        x{item.Kuantitas}
                      </Text>

                      {/* Tombol + */}
                      <MaterialIcons
                        name="add-circle-outline"
                        size={24}
                        color="#1475BA"
                        onPress={() => {
                          const type = item.ID_Informasi ? 'Informasi' : 'Jasa';
                          updateQuantity(
                            item.ID_Informasi || item.ID_Jasa || '',
                            type,
                            'increment'
                          );
                        }}
                      />

                      {/* Harga */}
                      <Text
                        className="ml-2 text-[12px] font-bold"
                        style={{ color: 'black' }}
                      >
                        Rp {item.Total_Harga.toLocaleString('id-ID')}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Total dan Button */}
            <View className="bottom-6 flex w-full flex-row justify-between gap-2 px-2">
              <View className="flex flex-1 flex-row items-center justify-between rounded-[10px] bg-[#1475BA] px-4 py-3">
                <Text
                  className="text-white"
                  style={{ fontFamily: 'LexSemiBold' }}
                >
                  Total Harga
                </Text>
                <Text
                  className="ml-4 text-white"
                  style={{ fontFamily: 'LexSemiBold' }}
                >
                  {totalHarga.toLocaleString('id-ID')}
                </Text>
              </View>

              <ButtonCustom
                classNameContainer="bg-[#1475BA] py-3 rounded-[10px] w-[120px]"
                text="Lanjutkan Pemesanan"
                textClassName="text-[11px] text-center text-white"
                onPress={() => router.push('/screens/submissionScreen')}
                textStyle={{ fontFamily: 'LexSemiBold' }}
                isTouchable={cartItems.length > 0}
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
        </LinearGradient>
      </View>

      {/* Bar bawah */}
      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
