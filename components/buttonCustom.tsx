import { TouchableOpacity, Text, View } from 'react-native';
import { ButtonCustomProps } from '@/interfaces/buttonCustomProps';

const ButtonCustom = ({
  FontCustom = { fontFamily: 'LexBold' },
  text, //
  classNameContainer = '',
  textClassName = '',
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
  vertical,
}: ButtonCustomProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={isTouchable ? 0.7 : 1}
      disabled={!isTouchable}
      className={`px-4 py-3 ${classNameContainer}`}
      style={containerStyle}
    >
      {vertical ? (
        <View className="items-center justify-center">
          {/* ICON ATAS */}
          {iconLeft && <View style={styleButtonIconLeft}>{iconLeft}</View>}
          {/* TEKS */}
          <Text className={textClassName} style={[FontCustom, textStyle]}>
            {text}
          </Text>
          {/* ICON KANAN BISA DI BAWAH ATAU TIDAK PAKAI */}
          {iconRight && <View style={styleButtonIconRight}>{iconRight}</View>}
        </View>
      ) : (
        <View className="w-full flex-row items-center justify-between">
          {/* ICON KIRI */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressLeftIcon}
            style={styleButtonIconLeft}
            onLayout={onLayout}
          >
            {iconLeft && <View>{iconLeft}</View>}
          </TouchableOpacity>

          {/* TEKS TENGAH */}
          <View className="flex-1">
            <Text
              className={`${textClassName}`}
              style={[FontCustom, textStyle]}
            >
              {text}
            </Text>
          </View>

          {/* ICON KANAN */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressRightIcon}
            style={styleButtonIconRight}
            onLayout={onLayout}
            className="rounded-full"
          >
            {iconRight && <View className="ml-2">{iconRight}</View>}
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCustom;
