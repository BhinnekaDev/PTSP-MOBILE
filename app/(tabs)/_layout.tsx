import React, { useState } from "react";
import { Tabs } from "expo-router";

// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabNavigator() {
  const [jumlahNotifikasiPesanan] = useState(3);
  const [jumlahFavoritBaru] = useState(2);

  const tabConfig: Record<
    string,
    {
      iconActive: keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome.glyphMap;
      iconInactive: keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome.glyphMap;
      label: string;
      lib?: "Ionicons" | "FontAwesome" | "AntDesign";
    }
  > = {
    home: {
      iconActive: "home",
      iconInactive: "home-outline",
      label: "Beranda",
      lib: "Ionicons",
    },
    regulation: {
      iconActive: "file-tray-full",
      iconInactive: "file-tray-full-outline",
      label: "Regulasi",
      lib: "Ionicons",
    },
    product: {
      iconActive: "bag-handle",
      iconInactive: "bag-handle-outline",
      label: "Produk",
      lib: "Ionicons",
    },
    faq: {
      iconActive: "comments",
      iconInactive: "comments-o",
      label: "Faq",
      lib: "FontAwesome",
    },
    profile: {
      iconActive: "person",
      iconInactive: "person-outline",
      label: "Profil",
      lib: "Ionicons",
    },
  };

  return (
    <Tabs
      screenOptions={({ route }) => {
        const config = tabConfig[route.name] || {
          iconActive: "ellipse",
          iconInactive: "ellipse-outline",
          label: route.name.charAt(0).toUpperCase() + route.name.slice(1),
          lib: "Ionicons",
        };

        let badgeCount: number | undefined = undefined;
        if (route.name === "order" && jumlahNotifikasiPesanan > 0) {
          badgeCount = jumlahNotifikasiPesanan;
        } else if (route.name === "favorite" && jumlahFavoritBaru > 0) {
          badgeCount = jumlahFavoritBaru;
        }

        return {
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? config.iconActive : config.iconInactive;

            switch (config.lib) {
              case "FontAwesome":
                return <FontAwesome name={iconName as keyof typeof FontAwesome.glyphMap} size={size} color={color} />;
              case "AntDesign":
                return <AntDesign name={iconName as keyof typeof AntDesign.glyphMap} size={size} color={color} />;
              default:
                return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
            }
          },
          headerShown: false,
          tabBarStyle: {
            height: 70,
            backgroundColor: "#1475BA",
            borderTopWidth: 0,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            position: "absolute",
            overflow: "hidden",
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
