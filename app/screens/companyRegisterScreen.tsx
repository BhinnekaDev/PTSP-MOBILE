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
  const [selectedGender, setSelectedGender] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [noIdentitas, setNoIdentitas] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState('');
  const [noHp, setNoHp] = useState('');
  const [npwp, setNpwp] = useState('');
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [alamatPerusahaan, setAlamatPerusahaan] = useState('');
  const [provinsiPerusahaan, setProvinsiPerusahaan] = useState('');
  const [kabupatenKotaPerusahaan, setKabupatenKotaPerusahaan] = useState('');
  const [emailPerusahaan, setEmailPerusahaan] = useState('');
  const [noHpPerusahaan, setNoHpPerusahaan] = useState('');

  const handleRegister = async () => {
    if (
      !noIdentitas ||
      !namaLengkap ||
      !selectedGender ||
      !pekerjaan ||
      !pendidikanTerakhir ||
      !noHp ||
      !npwp ||
      !namaPerusahaan ||
      !alamatPerusahaan ||
      !provinsiPerusahaan ||
      !kabupatenKotaPerusahaan ||
      !emailPerusahaan ||
      !noHpPerusahaan
    ) {
      Alert.alert('Peringatan', 'Mohon lengkapi semua data terlebih dahulu.');
      return;
    }

    try {
      await register({
        No_Identitas: noIdentitas,
        Nama_Lengkap: namaLengkap,
        Jenis_Kelamin: selectedGender,
        Pekerjaan: pekerjaan,
        Pendidikan_Terakhir: pendidikanTerakhir,
        No_Hp: noHp,
        NPWP: npwp,
        Nama_Perusahaan: namaPerusahaan,
        Alamat_Perusahaan: alamatPerusahaan,
        Provinsi_Perusahaan: provinsiPerusahaan,
        Kabupaten_Kota_Perusahaan: kabupatenKotaPerusahaan,
        Email_Perusahaan: emailPerusahaan,
        No_Hp_Perusahaan: noHpPerusahaan,
      });

      Alert.alert('Berhasil', 'Registrasi berhasil disimpan!', [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/home'),
        },
      ]);
    } catch {
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan data.');
    }
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
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                No Identitas
              </Text>
              <TextInput
                value={noIdentitas}
                onChangeText={setNoIdentitas}
                keyboardType="phone-pad"
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Nama Lengkap
              </Text>
              <TextInput
                value={namaLengkap}
                onChangeText={setNamaLengkap}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
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
          </View>
        )}

        {step === 2 && (
          <View className="mt-2 gap-6 pb-5">
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Pekerjaan
              </Text>
              <TextInput
                value={pekerjaan}
                onChangeText={setPekerjaan}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Pendidikan Terakhir
              </Text>
              <TextInput
                value={pendidikanTerakhir}
                onChangeText={setPendidikanTerakhir}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                No HP / No Telp
              </Text>
              <TextInput
                value={noHp}
                onChangeText={setNoHp}
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
                NPWP
              </Text>
              <TextInput
                value={npwp}
                onChangeText={setNpwp}
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
                value={namaPerusahaan}
                onChangeText={setNamaPerusahaan}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Alamat Perusahaan
              </Text>
              <TextInput
                value={alamatPerusahaan}
                onChangeText={setAlamatPerusahaan}
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
                value={provinsiPerusahaan}
                onChangeText={setProvinsiPerusahaan}
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
                value={kabupatenKotaPerusahaan}
                onChangeText={setKabupatenKotaPerusahaan}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                Email Perusahaan
              </Text>
              <TextInput
                value={emailPerusahaan}
                onChangeText={setEmailPerusahaan}
                className="w-80 rounded-xl border border-[#6BBC3F] p-2"
                style={{ fontFamily: 'LexRegular' }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: 'LexBold' }}>
                No HP / No Telp Perusahaan
              </Text>
              <TextInput
                value={noHpPerusahaan}
                onChangeText={setNoHpPerusahaan}
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
            onPress={() => setStep(2)}
            activeOpacity={0.8}
          >
            Selanjutnya
          </Button>
        )}
      </View>
      {(step === 2 || step === 3) && (
        <Button
          style="bg-[#73BF40] mt-6 py-3 px-28 rounded-xl"
          onPress={() => setStep(step + 1)}
          activeOpacity={0.8}
        >
          Selanjutnya
        </Button>
      )}

      {step === 4 && (
        <Button
          onPress={handleRegister}
          style={`mt-6 py-3 rounded-xl ${isChecked ? 'bg-[#1475BA] px-20' : 'bg-gray-400 px-8'}`}
          disabled={!isChecked}
        >
          {isChecked ? 'Simpan Data' : 'Setujui Syarat untuk Lanjut'}
        </Button>
      )}
    </View>
  );
}
