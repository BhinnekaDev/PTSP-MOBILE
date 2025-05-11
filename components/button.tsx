import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { ButtonProps } from "../interfaces/buttonProps";

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  isLoading = false,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      className={`rounded-md items-center justify-center + ${style}`}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
