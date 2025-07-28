import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// OUR HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';

// OUR ICONS
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

// OUR COMPONENTS
import ButtonShopAndChat from '@/components/buttonShopAndChat';

// OUR UTILS
import { getHeaderPaddingVertical } from '@/utils/platformStyleAndroidIos';

export default function ProfileTabs() {
  const headerPaddingVertical = getHeaderPaddingVertical();
  const router = useRouter();
  const { profile, loading } = useGetUserProfile();
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
      <View

        className={`w-full flex-row items-center justify-between rounded-xl bg-[#1475BA] px-6 pt-12 shadow-md ${headerPaddingVertical}`}

      >
        <View>
          <Image
            source={require('@/assets/images/HomeScreen/logo.png')}
            className="h-12 w-44 object-cover"
          />
        </View>
        <View className="flex-row items-center gap-6">
          <ButtonShopAndChat />
        </View>
      </View>
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
        <View className="flex-row items-center justify-between gap-4 px-6 py-3">
          <TouchableOpacity
            activeOpacity={0.4}
            className="flex-col items-center justify-center gap-1"
          >
            <Image
              source={require('@/assets/images/HomeScreen/catalog-icon.png')}
              className="h-10 w-10 object-cover"
            />
            <Text
              style={{ fontFamily: 'LexRegular' }}
              className="text-center text-white"
            >
              Katalog{'\n'}Produk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            className="flex-col items-center justify-center gap-1"
          >
            <Image
              source={require('@/assets/images/HomeScreen/monitoring-icon.png')}
              className="h-10 w-10 object-cover"
            />
            <Text
              style={{ fontFamily: 'LexRegular' }}
              className="text-center text-white"
            >
              Monitoring{'\n'}Pesanan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            className="flex-col items-center justify-center gap-1"
          >
            <Image
              source={require('@/assets/images/HomeScreen/rates-icon.png')}
              className="h-10 w-10 object-cover"
            />
            <Text
              style={{ fontFamily: 'LexRegular' }}
              className="text-center text-white"
            >
              Tarif{'\n'}Pelayanan
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-14 px-4 py-4">
          <TouchableOpacity
            activeOpacity={0.4}
            className="flex-col items-center justify-center gap-1"
          >
            <Image
              source={require('@/assets/images/HomeScreen/guide-icon.png')}
              className="h-10 w-10 object-cover"
            />
            <Text
              style={{ fontFamily: 'LexRegular' }}
              className="text-center text-white"
            >
              Panduan{'\n'}Pelayanan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            className="flex-col items-center justify-center gap-1"
            onPress={() => router.push('/screens/suggestionsAndComplaints')}
          >
            <Image
              source={require('@/assets/images/HomeScreen/faq-icon.png')}
              className="h-10 w-10 object-cover"
            />
            <Text
              style={{ fontFamily: 'LexRegular' }}
              className="text-center text-white"
            >
              Saran &{'\n'}Pengaduan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            className="flex-col items-center justify-center gap-1"
            onPress={() => router.push('/screens/fixSubmissionScreen')}
          >
            <MaterialCommunityIcons
              name="email-fast-outline"
              size={30}
              color="white"
            />
            <Text
              style={{ fontFamily: 'LexRegular' }}
              className="text-center text-white"
            >
              TEST KEAMANAN
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-6">
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
            <TouchableOpacity
              activeOpacity={0.8}
              className="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
            >
              <FontAwesome6 name="mountain" size={40} color="#3498DB" />
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="text-center text-sm text-black"
              >
                Informasi Stasiun{'\n'}Meteorologi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
            >
              <FontAwesome6 name="cloud-bolt" size={40} color="#3498DB" />
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="text-center text-sm text-black"
              >
                Informasi Stasiun{'\n'}Meteorologi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
            >
              <Feather name="wind" size={40} color="#3498DB" />
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="text-center text-sm text-black"
              >
                Informasi Stasiun{'\n'}Meteorologi
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
            <TouchableOpacity
              activeOpacity={0.8}
              className="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
            >
              <FontAwesome6 name="mountain" size={40} color="#3498DB" />
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="text-center text-sm text-black"
              >
                Jasa Stasiun{'\n'}Meteorologi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="mr-4 h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
            >
              <FontAwesome6 name="cloud-bolt" size={40} color="#3498DB" />
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="text-center text-sm text-black"
              >
                Jasa Stasiun{'\n'}Meteorologi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="h-32 w-36 items-center justify-center gap-2 rounded-lg border-2 border-[#3498DB] bg-white shadow-md shadow-[#3498DB]"
            >
              <Feather name="wind" size={40} color="#3498DB" />
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="text-center text-sm text-black"
              >
                Jasa Stasiun{'\n'}Meteorologi
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
