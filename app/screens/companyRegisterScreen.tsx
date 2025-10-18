import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

// OUR COMPONENTS
import Button from '@/components/button';
import FormInput from '@/components/formInput';
import FormDropdownSelect from '@/components/formDropdownSelect';

// OUR CONSTANT
import { educationOptions } from '@/constants/educationOptions';

// OUR HOOKS
import { useCompanyRegister } from '@/hooks/Backend/useCompanyRegister';

// OUR UTILS
import { showAlertMessage } from '@/utils/showAlertMessage';
import { validationFullString } from '@/utils/validationFullString';
import { validationNumberOnly } from '@/utils/validationNumberOnly';
import { validationNPWP } from '@/utils/validationNPWP';
import { validationEmail } from '@/utils/validationEmail';

export default function CompanyRegisterScreen() {
  const router = useRouter();
  const { register } = useCompanyRegister();
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const [fullName, setFullName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isDropdowGendernOpen, setIsDropdownGenderOpen] = useState(false);
  const [job, setJob] = useState('');
  const [lastEducation, setLastEducation] = useState('');
  const [isLastEducationDropdownOpen, setIsLastEducationDropdownOpen] =
    useState(false);

  const [numberPhone, setNumberPhone] = useState('');
  const [npwpCompany, setNpwpCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [provinceCompany, setProvinceCompany] = useState('');
  const [districtCityCompany, setDistrictCityCompany] = useState('');
  const [emailCompany, setEmailCompany] = useState('');
  const [companyNumberPhone, setCompanyNumberPhone] = useState('');

  const handleRegister = async () => {
    if (
      !fullName ||
      !selectedGender ||
      !job ||
      !lastEducation ||
      !numberPhone ||
      !npwpCompany ||
      !companyName ||
      !companyAddress ||
      !provinceCompany ||
      !districtCityCompany ||
      !emailCompany ||
      !companyNumberPhone
    ) {
      await showAlertMessage(
        'Mohon lengkapi semua data terlebih dahulu.',
        undefined,
        'error'
      );
      return;
    }

    try {
      await register({
        Nama_Lengkap: fullName,
        Jenis_Kelamin: selectedGender,
        Pekerjaan: job,
        Pendidikan_Terakhir: lastEducation,
        No_Hp: numberPhone,
        NPWP_Perusahaan: npwpCompany,
        Nama_Perusahaan: companyName,
        Alamat_Perusahaan: companyAddress,
        Provinsi_Perusahaan: provinceCompany,
        Kabupaten_Kota_Perusahaan: districtCityCompany,
        Email_Perusahaan: emailCompany,
        No_Hp_Perusahaan: companyNumberPhone,
      });

      await showAlertMessage(
        'Registrasi berhasil disimpan!',
        undefined,
        'success'
      );

      setTimeout(() => {
        router.push('/(tabs)/home');
      }, 1200);
    } catch {
      await showAlertMessage(
        'Terjadi kesalahan saat menyimpan data.',
        undefined,
        'error'
      );
    }
  };

  const validateStep = async (currentStep: number) => {
    if (currentStep === 1) {
      if (!fullName || !selectedGender || !job) {
        await showAlertMessage(
          'Mohon lengkapi semua data diri terlebih dahulu.',
          undefined,
          'error'
        );
        return false;
      }
    } else if (currentStep === 2) {
      if (!lastEducation || !numberPhone) {
        await showAlertMessage(
          'Mohon lengkapi pendidikan terakhir dan nomor telepon.',
          undefined,
          'error'
        );
        return false;
      }
    } else if (currentStep === 3) {
      if (!npwpCompany || !companyName || !companyAddress || !provinceCompany) {
        await showAlertMessage(
          'Mohon lengkapi data badan usaha (NPWP, nama, alamat, provinsi).',
          undefined,
          'error'
        );
        return false;
      }
    } else if (currentStep === 4) {
      if (
        !districtCityCompany ||
        !emailCompany ||
        !companyNumberPhone ||
        !isChecked
      ) {
        await showAlertMessage(
          'Mohon lengkapi data perusahaan dan setujui syarat & ketentuan.',
          undefined,
          'error'
        );
        return false;
      }
    }
    return true;
  };

  return (
    <View className="flex-1 items-center justify-center overflow-hidden">
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#1475BA', '#36918A', '#6BBC3F']}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      <View className="mb-12 items-center justify-center">
        <Text
          className="text-center text-3xl text-white"
          style={{ fontFamily: 'LexBold' }}
        >
          Daftar Perusahaan
        </Text>
      </View>

      <View className="relative items-center rounded-lg bg-white px-6 py-8">
        <TouchableOpacity
          onPress={async () => {
            if (step === 1) {
              router.back();
            } else {
              setStep(step - 1);
            }
          }}
          className="absolute left-6 top-8"
        >
          <Ionicons name="arrow-back-circle" size={32} color="black" />
        </TouchableOpacity>
        <Text
          className="mb-4 text-center text-2xl"
          style={{ fontFamily: 'LexBold' }}
        >
          {step === 1 || step === 2 ? 'Data Diri' : 'Data Badan Usaha'}
        </Text>

        {step === 1 && (
          <View className="mt-3 gap-6">
            {/* NAMA LENGKAP */}
            <FormInput
              label="Nama Lengkap"
              value={fullName}
              onChangeText={(text) =>
                setFullName(validationFullString(text, 50))
              }
              placeholder="Masukkan nama lengkap"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

            {/* JENIS KELAMIN */}
            <FormDropdownSelect
              label="Jenis Kelamin"
              options={['Laki-laki', 'Perempuan']}
              selected={selectedGender}
              onSelect={setSelectedGender}
              open={isDropdowGendernOpen} // kontrol open/close
              setOpen={setIsDropdownGenderOpen}
              toggleDropdownClassName="w-80 border-[#6BBC3F] rounded-xl"
              DropdownSelectClassName="w-80 border-[#6BBC3F] rounded-xl"
              selectedTextStyle={{ fontFamily: 'LexRegular', color: '#6BBC3F' }}
              iconColor="#6BBC3F"
            />

            {/* PEKERJAAN */}
            <FormInput
              label="Pekerjaan"
              value={job}
              onChangeText={(text) => setJob(validationFullString(text, 50))}
              placeholder="Masukkan pekerjaan"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />
          </View>
        )}

        {step === 2 && (
          <View className="mt-2 gap-6 pb-5">
            {/* PENDIDIKAN TERAKHIR */}
            <FormDropdownSelect
              label="Pendidikan Terakhir"
              options={educationOptions}
              selected={lastEducation}
              onSelect={setLastEducation}
              open={isLastEducationDropdownOpen}
              setOpen={setIsLastEducationDropdownOpen}
              maxVisibleOptions={5}
              toggleDropdownClassName="w-80 border-[#6BBC3F] rounded-xl"
              DropdownSelectClassName="w-80 border-[#6BBC3F] rounded-xl"
              selectedTextStyle={{ fontFamily: 'LexRegular', color: '#6BBC3F' }}
              iconColor="#6BBC3F"
            />

            {/* NO HP / NO TELP */}
            <FormInput
              label="No HP / No Telp (Pribadi)"
              value={numberPhone}
              onChangeText={(text) =>
                setNumberPhone(validationNumberOnly(text, 15))
              }
              placeholder="Masukkan nomor HP / Telp"
              keyboardType="phone-pad"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

            <View>
              <Text className="text-sm" style={{ fontFamily: 'LexBold' }}>
                Ketentuan Pengguna Perusahaan:
              </Text>
              <View className="mt-2 flex-row items-start gap-2">
                <Text className="text-lg">•</Text>
                <Text
                  className="flex-1 text-xs"
                  style={{
                    fontFamily: 'LexRegular',
                  }}
                >
                  Pengguna yang terdaftar pada Web PTSP BMKG tunduk pada aturan
                  yang berlaku.
                </Text>
              </View>
              <View className="mt-1 flex-row items-start gap-2">
                <Text className="text-lg">•</Text>
                <Text
                  className="flex-1 text-xs"
                  style={{
                    fontFamily: 'LexRegular',
                  }}
                >
                  Tidak menyalahgunakan akun terdaftar kepada pihak yang tidak
                  berkepentingan dan memanfaatkannya untuk melakukan tindakan
                  kriminal.
                </Text>
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View className="mt-2 gap-6 pb-2">
            {/* NPWP */}
            <FormInput
              label="NPWP Perusahaan"
              value={npwpCompany}
              onChangeText={(text) => setNpwpCompany(validationNPWP(text))}
              placeholder="Masukkan NPWP Perusahaan"
              keyboardType="phone-pad"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

            {/* NAMA PERUSAHAAN */}
            <FormInput
              label="Nama Perusahaan"
              value={companyName}
              onChangeText={(text) =>
                setCompanyName(validationFullString(text, 50))
              }
              placeholder="Masukkan Nama Perusahaan"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

            {/* ALAMAT PERUSAHAAN */}
            <FormInput
              label="Alamat Perusahaan"
              value={companyAddress}
              onChangeText={setCompanyAddress}
              placeholder="Masukkan Alamat Perusahaan"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
              multiline
              textAlignVertical="top"
            />

            {/* PROVINSI */}
            <FormInput
              label="Provinsi"
              value={provinceCompany}
              onChangeText={(text) =>
                setProvinceCompany(validationFullString(text, 30))
              }
              placeholder="Masukkan Provinsi"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />
          </View>
        )}
        {step === 4 && (
          <View className="gap-6 pb-4">
            {/* KABUPATEN / KOTA */}
            <FormInput
              label="Kabupaten / Kota"
              value={districtCityCompany}
              onChangeText={(text) =>
                setDistrictCityCompany(validationFullString(text, 30))
              }
              placeholder="Masukkan Kabupaten / Kota"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

            {/* EMAIL PERUSAHAAN */}
            <FormInput
              label="Email Perusahaan"
              value={emailCompany}
              onChangeText={(text) => setEmailCompany(validationEmail(text))}
              placeholder="Masukkan email perusahaan"
              keyboardType="email-address"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

            {/* NO HP / NO TELP */}
            <FormInput
              label="No HP / No Telp Perusahaan"
              value={companyNumberPhone}
              onChangeText={(text) =>
                setCompanyNumberPhone(validationNumberOnly(text, 15))
              }
              placeholder="Masukkan nomor HP / Telp perusahaan"
              keyboardType="phone-pad"
              textClassName="w-80"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              className="flex-row items-start"
              activeOpacity={0.8}
            >
              <View className="mr-2 mt-1 h-5 w-5 items-center justify-center rounded border border-gray-400">
                {isChecked && <Entypo name="check" size={14} color="black" />}
              </View>
              <Text
                className="flex-1 text-sm"
                style={{ fontFamily: 'LexRegular' }}
              >
                Dengan ini saya menyetujui semua syarat dan ketentuan sebagai
                pengguna Aplikasi PTSP BMKG.
              </Text>
            </TouchableOpacity>

            <View>
              <Text className="text-sm" style={{ fontFamily: 'LexBold' }}>
                Ketentuan Pengguna Perorangan:
              </Text>
              <View className="mt-2 flex-row items-start gap-2">
                <Text className="text-lg">•</Text>
                <Text
                  className="flex-1 text-xs"
                  style={{
                    fontFamily: 'LexRegular',
                  }}
                >
                  Pengguna yang terdaftar pada Web PTSP BMKG tunduk pada aturan
                  yang berlaku.
                </Text>
              </View>
              <View className="mt-1 flex-row items-start gap-2">
                <Text className="text-lg">•</Text>
                <Text
                  className="flex-1 text-xs"
                  style={{
                    fontFamily: 'LexRegular',
                  }}
                >
                  Tidak menyalahgunakan akun terdaftar kepada pihak yang tidak
                  berkepentingan dan memanfaatkannya untuk melakukan tindakan
                  kriminal.
                </Text>
              </View>
            </View>
          </View>
        )}

        {step === 1 && (
          <Button
            style="bg-[#73BF40] mt-12 py-3 px-28 rounded-xl"
            onPress={async () => {
              if (await validateStep(1)) setStep(2);
            }}
            activeOpacity={0.8}
          >
            Selanjutnya
          </Button>
        )}
      </View>
      {(step === 2 || step === 3) && (
        <Button
          style="bg-[#73BF40] mt-6 py-3 px-28 rounded-xl"
          onPress={async () => {
            if (await validateStep(step)) setStep(step + 1);
          }}
          activeOpacity={0.8}
        >
          Selanjutnya
        </Button>
      )}

      {step === 4 && (
        <Button
          onPress={async () => {
            if (await validateStep(4)) {
              await handleRegister();
            }
          }}
          style={`mt-6 py-3 rounded-xl ${isChecked ? 'bg-[#1475BA] px-20' : 'bg-gray-400 px-8'}`}
          disabled={!isChecked}
        >
          {isChecked ? 'Simpan Data' : 'Setujui Syarat untuk Lanjut'}
        </Button>
      )}
    </View>
  );
}
