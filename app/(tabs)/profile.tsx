import React, { useState, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

// OUR COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import UserProfile from "@/components/userProfile";
import EditProfile from "@/app/screens/editProfile";
import NotificationProfile from "@/app/screens/notificationProfile";
import SecurityProfile from "@/app/screens/securityProfile";

export default function ProfileTabs() {
  const [activePopup, setActivePopup] = useState<"editProfile" | "notificationProfile" | "securityProfile" | null>(null);
  const [animProgress] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: activePopup ? "none" : "flex" },
    });
  }, [activePopup]);

  const handleShowPopup = (type: "editProfile" | "notificationProfile" | "securityProfile") => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActivePopup(type);
      Animated.timing(animProgress, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  };

  const handleClosePopup = () => {
    Animated.timing(animProgress, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setActivePopup(null);
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
    <LinearGradient colors={["#1475BA", "#399385", "#6BBC3F"]} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!activePopup && (
        <Animated.View style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}>
          <Text className="text-white text-2xl mb-10" style={{ fontFamily: "LexBold" }}>
            Pengaturan Profil
          </Text>

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
              textClassName="ml-2 text-white"
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
                onPress={() => handleShowPopup("editProfile")}
                textStyle={{ fontFamily: "LexRegular" }}
              />
              <ButtonCustom
                classNameContainer="px-4 py-2 rounded-lg"
                textClassName="text-black text-lg pl-4"
                iconLeft={<Feather name="bell" size={24} color="white" className="rounded-full p-3 bg-[#399385]" />}
                text="Notifikasi"
                iconRight={<MaterialIcons name="keyboard-arrow-right" size={24} color="black" className="pl-16" />}
                onPress={() => handleShowPopup("notificationProfile")}
                textStyle={{ fontFamily: "LexRegular" }}
              />
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
            <ButtonCustom classNameContainer="bg-[#73BF40] py-[6px] rounded-lg" text="Keluar" textClassName="text-[20px] text-center text-white" onPress={() => alert("Keluar")} />
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
            paddingVertical: 30,
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
