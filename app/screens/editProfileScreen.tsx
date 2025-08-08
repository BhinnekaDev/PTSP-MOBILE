import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';

// COMPONENTS
import BackButton from '@/components/headerBackButton';
import ButtonCustom from '@/components/buttonCustom';
import FormDropdownSelect from '@/components/formDropdownSelect';
import InputField from '@/components/formInput';

// UTILS
import { validationFullString } from '@/utils/validationFullString';
import { validationStringNumber } from '@/utils/validationStringNumber';

// HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import { useEditIndividualProfile } from '@/hooks/Backend/useEditIndividualProfile';
import { useEditCompanyProfile } from '@/hooks/Backend/useEditCompanyProfile';

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const { profile, loading } = useGetUserProfile();
  const individualHook = useEditIndividualProfile(onClose);
  const companyHook = useEditCompanyProfile(onClose);

  const isIndividual = profile?.tipe === 'perorangan';
  const isCompany = profile?.tipe === 'perusahaan';
  const selected = isIndividual
    ? individualHook
    : isCompany
      ? companyHook
      : null;

  if (loading || !profile || !selected) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6BBC3F" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-transparent">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
      >
        <View className="w-full flex-1 rounded-[20px] bg-white p-6">
          <BackButton
            title="Sunting Profil"
            buttonClassName="mr-12"
            textClassName="text-[23px]"
            onPress={onClose}
          />

          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
          >
            <View className="mt-4 space-y-4">
              <InputField
                label="Nama Lengkap"
                textClassName="border-[#6BBC3F]"
                value={selected.fullName}
                onChangeText={(input) =>
                  selected.setFullName(validationFullString(input, 50))
                }
                placeholder="Nama lengkap"
              />

              <FormDropdownSelect
                labelClassName="px-6 mt-4 mb-2"
                toggleDropdownClassName="w-[87%] border-[#6BBC3F] rounded-[10px]"
                label="Jenis Kelamin"
                labelStyle={{ fontFamily: 'LexBold' }}
                DropdownSelectClassName="w-[87%] border-[#6BBC3F] rounded-[10px]"
                options={['Laki - Laki', 'Perempuan']}
                selectedTextStyle={{ fontFamily: 'LexRegular' }}
                iconColor="#6BBC3F"
                selected={selected.selectGender}
                onSelect={selected.setSelectGender}
              />

              <InputField
                label="Pekerjaan"
                textClassName="border-[#6BBC3F]"
                value={selected.job}
                onChangeText={(input) =>
                  selected.setJob(validationFullString(input, 30))
                }
                placeholder="Pekerjaan"
              />

              <InputField
                label="Pendidikan Terakhir"
                textClassName="border-[#6BBC3F]"
                value={selected.lastEducation}
                onChangeText={(input) =>
                  selected.setLastEducation(validationStringNumber(input, 30))
                }
                placeholder="Pendidikan Terakhir"
              />

              {/* TAMBAHAN FORM PERUSAHAAN */}
              {selected.type === 'perusahaan' && (
                <>
                  <InputField
                    label="Nama Perusahaan"
                    value={selected.companyName}
                    onChangeText={selected.setCompanyName}
                    placeholder="Nama Perusahaan"
                    textClassName="border-[#6BBC3F]"
                  />
                  <InputField
                    label="Nomor HP Perusahaan"
                    value={selected.companyPhone}
                    onChangeText={selected.setCompanyPhone}
                    placeholder="Nomor HP"
                    textClassName="border-[#6BBC3F]"
                    keyboardType="phone-pad"
                  />
                  <InputField
                    label="Email Perusahaan"
                    value={selected.companyEmail}
                    onChangeText={selected.setCompanyEmail}
                    placeholder="Email"
                    textClassName="border-[#6BBC3F]"
                    keyboardType="email-address"
                  />
                  <InputField
                    label="NPWP Perusahaan"
                    value={selected.npwpCompany}
                    onChangeText={selected.setNpwpCompany}
                    placeholder="NPWP"
                    textClassName="border-[#6BBC3F]"
                  />
                  <InputField
                    label="Alamat Perusahaan"
                    value={selected.companyAddress}
                    onChangeText={selected.setCompanyAddress}
                    placeholder="Alamat Perusahaan"
                    textClassName="border-[#6BBC3F]"
                  />
                  <InputField
                    label="Kabupaten / Kota Perusahaan"
                    value={selected.districtCityCompany}
                    onChangeText={selected.setDistrictCityCompany}
                    placeholder="Kabupaten / Kota Perusahaan"
                    textClassName="border-[#6BBC3F]"
                  />
                  <InputField
                    label="Provinsi Perusahaan"
                    value={selected.provinceCompany}
                    onChangeText={selected.setProvinceCompany}
                    placeholder="Provinsi Perusahaan"
                    textClassName="border-[#6BBC3F]"
                  />
                </>
              )}
            </View>
          </ScrollView>

          {/* Tombol simpan */}
          <View className="mt-4 w-[80%] self-center">
            <ButtonCustom
              classNameContainer="bg-[#73BF40] py-[6px] px-10 rounded-lg"
              text="Simpan Data"
              textClassName="text-[20px] text-center text-white"
              onPress={selected.handleSave}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
