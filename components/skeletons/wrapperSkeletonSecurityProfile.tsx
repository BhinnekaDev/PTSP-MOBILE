import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonSecurityProfile = () => {
  const skeletonAnim = useSkeletonAnimation();

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* HEADER SKELETON */}
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
            width: 140,
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

      {/* BODY SKELETON */}
      <ScrollView
        style={{ flex: 1, marginTop: 20, marginHorizontal: 24 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
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
          {/* NO TELEPON */}
          <Animated.View
            style={{
              height: 18,
              width: 120,
              backgroundColor: '#E5E7EB',
              borderRadius: 5,
              opacity: skeletonAnim,
              marginBottom: 10,
            }}
          />

          <Animated.View
            style={{
              height: 45,
              width: '100%',
              backgroundColor: '#E5E7EB',
              borderRadius: 10,
              opacity: skeletonAnim,
              marginBottom: 20,
            }}
          />

          {/* EMAIL */}
          <Animated.View
            style={{
              height: 18,
              width: 90,
              backgroundColor: '#E5E7EB',
              borderRadius: 5,
              opacity: skeletonAnim,
              marginBottom: 10,
            }}
          />

          <Animated.View
            style={{
              height: 45,
              width: '100%',
              backgroundColor: '#E5E7EB',
              borderRadius: 10,
              opacity: skeletonAnim,
              marginBottom: 25,
            }}
          />

          {/* BUTTON TUTUP AKUN */}
          <Animated.View
            style={{
              height: 40,
              width: 120,
              backgroundColor: '#E5E7EB',
              borderRadius: 10,
              opacity: skeletonAnim,
              alignSelf: 'flex-start',
            }}
          />
        </View>
      </ScrollView>

      {/* FOOTER BUTTON SKELETON */}
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderTopWidth: 1,
          borderColor: '#E5E7EB',
        }}
      >
        <Animated.View
          style={{
            height: 56,
            backgroundColor: '#E5E7EB',
            borderRadius: 12,
            width: '100%',
            opacity: skeletonAnim,
          }}
        />

        <Animated.View
          style={{
            height: 18,
            width: 160,
            borderRadius: 5,
            backgroundColor: '#E5E7EB',
            opacity: skeletonAnim,
            marginTop: 10,
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
};
