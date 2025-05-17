import { Image, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
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
        <Text
          className="text-4xl text-white text-center"
          style={{ fontFamily: "LexBold" }}
        >
          Pendaftaran
        </Text>
        <Text
          className="text-lg text-white text-center"
          style={{ fontFamily: "LexRegular" }}
        >
          Pilih mode pendaftaran
        </Text>
      </View>

      <View className="items-center justify-center py-12 gap-3">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/screens/individualRegisterScreen")}
        >
          <Image
            source={require("@/assets/images/RegisterScreen/perorangan.png")}
            className="w-52 h-52"
          />
        </TouchableOpacity>
        <Text
          className="text-lg text-white text-center"
          style={{ fontFamily: "LexRegular" }}
        >
          Pendaftaran untuk Pengguna {"\n"} perorangan
        </Text>
      </View>

      <View className="items-center justify-center gap-3">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/screens/companyRegisterScreen")}
        >
          <Image
            source={require("@/assets/images/RegisterScreen/perusahaan.png")}
            className="w-52 h-52"
          />
        </TouchableOpacity>
        <Text
          className="text-lg text-white text-center"
          style={{ fontFamily: "LexRegular" }}
        >
          Pendaftaran untuk Perusahaan {"\n"} atau instansi
        </Text>
      </View>
    </View>
  );
}
