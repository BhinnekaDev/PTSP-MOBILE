import { View, Animated, ScrollView } from 'react-native';

// OUR HOOKS
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonHome = () => {
  const skeletonAnimation = useSkeletonAnimation();

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
    >
      {/* Placeholder teks welcome */}
      <Animated.View
        style={{
          height: 24,
          width: '60%',
          borderRadius: 6,
          backgroundColor: '#ccc',
          marginTop: 16,
          marginBottom: 8,
          opacity: skeletonAnimation,
        }}
      />
      <Animated.View
        style={{
          height: 16,
          width: '80%',
          borderRadius: 6,
          backgroundColor: '#ccc',
          marginBottom: 20,
          opacity: skeletonAnimation,
        }}
      />

      {/* Placeholder banner */}
      <Animated.View
        style={{
          height: 160,
          width: '100%',
          borderRadius: 12,
          backgroundColor: '#ccc',
          marginBottom: 20,
          opacity: skeletonAnimation,
        }}
      />

      {/* Placeholder tombol/shortcut 1 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 16,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <Animated.View
            key={i}
            style={{
              height: 80,
              width: 80,
              borderRadius: 12,
              backgroundColor: '#ccc',
              opacity: skeletonAnimation,
            }}
          />
        ))}
      </View>

      {/* Placeholder layanan info horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        {[...Array(3)].map((_, i) => (
          <Animated.View
            key={i}
            style={{
              height: 120,
              width: 120,
              borderRadius: 12,
              backgroundColor: '#ccc',
              marginRight: 12,
              opacity: skeletonAnimation,
            }}
          />
        ))}
      </ScrollView>

      {/* Placeholder layanan jasa horizontal scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[...Array(3)].map((_, i) => (
          <Animated.View
            key={i}
            style={{
              height: 120,
              width: 120,
              borderRadius: 12,
              backgroundColor: '#ccc',
              marginRight: 12,
              opacity: skeletonAnimation,
            }}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};
