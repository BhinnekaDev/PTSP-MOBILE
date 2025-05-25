import { TouchableOpacity, Text, View } from "react-native";
import { ButtonCustomProps } from "@/interfaces/buttonCustomProps";

const ButtonCustom = ({
  FontLexBold = { fontFamily: "LexBold" },
  text, //
  classNameContainer = "",
  textClassName = "",
  onPress,
  onPressLeftIcon,
  onPressRightIcon,
  iconLeft,
  iconRight,
  styleButtonIconLeft,
  styleButtonIconRight,
  textStyle,
  onLayout,
  isTouchable = true,
  containerStyle,
}: ButtonCustomProps) => {
  return (
    <TouchableOpacity
      onPress={onPress} //
      activeOpacity={isTouchable ? 0.7 : 1}
      disabled={!isTouchable}
      className={`px-4 py-3  ${classNameContainer}`}
      style={containerStyle}
    >
      <View className="flex-row items-center justify-between w-full">
        {/* ICON KIRI */}
        <TouchableOpacity
          activeOpacity={0.7} //
          onPress={onPressLeftIcon}
          style={styleButtonIconLeft}
          onLayout={onLayout}
        >
          {iconLeft && <View>{iconLeft}</View>}
        </TouchableOpacity>

        {/* Teks TENGAH*/}
        <View className="flex-1">
          <Text className={`${textClassName}`} style={[FontLexBold, textStyle]}>
            {text}
          </Text>
        </View>

        {/* ICON KANAN */}
        <TouchableOpacity
          activeOpacity={0.7} //
          onPress={onPressRightIcon}
          style={styleButtonIconRight}
          onLayout={onLayout}
          className=" rounded-full"
        >
          {iconRight && <View className="ml-2">{iconRight}</View>}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
