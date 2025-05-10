import { TouchableOpacity, Text } from "react-native";

// OUR INTERFACES
import { ButtonCustomProps } from "@/interfaces/buttonCustomProps";

const ButtonCustom = ({
  children = "", //
  classNameContainer = "",
  textClassName = "",
  onPress,
  styleButton,
  textStyle,
}: ButtonCustomProps) => {
  return (
    /* Button Custom Profile Component */
    <TouchableOpacity activeOpacity={0.7} className={classNameContainer} onPress={onPress} style={styleButton}>
      <Text className={textClassName} style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
