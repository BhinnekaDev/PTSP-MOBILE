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
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import Foundation from '@expo/vector-icons/Foundation';

// OUR COMPONENTS
import Button from '@/components/button';
import ButtonShopAndChat from '@/components/buttonShopAndChat';

// OUR UTILS
import { getHeaderPaddingVertical } from '@/utils/platformStyleAndroidIos';

export default function MeteorologyProduct() {
  const headerPaddingVertical = getHeaderPaddingVertical();

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
            <View className="my-3 items-center justify-center gap-6">
              <View className="relative h-72 w-80 items-center justify-center gap-4 rounded-lg border-2 border-black bg-white">
                <View className="absolute right-3 top-3">
                  <Foundation name="info" size={28} color="black" />
                </View>
                <FontAwesome6 name="mountain" size={60} color="#6BBC3F" />
                <Text
                  style={{ fontFamily: 'LexMedium' }}
                  className="text-md text-center"
                >
                  ATLAS WINDROSE WILAYAH INDONESIA PERIODE 1981-2010
                </Text>
                <Text
                  style={{ fontFamily: 'LexRegular' }}
                  className="text-center text-lg"
                >
                  Rp 1.500.000
                </Text>
                <Button
                  style="bg-[#1475BA] px-4 py-2 rounded-full"
                  textStyle="text-xs text-white uppercase"
                  icon={
                    <Ionicons name="cart-outline" size={20} color="white" />
                  }
                >
                  Masukan Ke Keranjang
                </Button>
              </View>
            </View>
            <View className="my-3 items-center justify-center gap-6">
              <View className="relative h-72 w-80 items-center justify-center gap-4 rounded-lg border-2 border-black bg-white">
                <View className="absolute right-2 top-2">
                  <Foundation name="info" size={26} color="black" />
                </View>
                <FontAwesome6 name="mountain" size={60} color="#6BBC3F" />
                <Text
                  style={{ fontFamily: 'LexMedium' }}
                  className="text-md text-center"
                >
                  KARBON MONOKSIDA (CO)
                </Text>
                <Text
                  style={{ fontFamily: 'LexRegular' }}
                  className="text-center text-lg"
                >
                  Rp 1.500.000
                </Text>
                <Button
                  style="bg-[#1475BA] px-4 py-2 rounded-full"
                  textStyle="text-xs text-white uppercase"
                  icon={
                    <Ionicons name="cart-outline" size={20} color="white" />
                  }
                >
                  Masukan Ke Keranjang
                </Button>
              </View>
            </View>
            <View className="my-3 items-center justify-center gap-6">
              <View className="h-72 w-80 items-center justify-center gap-4 rounded-lg border-2 border-black bg-white">
                <FontAwesome6 name="mountain" size={60} color="#6BBC3F" />
                <Text
                  style={{ fontFamily: 'LexMedium' }}
                  className="text-md text-center"
                >
                  KARBON MONOKSIDA (CO)
                </Text>
                <Text
                  style={{ fontFamily: 'LexRegular' }}
                  className="text-center text-lg"
                >
                  Rp 1.500.000
                </Text>
                <Button
                  style="bg-[#1475BA] px-4 py-2 rounded-full"
                  textStyle="text-xs text-white uppercase"
                  icon={
                    <Ionicons name="cart-outline" size={20} color="white" />
                  }
                >
                  Masukan Ke Keranjang
                </Button>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
}
