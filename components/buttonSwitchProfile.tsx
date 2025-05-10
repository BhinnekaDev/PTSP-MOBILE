import React from "react";
import { View, Text, Switch, useColorScheme } from "react-native";

// OUR INTERFACES
import { ButtonSwitchProfileProps } from "@/interfaces/buttonSwitchProfileProps";

const ButtonSwitchProfile = ({
  iconComponent,
  label,
  value,
  onToggle,
  containerClassName = "",
  labelClassName = "",
  dividerClassName = "",
  backgroundCircleButtonOn = "",
  backgroundButtonOn = "",
  backgroundCircleButtonOff = "",
  backgroundButtonOff = "",
  textStyle,
}: ButtonSwitchProfileProps) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View className={containerClassName}>
      <View className="flex-row justify-between items-center">
        {/* ICON & LABEL */}
        <View className="flex-row items-center">
          {iconComponent}
          <Text style={{ fontFamily: "LexBold" }} className={`${labelClassName || (isDarkMode ? "text-white" : "text-black")}  text-lg ml-4`}>
            {label}
          </Text>
        </View>

        {/* BUTTON SWITCH */}
        <Switch
          trackColor={{
            false: isDarkMode ? "#000" : "#fff",
            true: backgroundButtonOn || "#00822F",
          }}
          thumbColor={value ? backgroundCircleButtonOn || "#FFFFFF" : backgroundCircleButtonOff || "#f4f3f4"}
          ios_backgroundColor={backgroundButtonOff || isDarkMode ? "#000000" : "white"}
          style={[{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }]}
          value={value}
          onValueChange={onToggle}
        />
      </View>

      {/* BORDER BOTTOM */}
      <View className={dividerClassName} />
    </View>
  );
};

export default ButtonSwitchProfile;
