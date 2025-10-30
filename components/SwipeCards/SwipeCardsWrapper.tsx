// components/SwipeCards/SwipeCardsWrapper.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Dimensions } from 'react-native';
import DraggableCard from './DraggableCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_Y = SCREEN_HEIGHT - 350;
const SPACING = 50;

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

            // Ambil className dari child
            const childProps = (child as any).props || {};
            const className = childProps.className || '';

            return (
              <DraggableCard
                key={i}
                zIndex={zIndex}
                index={stackIndex}
                offsetY={offsetY}
                className={className} // 👈 Teruskan className ke DraggableCard
              >
                {/* Render children TANPA menghapus style/className */}
                {React.cloneElement(child as any, {
                  // Hanya tambah padding, jangan hapus style yang lain
                  style: [{ flex: 1, padding: 20 }, childProps.style],
                })}
              </DraggableCard>
            );
          })}
      </View>
    </GestureHandlerRootView>
  );
}
