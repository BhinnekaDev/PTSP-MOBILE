import { ReactNode } from "react";
export interface SettingProfileProps {
  value?: string;
  label?: string;
  text?: string;
  containerStyle?: string;
  labelClassName?: string;
  iconStyle?: string;
  dividerStyle?: string;
  onPress?: () => void;
  iconComponent?: ReactNode;
  isWrapperButton?: boolean;
}
