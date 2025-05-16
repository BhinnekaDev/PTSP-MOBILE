import React from "react";
import { View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

// OUR HOOKS
import { useProfilePopup } from "@/hooks/Frontend/profileScreen/usePopupAnimation";

// OUR COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import UserProfile from "@/components/userProfile";
import EditProfile from "@/app/screens/editProfile";
import NotificationProfile from "@/app/screens/notificationProfile";
import SecurityProfile from "@/app/screens/securityProfile";

export default function ProfileTabs() {
  const {
    activePopup, //
    animatedWidth,
    animatedScaleY,
    fadeAnim,
    handleShowPopup,
    handleClosePopup,
  } = useProfilePopup();

  return (
    <LinearGradient
      colors={["#1475BA", "#399385", "#6BBC3F"]} //
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {!activePopup && (
        <Animated.View style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}>
          <Text className="text-white text-2xl mb-10" style={{ fontFamily: "LexBold" }}>
            Pengaturan Profil
          </Text>
          {/* USER PROFILE */}
          <UserProfile
            containerImageClassName="w-44 h-44 rounded-full border-4 border-[#6BBC3F]"
            imageClassName="w-full h-full object-cover rounded-full"
            nameClassName="text-white text-xl mt-4"
            emailClassName="text-white text-lg underline"
          />

          <View className="items-center">
            {/* TOMBOL PESANAN SAYA */}
            <ButtonCustom
              classNameContainer="px-4 py-8 rounded-lg flex-row items-center justify-center w-48"
              text="Pesanan Saya"
              iconLeft={<Octicons name="checklist" size={20} color="white" />}
              textClassName="ml-2 text-white"
              onPress={() => alert("Pesanan Saya")}
            />
          </View>

          <View className="w-full px-12 mt-0">
            <View className="bg-white px-4 py-6 rounded-lg">
              {/* TOMBOL SUNTING PROFIL */}
              <ButtonCustom
                classNameContainer="px-4 py-2 rounded-lg"
                textClassName="text-black text-lg pl-4"
                iconLeft={<Octicons name="checklist" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />}
                text="Sunting Profil"
                iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />}
                onPress={() => handleShowPopup("editProfile")}
                textStyle={{ fontFamily: "LexRegular" }}
              />
              {/* TOMBOL NOTIFIKASI */}
              <ButtonCustom
                classNameContainer="px-4 py-2 rounded-lg"
                textClassName="text-black text-lg pl-4"
                iconLeft={<Feather name="bell" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />}
                text="Notifikasi"
                iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />}
                onPress={() => handleShowPopup("notificationProfile")}
                textStyle={{ fontFamily: "LexRegular" }}
              />
              {/* TOMBOL KEAMANAN */}
              <ButtonCustom
                classNameContainer="px-4 py-2 rounded-lg"
                textClassName="text-black text-lg pl-4"
                iconLeft={<Feather name="lock" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />}
                text="Keamanan"
                iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />}
                onPress={() => handleShowPopup("securityProfile")}
                textStyle={{ fontFamily: "LexRegular" }}
              />
            </View>
          </View>

          <View className="w-[65%] mt-10">
            {/* TOMBOL KELUAR */}
            <ButtonCustom
              classNameContainer="bg-[#73BF40] py-[6px] rounded-lg" //
              text="Keluar"
              textClassName="text-[20px] text-center text-white"
              onPress={() => alert("Keluar")}
            />
          </View>
        </Animated.View>
      )}

      {activePopup && (
        <Animated.View
          style={{
            position: "absolute",
            bottom: 100,
            width: animatedWidth,
            height: "80%",
            borderRadius: 20,
            transform: [{ scaleY: animatedScaleY }],
            overflow: "hidden",
          }}
        >
          {activePopup === "editProfile" && <EditProfile onClose={handleClosePopup} />}
          {activePopup === "notificationProfile" && <NotificationProfile onClose={handleClosePopup} />}
          {activePopup === "securityProfile" && <SecurityProfile onClose={handleClosePopup} />}
        </Animated.View>
      )}
    </LinearGradient>
  );
}
