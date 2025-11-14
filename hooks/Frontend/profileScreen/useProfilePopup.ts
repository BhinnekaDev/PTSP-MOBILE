// useProfilePopup.ts - SMOOTH VERSION WITHOUT DIMENSIONS
import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

type PopupType =
  | 'editProfile'
  | 'notificationProfile'
  | 'securityProfile'
  | null;

export function useProfilePopup() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const slideAnim = useRef(new Animated.Value(1000)).current;

  const handleShowPopup = (type: Exclude<PopupType, null>) => {
    setActivePopup(type);
    slideAnim.setValue(1000);

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 16);
  };

  const handleClosePopup = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setActivePopup(null);
    });
  };

  return {
    activePopup,
    translateY: slideAnim,
    handleShowPopup,
    handleClosePopup,
  };
}
