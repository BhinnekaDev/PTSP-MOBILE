import { ReactNode } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle, ImageSourcePropType } from "react-native";

export interface ButtonProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: string | StyleProp<ViewStyle>;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  textStyle?: string;
  activeOpacity?: number;
  image?: ImageSourcePropType;
  imagePosition?: "left" | "right";
}
