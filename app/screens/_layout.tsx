// app/screens/_layout.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { useInternetStatus } from '@/hooks/Backend/useInternetStatus';
import NavbarForScreens from '@/components/navbarForScreens';
import { useGlobalSearch } from '@/hooks/Backend/useGlobalSearch';

export default function ScreensLayout() {
  const pathname = usePathname();
  const { isConnected } = useInternetStatus();

  // ✅ GUNAKAN useGlobalSearch UNTUK SEARCH STATE SAJA
  const { searchQuery, updateSearchQuery } = useGlobalSearch([], {
    searchFields: [],
    enabled: true,
  });

  const handleSearchChange = React.useCallback(
    (query: string) => {
      updateSearchQuery(query);
    },
    [updateSearchQuery]
  );

  const handleSearchSubmit = React.useCallback(() => {
    console.log('🔍 [Layout] Search submitted:', searchQuery);
  }, [searchQuery]);

  // 🚫 Daftar halaman yang tidak butuh navbar
  const hideNavbarScreens = [
    '/screens/loginScreen',
    '/screens/splashScreen',
    '/screens/welcomeScreen',
    '/screens/successOrderScreen',
  ];

  const shouldHideNavbar = hideNavbarScreens.some((path) =>
    pathname.includes(path)
  );

  return (
    <View className="flex-1 bg-[#A7CBE5]">
      {!shouldHideNavbar && (
        <NavbarForScreens
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      )}

      <Stack screenOptions={{ headerShown: false }} />

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
