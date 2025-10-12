// hooks/usePopupAnimation.ts
import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const usePopupDetailProductAnimation = () => {
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const closePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setActivePopupIndex(null));
  };

  const togglePopup = (index: number) => {
    if (activePopupIndex === index) {
      closePopup();
    } else {
      setActivePopupIndex(index);
    }
  };

  useEffect(() => {
    if (activePopupIndex !== null) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [activePopupIndex, fadeAnim]);

  return {
    activePopupIndex,
    togglePopup,
    closePopup,
    fadeAnim,
  };
};
