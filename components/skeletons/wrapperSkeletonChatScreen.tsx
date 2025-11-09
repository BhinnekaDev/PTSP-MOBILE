import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonChatScreen = () => {
  const pulseAnim = useSkeletonAnimation();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 140,
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Judul skeleton */}
      <View className="flex-row items-center gap-2 px-4 pb-4 pt-6">
        <View className="h-6 w-6 rounded bg-gray-300" />
        <View className="h-6 w-40 rounded bg-gray-300" />
      </View>

      {/* Daftar item skeleton */}
      {[...Array(3)].map((_, i) => (
        <Animated.View
          key={i}
          style={{
            opacity: pulseAnim,
            marginBottom: 12,
          }}
        >
          <View className="flex-row items-center gap-4 rounded-xl bg-white p-3 shadow">
            {/* ICON bulat */}
            <View className="h-12 w-12 rounded-full bg-gray-300" />

            {/* Nama + pesan */}
            <View className="flex-1 gap-2">
              <View className="h-4 w-2/3 rounded bg-gray-300" />
              <View className="h-3 w-full rounded bg-gray-200" />
            </View>

            {/* Date + unread */}
            <View className="items-end gap-2">
              <View className="h-3 w-10 rounded bg-gray-200" />
              <View className="h-4 w-6 rounded-full bg-gray-300" />
            </View>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
};
