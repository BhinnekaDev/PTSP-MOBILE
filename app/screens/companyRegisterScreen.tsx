import { Image, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function IndividualRegisterScreen() {
  const router = useRouter();

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

      <View className="justify-center items-center">
        <Text className="text-5xl font-bold text-white text-center">
          Pendaftaran
        </Text>
        <Text className="text-2xl text-white text-center">
          Pilih mode pendaftaran
        </Text>
      </View>

      <View className="items-center justify-center py-12 gap-2">
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("@/assets/images/RegisterScreen/perorangan.png")}
            className="w-60 h-60"
          />
        </TouchableOpacity>
        <Text className="text-xl text-white text-center">
          Pendaftaran untuk Pengguna {"\n"} perorangan
        </Text>
      </View>

      <View className="items-center justify-center gap-2">
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("@/assets/images/RegisterScreen/perusahaan.png")}
            className="w-60 h-60"
          />
        </TouchableOpacity>
        <Text className="text-xl text-white text-center">
          Pendaftaran untuk Perusahaan {"\n"} atau instansi
        </Text>
      </View>
    </View>
  );
}
