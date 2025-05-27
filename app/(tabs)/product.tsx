import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

// OUR ICONS
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

// OUR COMPONENTS
import Button from "@/components/button";
import ButtonShopAndChat from "@/components/buttonShopAndChat";

export default function Product() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const allProducts = [
    {
      category: "Informasi",
      icon: <FontAwesome6 name="mountain" size={60} color="#3498DB" />,
      title: "Stasiun Meteorologi",
      desc: "Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.",
      route: "/screens/meteorologyProduct" as const,
    },
    {
      category: "Informasi",
      icon: <FontAwesome6 name="cloud-bolt" size={60} color="#3498DB" />,
      title: "Stasiun Klimatologi",
      desc: "Penelitian dan analisis perubahan\niklim jangka panjang, pola cuaca, dan dampak lingkungan.",
      route: "/screens/climatologyProduct" as const,
    },
    {
      category: "Informasi",
      icon: <Feather name="wind" size={60} color="#3498DB" />,
      title: "Stasiun Geofisika",
      desc: "Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.",
      route: "/screens/geophysicsProduct" as const,
    },
    {
      category: "Jasa",
      icon: <FontAwesome6 name="mountain" size={60} color="#3498DB" />,
      title: "Stasiun Meteorologi",
      desc: "Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.",
      route: "/screens/meteorologyProduct" as const,
    },
    {
      category: "Jasa",
      icon: <FontAwesome6 name="cloud-bolt" size={60} color="#3498DB" />,
      title: "Stasiun Klimatologi",
      desc: "Penelitian dan analisis perubahan\niklim jangka panjang, pola cuaca, dan dampak lingkungan.",
      route: "/screens/climatologyProduct" as const,
    },
    {
      category: "Jasa",
      icon: <Feather name="wind" size={60} color="#3498DB" />,
      title: "Stasiun Geofisika",
      desc: "Pemantauan dan pengamatan kondisi\ncuaca dan atmosfer, termasuk suhu,\nkelembapan, dan tekanan udara.",
      route: "/screens/geophysicsProduct" as const,
    },
  ];

  const filteredProducts = activeCategory === "Semua" ? allProducts : allProducts.filter((item) => item.category === activeCategory);

  return (
    <View className="flex-1">
      <View className="bg-[#1475BA] flex-row justify-between w-full items-center px-4 py-4 rounded-b-[10px] shadow-md">
        <View className="bg-white flex-row justify-between flex-1 items-center pl-3 rounded-full">
          <TextInput className="flex-1 py-1" placeholder="Cari" style={{ fontFamily: "LexRegular" }} />
          <TouchableOpacity activeOpacity={0.5} className="bg-[#72C02C] rounded-full py-2 px-3">
            <Octicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-4 ml-12">
          <ButtonShopAndChat />
        </View>
      </View>

      <View className="flex-row justify-center gap-4 items-center py-2">
        {["Semua", "Informasi", "Jasa"].map((cat) => (
          <TouchableOpacity key={cat} onPress={() => setActiveCategory(cat)} className={`py-2 px-4 rounded-full ${activeCategory === cat ? "bg-[#1475BA]" : "bg-transparent"}`}>
            <Text
              style={{
                fontFamily: "LexBold",
                color: activeCategory === cat ? "white" : "black",
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {activeCategory === "Semua" ? (
          <>
            <Text style={{ fontFamily: "LexBold" }} className="text-lg text-center mt-3">
              Produk Informasi
            </Text>
            <View className="items-center justify-center mt-3 gap-6">
              {allProducts
                .filter((item) => item.category === "Informasi")
                .map((item, idx) => (
                  <View key={`informasi-${idx}`} className="border-2 border-[#6BBC3F] w-80 h-72 rounded-lg items-center justify-center gap-4">
                    {item.icon}
                    <Text style={{ fontFamily: "LexBold" }} className="text-center text-xl">
                      {item.title}
                    </Text>
                    <Text style={{ fontFamily: "LexRegular" }} className="text-center text-sm">
                      {item.desc}
                    </Text>
                    <Button style="bg-[#1475BA] px-6 py-2 rounded-xl" textStyle="text-sm text-white" onPress={() => router.push(item.route)}>
                      Lihat Produk
                    </Button>
                  </View>
                ))}
            </View>

            <Text style={{ fontFamily: "LexBold" }} className="text-lg text-center mt-10">
              Produk Jasa
            </Text>
            <View className="items-center justify-center mt-3 gap-6">
              {allProducts
                .filter((item) => item.category === "Jasa")
                .map((item, idx) => (
                  <View key={`jasa-${idx}`} className="border-2 border-[#6BBC3F] w-80 h-72 rounded-lg items-center justify-center gap-4">
                    {item.icon}
                    <Text style={{ fontFamily: "LexBold" }} className="text-center text-xl">
                      {item.title}
                    </Text>
                    <Text style={{ fontFamily: "LexRegular" }} className="text-center text-sm">
                      {item.desc}
                    </Text>
                    <Button style="bg-[#1475BA] px-6 py-2 rounded-xl" textStyle="text-sm text-white" onPress={() => router.push(item.route)}>
                      Lihat Produk
                    </Button>
                  </View>
                ))}
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontFamily: "LexBold" }} className="text-lg text-center mt-3">
              Produk {activeCategory}
            </Text>
            <View className="items-center justify-center mt-3 gap-6">
              {filteredProducts.map((item, idx) => (
                <View key={idx} className="border-2 border-[#6BBC3F] w-80 h-72 rounded-lg items-center justify-center gap-4">
                  {item.icon}
                  <Text style={{ fontFamily: "LexBold" }} className="text-center text-xl">
                    {item.title}
                  </Text>
                  <Text style={{ fontFamily: "LexRegular" }} className="text-center text-sm">
                    {item.desc}
                  </Text>
                  <Button style="bg-[#1475BA] px-6 py-2 rounded-xl" textStyle="text-sm text-white" onPress={() => router.push(item.route)}>
                    Lihat Produk
                  </Button>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
