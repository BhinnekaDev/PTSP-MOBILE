import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export type HeaderBackButtonProps = {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  buttonClassName?: string;
  textClassName?: string;
  wrapperClassName?: string; //
};

export default function HeaderBackButton({
  title,
  onPress,
  icon,
  buttonClassName,
  textClassName,
  wrapperClassName, //
}: HeaderBackButtonProps) {
  const router = useRouter();

  const defaultIcon = <Ionicons name="arrow-back-circle" size={34} color="black" />;
  const handlePress = onPress ?? (() => router.back());

  return (
    <View className={`flex-row items-center justify-start py-2 px-4 ${wrapperClassName}`}>
      {/* HEADER BUTTON KEMBALI - ICON LEFT */}
      <TouchableOpacity onPress={handlePress} className={buttonClassName} activeOpacity={0.7}>
        {icon ?? defaultIcon}
      </TouchableOpacity>

      {/* TITLE HEADER BACK - TEXT RIGHT */}
      <Text className={`text-black text-[20px] ${textClassName ?? ""}`} style={{ fontFamily: "LexBold" }}>
        {title}
      </Text>
    </View>
  );
}
