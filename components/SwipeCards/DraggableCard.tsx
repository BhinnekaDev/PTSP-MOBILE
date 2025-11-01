// components/SwipeCards/DraggableCard.tsx
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

// Gunakan height responsive
const SNAP = {
  CLOSED: hp('60%'), // posisi paling bawah
  HALF: hp('30%'), // posisi tengah
  OPEN: hp('10%'), // posisi terbuka atas
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

  const bottomLimit = SNAP.CLOSED + index * hp('10%');

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
      translateY.value = withSpring(target, {
        damping: 18,
        stiffness: 120,
      });
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
            borderTopLeftRadius: wp('5%'),
            borderTopRightRadius: wp('5%'),
            overflow: 'hidden',
          },
          aStyle,
        ]}
      >
        <View className={className} style={{ flex: 1 }}>
          {/* Handle */}
          <View
            style={{
              alignItems: 'center',
              paddingVertical: hp('1%'),
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
          >
            <View
              style={{
                height: hp('0.8%'),
                width: wp('12%'),
                borderRadius: wp('2%'),
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            />
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={{ flex: 1, maxHeight: hp('80%') }}
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
