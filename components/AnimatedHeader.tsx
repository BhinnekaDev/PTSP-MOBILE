import React from 'react';
import { View, Text, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface AnimatedHeaderProps {
  profileName: string;
}

const ExpandingDot = ({
  index,
  progress,
  total,
}: {
  index: number;
  progress: Animated.SharedValue<number>;
  total: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = Math.round(progress.value) % total === index;
    return {
      width: withTiming(isActive ? 20 : 8, { duration: 250 }),
      opacity: withTiming(isActive ? 1 : 0.4, { duration: 250 }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: '#ffffff',
          marginHorizontal: 4,
        },
        animatedStyle,
      ]}
    />
  );
};

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  profileName,
}) => {
  const images = [
    require('@/assets/images/HomeScreen/banner-welcome-1.png'),
    require('@/assets/images/HomeScreen/banner-welcome-2.png'),
    require('@/assets/images/HomeScreen/banner-welcome-3.png'),
    require('@/assets/images/HomeScreen/banner-layanan-informasi.png'),
    require('@/assets/images/HomeScreen/banner-layanan-jasa.png'),
    require('@/assets/images/HomeScreen/banner-proses-layanan-ptsp.png'),
  ];

  const progress = useSharedValue(0);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        elevation: 10,
      }}
    >
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

        {/* Banner Carousel */}
        <View className="items-center px-4">
          <View
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden', // penting supaya dot tetap di dalam gambar

              // Shadow mirip custom button
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Carousel
              loop
              autoPlay
              autoPlayInterval={3000}
              width={wp('90%')} // responsive width
              height={hp('22%')} // responsive height
              data={images}
              scrollAnimationDuration={800}
              onProgressChange={(_, absoluteProgress) => {
                progress.value = absoluteProgress;
              }}
              renderItem={({ item }) => (
                <Image
                  source={item}
                  style={{
                    width: wp('90%'),
                    height: hp('22%'),
                    borderRadius: 16,
                    resizeMode: 'cover',
                  }}
                />
              )}
            />

            {/* Expanding Dots Inside Image */}
            <View
              style={{
                position: 'absolute',
                bottom: hp('1.2%'),
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {images.map((_, index) => (
                <ExpandingDot
                  key={index}
                  index={index}
                  progress={progress}
                  total={images.length}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Gap */}
        <View style={{ height: hp('2%'), backgroundColor: 'transparent' }} />
      </View>
    </View>
  );
};
