import { useRef, useState } from "react";
import { Animated, Easing } from "react-native";

type AnimatedValuePair = {
  height: Animated.Value;
  opacity: Animated.Value;
};

export default function useAnimationFaq(itemsLength: number, maxHeight = 150) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Buat array animated values untuk tiap item FAQ
  const animatedValues = useRef<AnimatedValuePair[]>(
    Array.from({ length: itemsLength }, () => ({
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  const toggleDropdown = (index: number) => {
    if (openIndex === index) {
      // Tutup dropdown yang sama
      Animated.parallel([
        Animated.timing(animatedValues[index].height, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValues[index].opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => setOpenIndex(null));
    } else {
      if (openIndex !== null) {
        // Tutup dropdown yg terbuka dulu, baru buka yg baru
        Animated.parallel([
          Animated.timing(animatedValues[openIndex].height, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValues[openIndex].opacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setOpenIndex(index);
          Animated.parallel([
            Animated.timing(animatedValues[index].height, {
              toValue: maxHeight,
              duration: 300,
              easing: Easing.out(Easing.ease),
              useNativeDriver: false,
            }),
            Animated.timing(animatedValues[index].opacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: false,
            }),
          ]).start();
        });
      } else {
        // Langsung buka kalau tidak ada yang terbuka
        setOpenIndex(index);
        Animated.parallel([
          Animated.timing(animatedValues[index].height, {
            toValue: maxHeight,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedValues[index].opacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }
  };

  return { openIndex, animatedValues, toggleDropdown };
}
