// components/FilePreviewModal.tsx
import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

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

const FilePreviewModal = ({
  visible,
  onClose,
  file,
  pdfViewerHtml,
  onOpenExternal,
}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-end bg-black/60"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="relative w-full rounded-xl bg-white p-3 shadow-md"
        >
          <View className="mx-32 mb-2 h-2 w-[80px] self-center rounded-full bg-gray-400" />

          {file?.mimeType?.startsWith('image/') ? (
            // 🖼️ Image preview
            <Image
              source={{ uri: file.uri }}
              className="h-[500px] w-full rounded-[12px]"
              resizeMode="contain"
            />
          ) : file?.mimeType === 'application/pdf' && pdfViewerHtml ? (
            // 📄 PDF preview
            <View className="h-[500px] w-full bg-white">
              <WebView
                originWhitelist={['*']}
                source={{ html: pdfViewerHtml }}
                javaScriptEnabled={true}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                startInLoadingState={true}
                style={{ flex: 1 }}
                onError={() => Alert.alert('Error', 'Gagal memuat PDF')}
              />
            </View>
          ) : file?.mimeType?.startsWith('video/') ? (
            // 🎥 Video file → buka eksternal
            <View className="flex-1 items-center justify-center p-5">
              <Text className="mb-3 text-center font-bold">
                Tidak dapat menampilkan video langsung.
              </Text>
              <TouchableOpacity
                onPress={onOpenExternal}
                className="rounded-lg bg-[#1475BA] px-4 py-3"
              >
                <Text className="text-white">Buka Video di Aplikasi Lain</Text>
              </TouchableOpacity>
            </View>
          ) : file?.mimeType ===
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file?.mimeType === 'application/msword' ? (
            // 📝 Word file
            <View className="flex-1 items-center justify-center p-5">
              <Text className="mb-3 text-center font-bold">
                Tidak dapat menampilkan dokumen Word langsung.
              </Text>
              <TouchableOpacity
                onPress={onOpenExternal}
                className="rounded-lg bg-[#1475BA] px-4 py-3"
              >
                <Text className="text-white">Buka Dokumen Word</Text>
              </TouchableOpacity>
            </View>
          ) : file?.mimeType ===
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file?.mimeType === 'application/vnd.ms-excel' ? (
            // 📊 Excel file
            <View className="flex-1 items-center justify-center p-5">
              <Text className="mb-3 text-center font-bold">
                Tidak dapat menampilkan Excel langsung.
              </Text>
              <TouchableOpacity
                onPress={onOpenExternal}
                className="rounded-lg bg-[#1475BA] px-4 py-3"
              >
                <Text className="text-white">Buka Excel di Aplikasi Lain</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // 🗃️ Unknown or unsupported file
            <View className="flex-1 items-center justify-center p-5">
              <Text className="mb-3 text-center font-bold">
                Preview tidak tersedia untuk jenis file ini.
              </Text>
              <TouchableOpacity
                onPress={onOpenExternal}
                className="rounded-lg bg-[#1475BA] px-4 py-3"
              >
                <Text className="text-white">
                  Buka File dengan Aplikasi Lain
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilePreviewModal;
