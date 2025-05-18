import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert, Image, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import * as FileSystem from "expo-file-system";
// COMPONENTS
import ButtonCustom from "@/components/buttonCustom";
import NavCartOrder from "@/components/navCartOrder";

interface FileWithBase64 {
  uri: string;
  mimeType: string;
  base64: string | null;
  size: number;
  name: string;
}

export default function SubmissionScreen() {
  const router = useRouter();
  const [file, setFile] = useState<FileWithBase64 | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const allowedMimeTypes = ["image/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: allowedMimeTypes,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const selectedFile = result.assets[0];

        const mime = selectedFile.mimeType || "";
        const isAllowed = allowedMimeTypes.some((type) => (type === "image/*" ? mime.startsWith("image/") : mime === type));

        if (!isAllowed) {
          Alert.alert("File Tidak Didukung", "Silakan pilih file berupa gambar, PDF, atau Word.");
          setUploadSuccess(false);
          setFile(null);
          return;
        }

        let base64Data = null;

        if (mime === "application/pdf") {
          base64Data = await FileSystem.readAsStringAsync(selectedFile.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }

        setFile({ ...selectedFile, base64: base64Data } as FileWithBase64); // simpan base64 juga
        setUploadSuccess(true);
        await AsyncStorage.setItem("uploadedFile", JSON.stringify(selectedFile));
        Alert.alert("Berhasil", "File berhasil dipilih dan disimpan sementara!");
      } else {
        setUploadSuccess(false);
        console.log("User membatalkan pemilihan file.");
      }
    } catch (error) {
      console.error("Gagal memilih file:", error);
      Alert.alert("Error", "Terjadi kesalahan saat memilih file.");
    }
  };

  // Fungsi buka file eksternal dengan aplikasi lain
  const openFileExternal = async () => {
    if (file && file.uri) {
      const supported = await Linking.canOpenURL(file.uri);
      if (supported) {
        await Linking.openURL(file.uri);
      } else {
        Alert.alert("Error", "Tidak dapat membuka file ini.");
      }
    }
  };

  return (
    <View className="flex-1 bg-white gap-4">
      <NavCartOrder text="Keranjang Saya" textClassName="ml-4 text-left" onPressLeftIcon={() => router.back()} isTouchable={false} />

      <View className="flex-1 px-4">
        <LinearGradient
          colors={["#1475BA", "#FFFFFF", "#6BBC3F"]} //
          style={{ flex: 1, borderRadius: 12 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
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
                  <Text>Lorem ipsum dolor sit amet</Text>
                </View>
              </View>

              {/* Form Kegiatan Penanggulangan Bencana */}
              <View className="bg-white rounded-[10px] flex-col border-[#1475BA] border-2">
                <View className="bg-[#1475BA] rounded-t-[4px] rounded-b-[10px] w-full py-2 flex items-center justify-center">
                  <Text className="text-[18px] text-white py-4 text-center" style={{ fontFamily: "LexMedium" }}>
                    Form Kegiatan Penaggulangan Bencana
                  </Text>
                </View>

                <View className="pt-6 px-4 pb-4">
                  <Text style={{ fontFamily: "LexSemiBold", marginBottom: 12 }}>Data Keperluan</Text>

                  <TouchableOpacity onPress={pickDocument} className="bg-[#1475BA] py-3 rounded-[8px] mb-4" style={{ alignItems: "center" }}>
                    <Text style={{ color: "white", fontFamily: "LexSemiBold" }}>Upload File</Text>
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

            {/* Tombol ajukan */}
            <View className="w-[80%] self-center">
              <ButtonCustom
                classNameContainer="bg-[#1475BA] py-3 rounded-[10px]"
                text="AJUKAN SEKARANG"
                textClassName="text-[14px] text-center text-white"
                onPress={() => (file ? Alert.alert("Pengajuan", "Data telah diajukan!") : Alert.alert("Gagal", "Silakan upload file terlebih dahulu."))}
                textStyle={{ fontFamily: "LexSemiBold" }}
                isTouchable={true}
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Bar bawah */}
      <View className="w-full bg-[#1475BA] h-[4%]" />

      {/* Modal Preview File */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/60 px-4">
          <View className="w-full max-h-[85%] bg-white rounded-xl p-3 shadow-md">
            <Pressable onPress={() => setModalVisible(false)} className="absolute top-2 right-2 z-10 bg-[#1475BA] rounded-full px-3 py-1">
              <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
            </Pressable>

            {/* Preview gambar */}
            {file && file.mimeType && file.mimeType.startsWith("image/") ? (
              <Image
                source={{ uri: file.uri }}
                style={{
                  width: "100%",
                  height: "80%",
                  resizeMode: "contain",
                  borderRadius: 12,
                }}
              />
            ) : file && file.mimeType === "application/pdf" ? (
              <View style={{ width: "100%", height: 500 }}>
                <WebView source={{ uri: file.uri }} style={{ flex: 1 }} onError={() => Alert.alert("Error", "Gagal memuat PDF")} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Preview tidak tersedia untuk jenis file ini.</Text>
                <TouchableOpacity
                  onPress={openFileExternal}
                  style={{
                    padding: 12,
                    backgroundColor: "#1475BA",
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "white" }}>Buka File dengan Aplikasi Lain</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
