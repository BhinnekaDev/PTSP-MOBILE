// app/screens/Product.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

// OUR ICONS
import Octicons from '@expo/vector-icons/Octicons';

// OUR COMPONENTS
import Button from '@/components/button';
import ButtonShopAndChat from '@/components/buttonShopAndChat';

// OUR UTILS
import { getHeaderPaddingVertical } from '@/utils/platformStyleAndroidIos';

// OUR PROPS
import { ProductType } from '@/interfaces/productDataProps';

// OUR PRODUCTS
import { allProducts } from '@/lib/data/productList';

export default function Product() {
  const headerPaddingVertical = getHeaderPaddingVertical();

  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredProducts =
    activeCategory === 'Semua'
      ? allProducts
      : allProducts.filter((item) => item.category === activeCategory);

  return (
    <View className="flex-1">
      <View
        className={`w-full flex-row items-center justify-between rounded-b-[10px] bg-[#1475BA] px-6 shadow-md ${headerPaddingVertical}`}
      >
        <View className="flex-1 flex-row items-center justify-between rounded-full bg-white pl-3">
          <TextInput
            className="flex-1 py-1"
            placeholder="Cari"
            style={{ fontFamily: 'LexRegular' }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            className="rounded-full bg-[#72C02C] px-3 py-2"
          >
            <Octicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="ml-12 flex-row gap-4">
          <ButtonShopAndChat />
        </View>
      </View>

      <View className="flex-row items-center justify-center gap-4 py-2">
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
      >
        {activeCategory === 'Semua' ? (
          <>
            <View className="self-center py-2 pt-5">
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="rounded-full bg-[#72C02C] px-6 py-1 text-lg"
              >
                Produk Informasi
              </Text>
            </View>
            <View className="mt-3 items-center justify-center gap-6">
              {allProducts
                .filter((item) => item.category === 'Informasi')
                .map((item, idx) => (
                  <View
                    key={`informasi-${idx}`}
                    className="h-72 w-80 items-center justify-center gap-4 rounded-lg border-2 border-[#6BBC3F]"
                  >
                    {item.icon}
                    <Text
                      style={{ fontFamily: 'LexBold' }}
                      className="text-center text-xl"
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="text-center text-sm"
                    >
                      {item.desc}
                    </Text>
                    <Button
                      style="bg-[#1475BA] px-6 py-2 rounded-xl"
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

            <View className="self-center py-2 pt-5">
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="rounded-full bg-[#72C02C] px-6 py-1 text-lg"
              >
                Produk Jasa
              </Text>
            </View>
            <View className="mt-3 items-center justify-center gap-6">
              {allProducts
                .filter((item) => item.category === 'Jasa')
                .map((item, idx) => (
                  <View
                    key={`jasa-${idx}`}
                    className="h-72 w-80 items-center justify-center gap-4 rounded-lg border-2 border-[#6BBC3F]"
                  >
                    {item.icon}
                    <Text
                      style={{ fontFamily: 'LexBold' }}
                      className="text-center text-xl"
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="text-center text-sm"
                    >
                      {item.desc}
                    </Text>
                    <Button
                      style="bg-[#1475BA] px-6 py-2 rounded-xl"
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
            <View className="self-center py-2 pt-5">
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="rounded-full bg-[#72C02C] px-6 py-1 text-lg"
              >
                Produk {activeCategory}
              </Text>
            </View>

            <View className="mt-3 items-center justify-center gap-6">
              {filteredProducts.map((item, idx) => (
                <View
                  key={idx}
                  className="h-72 w-80 items-center justify-center gap-4 rounded-lg border-2 border-[#6BBC3F]"
                >
                  {item.icon}
                  <Text
                    style={{ fontFamily: 'LexBold' }}
                    className="text-center text-xl"
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontFamily: 'LexRegular' }}
                    className="text-center text-sm"
                  >
                    {item.desc}
                  </Text>
                  <Button
                    style="bg-[#1475BA] px-6 py-2 rounded-xl"
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
