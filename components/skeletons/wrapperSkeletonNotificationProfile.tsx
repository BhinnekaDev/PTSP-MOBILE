import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonNotificationProfile = () => {
  const skeletonAnim = useSkeletonAnimation();

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* HEADER */}
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 24,
          paddingBottom: 16,
          paddingTop: 52,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 4,
        }}
      >
        {/* Back Button */}
        <Animated.View
          style={{
            height: 40,
            width: 120,
            borderRadius: 20,
            backgroundColor: '#E5E7EB',
            opacity: skeletonAnim,
          }}
        />

        {/* Title */}
        <Animated.View
          style={{
            height: 26,
            width: 150,
            borderRadius: 6,
            backgroundColor: '#E5E7EB',
            marginTop: 14,
            opacity: skeletonAnim,
            alignSelf: 'center',
          }}
        />

        {/* Subtitle */}
        <Animated.View
          style={{
            height: 20,
            width: 180,
            borderRadius: 6,
            backgroundColor: '#E5E7EB',
            marginTop: 10,
            opacity: skeletonAnim,
            alignSelf: 'center',
          }}
        />
      </View>

      {/* BODY */}
      <ScrollView
        style={{ flex: 1, marginTop: 20, marginHorizontal: 24 }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 4,
          }}
        >
          {/* ITEM 1 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Animated.View
              style={{
                height: 20,
                width: 120,
                borderRadius: 6,
                backgroundColor: '#E5E7EB',
                opacity: skeletonAnim,
              }}
            />

            <Animated.View
              style={{
                height: 32,
                width: 50,
                borderRadius: 16,
                backgroundColor: '#E5E7EB',
                opacity: skeletonAnim,
              }}
            />
          </View>

          {/* ITEM 2 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Animated.View
              style={{
                height: 20,
                width: 90,
                borderRadius: 6,
                backgroundColor: '#E5E7EB',
                opacity: skeletonAnim,
              }}
            />

            <Animated.View
              style={{
                height: 32,
                width: 50,
                borderRadius: 16,
                backgroundColor: '#E5E7EB',
                opacity: skeletonAnim,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
