import { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";

export interface ButtonCustomProps {
  children: ReactNode;
  classNameContainer?: string;
  textClassName?: string;
  onPress?: () => void;
  icon?: ReactNode;
  styleButton?: ViewStyle;
  textStyle?: TextStyle;
}
