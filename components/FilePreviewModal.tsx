// components/FilePreviewModal.tsx
import React from "react";
import { Modal, Pressable, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { WebView } from "react-native-webview";

interface FileWithBase64 {
  uri: string;
  mimeType: string;
  base64: string | null;
  size: number;
  name: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  file: FileWithBase64 | null;
  pdfViewerHtml: string | null;
  onOpenExternal: () => void;
}

const FilePreviewModal = ({ visible, onClose, file, pdfViewerHtml, onOpenExternal }: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <Pressable onPress={onClose} className="flex-1 justify-center items-center bg-black/60 px-4">
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full max-h-[85%] bg-white rounded-xl p-3 shadow-md relative">
          {file?.mimeType?.startsWith("image/") ? (
            <Image source={{ uri: file.uri }} className="w-full h-[80%] rounded-[12px]" resizeMode="contain" />
          ) : file?.mimeType === "application/pdf" && pdfViewerHtml ? (
            <View className="w-full h-[500px]">
              <WebView originWhitelist={["*"]} source={{ html: pdfViewerHtml }} className="flex-1" onError={() => Alert.alert("Error", "Gagal memuat PDF")} javaScriptEnabled />
            </View>
          ) : (
            <View className="flex-1 justify-center items-center p-5">
              <Text className="mb-2 font-bold">Preview tidak tersedia untuk jenis file ini.</Text>
              <TouchableOpacity onPress={onOpenExternal} className="px-3 py-3 bg-[#1475BA] rounded-lg">
                <Text className="text-white">Buka File dengan Aplikasi Lain</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text className="text-center text-black absolute bottom-[-50] left-0 right-0" style={{ fontFamily: "LexRegular" }}>
            Tap manapun untuk tutup
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilePreviewModal;
