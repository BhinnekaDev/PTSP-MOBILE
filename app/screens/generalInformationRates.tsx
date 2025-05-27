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
      title: "A. INFORMASI UMUM METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA",
    },
    {
      type: "row",
      columns: [
        "1. INFORMASI CUACA UNTUK PENERBANGAN",
        "PER ROUTE UNIT",
        "4% DARI BIAYA PELAYANAN JASA NAVIGASI PENERBANGAN",
      ],
    },
    {
      type: "row",
      columns: [
        "2. INFORMASI CUACA UNTUK PELAYARAN",
        "PER ROUTE PER HARI",
        "Rp 250.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "3. INFORMASI CUACA UNTUK PELABUHAN",
        "PER LOKASI PER HARI",
        "Rp 225.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "4. INFORMASI CUACA UNTUK PENGEBORAN LEPAS PANTAI",
        "PER DOKUMEN PER LOKASI PER HARI",
        "Rp 330.000,00",
      ],
    },
    {
      type: "section",
      title: "5. INFORMASI IKLIM UNTUK AGRO INDUSTRI",
    },
    {
      type: "row",
      columns: [
        "A. ANALISIS DAN PRAKIRAAN HUJAN BULANAN",
        "PER BUKU",
        "Rp 65.000,00",
      ],
    },
    {
      type: "row",
      columns: ["B. PRAKIRAAN MUSIM KEMARAU", "PER BUKU", "Rp 230.000,00"],
    },
    {
      type: "row",
      columns: ["C. PRAKIRAAN MUSIM HUJAN", "PER BUKU", "Rp 230.000,00"],
    },
    {
      type: "row",
      columns: ["D. ATLAS KESESUAIAN AGROKLIMAT", "PER BUKU", "Rp 230.000,00"],
    },
    {
      type: "row",
      columns: [
        "E. ATLAS NORMAL TEMPERATUR PERIODE 1981-2010",
        "PER BUKU",
        "Rp 1.500.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "F. ATLAS WINDROSE WILAYAH INDONESIA PERIODE 1981-2010",
        "PER BUKU",
        "Rp 1.500.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "G. ATLAS CURAH HUJAN DI INDONESIA RATA-RATA PERIODE 1981-2010",
        "PER BUKU",
        "Rp 1.500.000,00",
      ],
    },
    {
      type: "section",
      title: "6. INFORMASI KUALITAS UDARA RATA-RATA MINGGUAN UNTUK INDUSTRI",
    },
    {
      type: "row",
      columns: [
        "A. PARTICULATE MATTER (PM10)",
        "PER STASIUN PER TAHUN",
        "Rp 70.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "B. PARTICULATE MATTER (PM2.5)",
        "PER STASIUN PER TAHUN",
        "Rp 70.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "C. SULFUR DIOKSIDA (SO2)",
        "PER STASIUN PER TAHUN",
        "Rp 60.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "D. NITROGEN OKSIDA (NOx)",
        "PER STASIUN PER TAHUN",
        "Rp 60.000,00",
      ],
    },
    {
      type: "row",
      columns: ["E. OZON (O3)", "PER STASIUN PER TAHUN", "Rp 60.000,00"],
    },
    {
      type: "row",
      columns: [
        "F. KARBON MONOKSIDA (CO)",
        "PER STASIUN PER TAHUN",
        "Rp 60.000,00",
      ],
    },
    {
      type: "row",
      columns: ["G. KARBON DIOKSIDA (CO2)", "PER SAMPEL", "Rp 80.000,00"],
    },
    {
      type: "row",
      columns: ["H. METHAN (CH4)", "PER SAMPEL", "Rp 80.000,00"],
    },
    {
      type: "section",
      title: "7. INFORMASI PETA KEGEMPAAN UNTUK PERENCANAAN KONTRUKSI",
    },
    {
      type: "row",
      columns: ["A. PETA KEGEMPAAN", "PER PROVINSI PER TAHUN", "Rp 250.000,00"],
    },
    {
      type: "section",
      title:
        "8. INFORMASI METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA UNTUK KEPERLUAN KLAIM ASURANSI",
    },
    {
      type: "row",
      columns: [
        "A. INFORMASI METEOROLOGI",
        "PER LOKASI PER HARI",
        "Rp 175.000,00",
      ],
    },
    {
      type: "row",
      columns: [
        "B. INFORMASI GEOFISIKA",
        "PER LOKASI PER HARI",
        "Rp 185.000,00",
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
          Tarif Informasi Umum
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
