import { View, Animated, ScrollView, ImageBackground } from 'react-native';
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonCartOrderScreen = ({ count = 3 }) => {
  const pulseAnim = useSkeletonAnimation();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 70,
        paddingHorizontal: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      {[...Array(count)].map((_, i) => (
        <Animated.View
          key={i}
          style={{
            opacity: pulseAnim,
            marginBottom: 20,
          }}
        >
          <ImageBackground
            className="relative gap-5 rounded-md p-6 shadow"
            style={{ overflow: 'hidden', borderRadius: 10 }}
            source={require('@/assets/images/ProductScreen/bg-icon.png')}
            resizeMode="cover"
          >
            <View className="absolute right-3 top-3 h-4 w-[50px] rounded bg-gray-300" />
            <View className="flex-row items-center pt-5">
              <View className="h-[68px] w-[68px] rounded-full bg-gray-300" />
              <View className="ml-4 h-4 flex-1 rounded bg-gray-300" />
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-5">
                <View className="h-[24px] w-[24px] rounded-full bg-gray-300" />
                <View className="h-[16px] w-[40px] rounded bg-gray-300" />
                <View className="h-[24px] w-[24px] rounded-full bg-gray-300" />
              </View>
              <View className="h-[16px] w-[80px] rounded bg-gray-300" />
            </View>
          </ImageBackground>
        </Animated.View>
      ))}
    </ScrollView>
  );
};
