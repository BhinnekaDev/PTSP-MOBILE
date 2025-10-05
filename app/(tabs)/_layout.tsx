import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabNavigator() {
  const [jumlahNotifikasiPesanan] = useState(3);
  const [jumlahFavoritBaru] = useState(2);
  const tabOrder = ['home', 'regulation', 'product', 'faq', 'profile'];
  const bounceValues = useRef(
    tabOrder.map(() => new Animated.Value(0))
  ).current;
  const runBounceAnimation = () => {
    const animations = bounceValues.map((value) =>
      Animated.sequence([
        Animated.timing(value, {
          toValue: -25,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(150, animations).start();
  };

  useEffect(() => {
    runBounceAnimation();
  }, []);

  const tabConfig: Record<
    string,
    {
      iconActive:
        | keyof typeof Ionicons.glyphMap
        | keyof typeof FontAwesome.glyphMap;
      iconInactive:
        | keyof typeof Ionicons.glyphMap
        | keyof typeof FontAwesome.glyphMap;
      label: string;
      lib?: 'Ionicons' | 'FontAwesome' | 'AntDesign';
    }
  > = {
    home: {
      iconActive: 'home',
      iconInactive: 'home-outline',
      label: 'Beranda',
      lib: 'Ionicons',
    },
    regulation: {
      iconActive: 'file-tray-full',
      iconInactive: 'file-tray-full-outline',
      label: 'Regulasi',
      lib: 'Ionicons',
    },
    product: {
      iconActive: 'bag-handle',
      iconInactive: 'bag-handle-outline',
      label: 'Produk',
      lib: 'Ionicons',
    },
    faq: {
      iconActive: 'comments',
      iconInactive: 'comments-o',
      label: 'Faq',
      lib: 'FontAwesome',
    },
    profile: {
      iconActive: 'person',
      iconInactive: 'person-outline',
      label: 'Profil',
      lib: 'Ionicons',
    },
  };

  return (
    <Tabs
      screenOptions={({ route }) => {
        const config = tabConfig[route.name] || {
          iconActive: 'ellipse',
          iconInactive: 'ellipse-outline',
          label: route.name.charAt(0).toUpperCase() + route.name.slice(1),
          lib: 'Ionicons',
        };

        let badgeCount: number | undefined = undefined;
        if (route.name === 'order' && jumlahNotifikasiPesanan > 0) {
          badgeCount = jumlahNotifikasiPesanan;
        } else if (route.name === 'favorite' && jumlahFavoritBaru > 0) {
          badgeCount = jumlahFavoritBaru;
        }

        return {
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20, // jarak dari bawah layar
            left: 40, // jarak dari kiri layar
            right: 40,
            height: 70,
            backgroundColor: '#1475BA',
            borderRadius: 35, // lengkung semua sisi
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5, // Android shadow
            marginLeft: 10,
            marginRight: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            fontFamily: 'LexSemiBold',
          },
          tabBarLabel: config.label,
          tabBarActiveTintColor: '#32CD32',
          tabBarInactiveTintColor: '#ffffff',
          tabBarBadge: badgeCount,
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: 'white',
            fontSize: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            const index = tabOrder.indexOf(route.name);
            const bounce = bounceValues[index];
            const iconName = focused ? config.iconActive : config.iconInactive;

            return (
              <Animated.View
                style={{
                  transform: [{ translateY: bounce }],
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: focused ? '#32CD32' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: focused ? 'absolute' : 'relative',
                  top: focused ? -30 : 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 3,
                  elevation: focused ? 5 : 0,
                }}
              >
                {config.lib === 'FontAwesome' ? (
                  <FontAwesome
                    name={iconName as any}
                    size={size}
                    color={focused ? 'white' : color}
                  />
                ) : config.lib === 'AntDesign' ? (
                  <AntDesign
                    name={iconName as any}
                    size={size}
                    color={focused ? 'white' : color}
                  />
                ) : (
                  <Ionicons
                    name={iconName as any}
                    size={size}
                    color={focused ? 'white' : color}
                  />
                )}
              </Animated.View>
            );
          },
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="regulation" />
      <Tabs.Screen name="product" />
      <Tabs.Screen name="faq" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
