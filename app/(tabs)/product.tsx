import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// OUR ICONS
import Octicons from '@expo/vector-icons/Octicons';

// OUR COMPONENTS
import Button from '@/components/button';
import ButtonShopAndChat from '@/components/buttonShopAndChat';

// OUR PROPS
import { ProductType } from '@/interfaces/productDataProps';

// OUR PRODUCTS
import { allProducts } from '@/lib/data/productList';

export default function Product() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredProducts =
    activeCategory === 'Semua'
      ? allProducts
      : allProducts.filter((item) => item.category === activeCategory);

  return (
    <View className="flex-1">
      {/* NAVBAR */}
      <View
        className="z-20 w-full flex-row items-center justify-between rounded-b-[10px] bg-[#1475BA]"
        style={{
          paddingHorizontal: wp(4),
          paddingTop: hp(6),
          paddingBottom: hp(1.5),
        }}
      >
        {/* Input Pencarian */}
        <View
          className="flex-1 flex-row items-center justify-between rounded-full bg-white"
          style={{
            paddingLeft: wp(3),
            height: hp(5.5),
          }}
        >
          <TextInput
            className="flex-1"
            placeholder="Cari"
            placeholderTextColor={'gray'}
            style={{
              fontFamily: 'LexRegular',
              fontSize: wp(3.8),
              paddingVertical: 0,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            className="rounded-full bg-[#72C02C]"
            style={{
              paddingVertical: hp(1),
              paddingHorizontal: wp(3.5),
              marginRight: wp(1.5),
            }}
          >
            <Octicons name="search" size={wp(5)} color="white" />
          </TouchableOpacity>
        </View>

        {/* Button Shop & Chat */}
        <View
          className="flex-row"
          style={{
            marginLeft: wp(6),
            gap: wp(3),
          }}
        >
          <ButtonShopAndChat />
        </View>
      </View>

      <View className="-mt-2 flex-row items-center justify-center gap-4 bg-[#A7CBE5] pb-2 pt-4">
        {['Semua', 'Informasi', 'Jasa'].map((buttonCategory) => (
          <TouchableOpacity
            key={buttonCategory}
            onPress={() => setActiveCategory(buttonCategory)}
            activeOpacity={0.7}
            className={`rounded-full px-4 py-2 ${
              activeCategory === buttonCategory
                ? 'bg-[#1475BA]'
                : 'bg-transparent'
            }`}
          >
            <Text
              className="text-[16px]"
              style={{
                fontFamily: 'LexBold',
                color: activeCategory === buttonCategory ? 'white' : 'black',
              }}
            >
              {buttonCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="bg-[#A7CBE5]"
      >
        {activeCategory === 'Semua' ? (
          <>
            <View className="self-center py-1 pt-3">
              <Text style={{ fontFamily: 'LexBold' }} className="text-[20px]">
                Produk Informasi
              </Text>
            </View>
            <View className="mt-3 items-center justify-center gap-6">
              {allProducts
                .filter((item) => item.category === 'Informasi')
                .map((item, idx) => (
                  <View
                    key={`informasi-${idx}`}
                    className="h-auto w-[74%] rounded-[15px] border-2 border-b-[4px] border-x-black/5 border-b-black/10 border-t-black/5 bg-white p-3.5"
                  >
                    <View className="h-[125px] w-full shadow-xl">
                      <Image
                        source={require('@/assets/images/ProductScreen/bg-icon.png')}
                        className="h-full w-full rounded-[20px] object-cover"
                      />
                      <View className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                        {item.icon}
                      </View>
                    </View>
                    <Text
                      style={{ fontFamily: 'LexBold' }}
                      className="py-2 text-[20px]"
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="pb-4 text-[12px]"
                    >
                      {item.desc}
                    </Text>
                    <Button
                      style="bg-[#1475BA] px-6 py-2 rounded-lg"
                      textStyle="text-sm text-white"
                      onPress={() =>
                        router.push({
                          pathname: item.pathname,
                          params: {
                            category: item.paramCategory as ProductType,
                          },
                        })
                      }
                    >
                      Lihat Produk
                    </Button>
                  </View>
                ))}
            </View>

            <View className="self-center py-1 pt-5">
              <Text style={{ fontFamily: 'LexBold' }} className="text-[20px]">
                Produk Jasa
              </Text>
            </View>
            <View className="mt-3 items-center justify-center gap-6">
              {allProducts
                .filter((item) => item.category === 'Jasa')
                .map((item, idx) => (
                  <View
                    key={`jasa-${idx}`}
                    className="h-auto w-[74%] rounded-[15px] border-2 border-b-[4px] border-x-black/5 border-b-black/10 border-t-black/5 bg-white p-3.5"
                  >
                    <View className="h-[125px] w-full shadow-xl">
                      <Image
                        source={require('@/assets/images/ProductScreen/bg-icon.png')}
                        className="h-full w-full rounded-[20px] object-cover"
                      />
                      <View className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                        {item.icon}
                      </View>
                    </View>
                    <Text
                      style={{ fontFamily: 'LexBold' }}
                      className="py-2 text-[20px]"
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="pb-4 text-[12px]"
                    >
                      {item.desc}
                    </Text>
                    <Button
                      style="bg-[#1475BA] px-6 py-2 rounded-lg"
                      textStyle="text-sm text-white"
                      onPress={() =>
                        router.push({
                          pathname: item.pathname,
                          params: {
                            category: item.paramCategory as ProductType,
                          },
                        })
                      }
                    >
                      Lihat Produk
                    </Button>
                  </View>
                ))}
            </View>
          </>
        ) : (
          <>
            <View className="self-center py-1 pt-3">
              <Text style={{ fontFamily: 'LexBold' }} className="text-[20px]">
                Produk {activeCategory}
              </Text>
            </View>

            <View className="mt-3 items-center justify-center gap-6">
              {filteredProducts.map((item, idx) => (
                <View
                  key={idx}
                  className="h-auto w-[74%] rounded-[15px] border-2 border-b-[4px] border-x-black/5 border-b-black/10 border-t-black/5 bg-white p-3.5"
                >
                  <View className="h-[125px] w-full shadow-xl">
                    <Image
                      source={require('@/assets/images/ProductScreen/bg-icon.png')}
                      className="h-full w-full rounded-[20px] object-cover"
                    />
                    <View className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                      {item.icon}
                    </View>
                  </View>
                  <Text
                    style={{ fontFamily: 'LexBold' }}
                    className="py-2 text-[20px]"
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontFamily: 'LexRegular' }}
                    className="pb-4 text-[12px]"
                  >
                    {item.desc}
                  </Text>
                  <Button
                    style="bg-[#1475BA] px-6 py-2 rounded-lg"
                    textStyle="text-sm text-white"
                    onPress={() =>
                      router.push({
                        pathname: item.pathname,
                        params: { category: item.paramCategory as ProductType },
                      })
                    }
                  >
                    Lihat Produk
                  </Button>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
