import React from 'react';
import { View, Animated, ScrollView } from 'react-native';
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperProductSkeleton = () => {
  const skeletonAnimation = useSkeletonAnimation();
  const skeletonItems = Array.from({ length: 4 });

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 100,
        alignItems: 'center',
        backgroundColor: '#A7CBE5',
      }}
      showsVerticalScrollIndicator={false}
    >
      {skeletonItems.map((_, idx) => (
        <Animated.View
          key={idx}
          style={{
            opacity: skeletonAnimation,
            width: '74%',
            borderRadius: 15,
            borderWidth: 2,
            borderBottomWidth: 4,
            borderColor: 'rgba(0,0,0,0.05)',
            backgroundColor: 'white',
            padding: 14,
            marginTop: 20,
          }}
        >
          {/* Gambar Placeholder */}
          <View
            style={{
              width: '100%',
              height: 125,
              borderRadius: 20,
              backgroundColor: '#e5e7eb',
            }}
          />

          {/* Judul */}
          <View
            style={{
              width: '60%',
              height: 20,
              backgroundColor: '#e5e7eb',
              borderRadius: 6,
              marginTop: 12,
            }}
          />

          {/* Deskripsi */}
          <View
            style={{
              width: '100%',
              height: 12,
              backgroundColor: '#e5e7eb',
              borderRadius: 6,
              marginTop: 8,
            }}
          />
          <View
            style={{
              width: '80%',
              height: 12,
              backgroundColor: '#e5e7eb',
              borderRadius: 6,
              marginTop: 6,
            }}
          />

          {/* Tombol */}
          <View
            style={{
              width: 120,
              height: 32,
              backgroundColor: '#e5e7eb',
              borderRadius: 8,
              marginTop: 16,
              alignSelf: 'flex-start',
            }}
          />
        </Animated.View>
      ))}
    </ScrollView>
  );
};
