import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// OUR COMPONENTS
import BackButton from "@/components/headerBackButton";
import ButtonCustom from "@/components/buttonCustom";
import FormDropdownSelect from "@/components/formDropdownSelect";
import InputField from "@/components/formInput";

// OUR UTILS
import { validationFullString } from "@/utils/validationFullString";
import { validationStringNumber } from "@/utils/validationStringNumber";

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const [identityNumber, setIdentityNumber] = useState("1234567890111213");
  const [fullName, setFullName] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [job, setJob] = useState("");
  const [education, setEducation] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-transparent">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}>
        <View className="flex-1 bg-white p-6  rounded-[20px] w-full ">
          <BackButton title="Sunting Profil" buttonClassName="mr-12" textClassName="text-[23px]" onPress={onClose} />
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }} keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
            <View className="mt-4 space-y-4">
              <InputField
                label="No Identitas" //
                textClassName="border-[#6BBC3F]"
                value={identityNumber}
                onChangeText={setIdentityNumber}
                keyboardType="numeric"
              />
              <InputField
                label="Nama Lengkap" //
                textClassName="border-[#6BBC3F]"
                value={fullName}
                onChangeText={(input) => setFullName(validationFullString(input, 50))}
                placeholder="Nama lengkap"
              />
              <FormDropdownSelect
                labelClassName="px-6 mt-4 mb-2" //
                toggleDropdownClassName="w-[87%] border-[#6BBC3F] rounded-[10px] "
                label="Jenis Kelamin"
                labelStyle={{ fontFamily: "LexBold" }}
                DropdownSelectClassName="w-[87%] border-[#6BBC3F] rounded-[10px]"
                options={[
                  "Laki - Laki", //
                  "Perempuan",
                ]}
                selectedTextStyle={{ fontFamily: "LexRegular" }}
                iconColor="#6BBC3F"
                selected={jenisKelamin}
                onSelect={setJenisKelamin}
              />
              <InputField
                label="Pekerjaan" //
                textClassName="border-[#6BBC3F]"
                value={job}
                onChangeText={(input) => setJob(validationFullString(input, 30))}
                placeholder="Pekerjaan"
              />
              <InputField
                label="Pendidikan Terakhir" //
                textClassName="border-[#6BBC3F]"
                value={education}
                onChangeText={(input) => setEducation(validationStringNumber(input, 30))}
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
                console.log({ identityNumber, fullName, jenisKelamin, job, education });
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
