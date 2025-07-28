import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
  isOpen: boolean;
};

export default function SwipeableRow({ children, onDelete, isOpen }: Props) {
  const translateX = useSharedValue(0);
  const maxSwipe = -60;

  useEffect(() => {
    translateX.value = withSpring(isOpen ? maxSwipe : 0, {
      damping: 15,
    });
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="relative mb-3">
      {/* Delete background button */}
      <View className="absolute right-0 top-0 z-0 h-[163px] w-24 items-center justify-center rounded-xl bg-red-600">
        <TouchableOpacity
          onPress={onDelete}
          className="mr-4 h-full w-full items-end justify-center"
        >
          <Image
            source={require('@/assets/images/CartScreen/Trash-Order.png')}
            className="h-14 w-14"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Swipeable area — now animated only, no gesture */}
      <Animated.View
        style={animatedStyle}
        className="z-10 overflow-hidden rounded-xl"
      >
        {children}
      </Animated.View>
    </View>
  );
}
