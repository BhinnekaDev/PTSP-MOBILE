import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Animated } from "react-native";

export default function useAnimationButtonPlus() {
  const { triggerSubmission } = useLocalSearchParams();
  const [showButtonPlus, setShowButtonPlus] = useState(false);

  const animatedValue = useRef(new Animated.Value(-100)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (triggerSubmission === "true") {
      setShowButtonPlus(true);
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [triggerSubmission, animatedValue, animatedOpacity]);

  return { showButtonPlus, animatedValue, animatedOpacity };
}
