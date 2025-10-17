import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useSkeletonAnimation = (min = 0.6, max = 1, duration = 800) => {
  const pulseAnim = useRef(new Animated.Value(min)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: max,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: min,
          duration,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [pulseAnim, min, max, duration]);

  return pulseAnim;
};
