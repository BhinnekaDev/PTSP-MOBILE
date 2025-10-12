import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

// OUR HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';

// OUR ICONS
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

// OUR COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import Navbar from '@/components/Navbar';

export default function ProfileTabs() {
  const router = useRouter();
  const { profile, loading } = useGetUserProfile();
  const [modalVisible, setModalVisible] = useState(false);
  if (loading) return <Text>Loading...</Text>;

  return (
    <LinearGradient
      colors={['#1475BA', '#399385', '#6BBC3F']} //
      className="flex-1 items-center justify-start pb-[75px]"
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* NAVBAR */}
      <Navbar />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-1 py-4">
          <Text
            style={{ fontFamily: 'LexBold' }}
            className="text-2xl text-white"
          >
            Hai, {profile?.Nama_Lengkap}
          </Text>
          <Text style={{ fontFamily: 'LexRegular' }} className="text-white">
            selamat datang di pelayanan terpadu satu pintu!
          </Text>
        </View>
        <View className="w-full items-center py-4">
          <Image
            source={require('@/assets/images/HomeScreen/banner.png')}
            className="h-40 w-full rounded-lg object-cover" 
          />
        </View>

        {/* KE SATU */}
        <View className="flex-row items-center justify-evenly gap-10 py-3">
          <ButtonCustom
            vertical
            onPress={() => router.push('/(tabs)/product')}
            classNameContainer="items-center justify-center gap-1 bg-transparent w-20"
            textClassName="text-center text-white text-sm"
            text="Katalog Produk"
            containerStyle={{ width: 100 }} // cukup untuk teks
            FontCustom={{ fontFamily: 'LexRegular' }}
            iconLeft={
              <Image
                source={require('@/assets/images/HomeScreen/catalog-icon.png')}
                style={{ width: 40, height: 40 }}
              />
            }
          />
          <ButtonCustom
            vertical
            onPress={() => router.push('/(tabs)/product')}
            classNameContainer="items-center justify-center gap-1 bg-transparent"
            textClassName="text-center text-white text-sm"
            text="Monitoring Pesanan"
            containerStyle={{ width: 100 }}
            FontCustom={{ fontFamily: 'LexRegular' }}
            iconLeft={
              <Image
                source={require('@/assets/images/HomeScreen/monitoring-icon.png')}
                className="h-10 w-10 object-cover"
              />
            }
          />
          <ButtonCustom
            vertical
            onPress={() => router.push('/(tabs)/regulation')}
            classNameContainer="items-center justify-center gap-1 bg-transparent"
            textClassName="text-center text-white text-sm"
            text="Tarif Pelayanan"
            containerStyle={{ width: 100 }}
            FontCustom={{ fontFamily: 'LexRegular' }}
            iconLeft={
              <Image
                source={require('@/assets/images/HomeScreen/rates-icon.png')}
                className="h-10 w-10 object-cover"
              />
            }
          />
        </View>
        {/* KE DUA */}
        <View className="flex-row items-center justify-evenly gap-10 py-3">
          <ButtonCustom
            vertical
            onPress={() => setModalVisible(true)}
            classNameContainer="items-center justify-center gap-1 bg-transparent"
            textClassName="text-center text-white text-sm"
            text="Panduan Pelayanan"
            containerStyle={{ width: 100 }}
            FontCustom={{ fontFamily: 'LexRegular' }}
            iconLeft={
              <Image
                source={require('@/assets/images/HomeScreen/guide-icon.png')}
                className="h-10 w-10 object-cover"
              />
            }
          />
          <ButtonCustom
            vertical
            onPress={() => router.push('/screens/suggestionsAndComplaints')}
            classNameContainer="items-center justify-center gap-1 bg-transparent"
            textClassName="text-center text-white text-sm"
            text="Saran & Pengaduan"
            containerStyle={{ width: 100 }}
            FontCustom={{ fontFamily: 'LexRegular' }}
            iconLeft={
              <Image
                source={require('@/assets/images/HomeScreen/faq-icon.png')}
                className="h-10 w-10 object-cover"
              />
            }
          />
        </View>

        {/* LAYANAN INFORMASI */}
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'LexBold' }}
            className="text-xl text-white"
          >
            Layanan Informasi
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ padding: 6 }}
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
              classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
              textClassName="text-center text-sm text-black"
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
              classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
              textClassName="text-center text-sm text-black"
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
              classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
              textClassName="text-center text-sm text-black"
              text="Informasi Stasiun Geofisika"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={<Feather name="wind" size={40} color="#3498DB" />}
            />
          </ScrollView>
        </View>

        {/* LAYANAN JASA */}
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'LexBold' }}
            className="text-xl text-white"
          >
            Layanan Jasa
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ padding: 6 }}
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
              classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
              textClassName="text-center text-sm text-black"
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
              classNameContainer="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
              textClassName="text-center text-sm text-black"
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
              classNameContainer="h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
              textClassName="text-center text-sm text-black"
              text="Jasa Stasiun Geofisika"
              FontCustom={{ fontFamily: 'LexBold' }}
              iconLeft={<Feather name="wind" size={40} color="#3498DB" />}
            />
          </ScrollView>
        </View>
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
      </ScrollView>
    </LinearGradient>
  );
}
