import React, { useState, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import ButtonCustom from "@/components/buttonCustom";
import UserProfile from "@/components/userProfile";
import EditProfile from "@/app/screens/editProfile";

export default function ProfileTabs() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [animProgress] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(1)); // opacity animasi
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: showEditProfile ? "none" : "flex" },
    });
  }, [showEditProfile]);

  const handleShowEditProfile = () => {
    // Fade out dulu
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Setelah fade out selesai, munculkan EditProfile dan animasi pop-up
      setShowEditProfile(true);
      Animated.timing(animProgress, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  };

  const handleCloseEditProfile = () => {
    Animated.timing(animProgress, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setShowEditProfile(false);
      // Kembalikan konten utama (fade in)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const animatedWidth = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["80%", "90%"],
  });

  const animatedScaleY = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <LinearGradient
      colors={["#1475BA", "#399385", "#6BBC3F"]} //
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {!showEditProfile && (
        <Animated.View style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}>
          <Text className="text-white text-2xl font-bold mb-10">Pengaturan Profil</Text>

          <UserProfile
            containerImageClassName="w-44 h-44 rounded-full border-4 border-[#6BBC3F]"
            imageClassName="w-full h-full object-cover rounded-full"
            nameClassName="text-white text-xl mt-4"
            emailClassName="text-white text-lg underline"
          />

          <View className="items-center">
            <ButtonCustom
              classNameContainer="px-4 py-8 rounded-lg flex-row items-center justify-center w-48"
              text="Pesanan Saya"
              iconLeft={<Octicons name="checklist" size={20} color="white" />}
              textClassName="text-base ml-2 text-white"
              onPress={() => alert("Pesanan Saya")}
            />
          </View>

          <View className="w-full px-12 mt-0">
            <View className="bg-white px-4 py-6 rounded-lg">
              <ButtonCustom
                classNameContainer="px-4 py-2 rounded-lg"
                textClassName="text-black text-lg pl-4"
                iconLeft={<Octicons name="checklist" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />}
                text="Sunting Profil"
                iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />}
                onPress={handleShowEditProfile}
                textStyle={{ fontFamily: "LexRegular" }}
              />
              <ButtonCustom
                classNameContainer="px-4 py-2 rounded-lg"
                textClassName="text-black text-lg pl-4"
                iconLeft={<Feather name="bell" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />}
                text="Notifikasi"
                iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />}
                onPress={() => alert("Notifikasi")}
                textStyle={{ fontFamily: "LexRegular" }}
              />
              <ButtonCustom
                classNameContainer="px-4 py-2 rounded-lg"
                textClassName="text-black text-lg pl-4"
                iconLeft={<Feather name="lock" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />}
                text="Keamanan"
                iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />}
                onPress={() => alert("Keamanan")}
                textStyle={{ fontFamily: "LexRegular" }}
              />
            </View>
          </View>

          <View className="w-[65%] mt-10">
            <ButtonCustom classNameContainer="bg-[#73BF40] py-[6px] rounded-lg" text="Keluar" textClassName="text-[20px] text-center text-white" onPress={() => alert("Keluar")} />
          </View>
        </Animated.View>
      )}

      {showEditProfile && (
        <Animated.View
          style={{
            zIndex: 1,
            position: "absolute",
            bottom: 100,
            width: animatedWidth,
            height: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            transform: [{ scaleY: animatedScaleY }],
            overflow: "hidden",
          }}
        >
          <EditProfile onClose={handleCloseEditProfile} />
        </Animated.View>
      )}
    </LinearGradient>
  );
}
