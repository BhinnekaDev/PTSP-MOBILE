import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DraggableCard from './DraggableCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_Y = SCREEN_HEIGHT - hp(35);
const SPACING = hp(6);

export type SwipeCardsWrapperProps = {
  children: React.ReactNode;
};

export default function SwipeCardsWrapper({
  children,
}: SwipeCardsWrapperProps) {
  const cards = React.Children.toArray(children);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1">
        {cards.map((child, index) => {
          const reverseIndex = cards.length - 1 - index; // Reverse untuk z-index
          const zIndex = reverseIndex + 10; // Tambah baseline z-index
          const offsetY = BASE_Y + reverseIndex * SPACING;

          const childProps = (child as any).props || {};
          const childClassName = childProps.className || '';

          return (
            <DraggableCard
              key={index}
              zIndex={zIndex}
              index={reverseIndex}
              offsetY={offsetY}
              className={childClassName}
            >
              {React.cloneElement(child as any, {
                className: `flex-1 p-5 ${childClassName}`,
              })}
            </DraggableCard>
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
}
