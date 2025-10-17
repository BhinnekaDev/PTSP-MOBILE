import React from 'react';
import { View, Text } from 'react-native';

// Components
import NavbarForTabs from '@/components/navbarForTabs';
import TabNavigator from '@/components/TabNavigator';

// Hooks
import { useInternetStatus } from '@/hooks/Backend/useInternetStatus';

export default function TabsLayout() {
  const { isConnected } = useInternetStatus();

  return (
    <View className="flex-1">
      <NavbarForTabs />
      <TabNavigator />
      {!isConnected && (
        <View
          className="absolute bottom-0 w-full bg-red-600 p-2"
          style={{ zIndex: 1000 }}
        >
          <Text className="font-LexBold text-center text-white">
            Tidak ada koneksi internet
          </Text>
        </View>
      )}
    </View>
  );
}
