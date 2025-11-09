import React from 'react';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// =========================
// 🔧 KONSTANTA & CONFIG
// =========================
const SNAP_POINTS = {
  CLOSED: hp('60%'), // posisi paling bawah
  HALF: hp('30%'), // posisi tengah
  OPEN: hp('7%'), // posisi paling atas
};

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 120,
};

// =========================
// 🧩 TYPE DEFINISI
// =========================
export type DraggableCardProps = {
  zIndex: number;
  offsetY: number;
  index: number;
  children: React.ReactNode;
  className?: string;
};

// =========================
// 🧠 COMPONENT
// =========================
export default function DraggableCard({
  zIndex,
  offsetY,
  index,
  children,
  className = '',
}: DraggableCardProps) {
  const translateY = useSharedValue(offsetY);
  const isScrollEnabled = useSharedValue(false);

  const bottomLimit = SNAP_POINTS.CLOSED + index * hp('10%');

  // 🎯 Gesture Handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
      isScrollEnabled.value = translateY.value <= SNAP_POINTS.HALF;
    },
    onActive: (event, ctx) => {
      const nextY = ctx.startY + event.translationY;
      translateY.value = Math.max(
        SNAP_POINTS.OPEN,
        Math.min(nextY, bottomLimit)
      );
    },
    onEnd: (event) => {
      const projected = translateY.value + event.velocityY * 0.2;
      const snapTargets = [SNAP_POINTS.OPEN, SNAP_POINTS.HALF, bottomLimit];
      const closest = snapTargets.reduce((a, b) =>
        Math.abs(projected - a) < Math.abs(projected - b) ? a : b
      );
      translateY.value = withSpring(closest, SPRING_CONFIG);
    },
  });

  // 🎨 Animated Style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    zIndex,
  }));

  // 🧩 Render
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded-t-[5vw] bg-white"
        style={animatedStyle}
      >
        <View className={`${className} flex-1`}>
          {/* Handle bar */}
          <View className="items-center bg-black/5 py-[1%]">
            <View
              style={{
                height: hp('0.8%'),
                width: wp('12%'),
                borderRadius: wp('2%'),
              }}
              className="bg-black/20"
            />
          </View>

          {/* Scrollable content */}
          <ScrollView
            className="flex-1"
            style={{ maxHeight: hp('80%') }}
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
            {children}
          </ScrollView>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}
