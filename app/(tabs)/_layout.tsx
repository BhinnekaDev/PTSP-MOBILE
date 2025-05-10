import React, { useState } from "react";
import { Tabs } from "expo-router";

// OUR ICON
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function TabNavigator() {
  const [jumlahNotifikasiPesanan] = useState(3);
  const [jumlahFavoritBaru] = useState(2);

  const tabConfig: Record<string, { name: keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome5.glyphMap | keyof typeof AntDesign.glyphMap; label: string }> = {
    home: {
      name: "home-outline",
      label: "Beranda",
    },
    regulation: {
      name: "file-tray-full-outline",
      label: "Regulasi",
    },
    product: {
      name: "bag-handle-outline",
      label: "Produk",
    },
    faq: {
      name: "comments", // Ganti dengan nama ikon FontAwesome5
      label: "Faq",
    },
    profile: {
      name: "person-outline",
      label: "Profil",
    },
  };

  return (
    <Tabs
      screenOptions={({ route }) => {
        const config = tabConfig[route.name] || {
          name: "ellipse-outline",
          backgroundColor: "#1475BA",
          label: route.name.charAt(0).toUpperCase() + route.name.slice(1),
        };

        let badgeCount: number | undefined = undefined;
        if (route.name === "order" && jumlahNotifikasiPesanan > 0) {
          badgeCount = jumlahNotifikasiPesanan;
        } else if (route.name === "favorite" && jumlahFavoritBaru > 0) {
          badgeCount = jumlahFavoritBaru;
        }

        return {
          tabBarIcon: ({ color, size }) => {
            if (route.name === "faq") {
              return <FontAwesome5 name={config.name as keyof typeof FontAwesome5.glyphMap} size={size} color={color} />;
            }
            return <Ionicons name={config.name as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
          },
          headerShown: false,
          tabBarStyle: {
            height: 70,
            backgroundColor: "#1475BA",
            borderTopWidth: 0,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            position: "absolute", // penting supaya radius terlihat clean
            overflow: "hidden", // penting supaya anak-anaknya tidak keluar dari radius
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "LexSemiBold",
          },
          tabBarLabel: config.label,
          tabBarActiveTintColor: "#32CD32",
          tabBarInactiveTintColor: "#ffffff",
          tabBarBadge: badgeCount,
          tabBarBadgeStyle: {
            backgroundColor: "red",
            color: "white",
            fontSize: 10,
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
