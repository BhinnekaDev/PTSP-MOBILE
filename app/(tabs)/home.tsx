import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Modal,
  Pressable,
  Animated,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

// OUR ICON
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

// OUR COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import { WrapperSkeletonHomeTab } from '@/components/skeletons/wrapperSkeletonHomeTab';
import { AnimatedHeader } from '@/components/AnimatedHeader';

// OUR HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import { useSkeletonForTab } from '@/hooks/Frontend/skeletons/useSkeletonForTab';
import { useScrollHeaderAnimation } from '@/hooks/Frontend/useScrollHeaderAnimation';

export default function HomeTabs() {
  const router = useRouter();
  const { profile } = useGetUserProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const showSkeleton = useSkeletonForTab();

  const { onScroll, headerTranslate, headerOpacity, headerScale } =
    useScrollHeaderAnimation();

  if (showSkeleton) return <WrapperSkeletonHomeTab />;

  return (
    <View className="flex-1 bg-[#1475BA]">
      {/* Animated Header */}
      <AnimatedHeader
        profileName={profile?.Nama_Lengkap || ''}
        headerTranslate={headerTranslate}
        headerOpacity={headerOpacity}
        headerScale={headerScale}
      />

      {/* Main Content */}
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 240,
        }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Main Content Card 1 - FULL WIDTH */}
        <View className="rounded-t-3xl bg-white py-6 shadow-lg">
          {/* BUTTON KE SATU */}
          <View className="flex-row items-center justify-evenly py-3">
            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/testing')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="TESTING"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="boxes-stacked" size={40} color="#3498DB" />
              }
            />
            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/testing2')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="TESTING 2"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="clipboard-list" size={40} color="#3498DB" />
              }
            />
            <ButtonCustom
              vertical
              onPress={() => router.push('/(tabs)/regulation')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Tarif Pelayanan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6
                  name="money-bill-wave"
                  size={40}
                  color="#3498DB"
                />
              }
            />
          </View>
          {/* BUTTON KE SATU */}
          <View className="flex-row items-center justify-evenly py-3">
            <ButtonCustom
              vertical
              onPress={() => router.push('/(tabs)/product')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Katalog Produk"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="boxes-stacked" size={40} color="#3498DB" />
              }
            />
            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/orderScreen')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Monitoring Pesanan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="clipboard-list" size={40} color="#3498DB" />
              }
            />
            <ButtonCustom
              vertical
              onPress={() => router.push('/(tabs)/regulation')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Tarif Pelayanan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6
                  name="money-bill-wave"
                  size={40}
                  color="#3498DB"
                />
              }
            />
          </View>

          {/* BUTTON KE DUA*/}
          <View className="flex-row items-center justify-evenly py-3">
            <ButtonCustom
              vertical
              onPress={() => setModalVisible(true)}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Panduan Pelayanan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="book-open" size={40} color="#3498DB" />
              }
            />
            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/suggestionsAndComplaints')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Saran & Pengaduan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="comments" size={40} color="#3498DB" />
              }
            />
          </View>
          {/* BUTTON KE DUA*/}
          <View className="flex-row items-center justify-evenly py-3">
            <ButtonCustom
              vertical
              onPress={() => setModalVisible(true)}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Panduan Pelayanan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="book-open" size={40} color="#3498DB" />
              }
            />
            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/suggestionsAndComplaints')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Saran & Pengaduan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="comments" size={40} color="#3498DB" />
              }
            />
          </View>
          {/* BUTTON KE DUA*/}
          <View className="flex-row items-center justify-evenly py-3">
            <ButtonCustom
              vertical
              onPress={() => setModalVisible(true)}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Panduan Pelayanan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="book-open" size={40} color="#3498DB" />
              }
            />
            <ButtonCustom
              vertical
              onPress={() => router.push('/screens/suggestionsAndComplaints')}
              classNameContainer="items-center justify-center gap-1 bg-transparent"
              textClassName="text-center text-gray-800 text-sm"
              text="Saran & Pengaduan"
              containerStyle={{ width: 100 }}
              FontCustom={{ fontFamily: 'LexRegular' }}
              iconLeft={
                <FontAwesome6 name="comments" size={40} color="#3498DB" />
              }
            />
          </View>

          {/* Main Content Card 2 */}
          <View className="rounded-t-3xl bg-[#1475BA] px-4 py-6 shadow-lg">
            {/* LAYANAN INFORMASI Section */}
            <View className="mt-4">
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="mb-3 text-xl text-gray-800"
              >
                Layanan Informasi
              </Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{ paddingHorizontal: 4 }}
                showsHorizontalScrollIndicator={false}
              >
                <ButtonCustom
                  vertical
                  onPress={() =>
                    router.push({
                      pathname: '/screens/productDetailScreen',
                      params: { category: 'Informasi_Meteorologi' },
                    })
                  }
                  classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-xl border-2 border-[#3498DB] bg-white shadow-lg"
                  textClassName="text-center text-sm text-gray-800"
                  text="Informasi Stasiun Meteorologi"
                  FontCustom={{ fontFamily: 'LexBold' }}
                  iconLeft={
                    <FontAwesome6 name="mountain" size={40} color="#3498DB" />
                  }
                />
                <ButtonCustom
                  vertical
                  onPress={() =>
                    router.push({
                      pathname: '/screens/productDetailScreen',
                      params: { category: 'Informasi_Klimatologi' },
                    })
                  }
                  classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-xl border-2 border-[#3498DB] bg-white shadow-lg"
                  textClassName="text-center text-sm text-gray-800"
                  text="Informasi Stasiun Klimatologi"
                  FontCustom={{ fontFamily: 'LexBold' }}
                  iconLeft={
                    <FontAwesome6 name="cloud-bolt" size={40} color="#3498DB" />
                  }
                />
                <ButtonCustom
                  vertical
                  onPress={() =>
                    router.push({
                      pathname: '/screens/productDetailScreen',
                      params: { category: 'Informasi_Geofisika' },
                    })
                  }
                  classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-xl border-2 border-[#3498DB] bg-white shadow-lg"
                  textClassName="text-center text-sm text-gray-800"
                  text="Informasi Stasiun Geofisika"
                  FontCustom={{ fontFamily: 'LexBold' }}
                  iconLeft={<Feather name="wind" size={40} color="#3498DB" />}
                />
              </ScrollView>
            </View>

            {/* LAYANAN JASA Section */}
            <View className="mt-6">
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="mb-3 text-xl text-gray-800"
              >
                Layanan Jasa
              </Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{ paddingHorizontal: 4 }}
                showsHorizontalScrollIndicator={false}
              >
                <ButtonCustom
                  vertical
                  onPress={() =>
                    router.push({
                      pathname: '/screens/productDetailScreen',
                      params: { category: 'Jasa_Meteorologi' },
                    })
                  }
                  classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-xl border-2 border-[#3498DB] bg-white shadow-lg"
                  textClassName="text-center text-sm text-gray-800"
                  text="Jasa Stasiun Meteorologi"
                  FontCustom={{ fontFamily: 'LexBold' }}
                  iconLeft={
                    <FontAwesome6 name="mountain" size={40} color="#3498DB" />
                  }
                />
                <ButtonCustom
                  vertical
                  onPress={() =>
                    router.push({
                      pathname: '/screens/productDetailScreen',
                      params: { category: 'Jasa_Klimatologi' },
                    })
                  }
                  classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-xl border-2 border-[#3498DB] bg-white shadow-lg"
                  textClassName="text-center text-sm text-gray-800"
                  text="Jasa Stasiun Klimatologi"
                  FontCustom={{ fontFamily: 'LexBold' }}
                  iconLeft={
                    <FontAwesome6 name="cloud-bolt" size={40} color="#3498DB" />
                  }
                />
                <ButtonCustom
                  vertical
                  onPress={() =>
                    router.push({
                      pathname: '/screens/productDetailScreen',
                      params: { category: 'Jasa_Geofisika' },
                    })
                  }
                  classNameContainer="h-32 w-36 items-center justify-center gap-2 rounded-xl border-2 border-[#3498DB] bg-white shadow-lg"
                  textClassName="text-center text-sm text-gray-800"
                  text="Jasa Stasiun Geofisika"
                  FontCustom={{ fontFamily: 'LexBold' }}
                  iconLeft={<Feather name="wind" size={40} color="#3498DB" />}
                />
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Modal for Video Guide */}
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
                backgroundColor: '#fff',
                borderRadius: 20,
                alignSelf: 'center',
              }}
            >
              <Feather name="x" size={24} color="black" />
            </Pressable>
          </View>
        </Modal>
      </Animated.ScrollView>
    </View>
  );
}
