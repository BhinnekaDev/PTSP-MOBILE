import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1475BA',
          height: 65,
          borderRadius: 30,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarActiveTintColor: '#32CD32',
        tabBarInactiveTintColor: '#ffffff',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'LexSemiBold',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={focused ? 'white' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="regulation"
        options={{
          title: 'Regulasi',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'file-tray-full' : 'file-tray-full-outline'}
              size={size}
              color={focused ? 'white' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: 'Produk',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'bag-handle' : 'bag-handle-outline'}
              size={size}
              color={focused ? 'white' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: 'FAQ',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name={focused ? 'comments' : 'comments-o'}
              size={size}
              color={focused ? 'white' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={focused ? 'white' : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
