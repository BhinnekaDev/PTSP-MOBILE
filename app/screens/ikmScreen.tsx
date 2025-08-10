import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { getHeaderPaddingVertical } from '@/utils/platformStyleAndroidIos';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';

const ikmData = [
  {
    category: 'Meteorologi',
    items: [
      'Informasi cuaca publik (rutin, peringatan dini cuaca, pasang surut air laut)',
      'Informasi cuaca khusus (maritim, penerbangan, klaim asuransi)',
      'Analisis cuaca (kecelakaan pesawat, kecelakaan kapal laut)',
      'Informasi titik panas (hotspot)',
      'Informasi tentang tingkat kemudahan terjadinya kebakaran hutan dan lahan',
    ],
  },
  {
    category: 'Klimatologi',
    items: [
      'Prakiraan musim',
      'Informasi iklim khusus',
      'Analisis dan prakiraan curah hujan bulanan/dasarian',
      'Tren curah hujan',
      'Informasi kualitas udara',
      'Analisis iklim ekstrim',
      'Informasi iklim terapan (peta potensi energi baru terbarukan, informasi potensi DBD, dst)',
      'Informasi perubahan iklim (keterpaparan dan/atau proyeksi)',
      'Pengembalian dan pengujian sampel parameter iklim dan kualitas udara (laboratorium)',
    ],
  },
  {
    category: 'Geofisika',
    items: [
      'Informasi gempa bumi dan peringatan dini tsunami',
      'Peta seismitas',
      'Informasi tanda waktu (hilal dan gerhana)',
      'Informasi geofisika potensial (gravitasi, magnet bumi, dan hari guruh/petir)',
      'Peta rendaman tsunami',
      'Informasi seismologi teknik (shake map) (peta mikrozonasi dan percepatan tanah)',
    ],
  },
  {
    category: 'Instrumentasi',
    items: [
      'Data meteorologi, klimatologi, dan geofisika (suhu, curah hujan, angin dan grid)',
      'Kalibrasi (peralatan MKG)',
      'Konsultasi (untuk penerapan informasi khusus MKG)',
      'Sewa peralatan MKG',
    ],
  },
  {
    category: 'Humas',
    items: ['Kunjungan'],
  },
];

const stepsData = [
  [
    { title: 'Persyaratan pelayanan jelas dan terbuka' },
    { title: 'Persyaratan pelayanan mudah dan dipenuhi' },
    { title: 'Dibutuhkan dalam kehidupan sehari-hari' },
    { title: 'Mudah dipahami' },
    { title: 'Mudah diakses' },
  ],
  [
    { title: 'Akurat' },
    { title: 'Ketersediaan data dan informasi' },
    { title: 'Alur pelayanan yang jelas dan sederhana' },
    { title: 'Sistem dan prosedur pelayanan masih berpeluang menimbulkan KKN' },
    { title: 'Informasi target waktu penyelesaian pelayanan jelas' },
  ],
  [
    { title: 'Persyaratan pelayanan sesuai dengan target waktu' },
    { title: 'Biaya pelayanan jelas dan terbuka' },
    { title: 'Informasi daftar produk atau jasa layanan terbuka dan jelas' },
    { title: 'Sarana Pengaduan atau keluhan pelayanan publik tersedia' },
    { title: 'Prosedur dan tindak lanjut penanganan pengaduan jelas' },
  ],
  [
    { title: 'Persyaratan pelayanan sesuai dengan target waktu' },
    { title: 'Biaya pelayanan jelas dan terbuka' },
    { title: 'Informasi daftar produk atau jasa layanan terbuka dan jelas' },
    { title: 'Sarana Pengaduan atau keluhan pelayanan publik tersedia' },
    { title: 'Prosedur dan tindak lanjut penanganan pengaduan jelas' },
  ],
];

const options = ['Sangat Setuju', 'Setuju', 'Kurang Setuju', 'Tidak Setuju'];

