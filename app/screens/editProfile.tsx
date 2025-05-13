import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// OUR COMPONENTS
import BackButton from "@/components/headerBackButton";
import ButtonCustom from "@/components/buttonCustom";
import GenderDropdown from "@/components/jenisKelamin";
import InputField from "@/components/formInput";

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [noIdentitas, setNoIdentitas] = useState("1234567890111213");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [pendidikan, setPendidikan] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} //
      style={{ flex: 1 }}
      keyboardVerticalOffset={1}
    >
      <View className="flex-1 w-full  justify-center items-center ">
        <View className="bg-white  rounded-lg w-full">
          <BackButton
            title="Sunting Profil" //
            buttonClassName="mr-12"
            textClassName="text-[23px]"
            onPress={onClose}
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }} //
            keyboardShouldPersistTaps="handled"
          >
            {/* Form Fields */}
            <View className="mt-4 space-y-4">
              {/* INPUT NO IDENTITAS */}
              <InputField
                label="No Identitas" //
                value={noIdentitas}
                onChangeText={setNoIdentitas}
                keyboardType="numeric"
              />

              {/* INPUT NAMA LENGKAP */}
              <InputField
                label="Nama Lengkap" //
                value={namaLengkap}
                onChangeText={setNamaLengkap}
                placeholder="Nama lengkap"
              />

              {/* DROPDOWN JENIS KELAMIN */}
              <GenderDropdown
                selected={jenisKelamin} //
                onSelect={setJenisKelamin}
              />

              {/* INPUT PEKERJAAN */}
              <InputField
                label="Pekerjaan" //
                value={pekerjaan}
                onChangeText={setPekerjaan}
                placeholder="Pekerjaan"
              />

              {/* INPUT PENDIDIKAN TERAKHIR */}
              <InputField
                label="Pendidikan Terakhir" //
                value={pendidikan}
                onChangeText={setPendidikan}
                placeholder="Pendidikan Terakhir"
              />
            </View>

            {/* BUTTON KELUAR */}
            <View className="w-[85%] mt-10 self-center">
              <ButtonCustom
                classNameContainer="bg-[#73BF40] py-[6px] px-10 rounded-lg"
                text="Simpan Data"
                textClassName="text-[20px] text-center text-white"
                onPress={() => {
                  console.log({ noIdentitas, namaLengkap, jenisKelamin, pekerjaan, pendidikan });
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
