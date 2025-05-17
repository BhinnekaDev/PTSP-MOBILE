import { TouchableOpacity, Text, View } from "react-native";
import { ButtonCustomProps } from "@/interfaces/buttonCustomProps";

const ButtonCustom = ({
  FontLexBold = { fontFamily: "LexBold" },
  text, //
  classNameContainer = "",
  textClassName = "",
  onPress,
  iconLeft,
  iconRight,
  styleButton,
  textStyle,
  onLayout,
}: ButtonCustomProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7} //
      onPress={onPress}
      className={`px-4 py-3 rounded-lg ${classNameContainer}`}
      style={styleButton}
      onLayout={onLayout}
    >
      <View className="flex-row items-center justify-between w-full">
        {/* ICON KIRI */}
        {iconLeft && <View>{iconLeft}</View>}

        {/* Teks TENGAH*/}
        <View className="flex-1">
          <Text className={`${textClassName}`} style={[FontLexBold, textStyle]}>
            {text}
          </Text>
        </View>

        {/* ICON KANAN */}
        {iconRight && <View className="ml-2">{iconRight}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
