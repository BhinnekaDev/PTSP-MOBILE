import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Button from "@/components/button";

export default function CompanyRegisterScreen() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const options = ["Laki-laki", "Perempuan"];

  const handleSelect = (gender: string) => {
    setSelectedGender(gender);
    setIsDropdownOpen(false);
  };

  return (
    <View className="flex-1 items-center justify-center overflow-hidden">
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#1475BA", "#36918A", "#6BBC3F"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      <View className="justify-center items-center mb-12">
        <Text className="text-4xl font-bold text-white text-center">
          Daftar Perusahaan
        </Text>
      </View>

      <View className="relative items-center bg-white rounded-lg p-6">
        <TouchableOpacity
          onPress={() => {
            if (step === 1) {
              router.back();
            } else {
              setStep(step - 1);
            }
          }}
          className="absolute left-6 top-4"
        >
          <Ionicons name="arrow-back-circle" size={32} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-center mb-4">
          {step === 1 || step === 2 ? "Data Diri" : "Data Badan Usaha"}
        </Text>

        {step === 1 && (
          <View className="gap-6">
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">No Identitas</Text>
              <TextInput
                keyboardType="phone-pad"
                className="border border-[#6BBC3F] rounded-xl w-80"
              />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">Nama Lengkap</Text>
              <TextInput className="border border-[#6BBC3F] rounded-xl w-80" />
            </View>
            <View className="gap-1 w-80 relative">
              <Text className="text-lg font-bold ml-1">Jenis Kelamin</Text>
              <TouchableOpacity
                onPress={() => setIsDropdownOpen((prev) => !prev)}
                className="border border-[#6BBC3F] rounded-xl px-4 py-3 bg-white flex-row justify-between items-center"
              >
                <Text className="text-[#6BBC3F]">
                  {selectedGender || "Pilih jenis kelamin"}
                </Text>
                {isDropdownOpen ? (
                  <Entypo name="chevron-small-up" size={24} color="#6BBC3F" />
                ) : (
                  <Entypo name="chevron-small-down" size={24} color="#6BBC3F" />
                )}
              </TouchableOpacity>

              {isDropdownOpen && (
                <View className="absolute top-[75px] z-10 w-full bg-white border border-[#6BBC3F] rounded-xl shadow-md">
                  {options.map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => handleSelect(item)}
                      className="px-4 py-3"
                    >
                      <Text>{item}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {step === 2 && (
          <View className="gap-6 pb-5">
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">Pekerjaan</Text>
              <TextInput className="border border-[#6BBC3F] rounded-xl w-80" />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">
                Pendidikan Terakhir
              </Text>
              <TextInput className="border border-[#6BBC3F] rounded-xl w-80" />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">No HP / No Telp</Text>
              <TextInput
                keyboardType="phone-pad"
                className="border border-[#6BBC3F] rounded-xl w-80"
              />
            </View>

            <View>
              <Text className="text-md font-bold">
                Ketentuan Pengguna Perusahaan:
              </Text>
              <View className="flex-row items-start gap-2 mt-2">
                <Text className="text-lg">•</Text>
                <Text className="text-sm flex-1">
                  Pengguna yang terdaftar pada Web PTSP BMKG tunduk pada aturan
                  yang berlaku.
                </Text>
              </View>
              <View className="flex-row items-start gap-2 mt-1">
                <Text className="text-lg">•</Text>
                <Text className="text-sm flex-1">
                  Tidak menyalahgunakan akun terdaftar kepada pihak yang tidak
                  berkepentingan dan memanfaatkannya untuk melakukan tindakan
                  kriminal.
                </Text>
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View className="gap-6 pb-2">
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">NPWP</Text>
              <TextInput
                keyboardType="phone-pad"
                className="border border-[#6BBC3F] rounded-xl w-80"
              />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">Nama Perusahaan</Text>
              <TextInput className="border border-[#6BBC3F] rounded-xl w-80" />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">Alamat Perusahaan</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                className="border border-[#6BBC3F] rounded-xl w-80 p-3"
              />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">Provinsi</Text>
              <TextInput className="border border-[#6BBC3F] rounded-xl w-80" />
            </View>
          </View>
        )}
        {step === 4 && (
          <View className="gap-6 pb-4">
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">Kabupaten / Kota</Text>
              <TextInput className="border border-[#6BBC3F] rounded-xl w-80" />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">Email Perusahaan</Text>
              <TextInput className="border border-[#6BBC3F] rounded-xl w-80" />
            </View>
            <View className="gap-1">
              <Text className="text-lg font-bold ml-1">
                No HP / No Telp Perusahaan
              </Text>
              <TextInput
                keyboardType="phone-pad"
                className="border border-[#6BBC3F] rounded-xl w-80"
              />
            </View>

            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              className="flex-row items-start"
              activeOpacity={0.8}
            >
              <View className="w-5 h-5 mr-2 border border-gray-400 rounded items-center justify-center mt-1">
                {isChecked && <Entypo name="check" size={14} color="black" />}
              </View>
              <Text className="flex-1 text-sm">
                Dengan ini saya menyetujui semua syarat dan ketentuan sebagai
                pengguna Aplikasi PTSP BMKG.
              </Text>
            </TouchableOpacity>

            <View>
              <Text className="text-md font-bold">
                Ketentuan Pengguna Perorangan:
              </Text>
              <View className="flex-row items-start gap-2 mt-2">
                <Text className="text-lg">•</Text>
                <Text className="text-sm flex-1">
                  Pengguna yang terdaftar pada Web PTSP BMKG tunduk pada aturan
                  yang berlaku.
                </Text>
              </View>
              <View className="flex-row items-start gap-2 mt-1">
                <Text className="text-lg">•</Text>
                <Text className="text-sm flex-1">
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
          style={`mt-6 py-3 rounded-xl ${
            isChecked ? "bg-[#1475BA] px-20" : "bg-gray-400 px-8"
          }`}
          disabled={!isChecked}
        >
          {isChecked ? "Simpan Data" : "Setujui Syarat untuk Lanjut"}
        </Button>
      )}
    </View>
  );
}
