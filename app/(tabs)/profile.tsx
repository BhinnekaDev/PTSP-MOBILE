import React from "react";
import { Text, View } from "react-native";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";
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

      {/* EDIT PROFILE BUTTON */}
      <ButtonCustom
        iconLeft={<MaterialIcons name="save" size={20} color="white" />} //
        classNameContainer="px-4 py-2 rounded-lg"
        textClassName="text-white text-base"
        onPress={() => console.log("simpan")}
        textStyle={{ fontFamily: "LexBold" }}
      >
        Pesanan Saya
      </ButtonCustom>

      {/* SETTINGS OPTIONS */}
      <View className="w-full px-6 mt-16">
        <Text className="text-black text-xl mb-2">Pilihan Pengaturan</Text>
        <View className="bg-white px-4 pb-4 rounded-lg">
          {/* NOTIFICATION OPTION */}
          <SettingProfiles
            label="Notifikasi" //
            text="Pengaturan Notifikasi"
            isWrapperButton={true}
            iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} />}
          />

          <View className="border-b border-white" />
        </View>
      </View>
    </LinearGradient>
  );
}
