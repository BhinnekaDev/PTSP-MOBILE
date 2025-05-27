import { View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

// OUR ICONS
import { AntDesign, Ionicons } from "@expo/vector-icons";

// OUR COMPONENTS
import ButtonCustom from "@/components/buttonCustom";

// OUR INTERFACES
import { ButtonCustomProps } from "@/interfaces/buttonCustomProps";

export default function NavCartOrder({
  count = 1, //
  text,
  textClassName,
  onPressLeftIcon,
  onPressRightIcon,
  isTouchable = true,
}: ButtonCustomProps) {
  return (
    <View className="bg-[#1475BA] rounded-b-[10px] relative py-1 flex-row items-center ">
      {/* TOMBOL UTAMA*/}
      <ButtonCustom
        classNameContainer="py-4 " //
        isTouchable={isTouchable}
        text={text}
        iconLeft={<AntDesign name="arrowleft" size={24} color="white" />}
        onPressLeftIcon={onPressLeftIcon}
        textClassName={`text-[23px]  text-white ${textClassName}`}
      />

      {/* ICON KANAN */}
      <TouchableOpacity
        activeOpacity={0.7} //
        onPress={onPressRightIcon ?? (() => router.push("/screens/chatScreen"))}
        className="absolute right-4"
      >
        <Ionicons name="chatbubbles-outline" size={28} color="white" />
        {/* NOTIFIKASI PESAN */}
        {count > 0 && (
          <View className="absolute -top-1 -right-2 bg-red-600 w-5 h-5 rounded-full items-center justify-center z-10">
            <Text className="text-white text-[10px]" style={{ fontFamily: "LexBold" }}>
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
