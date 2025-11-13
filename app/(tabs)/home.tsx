import React, { useState } from 'react';
import { View, Modal, Pressable, Text, StatusBar } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

// OUR ICON
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

// OUR COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import { WrapperSkeletonHomeTab } from '@/components/skeletons/wrapperSkeletonHomeTab';
import { AnimatedHeader } from '@/components/AnimatedHeader';
import SwipeCardsWrapper from '@/components/SwipeCards/SwipeCardsWrapper';

// OUR HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import { useSkeletonForTab } from '@/hooks/Frontend/skeletons/useSkeletonForTab';

export default function HomeTabs() {
  const router = useRouter();
  const { profile } = useGetUserProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const showSkeleton = useSkeletonForTab();

  if (showSkeleton) return <WrapperSkeletonHomeTab />;

  return (
    <View className="flex-1 bg-[#1475BA]">
      {/* Animated Header */}
      <AnimatedHeader profileName={profile?.Nama_Lengkap || 'User Not Found'} />

      <StatusBar barStyle="dark-content" />

      <SwipeCardsWrapper>
        {/* CARD LAYANAN */}
        <View key="1" className="bg-white" style={{ minHeight: hp(100) }}>
          {/* LAYANAN INFORMASI Section */}
          <View className="gap-4 py-4">
            <Text
              style={{ fontFamily: 'LexBold' }}
              className="mb-4 text-2xl text-gray-800"
            >
              Layanan Informasi
            </Text>

            {/* Meteorologi */}
            <ButtonCustom
              onPress={() =>
                router.push({
                  pathname: '/screens/productDetailScreen',
                  params: { category: 'Informasi_Meteorologi' },
                })
              }
              classNameContainer="w-full flex-row items-center justify-between rounded-3xl px-6 py-5 bg-white border border-blue-100 shadow-md"
              containerStyle={{
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 2,
              }}
              textClassName="text-gray-800 text-base font-semibold"
              text="Informasi Stasiun Meteorologi"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={
                <View className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 p-4">
                  <FontAwesome6 name="mountain" size={22} color="#3498DB" />
                </View>
              }
              iconRight={
                <View className="rounded-full bg-blue-50 p-2">
                  <Feather name="chevron-right" size={20} color="#3498DB" />
                </View>
              }
            />

            {/* Klimatologi */}
            <ButtonCustom
              onPress={() =>
                router.push({
                  pathname: '/screens/productDetailScreen',
                  params: { category: 'Informasi_Klimatologi' },
                })
              }
              classNameContainer="w-full flex-row items-center justify-between rounded-3xl px-6 py-5 bg-white border border-green-100 shadow-md"
              containerStyle={{
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 2,
              }}
              textClassName="text-gray-800 text-base font-semibold"
              text="Informasi Stasiun Klimatologi"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={
                <View className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 p-4">
                  <FontAwesome6 name="cloud-bolt" size={22} color="#22c55e" />
                </View>
              }
              iconRight={
                <View className="rounded-full bg-green-50 p-2">
                  <Feather name="chevron-right" size={20} color="#22c55e" />
                </View>
              }
            />

            {/* Geofisika */}
            <ButtonCustom
              onPress={() =>
                router.push({
                  pathname: '/screens/productDetailScreen',
                  params: { category: 'Informasi_Geofisika' },
                })
              }
              classNameContainer="w-full flex-row items-center justify-between rounded-3xl px-6 py-5 bg-white border border-purple-100 shadow-md"
              containerStyle={{
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 2,
              }}
              textClassName="text-gray-800 text-base font-semibold"
              text="Informasi Stasiun Geofisika"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={
                <View className="rounded-2xl bg-gradient-to-r from-purple-500 to-violet-400 p-4">
                  <Feather name="wind" size={22} color="#8b5cf6" />
                </View>
              }
              iconRight={
                <View className="rounded-full bg-purple-50 p-2">
                  <Feather name="chevron-right" size={20} color="#8b5cf6" />
                </View>
              }
            />
          </View>

          {/* LAYANAN JASA Section */}
          <View className="gap-4 py-4">
            <Text
              style={{ fontFamily: 'LexBold' }}
              className="mb-4 text-2xl text-gray-800"
            >
              💼 Layanan Jasa
            </Text>

            {/* Meteorologi */}
            <ButtonCustom
              vertical={false}
              onPress={() =>
                router.push({
                  pathname: '/screens/productDetailScreen',
                  params: { category: 'Jasa_Meteorologi' },
                })
              }
              classNameContainer="w-full flex-row items-center justify-between rounded-3xl px-6 py-5 bg-white border border-orange-100 shadow-md"
              containerStyle={{
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 2,
              }}
              textClassName="text-gray-800 text-base font-semibold"
              text="Jasa Stasiun Meteorologi"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={
                <View className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 p-4">
                  <FontAwesome6 name="mountain" size={22} color="#f97316" />
                </View>
              }
              iconRight={
                <View className="rounded-full bg-orange-50 p-2">
                  <Feather name="chevron-right" size={20} color="#f97316" />
                </View>
              }
            />

            {/* Klimatologi */}
            <ButtonCustom
              vertical={false}
              onPress={() =>
                router.push({
                  pathname: '/screens/productDetailScreen',
                  params: { category: 'Jasa_Klimatologi' },
                })
              }
              classNameContainer="w-full flex-row items-center justify-between rounded-3xl px-6 py-5 bg-white border border-red-100 shadow-md"
              containerStyle={{
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 2,
              }}
              textClassName="text-gray-800 text-base font-semibold"
              text="Jasa Stasiun Klimatologi"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={
                <View className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-400 p-4">
                  <FontAwesome6 name="cloud-bolt" size={22} color="#ef4444" />
                </View>
              }
              iconRight={
                <View className="rounded-full bg-red-50 p-2">
                  <Feather name="chevron-right" size={20} color="#ef4444" />
                </View>
              }
            />

            {/* Geofisika */}
            <ButtonCustom
              vertical={false}
              onPress={() =>
                router.push({
                  pathname: '/screens/productDetailScreen',
                  params: { category: 'Jasa_Geofisika' },
                })
              }
              classNameContainer="w-full flex-row items-center justify-between rounded-3xl px-6 py-5 bg-white border border-indigo-100 shadow-md"
              containerStyle={{
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 2,
              }}
              textClassName="text-gray-800 text-base font-semibold"
              text="Jasa Stasiun Geofisika"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={
                <View className="rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-400 p-4">
                  <Feather name="wind" size={22} color="#6366f1" />
                </View>
              }
              iconRight={
                <View className="rounded-full bg-indigo-50 p-2">
                  <Feather name="chevron-right" size={20} color="#6366f1" />
                </View>
              }
            />
          </View>
        </View>

        {/* CARD TABS */}
        <View key="2" className="bg-white">
          {/* BUTTON KE SATU */}
          <Text
            style={{ fontFamily: 'LexBold' }}
            className="mb-4 text-2xl text-gray-800"
          >
            Menu Pelayanan
          </Text>
          <View className="flex-row items-center justify-evenly py-3">
            <ButtonCustom
              vertical
              onPress={() => router.push('/(tabs)/product')}
              classNameContainer="items-center justify-center gap-2 rounded-2xl bg-white p-4 shadow-md"
              containerStyle={{
                width: 110,
                height: 120,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
                elevation: 3,
              }}
              textClassName="text-center text-gray-700 text-sm font-semibold"
              text="Katalog Produk"
              FontCustom={{ fontFamily: 'LexMedium' }}
              iconLeft={
                <View className="rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 p-3">
                  <FontAwesome6
                    name="boxes-stacked"
                    size={26}
                    color="#3498DB"
                  />
                </View>
              }
            />

            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/orderScreen')}
              classNameContainer="items-center justify-center gap-2 rounded-2xl bg-white p-4 shadow-md"
              containerStyle={{
                width: 110,
                height: 120,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
                elevation: 3,
              }}
              textClassName="text-center text-gray-700 text-sm font-semibold"
              text="Monitoring Pesanan"
              FontCustom={{ fontFamily: 'LexMedium' }}
              iconLeft={
                <View className="rounded-full bg-gradient-to-r from-indigo-400 to-sky-300 p-3">
                  <FontAwesome6
                    name="clipboard-list"
                    size={26}
                    color="#8b5cf6"
                  />
                </View>
              }
            />

            <ButtonCustom
              vertical
              onPress={() => router.push('/(tabs)/regulation')}
              classNameContainer="items-center justify-center gap-2 rounded-2xl bg-white p-4 shadow-md"
              containerStyle={{
                width: 110,
                height: 120,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
                elevation: 3,
              }}
              textClassName="text-center text-gray-700 text-sm font-semibold"
              text="Tarif Pelayanan"
              FontCustom={{ fontFamily: 'LexMedium' }}
              iconLeft={
                <View className="rounded-full bg-gradient-to-r from-emerald-400 to-green-300 p-3">
                  <FontAwesome6
                    name="money-bill-wave"
                    size={26}
                    color="#22c55e"
                  />
                </View>
              }
            />
          </View>

          {/* BUTTON KE DUA */}
          <View className="flex-row items-center justify-evenly py-3">
            <ButtonCustom
              vertical
              onPress={() => setModalVisible(true)}
              classNameContainer="items-center justify-center gap-2 rounded-2xl bg-white p-4 shadow-md"
              containerStyle={{
                width: 110,
                height: 120,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
                elevation: 3,
              }}
              textClassName="text-center text-gray-700 text-sm font-semibold"
              text="Panduan Pelayanan"
              FontCustom={{ fontFamily: 'LexMedium' }}
              iconLeft={
                <View className="rounded-full bg-gradient-to-r from-violet-400 to-purple-300 p-3">
                  <FontAwesome6 name="book-open" size={26} color="#f97316" />
                </View>
              }
            />

            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/suggestionsAndComplaints')}
              classNameContainer="items-center justify-center gap-2 rounded-2xl bg-white p-4 shadow-md"
              containerStyle={{
                width: 110,
                height: 120,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
                elevation: 3,
              }}
              textClassName="text-center text-gray-700 text-sm font-semibold"
              text="Saran & Pengaduan"
              FontCustom={{ fontFamily: 'LexMedium' }}
              iconLeft={
                <View className="rounded-full bg-gradient-to-r from-pink-400 to-rose-300 p-3">
                  <FontAwesome6 name="comments" size={26} color="#6366f1" />
                </View>
              }
            />
          </View>
        </View>
      </SwipeCardsWrapper>

      {/* MODAL UNTUK BIDEO TUTORIAL*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '90%',
              height: 250,
              backgroundColor: '#000',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <Video
              source={require('@/assets/videos/GuideLinePTSP.mp4')}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              useNativeControls
              style={{ flex: 1 }}
            />
          </View>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: 'black',
              borderRadius: 20,
              alignSelf: 'center',
            }}
          >
            <Feather name="x" size={24} color="black" />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
