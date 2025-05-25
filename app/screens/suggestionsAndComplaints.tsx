import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// OUR COMPONENTS
import NavCartOrder from "@/components/navCartOrder";
import InputField from "@/components/formInput";
import FilePreviewModal from "@/components/FilePreviewModal";
import ButtonCustom from "@/components/buttonCustom";

// OUR UTILS
import { validationFullString } from "@/utils/validationFullString";

// OUR HOOKS
import { useFilePreview } from "@/hooks/Frontend/filePreviewModalScreen/useFilePreview";
import { useSelectDocument } from "@/hooks/Frontend/filePreviewModalScreen/useSelectDocument";

export default function SuggestionsAndComplaints() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Saran" | "Pengaduan">("Saran");

  const [saranFullName, setSaranFullName] = useState("");
  const [saranEmail, setSaranEmail] = useState("");
  const [saranText, setSaranText] = useState("");

  const [pengaduanFullName, setPengaduanFullName] = useState("");
  const [pengaduanEmail, setPengaduanEmail] = useState("");
  const [pengaduanText, setPengaduanText] = useState("");

  const { file, pickDocument, uploadSuccess } = useSelectDocument();
  const { modalVisible, setModalVisible, pdfViewerHtml, openFileExternal } = useFilePreview(file);

  return (
    <View className="flex-1 bg-white gap-4">
      <NavCartOrder
        text="Saran Dan Pengaduan" //
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      {/* === TAB BUTTON === */}
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

      {/* === BODY === */}
      <View className="flex-1 px-4">
        {/* === SARAN === */}
        {activeTab === "Saran" && (
          <View className="flex-1 py-2">
            <Text className="text-[24px]" style={{ fontFamily: "LexBold" }}>
              Saran
            </Text>

            <ScrollView contentContainerStyle={{ paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
              {/* === INPUT NAMA LENGKAP === */}
              <InputField
                label="Nama Lengkap" //
                textClassName="border border-[#3498DB]"
                value={saranFullName}
                onChangeText={(input) => setSaranFullName(validationFullString(input, 50))}
                placeholder="Nama lengkap"
              />

              {/* === INPUT EMAIL === */}
              <InputField
                label="Email" //
                textClassName="border border-[#3498DB]"
                value={saranEmail}
                onChangeText={(input) => setSaranEmail(validationFullString(input, 50))}
                placeholder="Email"
              />

              {/* === INPUT SARAN === */}
              <InputField
                label="Saran" //
                textClassName="border border-[#3498DB] p-1 h-24"
                value={saranText}
                onChangeText={(input) => setSaranText(validationFullString(input, 150))}
                placeholder="Tulis saran kamu di sini"
                multiline
              />

              {/* === UPLOAD FILE === */}
              <View className="pt-6 px-4 pb-4">
                <Text style={{ fontFamily: "LexSemiBold", marginBottom: 12 }}>Upload Lampiran (Jika Ada) </Text>

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
                  <View className="my-4 bg-[#E6F4EA] p-[12px] rounded-[8px] border border-[#6BBC3F]">
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

                <ButtonCustom
                  classNameContainer="bg-[#72C02C] rounded-[10px] py-1 w-[160px] self-end"
                  text="Kirim"
                  textClassName="text-[20px] text-center text-white"
                  textStyle={{ fontFamily: "LexSemiBold" }}
                  onPress={() => alert("Tambah")}
                  isTouchable={true}
                  containerStyle={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 4,
                  }}
                />
              </View>

              {/* === MODAL PREVIEW FILE === */}
              <FilePreviewModal
                visible={modalVisible} //
                onClose={() => setModalVisible(false)}
                file={file}
                pdfViewerHtml={pdfViewerHtml}
                onOpenExternal={openFileExternal}
              />
            </ScrollView>
          </View>
        )}

        {/* === PENGADUAN === */}
        {activeTab === "Pengaduan" && (
          <View className="flex-1 py-2">
            <Text className="text-[24px]" style={{ fontFamily: "LexBold" }}>
              Pengaduan
            </Text>

            <ScrollView contentContainerStyle={{ paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
              {/* === INPUT NAMA LENGKAP === */}
              <InputField
                label="Nama Lengkap" //
                textClassName="border border-[#3498DB]"
                value={pengaduanFullName}
                onChangeText={(input) => setPengaduanFullName(validationFullString(input, 50))}
                placeholder="Nama lengkap"
              />

              {/* === INPUT EMAIL === */}
              <InputField
                label="Email" //
                textClassName="border border-[#3498DB]"
                value={pengaduanEmail}
                onChangeText={(input) => setPengaduanEmail(validationFullString(input, 50))}
                placeholder="Email"
              />

              {/* === INPUT PENGADUAN === */}
              <InputField
                label="Pengaduan" //
                textClassName="border border-[#3498DB] p-1 h-24"
                value={pengaduanText}
                onChangeText={(input) => setPengaduanText(validationFullString(input, 150))}
                placeholder="Tulis pengaduan kamu di sini"
                multiline
              />

              {/* === BUTTON KIRIM === */}
              <View className="pt-6 px-4 pb-4">
                <ButtonCustom
                  classNameContainer="bg-[#72C02C] rounded-[10px] py-1 w-[160px] self-end"
                  text="Kirim"
                  textClassName="text-[20px] text-center text-white"
                  textStyle={{ fontFamily: "LexSemiBold" }}
                  onPress={() => alert("Tambah")}
                  isTouchable={true}
                  containerStyle={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 4,
                  }}
                />
              </View>

              {/* === MODAL PREVIEW FILE === */}
              <FilePreviewModal
                visible={modalVisible} //
                onClose={() => setModalVisible(false)}
                file={file}
                pdfViewerHtml={pdfViewerHtml}
                onOpenExternal={openFileExternal}
              />
            </ScrollView>
          </View>
        )}
      </View>

      {/* === BAR BAWAH === */}
      <View className="w-full bg-[#1475BA] h-[4%]" />
    </View>
  );
}
