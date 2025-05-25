import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

// OUR COMPONENTS
import NavCartOrder from "@/components/navCartOrder";
import InputField from "@/components/formInput";

// OUR UTILS
import { validationFullString } from "@/utils/validationFullString";

export default function SuggestionsAndComplaints() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Saran" | "Pengaduan">("Saran");
  const [fullName, setFullName] = useState("");

  const [pengaduan, setPengaduan] = useState("");

  return (
    <View className="flex-1 bg-white gap-4">
      <NavCartOrder text="Saran Dan Pengaduan" textClassName="ml-4 text-left" onPressLeftIcon={() => router.back()} isTouchable={false} />

      {/* TAB BUTTON */}
      <View className="flex-row justify-center gap-4 px-4">
        {["Saran", "Pengaduan"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as "Saran" | "Pengaduan")} className={`px-4 py-2 rounded-full ${activeTab === tab ? "bg-[#1475BA]" : "bg-gray-200"}`}>
            <Text
              style={{
                fontFamily: "LexBold",
                color: activeTab === tab ? "white" : "black",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BODY */}
      <View className="flex-1 px-4">
        {/* === SARAN === */}
        {activeTab === "Saran" && (
          <View className="flex-1 py-6">
            <Text className="font-bold text-[20px]" style={{ fontFamily: "LexBold" }}>
              Saran
            </Text>

            <ScrollView contentContainerStyle={{ paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
              <InputField
                label="Nama Lengkap" //
                textClassName="border border-[#3498DB] " //
                value={fullName}
                onChangeText={(input) => setFullName(validationFullString(input, 50))}
                placeholder="Nama lengkap"
              />
              <InputField
                label="Email" //
                textClassName="border border-[#3498DB] " //
                value={fullName}
                onChangeText={(input) => setFullName(validationFullString(input, 50))}
                placeholder="Nama lengkap"
              />
            </ScrollView>
          </View>
        )}

        {/* === PENGADUAN === */}
        {activeTab === "Pengaduan" && (
          <View className="flex-1 py-6">
            <Text className="font-bold text-[20px]" style={{ fontFamily: "LexBold" }}>
              Pengaduan
            </Text>

            <ScrollView contentContainerStyle={{ paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
              <TextInput
                placeholder="Tulis pengaduan kamu di sini..."
                value={pengaduan}
                onChangeText={setPengaduan}
                multiline
                numberOfLines={8}
                className="bg-gray-100 rounded-lg p-4 text-base text-black"
                textAlignVertical="top"
                style={{ fontFamily: "LexReg" }}
              />
            </ScrollView>
          </View>
        )}
      </View>

      {/* BAR BAWAH */}
      <View className="w-full bg-[#1475BA] h-[4%]" />
    </View>
  );
}
