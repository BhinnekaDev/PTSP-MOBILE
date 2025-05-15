import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// OUR COMPONENTS
import BackButton from "@/components/headerBackButton";
import ButtonCustom from "@/components/buttonCustom";
import GenderDropdown from "@/components/formDropdown";
import InputField from "@/components/formInput";

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const [noIdentitas, setNoIdentitas] = useState("1234567890111213");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [pendidikan, setPendidikan] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-transparent">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} //
        style={{ flex: 1, width: "100%" }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <View className="flex-1 bg-white p-6  rounded-[20px] w-full ">
          <BackButton
            title="Sunting Profil" //
            buttonClassName="mr-12"
            textClassName="text-[23px]"
            onPress={onClose}
          />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }} //
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
          >
            <View className="mt-4 space-y-4">
              <InputField
                label="No Identitas" //
                value={noIdentitas}
                onChangeText={setNoIdentitas}
                keyboardType="numeric"
              />
              <InputField
                label="Nama Lengkap" //
                value={namaLengkap}
                onChangeText={setNamaLengkap}
                placeholder="Nama lengkap"
              />
              <GenderDropdown
                selected={jenisKelamin} //
                onSelect={setJenisKelamin}
              />
              <InputField
                label="Pekerjaan" //
                value={pekerjaan}
                onChangeText={setPekerjaan}
                placeholder="Pekerjaan"
              />
              <InputField
                label="Pendidikan Terakhir" //
                value={pendidikan}
                onChangeText={setPendidikan}
                placeholder="Pendidikan Terakhir"
              />
            </View>
          </ScrollView>

          {/* BUTTON DI BAWAH DAN TIDAK TERHALANGI KEYBOARD */}
          <View className=" w-[80%] self-center ">
            <ButtonCustom
              classNameContainer="bg-[#73BF40] py-[6px] px-10 rounded-lg"
              text="Simpan Data"
              textClassName="text-[20px] text-center text-white"
              onPress={() => {
                console.log({ noIdentitas, namaLengkap, jenisKelamin, pekerjaan, pendidikan });
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
