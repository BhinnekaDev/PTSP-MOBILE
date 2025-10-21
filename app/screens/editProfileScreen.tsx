import React, { useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';

// COMPONENTS
import BackButton from '@/components/headerBackButton';
import FormDropdownSelect from '@/components/formDropdownSelect';
import FormInput from '@/components/formInput';

//  OUR CONSTANTS
import { educationOptions } from '@/constants/educationOptions';

// HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import { useEditIndividualProfile } from '@/hooks/Backend/useEditIndividualProfile';
import { useEditCompanyProfile } from '@/hooks/Backend/useEditCompanyProfile';
import { validationEmail } from '@/utils/validationEmail';

// UTILS
import { validationFullString } from '@/utils/validationFullString';
import { validationNumber } from '@/utils/validationNumber';
import { validationNPWP } from '@/utils/validationNPWP';

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

  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isLastEducationDropdownOpen, setIsLastEducationDropdownOpen] =
    useState(false);

  // Fungsi untuk cek perubahan data
  const isDataChanged = useMemo(() => {
    if (!profile || !selected) return false;

    // Untuk tipe perorangan
    if (isIndividual) {
      return (
        selected.fullName !== profile.Nama_Lengkap ||
        selected.selectGender !== profile.Jenis_Kelamin ||
        selected.job !== profile.Pekerjaan ||
        selected.lastEducation !== profile.Pendidikan_Terakhir
      );
    }

    if (isCompany && selected.type === 'perusahaan' && profile) {
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
        selected.fullName?.trim() !== '' &&
        selected.selectGender?.trim() !== '' &&
        selected.job?.trim() !== '' &&
        selected.lastEducation?.trim() !== ''
      );
    }

    if (selected && selected.type === 'perusahaan') {
      return (
        selected.fullName?.trim() !== '' &&
        selected.selectGender?.trim() !== '' &&
        selected.job?.trim() !== '' &&
        selected.lastEducation?.trim() !== '' &&
        selected.companyName?.trim() !== '' &&
        selected.companyPhone?.trim() !== '' &&
        selected.companyEmail?.trim() !== '' &&
        selected.npwpCompany?.trim() !== '' &&
        selected.companyAddress?.trim() !== '' &&
        selected.districtCityCompany?.trim() !== '' &&
        selected.provinceCompany?.trim() !== ''
      );
    }

    return false;
  }, [selected, isIndividual]);

  const canSave = isDataChanged && isAllFieldsFilled;

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
              <FormInput
                label="Nama Lengkap"
                textClassName="border-[#6BBC3F]"
                value={selected.fullName}
                onChangeText={(input) =>
                  selected.setFullName(validationFullString(input, 50))
                }
                placeholder="Nama lengkap"
              />

              <FormDropdownSelect
                toggleDropdownClassName=" border-[#6BBC3F] rounded-[10px]"
                label="Jenis Kelamin"
                labelStyle={{ fontFamily: 'LexBold' }}
                DropdownSelectClassName="border-[#6BBC3F] rounded-[10px]"
                options={['Laki - Laki', 'Perempuan']}
                selectedTextStyle={{ fontFamily: 'LexRegular' }}
                iconColor="#6BBC3F"
                selected={selected.selectGender}
                onSelect={selected.setSelectGender}
                open={isGenderDropdownOpen} // <- kontrol open
                setOpen={setIsGenderDropdownOpen} // <- setter open
              />

              <FormInput
                label="Pekerjaan"
                textClassName="border-[#6BBC3F]"
                value={selected.job}
                onChangeText={(input) =>
                  selected.setJob(validationFullString(input, 30))
                }
                placeholder="Pekerjaan"
              />

              <FormDropdownSelect
                label="Pendidikan Terakhir"
                options={educationOptions}
                selected={selected.lastEducation}
                onSelect={selected.setLastEducation}
                open={isLastEducationDropdownOpen}
                setOpen={setIsLastEducationDropdownOpen}
                maxVisibleOptions={5}
                toggleDropdownClassName="border-[#6BBC3F] rounded-xl"
                DropdownSelectClassName="border-[#6BBC3F] rounded-xl"
                selectedTextStyle={{
                  fontFamily: 'LexRegular',
                  color: '#6BBC3F',
                }}
                iconColor="#6BBC3F"
              />

              {/* TAMBAHAN FORM PERUSAHAAN */}
              {selected.type === 'perusahaan' && (
                <>
                  <FormInput
                    label="Nama Perusahaan"
                    value={selected.companyName}
                    onChangeText={(text) =>
                      selected.setCompanyName(validationFullString(text))
                    }
                    placeholder="Masukkan Nama perusahaan"
                    fontLexBold={{ fontFamily: 'LexBold' }}
                  />

                  {/* NO HP / NO TELP PERUSAHAAN */}
                  <FormInput
                    label="No HP / No Telp Perusahaan"
                    value={selected.companyPhone}
                    onChangeText={(text) =>
                      selected.setCompanyPhone(validationNumber(text, 15))
                    }
                    placeholder="Masukkan nomor HP / Telp perusahaan"
                    keyboardType="phone-pad"
                    fontLexBold={{ fontFamily: 'LexBold' }}
                  />

                  {/* EMAIL PERUSAHAAN */}
                  <FormInput
                    label="Email Perusahaan"
                    value={selected.companyEmail}
                    onChangeText={(text) =>
                      selected.setCompanyEmail(validationEmail(text))
                    }
                    placeholder="Masukkan email perusahaan"
                    keyboardType="email-address"
                    fontLexBold={{ fontFamily: 'LexBold' }}
                  />

                  {/* NPWP PERUSAHAAN */}
                  <FormInput
                    label="NPWP Perusahaan"
                    value={selected.npwpCompany}
                    onChangeText={(text) =>
                      selected.setNpwpCompany(validationNPWP(text))
                    }
                    placeholder="NPWP Perusahaan"
                    textClassName="border-[#6BBC3F]"
                    keyboardType="number-pad"
                  />

                  {/* ALAMAT PERUSAHAAN */}
                  <FormInput
                    label="Alamat Perusahaan"
                    value={selected.companyAddress}
                    onChangeText={selected.setCompanyAddress}
                    placeholder="Alamat Perusahaan"
                    textClassName="border-[#6BBC3F]"
                    maxLength={70}
                  />

                  {/* KABUPATEN / KOTA PERUSAHAAN */}
                  <FormInput
                    label="Kabupaten / Kota Perusahaan"
                    value={selected.districtCityCompany}
                    onChangeText={(text) =>
                      selected.setDistrictCityCompany(
                        validationFullString(text, 50)
                      )
                    }
                    placeholder="Kabupaten / Kota Perusahaan"
                    textClassName="border-[#6BBC3F]"
                  />

                  {/* PROVINSI PERUSAHAAN */}
                  <FormInput
                    label="Provinsi Perusahaan"
                    value={selected.provinceCompany}
                    onChangeText={(text) =>
                      selected.setProvinceCompany(
                        validationFullString(text, 50)
                      )
                    }
                    placeholder="Provinsi Perusahaan"
                    textClassName="border-[#6BBC3F]"
                  />
                </>
              )}
            </View>
          </ScrollView>

          {/* Tombol simpan */}
          <View className="mt-4 w-[80%] self-center">
            <TouchableOpacity
              onPress={selected.handleSave}
              activeOpacity={0.7}
              disabled={!isDataChanged}
              className={`rounded-lg px-10 py-[6px] ${
                canSave ? 'bg-[#73BF40]' : 'bg-gray-400'
              }`}
            >
              <Text
                style={{ fontFamily: 'LexBold' }}
                className="text-center text-[20px] text-white"
              >
                Simpan Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
