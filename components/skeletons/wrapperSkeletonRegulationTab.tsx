import React from 'react';
import { View, Animated, ScrollView } from 'react-native';

// HOOK ANIMASI
import { useSkeletonAnimation } from '@/hooks/Frontend/skeletons/useSkeletonAnimation';

export const WrapperSkeletonRegulationTab = () => {
  const skeletonAnimation = useSkeletonAnimation();
  const skeletonItems = Array.from({ length: 3 });
  console.log('Skeleton animation value:', skeletonAnimation);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 15 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Judul */}
      <Animated.View
        style={{
          height: 32,
          width: 200,
          borderRadius: 8,
          backgroundColor: '#ccc',
          marginVertical: 16,
          opacity: skeletonAnimation,
        }}
      />

      {/* Card Regulasi */}
      <View
        style={{
          borderWidth: 2,
          borderColor: '#aaa',
          borderRadius: 8,
          backgroundColor: '#fff',
          padding: 8,
        }}
      >
        <Animated.View
          style={{
            height: 24,
            width: 160,
            borderRadius: 6,
            backgroundColor: '#ccc',
            marginBottom: 12,
            opacity: skeletonAnimation,
          }}
        />
        {skeletonItems.map((_, i) => (
          <View
            key={i}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              backgroundColor: '#f3f3f3',
              padding: 8,
              marginBottom: 8,
            }}
          >
            <Animated.View
              style={{
                height: 14,
                width: '100%',
                borderRadius: 6,
                backgroundColor: '#ccc',
                marginBottom: 6,
                opacity: skeletonAnimation,
              }}
            />
            <Animated.View
              style={{
                height: 10,
                width: '70%',
                borderRadius: 6,
                backgroundColor: '#ccc',
                opacity: skeletonAnimation,
              }}
            />
          </View>
        ))}
      </View>

      {/* Gambar (Alur Layanan & Standar Layanan) */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 32,
        }}
      >
        {[...Array(2)].map((_, i) => (
          <View
            key={i}
            style={{
              width: 180,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#aaa',
              borderRadius: 8,
              backgroundColor: '#fff',
              padding: 8,
            }}
          >
            <Animated.View
              style={{
                height: 160,
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#ccc',
                opacity: skeletonAnimation,
              }}
            />
            <Animated.View
              style={{
                marginTop: 8,
                height: 18,
                width: 120,
                borderRadius: 6,
                backgroundColor: '#ccc',
                opacity: skeletonAnimation,
              }}
            />
          </View>
        ))}
      </View>

      {/* Judul Tarif */}
      <Animated.View
        style={{
          height: 32,
          width: 160,
          borderRadius: 8,
          backgroundColor: '#ccc',
          marginBottom: 16,
          opacity: skeletonAnimation,
        }}
      />

      {/* Card Tarif Pelayanan */}
      <View style={{ gap: 24, paddingHorizontal: 8 }}>
        {skeletonItems.map((_, i) => (
          <View
            key={i}
            style={{
              borderWidth: 1,
              borderColor: '#aaa',
              borderRadius: 8,
              backgroundColor: '#fff',
              padding: 12,
            }}
          >
            <Animated.View
              style={{
                height: 16,
                width: '75%',
                borderRadius: 6,
                backgroundColor: '#ccc',
                marginBottom: 12,
                opacity: skeletonAnimation,
              }}
            />
            <Animated.View
              style={{
                height: 40,
                width: '100%',
                borderRadius: 8,
                backgroundColor: '#ddd',
                marginBottom: 12,
                opacity: skeletonAnimation,
              }}
            />
            <Animated.View
              style={{
                height: 10,
                width: '50%',
                borderRadius: 6,
                backgroundColor: '#ccc',
                opacity: skeletonAnimation,
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
