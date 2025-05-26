import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import NavCartOrder from "@/components/navCartOrder";
import FormDropdownSelect from "@/components/formDropdownSelect";
import FilePreviewModal from "@/components/FilePreviewModal";

// HOOK
import { useFilePreview } from "@/hooks/Frontend/filePreviewModalScreen/useFilePreview";
import { useSelectDocument } from "@/hooks/Frontend/filePreviewModalScreen/useSelectDocument";

export default function SubmissionScreen() {
  const router = useRouter();
  const [jenisKelamin, setJenisKelamin] = useState("");
  const { file, pickDocument, uploadSuccess } = useSelectDocument();
  const { modalVisible, setModalVisible, pdfViewerHtml, openFileExternal } = useFilePreview(file);

  return (
    <View className="flex-1 bg-white gap-4">
      <NavCartOrder text="Keranjang Saya" textClassName="ml-4 text-left" onPressLeftIcon={() => router.back()} isTouchable={false} />

      <View className="flex-1 px-4">
        <LinearGradient colors={["#1475BA", "#FFFFFF", "#6BBC3F"]} style={{ flex: 1, borderRadius: 12 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View className="flex-1 w-full py-6">
            <Text className="font-bold text-[20px] self-center" style={{ fontFamily: "LexBold" }}>
              Pengajuan Anda
            </Text>

            <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
              {/* Form Pengajuan Kegiatan */}
              <View className="bg-white rounded-[10px] flex-col border-[#1475BA] border-2 mb-10">
                <View className="bg-[#1475BA] rounded-t-[4px] rounded-b-[10px] w-full py-2 flex items-center justify-center">
                  <Text className="text-[18px] text-white py-4" style={{ fontFamily: "LexMedium" }}>
                    Form Pengajuan Kegiatan
                  </Text>
                </View>

                <View className="pt-4 px-4 pb-4">
                  <FormDropdownSelect
                    showLabel={false}
                    toggleDropdownClassName="w-full border-[#D9D9D9] rounded-[5px]"
                    label="Jenis Kegiatan" //
                    DropdownSelectClassName="w-full border-[#D9D9D9] rounded-[5px]"
                    options={[
                      "Penanggulangan Bencana", //
                      "Kegiatan Keagamaan",
                      "Kegiatan Sosial",
                      "Kegiatan Pertahanan dan Keamanan",
                      "Kegiatan Pemerintahan",
                      "Kegiatan Pendidikan dan Penelitian Non Komersil",
                      "Pelayanan Informasi dengan Tarif PNBP",
                      "Pelayanan Informasi dengan Tarif PNBP",
                      "Kegiatan Pemerintahan",
                    ]}
                    selected={jenisKelamin}
                    onSelect={setJenisKelamin}
                  />
                </View>
              </View>

              {/* FORM KEGIATAN PENAGGULANGAN BENCANA */}
              <View className="bg-white rounded-[10px] flex-col border-[#1475BA] border-2">
                <View className="bg-[#1475BA] rounded-t-[4px] rounded-b-[10px] w-full py-2 flex items-center justify-center">
                  <Text className="text-[18px] text-white py-4 text-center" style={{ fontFamily: "LexMedium" }}>
                    Form Kegiatan Penaggulangan Bencana
                  </Text>
                </View>

                <View className="pt-6 px-4 pb-4">
                  <Text style={{ fontFamily: "LexSemiBold", marginBottom: 12 }}>Data Keperluan</Text>

                  <TouchableOpacity
                    onPress={pickDocument} //
                    className="bg-[#1475BA] py-3 rounded-[8px] mb-4"
                    style={{ alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "LexSemiBold",
                      }}
                    >
                      Upload File
                    </Text>
                  </TouchableOpacity>

                  {uploadSuccess && file && (
                    <View className="mt-[10px] bg-[#E6F4EA] p-[12px] rounded-[8px] border border-[#6BBC3F]">
                      <Text className="mb-[6px] text-[#4CAF50]" style={{ fontFamily: "LexMedium" }}>
                        ✅ Upload berhasil!
                      </Text>
                      <Text style={{ fontFamily: "LexRegular" }}>
                        <Text style={{ fontWeight: "bold" }}>Nama File:</Text> {file.name}
                      </Text>
                      <Text style={{ fontFamily: "LexRegular" }}>
                        <Text style={{ fontWeight: "bold" }}>Ukuran:</Text> {(file.size / 1024).toFixed(2)} KB
                      </Text>

                      <TouchableOpacity onPress={() => setModalVisible(true)} className="mt-[12px] p-[10px] bg-[#1475BA] rounded-[8px] items-center">
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "LexSemiBold",
                          }}
                        >
                          Lihat Preview
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>

            {/* TOMBOL AJUKAN SEKARANG */}
            <View className="w-[80%] self-center">
              <ButtonCustom
                classNameContainer="bg-[#1475BA] py-3 rounded-[10px]"
                text="AJUKAN SEKARANG"
                textClassName="text-[14px] text-center text-white"
                onPress={() => router.push({ pathname: "/screens/orderScreen", params: { triggerSubmission: "true" } })}
                textStyle={{ fontFamily: "LexSemiBold" }}
                isTouchable={true}
                containerStyle={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 }, // hanya ke bawah
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4, // Android
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* MODAL PREVIEW */}
      <FilePreviewModal
        visible={modalVisible} //
        onClose={() => setModalVisible(false)}
        file={file}
        pdfViewerHtml={pdfViewerHtml}
        onOpenExternal={openFileExternal}
      />

      {/* BAR BAWAH */}
      <View className="w-full bg-[#1475BA] h-[4%]" />
    </View>
  );
}
