import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENTS
import ButtonProfile from "@/components/buttonCustom";
import ButtonSwitchProfile from "@/components/buttonSwitchProfile";
import UserProfile from "@/components/userProfile";

// LINEAR GRADIENT
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileTabs() {
  const router = useRouter();

  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isBiometricEnabled, setBiometricEnabled] = useState(false);

  const handleEditProfile = () => {
    router.push("/screens/editProfile");
  };

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
      <ButtonProfile classNameContainer="bg-[#159778] mt-8 px-6 py-2 rounded-lg" textClassName="text-white text-xl" onPress={handleEditProfile} textStyle={{ fontFamily: "LexBold" }}>
        Sunting Profile
      </ButtonProfile>

      {/* SETTINGS OPTIONS */}
      <View className="w-full px-6 mt-16">
        <Text className="text-white text-xl mb-2" style={{ fontFamily: "LexXBold" }}>
          Pilihan Pengaturan
        </Text>
        <View className="bg-[#093731] px-4 pb-4 rounded-lg">
          {/* NOTIFICATION OPTION */}
          <ButtonSwitchProfile
            containerClassName="py-4"
            iconComponent={<MaterialIcons name="notifications" size={28} color="white" className="bg-black p-1 rounded-lg" />}
            label="Notifikasi"
            value={isNotificationEnabled}
            onToggle={setNotificationEnabled}
            labelClassName="text-white"
            textStyle={{ fontFamily: "LexXBold" }}
            dividerClassName="border-b border-white pb-3"
            backgroundButtonOn="#00822F"
            backgroundCircleButtonOff="#000000"
          />

          {/* BIOMETRIC OPTION */}
          <ButtonSwitchProfile
            containerClassName="py-4"
            iconComponent={<MaterialIcons name="fingerprint" size={28} color="white" className="bg-black p-1 rounded-lg" />}
            label="Sidik Jari Biometri"
            value={isBiometricEnabled}
            onToggle={setBiometricEnabled}
            labelClassName="text-white"
            textStyle={{ fontFamily: "LexXBold" }}
            dividerClassName="border-b border-white pb-3"
            backgroundButtonOn="#00822F"
            backgroundCircleButtonOff="#000000"
          />

          {/* LOGOUT OPTION */}
          <ButtonProfile classNameContainer="flex-row justify-between items-center py-2" onPress={() => router.push("/(tabs)/profile")}>
            <View className="flex-row items-center">
              <MaterialIcons name="logout" size={28} color="white" className="bg-black p-1 rounded-lg" />
              <Text className="text-white text-lg ml-4" style={{ fontFamily: "LexXBold" }}>
                Keluar
              </Text>
            </View>
          </ButtonProfile>
          <View className="border-b border-white" />
        </View>
      </View>
    </LinearGradient>
  );
}
