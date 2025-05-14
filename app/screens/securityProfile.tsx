import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// OUR COMPONENTS
import BackButton from "@/components/headerBackButton";
import ButtonCustom from "@/components/buttonCustom";
import InputField from "@/components/formInput";

export default function SecurityProfile({ onClose }: { onClose: () => void }) {
  const [telepon, setTelepon] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-transparent">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} //
        style={{ flex: 1, width: "100%" }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <View className="flex-1 bg-white p-6 rounded-[20px] w-full">
          {/* HEADER */}
          <BackButton
            title="Notifikasi" //
            buttonClassName="mr-auto"
            textClassName="text-[23px] mr-auto"
            onPress={onClose}
          />

          {/* FORM SCROLLABLE */}
          <ScrollView
            style={{ flex: 1, marginTop: 16 }} //
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* FORM FIELDS */}
            <View className="space-y-4">
              {/* INPUT NO TELEPON */}
              <InputField
                label="No HP / Telepon" //
                value={telepon}
                onChangeText={setTelepon}
                placeholder="Masukkan nomor telepon"
                keyboardType="phone-pad"
              />

              {/* INPUT EMAIL */}
              <InputField
                label="Email" //
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan email"
                keyboardType="email-address"
              />
              <View className="w-[95%] py-4 self-center">
                <ButtonCustom
                  classNameContainer="bg-[ py-[6px] px-10 rounded-lg" //
                  text="Tutup Akun"
                  textClassName="text-[13px] text-left text-[#DC0202]"
                  onPress={() => alert("Tutup akun")}
                />
              </View>
            </View>
          </ScrollView>

          {/* BUTTON SIMPAN */}
          <View className=" w-[80%] py-4 self-center">
            <ButtonCustom
              classNameContainer="bg-[#73BF40] py-[6px] px-10 rounded-lg"
              text="Simpan Data"
              textClassName="text-[20px] text-center text-white"
              onPress={() => {
                console.log({ telepon, email });
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
