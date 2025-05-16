import { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";

export interface ButtonCustomProps {
  classNameContainer?: string;
  textClassName?: string;
  onPress?: () => void;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  styleButton?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  FontLexBold?: object;
  onLayout?: (event: any) => void;
}
