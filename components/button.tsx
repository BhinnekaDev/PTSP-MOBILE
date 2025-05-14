import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import { ButtonProps } from "../interfaces/buttonProps";

interface ExtendedButtonProps extends ButtonProps {
  image?: ImageSourcePropType;
  imagePosition?: "left" | "right";
}

const Button: React.FC<ExtendedButtonProps> = ({
  children,
  onPress,
  style = "",
  icon,
  iconPosition = "left",
  image,
  imagePosition = "left",
  textStyle,
  activeOpacity,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      className={`rounded-md items-center justify-center flex-row gap-2 ${style}`}
    >
      {icon && iconPosition === "left" && <View>{icon}</View>}
      {image && imagePosition === "left" && (
        <Image source={image} style={{ width: 20, height: 20 }} />
      )}
      <Text
        className={textStyle}
        style={{ color: "#fff", fontFamily: "LexBold", fontSize: 16 }}
      >
        {children}
      </Text>
      {icon && iconPosition === "right" && <View>{icon}</View>}
      {image && imagePosition === "right" && (
        <Image source={image} style={{ width: 20, height: 20 }} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
