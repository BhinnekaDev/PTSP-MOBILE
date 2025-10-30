import React from 'react';
import { Animated, View, Text, Image } from 'react-native';

interface AnimatedHeaderProps {
  profileName: string;
  headerTranslate: Animated.AnimatedInterpolation<number>;
  headerOpacity: Animated.AnimatedInterpolation<number>;
  headerScale: Animated.AnimatedInterpolation<number>;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  profileName,
  headerTranslate,
  headerOpacity,
  headerScale,
}) => {
  return (
    <Animated.View
      style={{
        transform: [
          { translateY: headerTranslate },
          { scale: headerScale }, // ✅ TAMBAH SCALE ANIMATION
        ],
        opacity: headerOpacity,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        elevation: 10,
      }}
    >
      {/* Background gradient atau solid color */}
      <View className="pb-4">
        {/* Header Section */}
        <View className="gap-1 px-4 py-4">
          <Text
            style={{ fontFamily: 'LexBold' }}
            className="text-2xl text-black"
          >
            Hai, {profileName}
          </Text>
          <Text style={{ fontFamily: 'LexRegular' }} className="text-black">
            selamat datang di pelayanan terpadu satu pintu!
          </Text>
        </View>

        {/* Banner Section */}
        <View className="w-full items-center px-4">
          <Image
            source={require('@/assets/images/HomeScreen/banner.png')}
            className="h-40 w-full rounded-lg object-cover"
          />
        </View>

        {/* Gap */}
        <View className="h-6 bg-transparent" />
      </View>
    </Animated.View>
  );
};
