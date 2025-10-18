import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

// OUR COMPONENTS
import Button from '@/components/button';
import FormInput from '@/components/formInput';
import FormDropdownSelect from '@/components/formDropdownSelect';

// OUR CONSTANT
import { educationOptions } from '@/constants/educationOptions';

// OUR HOOKS
import { useIndividualRegister } from '@/hooks/Backend/useIndividualRegister';

// OUR UTILS
import { showAlertMessage } from '@/utils/showAlertMessage';
import { validationFullString } from '@/utils/validationFullString';
import { validationNumberOnly } from '@/utils/validationNumberOnly';

export default function IndividualRegisterScreen() {
  const router = useRouter();
  const { register } = useIndividualRegister();
  const [step, setStep] = useState(1);

  // State input
  const [fullName, setFullName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isDropdownGenderOpen, setIsDropdownGenderOpen] = useState(false);
  const [job, setJob] = useState('');
  const [lastEducation, setLastEducation] = useState('');
  const [isLastEducationDropdownOpen, setLastIsEducationDropdownOpen] =
    useState(false);
  const [numberPhone, setNumberPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = async () => {
    if (!lastEducation || !numberPhone) {
      await showAlertMessage(
        'Harap isi seluruh form yang ada!',
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
      await showAlertMessage('Gagal menyimpan data.', undefined, 'error');
    }
  };

  const validateStep1 = async () => {
    if (!fullName || !selectedGender || !job) {
      await showAlertMessage(
        'Harap isi seluruh form yang ada!',
        undefined,
        'error'
      );
      return false;
    }
    return true;
  };

  return (
    <View className="flex-1 items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#1475BA', '#36918A', '#6BBC3F']}
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
        {/* Back Button */}
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

        {/* STEP 1 */}
        {step === 1 && (
          <View className="mt-3 gap-6">
            {/* Nama Lengkap */}
            <FormInput
              label="Nama Lengkap"
              value={fullName}
              onChangeText={(text) =>
                setFullName(validationFullString(text, 50))
              }
              placeholder="Masukkan nama lengkap"
              textClassName="w-80 "
            />

            {/* Dropdown Gender */}
            <FormDropdownSelect
              label="Jenis Kelamin"
              options={['Laki-laki', 'Perempuan']}
              selected={selectedGender}
              onSelect={(value) => {
                setSelectedGender(value);
                setIsDropdownGenderOpen(false); // tutup dropdown setelah pilih
              }}
              open={isDropdownGenderOpen} // ← pakai state parent
              setOpen={setIsDropdownGenderOpen} // ← pakai setter parent
              showLabel={true}
              toggleDropdownClassName="rounded-xl border border-[#6BBC3F] bg-white px-4 py-3"
              DropdownSelectClassName="rounded-xl border border-t-0 border-[#6BBC3F] bg-white shadow-md"
              selectedTextStyle={{ color: '#6BBC3F', fontFamily: 'LexRegular' }}
              iconColor="#6BBC3F"
            />

            {/* Pekerjaan */}
            <FormInput
              label="Pekerjaan"
              value={job}
              onChangeText={(text) => setJob(validationFullString(text, 50))}
              placeholder="Masukkan nama lengkap"
            />
          </View>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <View className="mt-2 gap-6 pb-2">
            {/* Pendidikan Terakhir */}
            <FormDropdownSelect
              label="Pendidikan Terakhir"
              options={educationOptions} // array pilihan pendidikan
              selected={lastEducation} // state yang menyimpan pilihan saat ini
              onSelect={setLastEducation} // setter untuk update pilihan
              open={isLastEducationDropdownOpen} // kontrol open
              setOpen={setLastIsEducationDropdownOpen} // setter open
              maxVisibleOptions={3} // maksimal 3 item terlihat, sisanya scroll
              toggleDropdownClassName="w-80" // lebar tombol dropdown
              DropdownSelectClassName="w-80" // lebar container dropdown
              labelStyle={{ fontFamily: 'LexBold' }}
              selectedTextStyle={{ fontFamily: 'LexRegular', color: '#6BBC3F' }}
              iconColor="#6BBC3F"
            />

            {/* Nomor HP */}
            <FormInput
              label="No HP / No Telp"
              value={numberPhone}
              onChangeText={(text) =>
                setNumberPhone(validationNumberOnly(text, 15))
              }
              placeholder="No HP / No Telp"
              keyboardType="phone-pad"
              textClassName="border-[#6BBC3F]"
              fontLexBold={{ fontFamily: 'LexBold' }}
            />

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

        {/* Tombol Selanjutnya */}
        {step === 1 && (
          <Button
            style="bg-[#1475BA] mt-12 py-3 px-28 rounded-xl"
            textStyle="text-white"
            onPress={async () => {
              if (await validateStep1()) {
                setStep(2);
              }
            }}
            activeOpacity={0.8}
          >
            Selanjutnya
          </Button>
        )}
      </View>

      {/* Tombol Simpan Data */}
      {step === 2 && (
        <Button
          onPress={handleRegister}
          style={`mt-4 py-3 rounded-xl ${
            isChecked ? 'bg-[#1475BA] px-20' : 'bg-gray-400 px-8'
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
