import { useState, useRef } from 'react';
import { Animated } from 'react-native';

export const useScrollHeaderAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerVisible, setHeaderVisible] = useState(true);

  const headerHeight = 200;
  const triggerPoint = headerHeight / 2; // 100px

  const onScroll = useRef(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > triggerPoint && headerVisible) {
          setHeaderVisible(false);
        } else if (offsetY <= triggerPoint && !headerVisible) {
          setHeaderVisible(true);
        }
      },
      useNativeDriver: false,
    })
  ).current;

  // Animasi translate KE BAWAH (bukan ke atas)
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, triggerPoint, headerHeight],
    outputRange: [0, 0, headerHeight], // Positive value untuk ke bawah
    extrapolate: 'clamp',
  });

  // Animasi opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, triggerPoint, headerHeight],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  // Animasi scale (zoom out)
  const headerScale = scrollY.interpolate({
    inputRange: [0, triggerPoint, headerHeight],
    outputRange: [1, 0.9, 0.7], // Zoom out dari 1 -> 0.9 -> 0.7
    extrapolate: 'clamp',
  });

  return {
    onScroll,
    headerTranslate,
    headerOpacity,
    headerScale,
    headerVisible,
  };
};
