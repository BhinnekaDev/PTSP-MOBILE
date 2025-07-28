import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

type AnimatedValuePair = {
  height: Animated.Value;
  opacity: Animated.Value;
};

export default function useAnimationFaq(itemsLength: number, maxHeight = 150) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [measuredHeights, setMeasuredHeights] = useState<number[]>(() =>
    Array(itemsLength).fill(0)
  );

  // Animated value per FAQ item
  const animatedValues = useRef<AnimatedValuePair[]>(
    Array.from({ length: itemsLength }, () => ({
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  // Simpan tinggi hasil layout (ditambah padding vertical 20)
  const onContentLayout = (index: number, height: number) => {
    setMeasuredHeights((prev) => {
      const updated = [...prev];
      updated[index] = height + 20;
      return updated;
    });
  };

  const toggleDropdown = (index: number) => {
    const contentHeight = Math.min(measuredHeights[index], maxHeight);

    const animateOpen = () => {
      setOpenIndex(index);
      Animated.parallel([
        Animated.timing(animatedValues[index].height, {
          toValue: contentHeight,
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
    };

    const animateClose = (i: number, onFinished?: () => void) => {
      Animated.parallel([
        Animated.timing(animatedValues[i].height, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValues[i].opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start(onFinished);
    };

    if (openIndex === index) {
      animateClose(index, () => setOpenIndex(null));
    } else {
      if (openIndex !== null) {
        animateClose(openIndex, animateOpen);
      } else {
        animateOpen();
      }
    }
  };

  return {
    openIndex,
    animatedValues,
    toggleDropdown,
    onContentLayout,
    measuredHeights,
  };
}
