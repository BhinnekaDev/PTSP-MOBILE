import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function consultingServiceRates() {
  const router = useRouter();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  type TableItem =
    | { type: "header"; columns: string[] }
    | { type: "section"; title: string }
    | { type: "row"; columns: string[] };

  const data: TableItem[] = [
    {
      type: "header",
      columns: ["JENIS PENERIMAAN NEGARA BUKAN PAJAK", "SATUAN", "TARIF"],
    },
    {
      type: "section",
      title: "A. JASA KONSULTASI METEOROLOGI",
    },
    {
      type: "row",
      columns: [
        "INFORMASI METEOROLOGI KHUSUS UNTUK PENDUKUNG KEGIATAN PROYEK, SURVEI, DAN PENELITIAN KOMERSIAL",
        "PER LOKASI",
        "Rp 3.750.000,00",
      ],
    },
    {
      type: "section",
      title: "B. JASA KONSULTASI KLIMATOLOGI",
    },
    {
      type: "row",
      columns: ["ANALISIS IKLIM", "PER LOKASI", "Rp 9.500.000,00"],
    },
    {
      type: "section",
      title: "B. JASA KONSULTASI GEOFISIKA",
    },
    {
      type: "row",
      columns: [
        "INFORMASI PENDAHULUAN DI BIDANG GEOFISIKA SEBAGAI PENDUKUNG KEGIATAN PROYEK, SURVEI, DAN PENELITIAN KOMERSIAL",
        "PER LOKASI",
        "Rp 12.300.000,00",
      ],
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="bg-[#1475BA] flex-row w-full items-center pt-7 px-4 pb-1 rounded-b-[10px] shadow-md">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full p-1 mr-3"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "LexBold" }} className="text-white text-xl">
          Tarif Jasa Konsultasi
        </Text>
      </View>

      <ScrollView horizontal className="flex-1 pl-8 py-3">
        <ScrollView>
          <View>
            {data.map((item, index) => {
              if (item.type === "header" && item.columns) {
                return (
                  <View
                    key={index}
                    className="flex-row bg-[#F0F0F0] border-b border-gray-300"
                  >
                    {item.columns.map((cell, i) => (
                      <Text
                        key={i}
                        className={`p-2 text-sm border-r border-gray-200 ${
                          i === 0 ? "w-[500px]" : "w-[200px]"
                        }`}
                      >
                        {cell}
                      </Text>
                    ))}
                  </View>
                );
              }

              if (item.type === "section") {
                return (
                  <View
                    key={index}
                    className="bg-gray-300 border-b border-gray-300 w-full"
                  >
                    <Text className="p-2 text-sm font-bold">{item.title}</Text>
                  </View>
                );
              }

              if (item.type === "row" && item.columns) {
                return (
                  <View
                    key={index}
                    className="flex-row border-b border-gray-200"
                  >
                    {item.columns.map((cell, i) => (
                      <Text
                        key={i}
                        className={`p-2 text-sm border-r border-gray-200 ${
                          i === 0 ? "w-[500px]" : "w-[200px]"
                        }`}
                      >
                        {cell}
                      </Text>
                    ))}
                  </View>
                );
              }

              return null;
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
