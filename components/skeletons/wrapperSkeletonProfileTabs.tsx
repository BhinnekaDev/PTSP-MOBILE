import React from 'react';
import { View } from 'react-native';

export const WrapperSkeletonProfileTabs = () => {
  return (
    <View className="w-full px-6">
      {/* Profile Picture */}
      <View className="mx-auto mb-4 h-28 w-28 rounded-full bg-gray-300" />

      {/* Name */}
      <View className="mx-auto mb-1 h-6 w-40 rounded bg-gray-300" />

      {/* Email */}
      <View className="mx-auto mb-6 h-4 w-60 rounded bg-gray-300" />

      {/* Card Menu */}
      <View className="space-y-4 rounded-2xl bg-gray-200 p-4">
        <View className="h-12 w-full rounded-xl bg-gray-300" />
        <View className="h-12 w-full rounded-xl bg-gray-300" />
        <View className="h-12 w-full rounded-xl bg-gray-300" />
      </View>

      {/* Logout Button */}
      <View className="mt-6 h-12 w-full rounded-2xl bg-gray-300" />
    </View>
  );
};
