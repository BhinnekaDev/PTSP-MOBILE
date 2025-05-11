import React from "react";
import { Text, View } from "react-native";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { PiLockKey } from "react-icons/pi";

// import { IconName } from "react-icons/lia";

// OUR COMPONENTS
import SettingProfiles from "@/components/settingProfile";
import ButtonCustom from "@/components/buttonCustom";
import UserProfile from "@/components/userProfile";

// LINEAR GRADIENT
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileTabs() {
  return (
    <LinearGradient
      colors={["#1475BA", "#399385", "#6BBC3F"]} //
      start={[0, 0]}
      end={[1, 1]}
      locations={[0.04, 0.45, 1]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* USER PROFILE */}
      <UserProfile
        containerImageClassName="w-44 h-44 rounded-full border-gray-500 flex items-center justify-center overflow-hidden"
        imageClassName="w-full h-full"
        nameClassName="text-white text-xl mt-4"
        emailClassName="text-white text-lg underline"
      />

      {/* BUTTON PESANAN SAYA */}

      <View className="mt-4 items-center">
        <ButtonCustom
          classNameContainer="px-4 py-6 rounded-lg  flex-row items-center justify-center w-48"
          text="Pesanan Saya"
          iconLeft={<Octicons name="checklist" size={20} color="white" />}
          textClassName="text-white text-base ml-2 "
          onPress={() => alert("Pesanan Saya")}
        />
      </View>

      {/* SETTINGS OPTIONS */}
      <View className="w-full px-12 mt-0">
        <View className="bg-white px-4 py-6  rounded-lg">
          {/* NOTIFICATION OPTION */}
          <ButtonCustom
            iconLeft={<Octicons name="checklist" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />} //
            text="Sunting Profil"
            iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />} //
            classNameContainer="px-4 py-2 rounded-lg "
            textClassName="text-black text-lg pl-4"
            onPress={() => alert("Sunting Profil")}
          />
          <ButtonCustom
            iconLeft={<Feather name="bell" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />} //
            text="Notifikasi"
            iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />} //
            classNameContainer="px-4 py-2 rounded-lg "
            textClassName="text-black text-lg pl-4"
            onPress={() => alert("Notifikasi")}
          />
          <ButtonCustom
            iconLeft={<Feather name="lock" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />} //
            text="Keamanan"
            iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />} //
            classNameContainer="px-4 py-2 rounded-lg "
            textClassName="text-black text-lg pl-4"
            onPress={() => alert("Keamanan")}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
