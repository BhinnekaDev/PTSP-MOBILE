import React, { useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';

// OUR COMPONENTS
import BackButton from '@/components/headerBackButton';
import ButtonCustom from '@/components/buttonCustom';

import AccountCloseAlert from '@/components/accountCloseAlert';
import FormInput from '@/components/formInput';

// OUR HOOKS
import { useEditSecurityProfile } from '@/hooks/Backend/useEditSecurityProfile';

// OUT UTILS
import { validationNumber } from '@/utils/validationNumber';
import { validationEmail } from '@/utils/validationEmail';

export default function SecurityProfile({ onClose }: { onClose: () => void }) {
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

  const isDataChanged = useMemo(() => {
    if (!profile) return false;
    const originalPhone = profile.No_Hp || '';
    const originalEmail = profile.Email || '';
    return numberPhone !== originalPhone || email !== originalEmail;
  }, [numberPhone, email, profile]);

  const onSubmit = async () => {
    if (!isDataChanged) return;
    await handleSave();
  };

  if (loading || !profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6BBC3F" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-transparent">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} //
        style={{ flex: 1, width: '100%' }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
      >
        <View className="w-full flex-1 rounded-[20px] bg-white p-6">
          {/* HEADER */}
          <BackButton
            title="Keamanan" //
            buttonClassName="mr-auto"
            textClassName="text-[23px] mr-auto"
            onPress={onClose}
          />

          {/* SCROLL */}
          <ScrollView
            style={{ flex: 1, marginTop: 16 }} //
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* FORM FIELDS */}
            <View className="space-y-4">
              {/* INPUT NO TELEPON */}
              <FormInput
                label="No HP / Telepon"
                value={numberPhone}
                onChangeText={(text) =>
                  setNumberPhone(validationNumber(text, 15))
                }
                placeholder="Masukkan nomor telepon"
                keyboardType="phone-pad"
                maxLength={13}
              />

              {/* INPUT EMAIL */}
              <FormInput
                label="Email" //
                textClassName="border-[#6BBC3F]"
                value={email}
                onChangeText={(text) => setEmail(validationEmail(text))}
                placeholder="Masukkan email"
                keyboardType="email-address"
              />

              {/* BUTTON TUTUP AKUN */}
              <View className="w-[95%] self-center py-4">
                <ButtonCustom
                  classNameContainer=" w-32 py-[6px] px-10 rounded-lg" //
                  text="Tutup Akun"
                  textClassName="text-[13px] text-left text-[#DC0202]"
                  onPress={() => setModalVisible(true)}
                />
              </View>
            </View>
          </ScrollView>
          {/* MODAL TUTUP AKUN */}
          <AccountCloseAlert
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={() => {
              console.log('Akun Ditutup');
              setModalVisible(false);
            }}
          />
          {/* BUTTON SIMPAN */}
          <View className="w-[80%] self-center py-4">
            <ButtonCustom
              classNameContainer={`py-[6px] px-10 rounded-lg ${
                isDataChanged ? 'bg-[#73BF40]' : 'bg-gray-400'
              }`}
              isTouchable={isDataChanged}
              text="Simpan Data"
              textClassName="text-[20px] text-center text-white"
              onPress={onSubmit}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
