import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonEditProfile = () => {
  const skeletonAnim = useSkeletonAnimation();

  return (
    <View className="flex-1 bg-white">
      {/* <== FIX PENTING DI SINI */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <Animated.View
          style={{
            height: 24,
            width: '50%',
            borderRadius: 6,
            backgroundColor: '#ccc',
            marginBottom: 16,
            opacity: skeletonAnim,
          }}
        />

        {/* Info Pribadi Card */}
        <Animated.View
          style={{
            height: 200,
            borderRadius: 12,
            backgroundColor: '#ccc',
            marginBottom: 20,
            opacity: skeletonAnim,
            padding: 16,
          }}
        >
          {/* Avatar */}
          <Animated.View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: '#bbb',
              marginBottom: 12,
              opacity: skeletonAnim,
            }}
          />

          {/* Input fields */}
          {[...Array(4)].map((_, i) => (
            <Animated.View
              key={i}
              style={{
                height: 40,
                width: '100%',
                borderRadius: 8,
                backgroundColor: '#bbb',
                marginBottom: 12,
                opacity: skeletonAnim,
              }}
            />
          ))}
        </Animated.View>

        {/* Company Card */}
        <Animated.View
          style={{
            height: 300,
            borderRadius: 12,
            backgroundColor: '#ccc',
            opacity: skeletonAnim,
            padding: 16,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <Animated.View
              key={i}
              style={{
                height: 40,
                width: '100%',
                borderRadius: 8,
                backgroundColor: '#bbb',
                marginBottom: 12,
                opacity: skeletonAnim,
              }}
            />
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};
