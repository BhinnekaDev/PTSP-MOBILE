import React from 'react';
import { View, Text } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { useInternetStatus } from '@/hooks/Backend/useInternetStatus';
import NavbarForScreens from '@/components/navbarForScreens';

export default function ScreensLayout() {
  const pathname = usePathname();
  const { isConnected } = useInternetStatus();

  // 🚫 Daftar halaman yang tidak butuh navbar
  const hideNavbarScreens = [
    '/screens/loginScreen',
    '/screens/splashScreen',
    '/screens/welcomeScreen',
    '/screens/successOrderScreen',
  ];

  // ⛔ Jika termasuk halaman tanpa navbar
  const shouldHideNavbar = hideNavbarScreens.some((path) =>
    pathname.includes(path)
  );

  return (
    <View className="flex-1 bg-[#A7CBE5]">
      {/* Tampilkan NavbarForScreens hanya jika tidak disembunyikan */}
      {!shouldHideNavbar && <NavbarForScreens />}

      {/* Stack untuk halaman */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Notifikasi koneksi internet */}
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
