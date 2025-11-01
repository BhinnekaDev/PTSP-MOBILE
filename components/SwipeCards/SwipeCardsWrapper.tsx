import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DraggableCard from './DraggableCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_Y = SCREEN_HEIGHT - hp(35); // sekitar 45% dari tinggi layar, bisa disesuaikan

const SPACING = hp(6);

export default function SwipeCardsWrapper({ children }: any) {
  const cards = React.Children.toArray(children);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {cards
          .map((child, i) => ({ child, i }))
          .reverse()
          .map(({ child, i }, renderIndex) => {
            const stackIndex = renderIndex;
            const zIndex = stackIndex + 1;
            const offsetY = BASE_Y + stackIndex * SPACING;

            const childProps = (child as any).props || {};
            const className = childProps.className || '';

            return (
              <DraggableCard
                key={i}
                zIndex={zIndex}
                index={stackIndex}
                offsetY={offsetY}
                className={className}
              >
                {React.cloneElement(child as any, {
                  style: [{ flex: 1, padding: 20 }, childProps.style],
                })}
              </DraggableCard>
            );
          })}
      </View>
    </GestureHandlerRootView>
  );
}
