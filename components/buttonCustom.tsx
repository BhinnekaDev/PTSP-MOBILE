import { TouchableOpacity, Text, View } from "react-native";
import { ButtonCustomProps } from "@/interfaces/buttonCustomProps";

const ButtonCustom = ({
  children, //
  classNameContainer = "",
  textClassName = "",
  onPress,
  iconLeft,
  iconRight,
  styleButton,
  textStyle,
}: ButtonCustomProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7} //
      className={`flex-row items-center justify-center ${classNameContainer}`}
      onPress={onPress}
      style={styleButton}
    >
      {/* Icon kiri (jika ada) */}
      {iconLeft && <View className="mr-2">{iconLeft}</View>}

      {/* Teks */}
      <Text className={`text-center ${textClassName}`} style={textStyle}>
        {children}
      </Text>

      {/* Icon kanan (jika ada) */}
      {iconRight && <View className="ml-2">{iconRight}</View>}
    </TouchableOpacity>
  );
};

export default ButtonCustom;
