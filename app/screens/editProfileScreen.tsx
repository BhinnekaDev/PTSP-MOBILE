import React, { useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

// COMPONENTS
import FormDropdownSelect from '@/components/formDropdownSelect';
import FormInput from '@/components/formInput';
import ButtonCustom from '@/components/buttonCustom';
import { WrapperSkeletonEditProfile } from '@/components/skeletons/wrapperSkeletonEditProfile';

// CONSTANTS
import { educationOptions } from '@/constants/educationOptions';

// HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import { useEditIndividualProfile } from '@/hooks/Backend/useEditIndividualProfile';
import { useEditCompanyProfile } from '@/hooks/Backend/useEditCompanyProfile';
import { validationEmail } from '@/utils/validationEmail';
import { validationFullString } from '@/utils/validationFullString';
import { validationNumber } from '@/utils/validationNumber';
import { validationNPWP } from '@/utils/validationNPWP';
import { useSkeletonForTab } from '@/hooks/Frontend/skeletons/useSkeletonForTab';

// ICONS
import { Ionicons } from '@expo/vector-icons';

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const { profile, loading } = useGetUserProfile();
  const individualHook = useEditIndividualProfile(onClose);
  const companyHook = useEditCompanyProfile(onClose);
  const showSkeleton = useSkeletonForTab();

  const isIndividual = profile?.tipe === 'perorangan';
  const isCompany = profile?.tipe === 'perusahaan';
  const selected = isIndividual
    ? individualHook
    : isCompany
      ? companyHook
      : null;

  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isLastEducationDropdownOpen, setIsLastEducationDropdownOpen] =
    useState(false);

  const isDataChanged = useMemo(() => {
    if (!profile || !selected) return false;

    if (isIndividual) {
      return (
        selected.fullName !== profile.Nama_Lengkap ||
        selected.selectGender !== profile.Jenis_Kelamin ||
        selected.job !== profile.Pekerjaan ||
        selected.lastEducation !== profile.Pendidikan_Terakhir
      );
    }

    if (isCompany && selected.type === 'perusahaan') {
      return (
        selected.fullName !== profile.Nama_Lengkap ||
        selected.selectGender !== profile.Jenis_Kelamin ||
        selected.job !== profile.Pekerjaan ||
        selected.lastEducation !== profile.Pendidikan_Terakhir ||
        selected.companyName !== profile.Nama_Perusahaan ||
        selected.companyPhone !== profile.No_Hp_Perusahaan ||
        selected.companyEmail !== profile.Email_Perusahaan ||
        selected.npwpCompany !== profile.NPWP_Perusahaan ||
        selected.companyAddress !== profile.Alamat_Perusahaan ||
        selected.districtCityCompany !== profile.Kabupaten_Kota_Perusahaan ||
        selected.provinceCompany !== profile.Provinsi_Perusahaan
      );
    }

    return false;
  }, [profile, selected, isIndividual, isCompany]);

  const isAllFieldsFilled = useMemo(() => {
    if (!selected) return false;

    if (isIndividual) {
      return (
        selected.fullName?.trim() &&
        selected.selectGender?.trim() &&
        selected.job?.trim() &&
        selected.lastEducation?.trim()
      );
    }

    if (selected.type === 'perusahaan') {
      return (
        selected.fullName?.trim() &&
        selected.selectGender?.trim() &&
        selected.job?.trim() &&
        selected.lastEducation?.trim() &&
        selected.companyName?.trim() &&
        selected.companyPhone?.trim() &&
        selected.companyEmail?.trim() &&
        selected.npwpCompany?.trim() &&
        selected.companyAddress?.trim() &&
        selected.districtCityCompany?.trim() &&
        selected.provinceCompany?.trim()
      );
    }

    return false;
  }, [selected, isIndividual]);

  const canSave = isDataChanged && isAllFieldsFilled;

  if (showSkeleton || loading || !profile || !selected) {
    return <WrapperSkeletonEditProfile />;
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
            Sunting Profil
          </Text>
          <Text className="font-lexend mt-1 text-sm text-gray-500">
            {isIndividual ? 'Akun Perorangan' : 'Akun Perusahaan'}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-6 mt-6">
            {/* === PERSONAL INFO CARD === */}
            <View className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
              <View className="mb-6 flex-row items-center">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Ionicons name="person" size={28} color="#6BBC3F" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="font-lexend-bold text-lg text-gray-900">
                    Informasi Pribadi
                  </Text>
                  <Text className="font-lexend mt-1 text-sm text-gray-500">
                    Data diri dan informasi kontak
                  </Text>
                </View>
                <View
                  className={`h-3 w-3 rounded-full ${
                    canSave ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              </View>

              <View className="space-y-5">
                {/* NAMA LENGKAP */}
                <FormInput
                  label="Nama Lengkap"
                  textClassName=" rounded-xl bg-gray-50 py-4"
                  value={selected.fullName}
                  onChangeText={(input) =>
                    selected.setFullName(validationFullString(input, 50))
                  }
                  placeholder="Masukkan nama lengkap"
                  customFontLabel={{ fontFamily: 'LexLight' }}
                />

                {/* JENIS KELAMIN */}
                <FormDropdownSelect
                  label="Jenis Kelamin"
                  customFontLabel={{ fontFamily: 'LexLight' }}
                  toggleDropdownClassName="rounded-xl bg-gray-50"
                  DropdownSelectClassName="rounded-xl"
                  options={['Laki - Laki', 'Perempuan']}
                  selected={selected.selectGender}
                  onSelect={selected.setSelectGender}
                  open={isGenderDropdownOpen}
                  setOpen={setIsGenderDropdownOpen}
                  iconColor="#6BBC3F"
                  customFontSelected={{
                    fontFamily: 'LexRegular',
                    color: '#374151',
                  }}
                  customFontOption={{
                    fontFamily: 'LexRegular',
                    color: '#374151',
                  }}
                />

                {/* PEKERJAAN */}
                <FormInput
                  label="Pekerjaan"
                  textClassName=" rounded-xl bg-gray-50 "
                  value={selected.job}
                  onChangeText={(input) =>
                    selected.setJob(validationFullString(input, 30))
                  }
                  placeholder="Pekerjaan"
                  customFontLabel={{ fontFamily: 'LexLight' }}
                />

                {/* PENDIDIKAN TERAKHIR */}
                <FormDropdownSelect
                  label="Pendidikan Terakhir"
                  customFontLabel={{ fontFamily: 'LexLight' }}
                  options={educationOptions}
                  selected={selected.lastEducation}
                  onSelect={selected.setLastEducation}
                  open={isLastEducationDropdownOpen}
                  setOpen={setIsLastEducationDropdownOpen}
                  maxVisibleOptions={5}
                  toggleDropdownClassName=" rounded-xl bg-gray-50"
                  DropdownSelectClassName=" rounded-xl"
                  customFontSelected={{
                    fontFamily: 'LexRegular',
                    color: '#374151',
                  }}
                  customFontOption={{
                    fontFamily: 'LexRegular',
                    color: '#374151',
                  }}
                  iconColor="#6BBC3F"
                />
              </View>
            </View>

            {/* === COMPANY SECTION === */}
            {selected.type === 'perusahaan' && (
              <View className="rounded-2xl bg-white p-6 shadow-sm">
                <View className="mb-6 flex-row items-center">
                  <View className="h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Ionicons name="business" size={28} color="#3B82F6" />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="font-lexend-bold text-lg text-gray-900">
                      Informasi Perusahaan
                    </Text>
                    <Text className="font-lexend mt-1 text-sm text-gray-500">
                      Data legal dan kontak perusahaan
                    </Text>
                  </View>
                  <View
                    className={`h-3 w-3 rounded-full ${
                      canSave ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                </View>

                <View className="space-y-5">
                  <FormInput
                    label="Nama Perusahaan"
                    textClassName=" rounded-xl bg-gray-50 py-4"
                    value={selected.companyName}
                    onChangeText={(text) =>
                      selected.setCompanyName(validationFullString(text))
                    }
                    placeholder="Masukkan nama perusahaan"
                    customFontLabel={{ fontFamily: 'LexLight' }}
                  />

                  <FormInput
                    label="Telepon Perusahaan"
                    textClassName=" rounded-xl bg-gray-50 py-4 flex-1"
                    value={selected.companyPhone}
                    onChangeText={(text) =>
                      selected.setCompanyPhone(validationNumber(text, 15))
                    }
                    placeholder="Nomor telepon"
                    keyboardType="phone-pad"
                    customFontLabel={{ fontFamily: 'LexLight' }}
                  />

                  <FormInput
                    label="Email Perusahaan"
                    textClassName=" rounded-xl bg-gray-50 py-4 flex-1"
                    value={selected.companyEmail}
                    onChangeText={(text) =>
                      selected.setCompanyEmail(validationEmail(text))
                    }
                    placeholder="Email perusahaan"
                    keyboardType="email-address"
                    customFontLabel={{ fontFamily: 'LexLight' }}
                  />

                  <FormInput
                    label="NPWP Perusahaan"
                    textClassName=" rounded-xl bg-gray-50 py-4"
                    value={selected.npwpCompany}
                    onChangeText={(text) =>
                      selected.setNpwpCompany(validationNPWP(text))
                    }
                    placeholder="NPWP perusahaan"
                    keyboardType="number-pad"
                    customFontLabel={{ fontFamily: 'LexLight' }}
                  />

                  <FormInput
                    label="Alamat Perusahaan"
                    textClassName=" rounded-xl bg-gray-50 py-4"
                    value={selected.companyAddress}
                    onChangeText={selected.setCompanyAddress}
                    placeholder="Alamat lengkap perusahaan"
                    multiline
                    numberOfLines={3}
                    customFontLabel={{ fontFamily: 'LexLight' }}
                  />

                  <View className="flex-row gap-4">
                    <FormInput
                      label="Kabupaten/Kota"
                      textClassName=" rounded-xl bg-gray-50 py-4 flex-1"
                      value={selected.districtCityCompany}
                      onChangeText={(text) =>
                        selected.setDistrictCityCompany(
                          validationFullString(text, 50)
                        )
                      }
                      placeholder="Kabupaten/Kota"
                      customFontLabel={{ fontFamily: 'LexLight' }}
                    />

                    <FormInput
                      label="Provinsi"
                      textClassName=" rounded-xl bg-gray-50 py-4 flex-1"
                      value={selected.provinceCompany}
                      onChangeText={(text) =>
                        selected.setProvinceCompany(
                          validationFullString(text, 50)
                        )
                      }
                      placeholder="Provinsi"
                      customFontLabel={{ fontFamily: 'LexLight' }}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FOOTER SAVE BUTTON */}
      {selected && (
        <View className="border-t border-gray-200 bg-white px-6 py-4">
          <TouchableOpacity
            onPress={selected.handleSave}
            activeOpacity={0.8}
            disabled={!canSave}
            className={`rounded-xl py-4 ${
              canSave ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={canSave ? 'white' : '#9CA3AF'}
              />
              <Text
                style={{ fontFamily: 'LexBold' }}
                className={`ml-2 text-lg ${
                  canSave ? 'text-white' : 'text-gray-500'
                }`}
              >
                Simpan Perubahan
              </Text>
            </View>
          </TouchableOpacity>

          {!canSave && (
            <Text className="font-lexend mt-2 text-center text-sm text-gray-500">
              {!isDataChanged
                ? 'Belum ada perubahan data'
                : 'Harap lengkapi semua field'}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
