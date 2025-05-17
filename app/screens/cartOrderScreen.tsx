import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// COMPONENTS
import BackButton from "@/components/headerBackButton";
import ButtonCustom from "@/components/buttonCustom";
import GenderDropdown from "@/components/formDropdown";
import InputField from "@/components/formInput";

export default function CartOrderScreen({ onClose }: { onClose: () => void }) {
  const [noIdentitas, setNoIdentitas] = useState("1234567890111213");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [pendidikan, setPendidikan] = useState("");

  return (
    <View className="flex-1 bg-white py-10 gap-10">
      <View className="bg-[#1475BA] rounded-b-[10px]   ">
        <BackButton
          title="Keamanan" //
          buttonClassName="mr-auto py-2   "
          textClassName="text-[23px] mr-auto text-left bg-yellow-500 "
          onPress={onClose}
        />
      </View>
      <LinearGradient colors={["#1475BA", "#FFFFFF", "#6BBC3F"]} style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
          <View className="flex-1 ">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View className="mt-4 space-y-4">
                <InputField label="No Identitas" value={noIdentitas} onChangeText={setNoIdentitas} keyboardType="numeric" />
                <InputField label="Nama Lengkap" value={namaLengkap} onChangeText={setNamaLengkap} placeholder="Nama lengkap" />
                <GenderDropdown selected={jenisKelamin} onSelect={setJenisKelamin} />
                <InputField label="Pekerjaan" value={pekerjaan} onChangeText={setPekerjaan} placeholder="Pekerjaan" />
                <InputField label="Pendidikan Terakhir" value={pendidikan} onChangeText={setPendidikan} placeholder="Pendidikan Terakhir" />
              </View>
            </ScrollView>

            {/* BUTTON FIXED DI BAGIAN BAWAH */}
            <View className="absolute bottom-6 w-full px-10">
              <ButtonCustom
                classNameContainer="bg-[#73BF40] py-3 rounded-lg"
                text="Simpan Data"
                textClassName="text-[20px] text-center text-white"
                onPress={() => {
                  console.log({
                    noIdentitas,
                    namaLengkap,
                    jenisKelamin,
                    pekerjaan,
                    pendidikan,
                  });
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}
