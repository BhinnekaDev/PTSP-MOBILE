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
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Button from '@/components/button';

import { showMessage } from 'react-native-flash-message';

import { useIndividualRegister } from '@/hooks/Backend/useIndividualRegister';

export default function IndividualRegisterScreen() {
  const router = useRouter();
  const { register } = useIndividualRegister();
  const [step, setStep] = useState(1);

  // State input
  const [fullName, setFullName] = useState('');
  const [job, setJob] = useState('');
  const [lastEducation, setLastEducation] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [numberPhone, setNumberPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = async () => {
    if (!lastEducation || !numberPhone) {
      showMessage({
        message: 'Harap isi seluruh form yang ada!',
        type: 'danger',
        backgroundColor: '#FF3B30',
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
      });

      showMessage({
        message: 'Registrasi berhasil disimpan!',
        type: 'success',
        backgroundColor: '#72C02C',
        color: '#fff',
        icon: 'success',
      });

      setTimeout(() => {
        router.push('/(tabs)/home');
      }, 1200);
    } catch (error) {
      showMessage({
        message: 'Gagal menyimpan data.',
        type: 'danger',
        backgroundColor: '#FF3B30',
        color: '#fff',
        icon: 'danger',
      });
    }
  };

  const validateStep1 = () => {
    if (!fullName || !selectedGender || !job) {
      showMessage({
        message: 'Harap isi seluruh form yang ada!',
        type: 'danger',
        backgroundColor: '#FF0000',
        color: '#fff',
      });
      return false;
    }
    return true;
  };

  return (
    <View className="flex-1 items-center justify-center overflow-hidden">
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#1475BA', '#36918A', '#6BBC3F']} //
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      <View className="mb-10 items-center justify-center">
        <Text
          className="text-center text-3xl text-white"
          style={{ fontFamily: 'LexBold' }}
        >
          Daftar Perorangan
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
          className="mb-4 text-center text-3xl"
          style={{ fontFamily: 'LexBold' }}
        >
          Data Diri
        </Text>
        {step === 1 && (
          <View className="mt-3 gap-6">
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Nama Lengkap
              </Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                maxLength={50}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            {/* Dropdown Gender */}
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

            {/* Input Pekerjaan */}
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Pekerjaan
              </Text>
              <TextInput
                value={job}
                onChangeText={setJob}
                maxLength={50}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
          </View>
        )}

        {step === 2 && (
          <View className="mt-2 gap-6 pb-2">
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
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                No HP / No Telp
              </Text>
              <TextInput
                value={numberPhone}
                onChangeText={setNumberPhone}
                maxLength={13}
                keyboardType="phone-pad"
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>

            {/* Checkbox */}
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

            {/* Ketentuan */}
            <View>
              <Text className="text-sm" style={{ fontFamily: 'LexBold' }}>
                Ketentuan Pengguna Perorangan:
              </Text>
              <View className="mt-2 flex-row items-start gap-2">
                <Text className="text-lg">•</Text>
                <Text
                  className="flex-1 text-xs"
                  style={{ fontFamily: 'LexRegular' }}
                >
                  Pengguna yang terdaftar pada Web PTSP BMKG tunduk pada aturan
                  yang berlaku.
                </Text>
              </View>
              <View className="mt-1 flex-row items-start gap-2">
                <Text className="text-lg">•</Text>
                <Text
                  className="flex-1 text-xs"
                  style={{ fontFamily: 'LexRegular' }}
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
            style="bg-[#1475BA] mt-12 py-3 px-28 rounded-xl"
            textStyle="text-white"
            onPress={() => {
              if (validateStep1()) {
                setStep(2);
              }
            }}
            activeOpacity={0.8}
          >
            Selanjutnya
          </Button>
        )}
      </View>
      {step === 2 && (
        <Button
          onPress={handleRegister}
          style={`mt-4 py-3 rounded-xl ${
            isChecked ? 'bg-[#1475BA] px-20' : 'bg-gray-400 px-8' //
          }`}
          textStyle={`${isChecked ? 'text-white' : 'text-black'}`}
          disabled={!isChecked}
        >
          {isChecked ? 'Simpan Data' : 'Setujui Syarat untuk Lanjut'}
        </Button>
      )}
    </View>
  );
}
