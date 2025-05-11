import { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";

export interface ButtonCustomProps {
  children: ReactNode;
  classNameContainer?: string;
  textClassName?: string;
  onPress?: () => void;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  styleButton?: ViewStyle;
  textStyle?: TextStyle;
}
