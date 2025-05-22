import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Animated } from "react-native";

export default function useAnimationButtonPLus() {
  const { triggerSubmission } = useLocalSearchParams();
  const [showButtonPlus, seShowButtonPlus] = useState(false);
  const animatedValue = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (triggerSubmission === "true") {
      seShowButtonPlus(true);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [triggerSubmission, animatedValue]);

  return { showButtonPlus, animatedValue };
}
