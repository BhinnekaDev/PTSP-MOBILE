import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SNAP = {
  CLOSED: SCREEN_HEIGHT - 350,
  HALF: SCREEN_HEIGHT / 2,
  OPEN: 80,
};

const CARD_HEIGHT = SCREEN_HEIGHT;
const BOTTOM_LIMITS = {
  CARD_1: SNAP.CLOSED,
  CARD_2: SNAP.CLOSED + 50,
  CARD_3: SNAP.CLOSED + 100,
};

const findNearest = (value: number, points: number[]) => {
  'worklet';
  let nearest = points[0];
  let minDist = Math.abs(value - points[0]);
  for (let i = 1; i < points.length; i++) {
    const d = Math.abs(value - points[i]);
    if (d < minDist) {
      minDist = d;
      nearest = points[i];
    }
  }
  return nearest;
};

function DraggableCard({
  zIndex,
  initialOffset,
  color,
  children,
  cardType,
}: any) {
  const translateY = useSharedValue(initialOffset);
  const scrollViewRef = React.useRef(null);
  const isScrollEnabled = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
      isScrollEnabled.value = translateY.value <= SNAP.HALF;
    },
    onActive: (event, ctx) => {
      if (
        isScrollEnabled.value &&
        Math.abs(event.translationY) < Math.abs(event.translationX)
      ) {
        return;
      }

      const next = ctx.startY + event.translationY;
      let minY = SNAP.OPEN;
      let maxY = SNAP.CLOSED + 50;

      switch (cardType) {
        case 'card1':
          maxY = BOTTOM_LIMITS.CARD_1;
          break;
        case 'card2':
          maxY = BOTTOM_LIMITS.CARD_2;
          break;
        case 'card3':
          maxY = BOTTOM_LIMITS.CARD_3;
          break;
      }

      translateY.value = Math.max(minY, Math.min(next, maxY));
    },
    onEnd: (event) => {
      const projected = translateY.value + event.velocityY * 0.2;
      let snapPoints = [SNAP.OPEN, SNAP.HALF];

      switch (cardType) {
        case 'card1':
          snapPoints.push(BOTTOM_LIMITS.CARD_1);
          break;
        case 'card2':
          snapPoints.push(BOTTOM_LIMITS.CARD_2);
          break;
        case 'card3':
          snapPoints.push(BOTTOM_LIMITS.CARD_3);
          break;
      }

      const target = findNearest(projected, snapPoints);
      translateY.value = withSpring(target, { damping: 18, stiffness: 120 });
    },
  });

  const aStyle = useAnimatedStyle(() => ({
    height: CARD_HEIGHT,
    transform: [{ translateY: translateY.value }],
  }));

  const scrollViewStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      pointerEvents: translateY.value <= SNAP.HALF ? 'auto' : 'none',
    };
  });

  // Map color to Tailwind classes
  const getCardColorClass = (color: string) => {
    switch (color) {
      case '#2ecc71':
        return 'bg-green-500';
      case '#3498db':
        return 'bg-blue-500';
      case '#ffffff':
        return 'bg-white';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        className={`absolute left-0 right-0 overflow-hidden rounded-t-2xl shadow-lg ${getCardColorClass(color)}`}
        style={[{ zIndex }, aStyle]}
      >
        <View className="items-center rounded-t-2xl bg-white/20 py-2.5">
          <View className="h-1.5 w-12 rounded-full bg-black/30" />
        </View>
        <Animated.View style={scrollViewStyle}>
          <ScrollView
            ref={scrollViewRef}
            className="flex-1"
            contentContainerClassName="p-5 pb-25"
            showsVerticalScrollIndicator={true}
            bounces={true}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default function SwipeCardsScreen() {
  const renderLongContent = (color: string) => {
    // Langsung tentukan text color berdasarkan background color
    const textColorClass = color === '#ffffff' ? 'text-gray-800' : 'text-white';

    return (
      <>
        <Text
          className={`mb-2.5 text-center text-2xl font-bold ${textColorClass}`}
        >
          Card —{' '}
          {color === '#2ecc71'
            ? 'Hijau'
            : color === '#3498db'
              ? 'Biru'
              : 'Putih'}
        </Text>
        <Text
          className={`mb-5 text-center text-sm italic ${textColorClass} opacity-80`}
        >
          Geser handle untuk menggerakkan card, scroll untuk melihat konten
        </Text>

        {Array.from({ length: 30 }).map((_, index) => (
          <View key={index} className="mb-3.5 rounded-lg bg-white/50 p-2.5">
            <Text className={`text-sm leading-5 ${textColorClass}`}>
              Item {index + 1} - Card{' '}
              {color === '#2ecc71'
                ? 'Hijau'
                : color === '#3498db'
                  ? 'Biru'
                  : 'Putih'}
              . Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <View className="my-2 h-px bg-black/10" />
          </View>
        ))}

        <Text
          className={`mt-5 rounded-lg bg-black/5 p-2.5 text-center text-sm font-bold ${textColorClass} opacity-70`}
        >
          ✅ Scroll berhasil! Ini adalah akhir dari konten
        </Text>
      </>
    );
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-gray-200">
        <View className="h-40 justify-center bg-blue-600 px-4 pt-10">
          <Text className="mb-1 text-lg font-bold text-white">
            Header / App content
          </Text>
          <Text className="text-xs text-white/80">
            Drag card dari handle, scroll konten di dalam card
          </Text>
        </View>

        {/* Card 3 (Hijau) - Paling depan */}
        <DraggableCard
          zIndex={3}
          color="#2ecc71"
          initialOffset={BOTTOM_LIMITS.CARD_3}
          cardType="card3"
        >
          {renderLongContent('#2ecc71')}
        </DraggableCard>

        {/* Card 2 (Biru) - Tengah */}
        <DraggableCard
          zIndex={2}
          color="#3498db"
          initialOffset={BOTTOM_LIMITS.CARD_2}
          cardType="card2"
        >
          {renderLongContent('#3498db')}
        </DraggableCard>

        {/* Card 1 (Putih) - Paling belakang */}
        <DraggableCard
          zIndex={1}
          color="#ffffff"
          initialOffset={BOTTOM_LIMITS.CARD_1}
          cardType="card1"
        >
          {renderLongContent('#ffffff')}
        </DraggableCard>
      </View>
    </GestureHandlerRootView>
  );
}
