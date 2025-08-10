import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { showMessage } from 'react-native-flash-message';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

// OUR COMPONENTS
import Button from '@/components/button';

// OUR HOOKS
import { useCompanyRegister } from '@/hooks/Backend/useCompanyRegister';

export default function CompanyRegisterScreen() {
  const router = useRouter();
  const { register } = useCompanyRegister();
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const [fullName, setFullName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [job, setJob] = useState('');
  const [lastEducation, setLastEducation] = useState('');
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
      showMessage({
        message: 'Mohon lengkapi semua data terlebih dahulu.',
        type: 'danger',
        backgroundColor: '#FF3B30', // merah terang
        color: '#fff',
      });
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

      showMessage({
        message: 'Registrasi berhasil disimpan!',
        type: 'success',
        backgroundColor: '#72C02C', // hijau
        color: '#fff',
      });

      setTimeout(() => {
        router.push('/(tabs)/home');
      }, 1200);
    } catch {
      showMessage({
        message: 'Terjadi kesalahan saat menyimpan data.',
        type: 'danger',
        backgroundColor: '#FF3B30',
        color: '#fff',
      });
    }
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!fullName || !selectedGender || !job) {
        showMessage({
          message: 'Mohon lengkapi semua data diri terlebih dahulu.',
          type: 'danger',
          backgroundColor: '#FF3B30',
          color: '#fff',
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (!lastEducation || !numberPhone) {
        showMessage({
          message: 'Mohon lengkapi pendidikan terakhir dan nomor telepon.',
          type: 'danger',
          backgroundColor: '#FF3B30',
          color: '#fff',
        });
        return false;
      }
    } else if (currentStep === 3) {
      if (!npwpCompany || !companyName || !companyAddress || !provinceCompany) {
        showMessage({
          message:
            'Mohon lengkapi data badan usaha (NPWP, nama, alamat, provinsi).',
          type: 'danger',
          backgroundColor: '#FF3B30',
          color: '#fff',
        });
        return false;
      }
    } else if (currentStep === 4) {
      if (
        !districtCityCompany ||
        !emailCompany ||
        !companyNumberPhone ||
        !isChecked
      ) {
        showMessage({
          message:
            'Mohon lengkapi data perusahaan dan setujui syarat & ketentuan.',
          type: 'danger',
          backgroundColor: '#FF3B30',
          color: '#fff',
        });
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
          onPress={() => {
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
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Nama Lengkap
              </Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>

            {/* JENIS KELAMIN */}
            <View className="relative w-80 gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Jenis Kelamin
              </Text>
              <TouchableOpacity
                onPress={() => setIsDropdownOpen((prev) => !prev)}
                className="flex-row items-center justify-between rounded-xl border border-[#6BBC3F] bg-white px-4 py-3"
              >
                <Text
                  className="text-[#6BBC3F]"
                  style={{ fontFamily: 'LexRegular' }}
                >
                  {selectedGender || 'Pilih jenis kelamin'}
                </Text>
                {isDropdownOpen ? (
                  <Entypo name="chevron-small-up" size={24} color="#6BBC3F" />
                ) : (
                  <Entypo name="chevron-small-down" size={24} color="#6BBC3F" />
                )}
              </TouchableOpacity>

              {isDropdownOpen && (
                <View className="absolute top-[75px] z-10 w-full rounded-xl border border-[#6BBC3F] bg-white shadow-md">
                  {['Laki-laki', 'Perempuan'].map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => {
                        setSelectedGender(item);
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-3"
                    >
                      <Text
                        style={{ fontFamily: 'LexRegular' }}
                        className="text-[#6BBC3F]"
                      >
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* PEKERJAAN */}
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Pekerjaan
              </Text>
              <TextInput
                value={job}
                onChangeText={setJob}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
          </View>
        )}

        {step === 2 && (
          <View className="mt-2 gap-6 pb-5">
            {/* PENDIDIKAN TERAKHIR */}
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Pendidikan Terakhir
              </Text>
              <TextInput
                value={lastEducation}
                onChangeText={setLastEducation}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>

            {/* NO HP / NO TELP */}
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                No HP / No Telp
              </Text>
              <TextInput
                value={numberPhone}
                onChangeText={setNumberPhone}
                keyboardType="phone-pad"
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>

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
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                NPWP Perusahaan
              </Text>
              <TextInput
                value={npwpCompany}
                onChangeText={setNpwpCompany}
                keyboardType="phone-pad"
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Nama Perusahaan
              </Text>
              <TextInput
                value={companyName}
                onChangeText={setCompanyName}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Alamat Perusahaan
              </Text>
              <TextInput
                value={companyAddress}
                onChangeText={setCompanyAddress}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Provinsi
              </Text>
              <TextInput
                value={provinceCompany}
                onChangeText={setProvinceCompany}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
          </View>
        )}
        {step === 4 && (
          <View className="gap-6 pb-4">
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Kabupaten / Kota
              </Text>
              <TextInput
                value={districtCityCompany}
                onChangeText={setDistrictCityCompany}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Email Perusahaan
              </Text>
              <TextInput
                value={emailCompany}
                onChangeText={setEmailCompany}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                No HP / No Telp Perusahaan
              </Text>
              <TextInput
                value={companyNumberPhone}
                onChangeText={setCompanyNumberPhone}
                keyboardType="phone-pad"
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>

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
            onPress={() => {
              if (validateStep(1)) setStep(2);
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
          onPress={() => {
            if (validateStep(step)) setStep(step + 1);
          }}
          activeOpacity={0.8}
        >
          Selanjutnya
        </Button>
      )}

      {step === 4 && (
        <Button
          onPress={async () => {
            if (validateStep(4)) {
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
