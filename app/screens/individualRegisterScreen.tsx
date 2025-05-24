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

export default function IndividualRegisterScreen() {
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

      <View className="justify-center items-center mb-10">
        <Text
          className="text-3xl text-white text-center"
          style={{ fontFamily: "LexBold" }}
        >
          Daftar Perorangan
        </Text>
      </View>

      <View className="relative items-center bg-white rounded-lg px-6 py-8">
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
          className="text-3xl text-center mb-4"
          style={{ fontFamily: "LexBold" }}
        >
          Data Diri
        </Text>
        {step === 1 && (
          <View className="gap-6 mt-3">
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: "LexBold" }}>
                No Identitas
              </Text>
              <TextInput
                keyboardType="phone-pad"
                className="border border-[#6BBC3F] rounded-xl w-80 p-2"
                style={{ fontFamily: "LexRegular" }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: "LexBold" }}>
                Nama Lengkap
              </Text>
              <TextInput
                className="border border-[#6BBC3F] rounded-xl w-80 p-2"
                style={{ fontFamily: "LexRegular" }}
              />
            </View>
            <View className="gap-1 w-80 relative">
              <Text className="text-md ml-1" style={{ fontFamily: "LexBold" }}>
                Jenis Kelamin
              </Text>
              <TouchableOpacity
                onPress={() => setIsDropdownOpen((prev) => !prev)}
                className="border border-[#6BBC3F] rounded-xl px-4 py-3 bg-white flex-row justify-between items-center"
              >
                <Text
                  className="text-[#6BBC3F]"
                  style={{ fontFamily: "LexRegular" }}
                >
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
                      <Text
                        style={{ fontFamily: "LexRegular" }}
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
          <View className="gap-6 pb-2 mt-2">
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: "LexBold" }}>
                Pekerjaan
              </Text>
              <TextInput
                className="border border-[#6BBC3F] rounded-xl w-80 p-2"
                style={{ fontFamily: "LexRegular" }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: "LexBold" }}>
                Pendidikan Terakhir
              </Text>
              <TextInput
                className="border border-[#6BBC3F] rounded-xl w-80 p-2"
                style={{ fontFamily: "LexRegular" }}
              />
            </View>
            <View className="gap-1">
              <Text className="text-md ml-1" style={{ fontFamily: "LexBold" }}>
                No HP / No Telp
              </Text>
              <TextInput
                keyboardType="phone-pad"
                className="border border-[#6BBC3F] rounded-xl w-80 p-2"
                style={{ fontFamily: "LexRegular" }}
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
              <Text
                className="flex-1 text-sm"
                style={{ fontFamily: "LexRegular" }}
              >
                Dengan ini saya menyetujui semua syarat dan ketentuan sebagai
                pengguna Aplikasi PTSP BMKG.
              </Text>
            </TouchableOpacity>

            <View>
              <Text className="text-sm" style={{ fontFamily: "LexBold" }}>
                Ketentuan Pengguna Perorangan:
              </Text>
              <View className="flex-row items-start gap-2 mt-2">
                <Text className="text-lg">•</Text>
                <Text
                  className="text-xs flex-1"
                  style={{ fontFamily: "LexRegular" }}
                >
                  Pengguna yang terdaftar pada Web PTSP BMKG tunduk pada aturan
                  yang berlaku.
                </Text>
              </View>
              <View className="flex-row items-start gap-2 mt-1">
                <Text className="text-lg">•</Text>
                <Text
                  className="text-xs flex-1"
                  style={{ fontFamily: "LexRegular" }}
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
            onPress={() => setStep(2)}
            activeOpacity={0.8}
          >
            Selanjutnya
          </Button>
        )}
      </View>
      {step === 2 && (
        <Button
          onPress={() => router.push("/(tabs)/home")}
          style={`mt-4 py-3 rounded-xl ${
            isChecked ? "bg-[#1475BA] px-20" : "bg-gray-400 px-8"
          }`}
          textStyle={`${isChecked ? "text-white" : "text-black"}`}
          disabled={!isChecked}
        >
          {isChecked ? "Simpan Data" : "Setujui Syarat untuk Lanjut"}
        </Button>
      )}
    </View>
  );
}
