import React from 'react';
import { View, ScrollView, Animated } from 'react-native';

// OUR HOOKS
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonFaq = () => {
  const skeletonAnimation = useSkeletonAnimation();
  const skeletonItems = Array.from({ length: 5 });

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      {skeletonItems.map((_, index) => (
        <View key={index} className="mb-4">
          {/* Header pertanyaan */}
          <Animated.View
            style={{
              height: 40,
              borderRadius: 10,
              backgroundColor: '#ccc',
              marginBottom: 8,
              opacity: skeletonAnimation,
            }}
          />

          {/* Jawaban skeleton */}
          <Animated.View
            style={{
              height: 80,
              borderRadius: 8,
              backgroundColor: '#ddd',
              opacity: skeletonAnimation,
              marginLeft: 16,
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};