export default function IKMScreen() {
  const headerPaddingVertical = getHeaderPaddingVertical();
  const [selectedChecklist, setSelectedChecklist] = useState<
    Record<string, boolean>
  >({});
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const toggleSelectChecklist = (catIndex: number, itemIndex: number) => {
    const key = `${catIndex}-${itemIndex}`;
    setSelectedChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectRadio = (
    sectionIndex: number,
    type: 'kualitas' | 'harapan',
    value: string
  ) => {
    const key = `${currentStep - 1}-${sectionIndex}-${type}`;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < stepsData.length) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Semua langkah selesai:', {
        checklist: selectedChecklist,
        radio: answers,
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = currentStep > 0 ? (currentStep / stepsData.length) * 100 : 0;

  return (
    <View className="flex-1 bg-[#A7CBE5]">
      {/* HEADER */}
      <View
        className={`z-20 w-full flex-row items-center rounded-b-[10px] bg-[#1475BA] px-4 pt-12 ${headerPaddingVertical}`}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 rounded-full p-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text
          className="text-[20px] text-white"
          style={{ fontFamily: 'LexBold' }}
        >
          Pengisian IKM
        </Text>
      </View>

      <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="rounded-lg bg-white p-4">
          {currentStep > 0 && (
            <View className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[#1475BA]">
              <View
                style={{ width: `${progress}%` }}
                className="h-2 bg-green-500"
              />
            </View>
          )}

          {/* STEP 0 = Checklist */}
          {currentStep === 0 &&
            ikmData.map((cat, catIndex) => (
              <View key={catIndex} className="mb-12 gap-4">
                <Text
                  className="mb-1 text-lg"
                  style={{ fontFamily: 'LexBold' }}
                >
                  {cat.category}
                </Text>
                {cat.items.map((item, itemIndex) => {
                  const key = `${catIndex}-${itemIndex}`;
                  const isChecked = selectedChecklist[key] || false;
                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      onPress={() => toggleSelectChecklist(catIndex, itemIndex)}
                      className="mb-1 flex-row items-center"
                    >
                      <View
                        className={`mr-3 flex h-5 w-5 items-center justify-center rounded-[3px] border-2 ${
                          isChecked ? 'border-black' : 'border-black'
                        }`}
                      >
                        {isChecked && (
                          <Entypo name="check" size={16} color="black" />
                        )}
                      </View>
                      <Text
                        className="flex-1"
                        style={{ fontFamily: 'LexRegular' }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

          {/* STEP > 0 = Radio button */}
          {currentStep > 0 &&
            stepsData[currentStep - 1].map((section, index) => (
              <View key={index} className="mb-10">
                <Text
                  className="mb-2"
                  style={{ fontFamily: 'LexMedium', fontSize: 16 }}
                >
                  {section.title}
                </Text>

                {/* WARNING hanya untuk pertanyaan pertama */}
                {index === 0 && (
                  <View className="mb-2 flex-row items-center">
                    <Ionicons name="warning" size={15} color="red" />
                    <Text
                      className="text-red-500"
                      style={{ fontFamily: 'LexRegular' }}
                    >
                      Harap isi bagian ini dengan sebaik-baiknya
                    </Text>
                  </View>
                )}

                <View className="flex-row justify-between">
                  {/* Kualitas Pelayanan */}
                  <View className="mr-2 flex-1 gap-3">
                    <Text className="mb-1" style={{ fontFamily: 'LexMedium' }}>
                      Kualitas Pelayanan
                    </Text>
                    {options.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        onPress={() =>
                          handleSelectRadio(index, 'kualitas', opt)
                        }
                        className="mb-1 flex-row items-center"
                      >
                        <View
                          className={`mr-2 h-5 w-5 items-center justify-center rounded-full border-2 ${
                            answers[`${currentStep - 1}-${index}-kualitas`] ===
                            opt
                              ? 'border-black'
                              : 'border-black'
                          }`}
                          style={{
                            padding:
                              answers[
                                `${currentStep - 1}-${index}-kualitas`
                              ] === opt
                                ? 1.5
                                : 0,
                          }}
                        >
                          {answers[`${currentStep - 1}-${index}-kualitas`] ===
                            opt && (
                            <View className="h-full w-full rounded-full bg-black" />
                          )}
                        </View>
                        <Text style={{ fontFamily: 'LexRegular' }}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Harapan Konsumen */}
                  <View className="ml-2 flex-1 gap-3">
                    <Text className="mb-1" style={{ fontFamily: 'LexMedium' }}>
                      Harapan Konsumen
                    </Text>
                    {options.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => handleSelectRadio(index, 'harapan', opt)}
                        className="mb-1 flex-row items-center"
                      >
                        <View
                          className={`mr-2 h-5 w-5 items-center justify-center rounded-full border-2 ${
                            answers[`${currentStep - 1}-${index}-harapan`] ===
                            opt
                              ? 'border-black'
                              : 'border-black'
                          }`}
                          style={{
                            padding:
                              answers[`${currentStep - 1}-${index}-harapan`] ===
                              opt
                                ? 1.5
                                : 0,
                          }}
                        >
                          {answers[`${currentStep - 1}-${index}-harapan`] ===
                            opt && (
                            <View className="h-full w-full rounded-full bg-black" />
                          )}
                        </View>
                        <Text style={{ fontFamily: 'LexRegular' }}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ))}

          {/* BUTTON NAVIGATION */}
          <View
            className={`flex-row items-center ${
              currentStep === 0 ? 'justify-end' : 'justify-between'
            }`}
          >
            {currentStep > 0 && (
              <>
                {/* Tombol Sebelumnya */}
                <TouchableOpacity
                  onPress={handlePrev}
                  className="rounded-md bg-[#1475BA] px-4 py-2"
                >
                  <Text
                    style={{ fontFamily: 'LexMedium' }}
                    className="text-white"
                  >
                    Sebelumnya
                  </Text>
                </TouchableOpacity>

                {/* Text Progress */}
                <Text style={{ fontFamily: 'LexMedium' }}>
                  {currentStep} dari {stepsData.length}
                </Text>
              </>
            )}

            {/* Tombol Selanjutnya */}
            <TouchableOpacity
              onPress={handleNext}
              className="rounded-md bg-[#1475BA] px-4 py-2"
            >
              <Text style={{ fontFamily: 'LexMedium' }} className="text-white">
                {currentStep === stepsData.length
                  ? 'Simpan IKM'
                  : 'Selanjutnya'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
