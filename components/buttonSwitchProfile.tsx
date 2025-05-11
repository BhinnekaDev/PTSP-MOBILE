import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";

// OUR COMPONENTS
import ButtonProfile from "@/components/buttonCustom";

// OUR PROPS
import { EditProfileProps } from "@/interfaces/settingProfileProps";

const EditProfile = ({
  label,
  text,
  onPress,
  iconComponent,
  isWrapperButton = false,
  labelClassName, //
}: EditProfileProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const WrapperButton = isWrapperButton ? TouchableOpacity : View;

  return (
    // Edit Profile Component
    <WrapperButton
      onPress={isWrapperButton ? onPress : undefined} //
      className="flex-row items-center justify-between py-2"
    >
      {/* LABEL */}
      <Text className={`${labelClassName || (isDarkMode ? "text-white" : "text-black")}  text-lg`} style={{ fontFamily: "LexSemiBold" }}>
        {label}
      </Text>
      <View className="flex-row items-center space-x-2">
        {/* TEXT */}
        <Text className={`${isDarkMode ? "text-white" : "text-black"} opacity-50  text-lg pr-4`} style={{ fontFamily: "LexSemiBold" }}>
          {text}
        </Text>

        {/* BUTTON SUNTING PROFILE*/}
        <ButtonProfile
          classNameContainer="px-2 py-2 rounded-lg" //
          textClassName="text-white font-semibold"
          onPress={onPress}
        >
          {iconComponent}
        </ButtonProfile>
      </View>
    </WrapperButton>
  );
};

export default EditProfile;
