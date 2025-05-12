import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

// OUR COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import UserProfile from "@/components/userProfile";

export default function ProfileTabs() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#1475BA", "#399385", "#6BBC3F"]} //
      start={[0, 0]}
      end={[1, 1]}
      locations={[0.04, 0.45, 1]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text className="text-white text-2xl font-bold mb-10">Pengaturan Profil</Text>

      {/* USER PROFILE */}
      <UserProfile
        containerImageClassName="w-44 h-44 rounded-full border-4 border-[#6BBC3F] flex items-center justify-center overflow-hidden" // menambahkan border dan padding
        imageClassName="w-full h-full object-cover rounded-full"
        nameClassName="text-white text-xl mt-4"
        emailClassName="text-white text-lg underline"
      />

      {/* BUTTON PESANAN SAYA */}
      <View className="items-center">
        <ButtonCustom
          classNameContainer="px-4 py-8 rounded-lg  flex-row items-center justify-center w-48"
          text="Pesanan Saya"
          iconLeft={<Octicons name="checklist" size={20} color="white" />}
          textClassName="text-base ml-2 text-white "
          onPress={() => alert("Pesanan Saya")}
        />
      </View>

      {/* SETTINGS OPTIONS */}
      <View className="w-full px-12 mt-0">
        <View className="bg-white px-4 py-6  rounded-lg">
          {/* BUTTON SUNTING PROFIL */}
          <ButtonCustom
            classNameContainer="px-4 py-2 rounded-lg "
            textClassName="text-black text-lg pl-4"
            iconLeft={<Octicons name="checklist" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />} //
            text="Sunting Profil"
            iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />} //
            onPress={() => router.push("/screens/editProfile")}
            textStyle={{ fontFamily: "LexRegular" }}
          />
          {/* BUTTON NOTIFIKASI */}
          <ButtonCustom
            classNameContainer="px-4 py-2 rounded-lg "
            textClassName="text-black text-lg pl-4"
            iconLeft={<Feather name="bell" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />} //
            text="Notifikasi"
            iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />} //
            onPress={() => alert("Notifikasi")}
            textStyle={{ fontFamily: "LexRegular" }}
          />
          {/* BUTTON KEAMANAN*/}
          <ButtonCustom
            classNameContainer="px-4 py-2 rounded-lg "
            textClassName="text-black text-lg pl-4"
            iconLeft={<Feather name="lock" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />} //
            text="Keamanan"
            iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />} //
            onPress={() => alert("Keamanan")}
            textStyle={{ fontFamily: "LexRegular" }}
          />
        </View>
      </View>

      {/* BUTTON KELUAR */}
      <View className="w-[65%] mt-10">
        <ButtonCustom
          classNameContainer="bg-[#73BF40] py-[6px] rounded-lg"
          text="Keluar"
          textClassName="text-[20px] text-center text-white"
          onPress={() => alert("Keluar")} // Ganti ini dengan fungsi logout sesungguhnya
        />
      </View>
    </LinearGradient>
  );
}
