import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import ImageZoom from 'react-native-image-pan-zoom';

// OUR ICONS
import Entypo from '@expo/vector-icons/Entypo';

// OUR COMPONENTS
import Navbar from '@/components/Navbar';

const { width, height } = Dimensions.get('window');

export default function Regulation() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const ZoomAny = ImageZoom as unknown as React.ComponentType<any>;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleNext = () => {
    const nextIndex = Math.min(activeIndex + 1, selectedImages.length - 1);
    setActiveIndex(nextIndex);
    scrollRef.current?.scrollTo({ x: width * nextIndex, animated: true });
  };

  const handlePrev = () => {
    const prevIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(prevIndex);
    scrollRef.current?.scrollTo({ x: width * prevIndex, animated: true });
  };

  const openModal = (images: any[]) => {
    setSelectedImages(images);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImages([]);
  };

  return (
    <View className="flex-1 bg-[#A7CBE5]">
      {/* NAVBAR */}
      <Navbar />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontFamily: 'LexBold' }} className="my-4 text-2xl">
          Regulasi Pelayanan
        </Text>
        <View className="rounded-lg border-2 border-black bg-white p-2">
          <Text style={{ fontFamily: 'LexBold' }} className="mb-3 text-xl">
            Regulasi Pelayanan
          </Text>
          <View className="mb-1 rounded-lg p-2">
            <Text style={{ fontFamily: 'LexRegular' }} className="text-md mb-2">
              Syarat dan Tata Cara Pengenaan Tarif Rp.0,00 (Nol Rupiah) Atas
              Jenis Penerimaan Negara Bukan Pajak Terhadap Kegiatan Tertentu di
              Lingkungan BMKG.
            </Text>
            <View className="flex-col rounded-lg border border-gray-300 bg-gray-900/5 p-2">
              <Text style={{ fontFamily: 'LexRegular' }} className="text-sm">
                Sesuai dengan:
              </Text>
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-sm text-[#72C02C]"
              >
                Perka No. 12 Tahun 2019 Persyaratan dan Tata Cara Pengenaan
                Tarif Nol Rupiah Atas Jenis PNBP
              </Text>
            </View>
          </View>
          <View className="mb-1 rounded-lg p-2">
            <Text style={{ fontFamily: 'LexRegular' }} className="text-md mb-2">
              Produk dan Tarif sesuai PP No. 47 Tahun 2018 Tentang Jenis dan
              Tarif penerimaan Negara Bukan Pajak yang Berlaku di BMKG.
            </Text>
            <View className="flex-col rounded-lg border border-gray-300 bg-gray-900/5 p-2">
              <Text style={{ fontFamily: 'LexRegular' }} className="text-sm">
                Sesuai dengan:
              </Text>
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-sm text-[#72C02C]"
              >
                PP No. 47 Tahun 2018
              </Text>
            </View>
          </View>
          <View className="mb-1 rounded-lg p-2">
            <Text style={{ fontFamily: 'LexRegular' }} className="text-md mb-2">
              Peraturan PTSP sesuai Perka No. 01 Tahun 2019 Tentang Pelayanan
              Terpadu Satu Pintu di BMKG.
            </Text>
            <View className="flex-col rounded-lg border border-gray-300 bg-gray-900/5 p-2">
              <Text style={{ fontFamily: 'LexRegular' }} className="text-sm">
                Sesuai dengan:
              </Text>
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-sm text-[#72C02C]"
              >
                Perka No. 01 Tahun 2019
              </Text>
            </View>
          </View>
          <View className="mb-1 rounded-lg p-2">
            <Text style={{ fontFamily: 'LexRegular' }} className="text-md mb-2">
              Manual PTSP BMKG untuk Pelanggan Untuk Alur Layanan Informasi dan
              Jasa Konsultasi MKG, Jasa Sewa Alat MKG dan Jasa Kalibrasi Alat
              MKG.
            </Text>
            <View className="rounded-lg border border-gray-300 bg-gray-900/5 p-2">
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-sm text-[#72C02C]"
              >
                Manual Alur Layanan PTSP BMKG
              </Text>
            </View>
          </View>
        </View>
        <View className="my-8 flex-row justify-between">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              openModal([require('@/assets/images/Regulation/AlurLayanan.jpg')])
            }
          >
            <View className="w-48 items-center rounded-md border-2 border-black bg-white p-2">
              <Image
                source={require('@/assets/images/Regulation/AlurLayanan.jpg')}
                className="h-40 w-full rounded-lg border border-gray-300 object-cover"
              />
              <Text style={{ fontFamily: 'LexBold' }} className="mt-2 text-xl">
                Alur Layanan
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              openModal([
                require('@/assets/images/Regulation/StandarLayanan1.jpg'),
                require('@/assets/images/Regulation/StandarLayanan2.jpg'),
              ])
            }
          >
            <View className="items-center rounded-md border-2 border-black bg-white p-2">
              <Image
                source={require('@/assets/images/Regulation/StandarLayanan1.jpg')}
                className="h-40 w-full rounded-lg border border-gray-300 object-cover"
              />
              <Text style={{ fontFamily: 'LexBold' }} className="mt-2 text-xl">
                Standar Layanan
              </Text>
            </View>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={false}
            animationType="fade"
          >
            <Pressable
              onPress={closeModal}
              style={{
                position: 'absolute',
                top: 40,
                right: 20,
                zIndex: 10,
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Tutup</Text>
            </Pressable>

            {activeIndex > 0 && (
              <Pressable
                onPress={handlePrev}
                style={{
                  position: 'absolute',
                  left: 10,
                  top: height / 2 - 30,
                  zIndex: 10,
                  padding: 10,
                  backgroundColor: '#ffffff99',
                  borderRadius: 50,
                }}
              >
                <Entypo name="chevron-left" size={24} color="black" />
              </Pressable>
            )}

            {activeIndex < selectedImages.length - 1 && (
              <Pressable
                onPress={handleNext}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: height / 2 - 30,
                  zIndex: 10,
                  padding: 10,
                  backgroundColor: '#ffffff99',
                  borderRadius: 50,
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </Pressable>
            )}

            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              style={{ flex: 1, backgroundColor: 'black' }}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setActiveIndex(index);
              }}
            >
              {selectedImages.map((img, index) => (
                <ZoomAny
                  key={index}
                  cropWidth={width}
                  cropHeight={height}
                  imageWidth={width}
                  imageHeight={height}
                  style={{ backgroundColor: 'black' }}
                >
                  <Image
                    source={img}
                    style={{
                      width,
                      height,
                      resizeMode: 'contain',
                    }}
                  />
                </ZoomAny>
              ))}
            </ScrollView>
          </Modal>
        </View>
        <Text style={{ fontFamily: 'LexBold' }} className="mb-4 text-2xl">
          Tarif Pelayanan
        </Text>
        <View className="gap-6 px-2">
          <View className="rounded-lg border border-black bg-white p-3">
            <View className="flex-row gap-1">
              <Text style={{ fontFamily: 'LexBold' }} className="text-lg">
                I.
              </Text>
              <Text style={{ fontFamily: 'LexBold' }} className="text-lg">
                Informasi Meteorologi, Klimatologi, dan Geofisika
              </Text>
            </View>
            <View className="my-4 gap-4 px-5">
              <TouchableOpacity
                className="items-center rounded-lg bg-[#72C02C] p-2"
                onPress={() => router.push('/screens/generalInformationRates')}
                activeOpacity={0.7}
              >
                <Text
                  style={{ fontFamily: 'LexBold' }}
                  className="text-md text-white"
                >
                  Informasi Umum
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/screens/specialInformationRates')}
                activeOpacity={0.7}
                className="items-center rounded-lg bg-[#1275BA] p-2"
              >
                <Text
                  style={{ fontFamily: 'LexBold' }}
                  className="text-md text-white"
                >
                  Informasi Khusus Sesuai Permintaan
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-2 flex-row gap-1">
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-xs text-black"
              >
                catatan:
              </Text>
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-xs text-black"
              >
                Ketuk tombol Informasi Diatas untuk melihat tarif {'\n'}
                layanan
              </Text>
            </View>
          </View>
          <View className="rounded-lg border border-black bg-white p-3">
            <View className="flex-row gap-1">
              <Text style={{ fontFamily: 'LexBold' }} className="text-lg">
                II.
              </Text>
              <Text style={{ fontFamily: 'LexBold' }} className="text-lg">
                Jasa Konsultasi Meteorologi, Klimatologi, dan Geofisika
              </Text>
            </View>
            <View className="my-4 gap-4 px-5">
              <TouchableOpacity
                className="items-center rounded-lg bg-[#72C02C] p-2"
                onPress={() => router.push('/screens/consultingServiceRates')}
                activeOpacity={0.7}
              >
                <Text
                  style={{ fontFamily: 'LexBold' }}
                  className="text-md text-white"
                >
                  Jasa Konsultasi
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-1">
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-xs text-black"
              >
                catatan:
              </Text>
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-xs text-black"
              >
                Ketuk tombol Jasa Diatas untuk melihat tarif layanan
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
