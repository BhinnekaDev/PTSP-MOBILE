import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

// CUSTOM COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';

export default function FixSubmissionScreen() {
  return (
    <View className="flex-1 gap-4 bg-white">
      {/* HEADER */}
      <NavCartOrder
        text="Pesanan"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      {/* ALERT RED BOX */}
      <View
        className="mb-6 flex-row items-start rounded-lg border border-red-600 bg-red-300 p-4"
        style={{ gap: 10 }}
      >
        <AntDesign name="warning" size={24} color="darkred" />

        <View className="flex-1">
          <Text
            style={{
              fontFamily: 'LexSemiBold',
              fontSize: 14,
              textTransform: 'uppercase',
              marginBottom: 4,
              color: '#b71c1c',
            }}
          >
            Upload Dokumen Hasil Perbaikan
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: '#b71c1c',
              marginBottom: 4,
            }}
          />
          <Text style={{ fontFamily: 'LexSemiBold', color: 'black' }}>
            DI TOLAK YA, MOHON MAAF!
          </Text>
        </View>
      </View>

      {/* BUTTON UPLOAD */}
      <ButtonCustom
        text="Upload Dokumen"
        classNameContainer="bg-[#72C02C] py-3 rounded-[10px]"
        textClassName="text-white text-[14px]"
        textStyle={{ fontFamily: 'LexSemiBold' }}
        isTouchable
        onPress={() => {
          // TODO: Implement upload logic
          alert('Upload dokumen diperbaiki');
        }}
      />
    </View>
  );
}
