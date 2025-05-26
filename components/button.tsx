import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { ButtonProps } from "@/interfaces/buttonProps";

const Button = ({
  children, //
  onPress,
  style = "",
  icon,
  iconPosition = "left",
  image,
  imagePosition = "left",
  textStyle,
  activeOpacity,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={activeOpacity} className={`items-center justify-center flex-row gap-2 ${style}`}>
      {icon && iconPosition === "left" && <View>{icon}</View>}
      {image && imagePosition === "left" && <Image source={image} style={{ width: 20, height: 20 }} />}
      <Text className={textStyle} style={{ fontFamily: "LexBold" }}>
        {children}
      </Text>
      {icon && iconPosition === "right" && <View>{icon}</View>}
      {image && imagePosition === "right" && <Image source={image} style={{ width: 20, height: 20 }} />}
    </TouchableOpacity>
  );
};

export default Button;
