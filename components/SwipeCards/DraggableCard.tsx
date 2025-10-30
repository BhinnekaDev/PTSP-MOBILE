// components/SwipeCards/DraggableCard.tsx
import React from 'react';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { Dimensions, View } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SNAP = {
  CLOSED: SCREEN_HEIGHT - 400,
  HALF: SCREEN_HEIGHT / 2,
  OPEN: 80,
};

export default function DraggableCard({
  zIndex,
  offsetY,
  index,
  children,
  className = '',
}: any) {
  const translateY = useSharedValue(offsetY);
  const isScrollEnabled = useSharedValue(false);

  const bottomLimit = SNAP.CLOSED + index * 60;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
      isScrollEnabled.value = translateY.value <= SNAP.HALF;
    },
    onActive: (event, ctx) => {
      const next = ctx.startY + event.translationY;
      translateY.value = Math.max(SNAP.OPEN, Math.min(next, bottomLimit));
    },
    onEnd: (event) => {
      const projected = translateY.value + event.velocityY * 0.2;
      const snapPoints = [SNAP.OPEN, SNAP.HALF, bottomLimit];
      const target = snapPoints.reduce((a, b) =>
        Math.abs(projected - a) < Math.abs(projected - b) ? a : b
      );
      translateY.value = withSpring(target, { damping: 18, stiffness: 120 });
    },
  });

  const aStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    transform: [{ translateY: translateY.value }],
    zIndex,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
          },
          aStyle,
        ]}
      >
        {/* INI YANG PERLU DIPERBAIKI - className harus di sini */}
        <View className={className} style={{ flex: 1 }}>
          {/* Handle */}
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 10,
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
          >
            <View
              style={{
                height: 6,
                width: 40,
                borderRadius: 3,
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            />
          </View>

          {/* Scrollable content */}
          <ScrollView
            style={{ flex: 1, maxHeight: SCREEN_HEIGHT * 0.8 }}
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
