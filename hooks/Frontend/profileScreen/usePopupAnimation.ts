import { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";

type PopupType = "editProfile" | "notificationProfile" | "securityProfile" | null;

export function useProfilePopup() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [animProgress] = useState(() => new Animated.Value(0));
  const [fadeAnim] = useState(() => new Animated.Value(1));
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: activePopup ? "none" : "flex" },
    });
  }, [activePopup, navigation]);

  const handleShowPopup = (type: Exclude<PopupType, null>) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActivePopup(type);
      Animated.timing(animProgress, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  };

  const handleClosePopup = () => {
    Animated.timing(animProgress, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setActivePopup(null);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const animatedWidth = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["80%", "90%"],
  });

  const animatedScaleY = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return {
    activePopup,
    animatedWidth,
    animatedScaleY,
    fadeAnim,
    handleShowPopup,
    handleClosePopup,
  };
}
