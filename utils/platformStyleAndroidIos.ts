import { Platform } from 'react-native';

export const getHeaderPaddingVertical = (): string => {
  return (
    Platform.select({
      android: 'py-20 pb-4',
      ios: 'py-20 pb-4',
    }) ?? ''
  );
};
export const getHeightLayoutTabs = (): number => {
  return (
    Platform.select({
      ios: 70,
      android: 105,
      default: 80,
    }) ?? 0
  );
};
