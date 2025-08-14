import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';

import { getHeaderPaddingVertical } from '@/utils/platformStyleAndroidIos';
import {
  ikmData,
  stepsData,
  optionsKualitas,
  optionsHarapan,
} from '@/constants/dataIkm';
import { useInsertIkmScreen } from '@/hooks/Backend/useInsertIkmScreen';

export default function IKMScreen() {
  const headerPaddingVertical = getHeaderPaddingVertical();

  const {
    opsiYangDipilih,
    ikmResponses,
    handleSelectOpsi,
    handleSetResponse,
    handleSubmitIKM,
  } = useInsertIkmScreen();

  const [currentStep, setCurrentStep] = useState(0);

 const handleSelectRadio = (
  sectionIndex: number,
  type: 'KualitasLayanan' | 'HarapanKonsumen',
  value: string,
  questionTitle: string
) => {
  handleSetResponse(type, value, questionTitle);
  console.log(
    `DEBUG: User memilih [${type}] = "${value}" pada pertanyaan "${questionTitle}"`
  );
};


  const handleNext = async () => {
    if (currentStep < stepsData.length) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmitIKM();
      console.log('DEBUG: IKM sudah disubmit', {
        opsiYangDipilih,
        responses: ikmResponses,
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
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
          {/* Progress */}
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
                  const category = ikmData.find((cat) =>
                    cat.items.includes(item)
                  )?.category;

                  // cek apakah item sudah dipilih
                  const isChecked = category
                    ? (opsiYangDipilih[category] || []).includes(item)
                    : false;

                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      onPress={() => handleSelectOpsi(item)}
                      className="mb-1 flex-row items-center"
                    >
                      <View
                        className={`mr-3 flex h-5 w-5 items-center justify-center rounded-[3px] border-2 ${
                          isChecked ? 'border-black' : 'border-gray-400'
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
            stepsData[currentStep - 1].map((section, index) => {
              // Cari jawaban pertanyaan di ikmResponses berdasarkan Nama_Pertanyaan
              const response = ikmResponses.find(
                (r) => r.Nama_Pertanyaan === section.title
              );

              return (
                <View key={index} className="mb-10">
                  <Text
                    className="mb-2"
                    style={{ fontFamily: 'LexMedium', fontSize: 16 }}
                  >
                    {section.title}
                  </Text>

                  {/* Warning khusus */}
                  {section.title ===
                    'Sistem dan prosedur pelayanan masih berpeluang menimbulkan KKN' && (
                    <View className="mb-2 flex-row items-center rounded border border-red-500 bg-red-100 p-2">
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
                    {/* Kualitas Layanan */}
                    <View className="mr-2 flex-1 gap-3">
                      <Text
                        className="mb-1"
                        style={{ fontFamily: 'LexMedium' }}
                      >
                        Kualitas Layanan
                      </Text>
                      {optionsKualitas.map((opt) => {
                        const isSelected = response?.KualitasLayanan === opt;

                        return (
                          <TouchableOpacity
                            key={opt}
                            onPress={() =>
                              handleSelectRadio(
                                index,
                                'KualitasLayanan',
                                opt,
                                section.title
                              )
                            }
                            className="mb-1 flex-row items-center"
                          >
                            <View
                              className={`mr-2 h-5 w-5 items-center justify-center rounded-full border-2 ${
                                isSelected ? 'border-black' : 'border-gray-400'
                              }`}
                            >
                              {isSelected && (
                                <View className="h-full w-full rounded-full bg-black" />
                              )}
                            </View>
                            <Text style={{ fontFamily: 'LexRegular' }}>
                              {opt}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Harapan Konsumen */}
                    <View className="ml-2 flex-1 gap-3">
                      <Text
                        className="mb-1"
                        style={{ fontFamily: 'LexMedium' }}
                      >
                        Harapan Konsumen
                      </Text>
                      {optionsHarapan.map((opt) => {
                        const isSelected = response?.HarapanKonsumen === opt;

                        return (
                          <TouchableOpacity
                            key={opt}
                            onPress={() =>
                              handleSelectRadio(
                                index,
                                'HarapanKonsumen',
                                opt,
                                section.title
                              )
                            }
                            className="mb-1 flex-row items-center"
                          >
                            <View
                              className={`mr-2 h-5 w-5 items-center justify-center rounded-full border-2 ${
                                isSelected ? 'border-black' : 'border-gray-400'
                              }`}
                            >
                              {isSelected && (
                                <View className="h-full w-full rounded-full bg-black" />
                              )}
                            </View>
                            <Text style={{ fontFamily: 'LexRegular' }}>
                              {opt}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })}

          {/* BUTTON NAVIGATION */}
          <View
            className={`flex-row items-center ${
              currentStep === 0 ? 'justify-end' : 'justify-between'
            }`}
          >
            {currentStep > 0 && (
              <>
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

                <Text style={{ fontFamily: 'LexMedium' }}>
                  {currentStep} dari {stepsData.length}
                </Text>
              </>
            )}

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
