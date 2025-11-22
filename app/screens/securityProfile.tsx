import React, { useState, useMemo, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
} from 'react-native';

import ButtonCustom from '@/components/buttonCustom';
import FormInput from '@/components/formInput';
import AccountCloseAlert from '@/components/accountCloseAlert';
import { WrapperSkeletonSecurityProfile } from '@/components/skeletons/wrapperSkeletonSecurityProfile';

import { useEditSecurityProfile } from '@/hooks/Backend/useEditSecurityProfile';
import { useSkeletonForTab } from '@/hooks/Frontend/skeletons/useSkeletonForTab';

import {
  validationNumber,
  validateNumberError,
} from '@/utils/validationNumber';
import { validationEmail, validateEmailError } from '@/utils/validationEmail';

import { Ionicons } from '@expo/vector-icons';

export default function SecurityProfile({ onClose }: { onClose: () => void }) {
  const showSkeleton = useSkeletonForTab();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    profile,
    loading,
    numberPhone,
    setNumberPhone,
    email,
    setEmail,
    handleSave,
  } = useEditSecurityProfile(onClose);

  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  // cek perubahan
  const isDataChanged = useMemo(() => {
    if (!profile) return false;
    return (
      numberPhone !== (profile.No_Hp || '') || email !== (profile.Email || '')
    );
  }, [numberPhone, email, profile]);

  const canSubmit = isDataChanged && !phoneError && !emailError;

  useEffect(() => {
    setPhoneError(validateNumberError(numberPhone));
    setEmailError(validateEmailError(email));
  }, [numberPhone, email]);

  if (showSkeleton || loading || !profile) {
    return <WrapperSkeletonSecurityProfile />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* HEADER */}
      <View className="bg-white px-6 pb-4 pt-12 shadow-sm">
        <ButtonCustom
          onPressLeftIcon={onClose}
          classNameContainer="absolute left-6 top-12 flex-row items-center px-2 py-2"
          textClassName="font-lexend ml-2 text-gray-600 text-base"
          iconLeft={
            <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </View>
          }
        />
        <View className="items-center justify-center">
          <Text className="font-lexend-bold text-2xl text-gray-900">
            Keamanan
          </Text>
          <Text className="font-lexend mt-1 text-sm text-gray-500">
            Pengaturan keamanan akun
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
      >
        <ScrollView
          className="mx-6 mt-6 flex-1"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
            {/* PHONE */}
            <FormInput
              label="No HP / Telepon"
              value={numberPhone}
              onChangeText={(text) =>
                setNumberPhone(validationNumber(text, 15))
              }
              placeholder="Masukkan nomor telepon"
              keyboardType="phone-pad"
              maxLength={15}
              errorMessage={phoneError}
            />

            {/* EMAIL */}
            <FormInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(validationEmail(text))}
              placeholder="Masukkan email"
              keyboardType="email-address"
              errorMessage={emailError}
            />

            {/* DELETE ACCOUNT */}
            <View className="w-full self-center">
              <ButtonCustom
                classNameContainer="w-32 py-[6px] px-10 rounded-lg"
                text="Tutup Akun"
                textClassName="text-[13px] text-left text-[#DC0202]"
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL */}
      <AccountCloseAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => setModalVisible(false)}
      />

      {/* FOOTER */}
      <View className="border-t border-gray-200 bg-white px-6 py-4">
        <ButtonCustom
          classNameContainer={`rounded-xl py-4 ${
            canSubmit ? 'bg-green-500' : 'bg-gray-300'
          }`}
          isTouchable={canSubmit}
          text="Simpan Data"
          textClassName="text-[20px] text-center text-white"
          onPress={() => handleSave(canSubmit)} // ⬅ HANYA INI
        />

        {!canSubmit && (
          <Text className="font-lexend mt-2 text-center text-sm text-gray-500">
            {!isDataChanged
              ? 'Belum ada perubahan data'
              : phoneError || emailError
                ? 'Periksa kembali input yang salah'
                : 'Harap lengkapi semua field'}
          </Text>
        )}
      </View>
    </View>
  );
}
