import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SpecialInformationRates() {
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
      title:
        "B. INFORMASI KHUSUS METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA SESUAI PERMINTAAN",
    },
    {
      type: "section",
      title: "1. INFORMASI METEOROLOGI",
    },
    {
      type: "row",
      columns: [
        "A. INFORMASI CUACA KHUSUS UNTUK KEGIATAN OLAH RAGA",
        "PER LOKASI PER HARI",
        "Rp 100.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "B. INFORMASI CUACA KHUSUS UNTUK KEGIATAN KOMERSIAL OUTDOOR/INDOOR",
        "PER LOKASI PER HARI",
        "Rp 100.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "C. INFORMASI RADAR CUACA (PER 10 MENIT)",
        "PER DATA PER HARI",
        "Rp 70.000,00",
      ],
    },
    {
      type: "section",
      title: "2. INFORMASI KLIMATOLOGI",
    },
    {
      type: "section",
      title: "A. INFORMASI IKLIM MARITIM",
    },
    {
      type: "row",
      columns: [
        "1. PETA SPASIAL INFORMASI MARITIM",
        "PER PETA PER BULAN",
        "Rp 300.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "2. INFORMASI TABULAR DAN GRAFIK MARITIM",
        "PER TABEL PER BULAN",
        "Rp 350.000,00",
      ],
    },
    {
      type: "row",
      columns: ["B. ATLAS POTENSI RAWAN BANJIR", "PER ATLAS", "Rp 350.000,00"],
    },
    {
      type: "section",
      title: "3. INFORMASI PERUBAHAN IKLIM DAN KUALITAS UDARA",
    },
    {
      type: "section",
      title: "A. INFORMASI PERUBAHAN IKLIM",
    },
    {
      type: "row",
      columns: [
        "1. PUBLIKASI BERUPA INFORMASI PERUBAHAN IKLIM DAN KUALITAS UDARA",
        "PER BUKU",
        "Rp 100.000,00",
      ],
    },
    {
      type: "section",
      title: "2. ATLAS",
    },
    {
      type: "row",
      columns: ["A. KERENTANAN PERUBAHAN IKLIM", "PER ATLAS", "Rp 450.000,00"],
    },
    {
      type: "row",
      columns: [
        "B. POTENSI ENERGI MATAHARI DI INDONESIA",
        "PER ATLAS",
        "Rp 300.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "C. POTENSI ENERGI ANGIN DI INDONESIA",
        "PER ATLAS",
        "Rp 300.000,00",
      ],
    },
    {
      type: "section",
      title: "B. PENGAMBILAN SAMPEL KUALITAS UDARA",
    },
    {
      type: "row",
      columns: ["1. SULFUR DIOKSIDA (SO₂)", "PER SAMPEL", "Rp 30.000,00"],
    },
    {
      type: "row",
      columns: ["2. NITROGEN OKSIDA (NO₂)", "PER SAMPEL", "Rp 30.000,00"],
    },
    {
      type: "row",
      columns: ["3. KARBON DIOKSIDA (CO₂)", "PER SAMPEL", "Rp 40.000,00"],
    },
    {
      type: "row",
      columns: ["4. OZON (O₃)", "PER SAMPEL", "Rp 30.000,00"],
    },
    {
      type: "row",
      columns: [
        "5. SUSPENDED PARTICULATE MATTER (SPM)",
        "PER SAMPEL",
        "Rp 60.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "6. DEBU PARTICULATE MATTER (PM10)",
        "PER SAMPEL",
        "Rp 60.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "7. DEBU PARTICULATE MATTER (PM2.5)",
        "PER SAMPEL",
        "Rp 90.000,00",
      ],
    },
    {
      type: "row",
      columns: ["8. KIMIA AIR HUJAN", "PER SAMPEL", "Rp 230.000,00"],
    },
    {
      type: "row",
      columns: ["9. METHAN (CH₄)", "PER SAMPEL", "Rp 40.000,00"],
    },
    {
      type: "section",
      title: "C. PENGUJIAN SAMPEL KUALITAS UDARA",
    },
    {
      type: "row",
      columns: ["1. SULFUR DIOKSIDA (SO₂)", "PER SAMPEL", "Rp 20.000,00"],
    },
    {
      type: "row",
      columns: ["2. NITROGEN OKSIDA (NO₂)", "PER SAMPEL", "Rp 20.000,00"],
    },
    {
      type: "row",
      columns: ["3. KARBON DIOKSIDA (CO₂)", "PER SAMPEL", "Rp 30.000,00"],
    },
    {
      type: "row",
      columns: ["4. OZON (O₃)", "PER SAMPEL", "Rp 20.000,00"],
    },
    {
      type: "row",
      columns: [
        "5. SUSPENDED PARTICULATE MATTER (SPM)",
        "PER SAMPEL",
        "Rp 50.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "6. DEBU PARTICULATE MATTER (PM10)",
        "PER SAMPEL",
        "Rp 50.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "7. DEBU PARTICULATE MATTER (PM2.5)",
        "PER SAMPEL",
        "Rp 70.000,00",
      ],
    },
    {
      type: "row",
      columns: ["8. KIMIA AIR HUJAN", "PER SAMPEL", "Rp 240.000,00"],
    },
    {
      type: "row",
      columns: ["9. METHAN (CH₄)", "PER SAMPEL", "Rp 30.000,00"],
    },
    {
      type: "section",
      title: "4. INFORMASI GEOFISIKA",
    },
    {
      type: "row",
      columns: [
        "A. BUKU DAN PETA VARIASI MAGNET BUMI (EPOCH)",
        "PER BUKU",
        "Rp 300.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "B. PETA TINGKAT KERAWANAN PETIR",
        "PER LOKASI PER TAHUN",
        "Rp 200.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "C. WAKTU TERBIT DAN TERBENAM MATAHARI ATAU BULAN",
        "PER LOKASI PER TAHUN",
        "Rp 50.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "D. BUKU ALMANAK BADAN METEOROLOGI KLIMATOLOGI DAN GEOFISIKA",
        "PER BUKU PER TAHUN",
        "Rp 150.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "E. BUKU PETA KETINGGIAN HILAL",
        "PER BUKU PER TAHUN",
        "Rp 150.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "F. TITIK DASAR GAYA BERAT (GRAVITASI)",
        "PER TITIK DASAR GAYA BERAT",
        "Rp 150.000,00",
      ],
    },
    {
      type: "row",
      columns: ["G. KEJADIAN PETIR", "PER LOKASI PER HARI", "Rp 75.000,00"],
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
          Tarif Informasi Khusus
        </Text>
      </View>

      <ScrollView horizontal className="flex-1 pl-8 py-1">
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
                        className="p-2 text-sm font-bold w-[300px] border-r border-gray-200"
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
                    className="flex-row border-b border-gray-300"
                  >
                    {item.columns.map((cell, i) => (
                      <Text
                        key={i}
                        className="p-2 text-sm w-[300px] border-r border-gray-200"
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
