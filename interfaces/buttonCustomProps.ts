import { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";

export interface ButtonCustomProps {
  classNameContainer?: string;
  textClassName?: string;
  onPress?: () => void;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  count?: number;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  styleButtonIconLeft?: ViewStyle;
  styleButtonIconRight?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  FontLexBold?: object;
  onLayout?: (event: any) => void;
  isTouchable?: boolean;
  activeOpacity?: number;
  containerStyle?: ViewStyle;
}
