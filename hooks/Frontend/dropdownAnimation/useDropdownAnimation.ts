import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const useDropdownAnimation = (
  isOpen: boolean,
  maxHeight: number = 100,
  duration: number = 250
) => {
  const heightRef = useRef(new Animated.Value(0));
  const opacityRef = useRef(new Animated.Value(0));

  const animatedHeight = heightRef.current;
  const animatedOpacity = opacityRef.current;

  useEffect(() => {
    const animations = [
      Animated.timing(animatedHeight, {
        toValue: isOpen ? maxHeight : 0,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: isOpen ? 1 : 0,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ];

    Animated.parallel(animations).start();
  }, [isOpen, maxHeight, duration, animatedHeight, animatedOpacity]);

  return { animatedHeight, animatedOpacity };
};
