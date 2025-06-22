import React, { useState } from 'react';
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
import InputField from '@/components/formInput';
import AccountCloseAlert from '@/components/accountCloseAlert';

// OUR HOOKS
import { useEditSecurityProfile } from '@/hooks/Backend/useEditSecurityProfile';

// OUT UTILS
import { validationNumberOnly } from '@/utils/validationStringNumber';

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
              <InputField
                label="No HP / Telepon" //
                textClassName="border-[#6BBC3F]"
                value={numberPhone}
                onChangeText={(input) =>
                  setNumberPhone(validationNumberOnly(input, 13))
                }
                placeholder="Masukkan nomor telepon"
                keyboardType="phone-pad"
              />

              {/* INPUT EMAIL */}
              <InputField
                label="Email" //
                textClassName="border-[#6BBC3F]"
                value={email}
                onChangeText={(text) => setEmail(text.trim())}
                placeholder="Masukkan email"
                keyboardType="email-address"
              />
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
              classNameContainer="bg-[#73BF40] py-[6px] px-10 rounded-lg"
              text="Simpan Data"
              textClassName="text-[20px] text-center text-white"
              onPress={handleSave}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
