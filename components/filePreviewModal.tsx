// components/FilePreviewModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { UploadFileProps } from '@/interfaces/uploadFileProps';

interface FilePreviewModalProps {
  visible: boolean;
  onClose: () => void;
  file: UploadFileProps | null;
  pdfViewerHtml: string | null;
  onOpenExternal: () => void;
}

const FilePreviewModal = ({
  visible,
  onClose,
  file,
  pdfViewerHtml,
  onOpenExternal,
}: FilePreviewModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View className="flex-1 bg-black/60">
        {/* Overlay kosong untuk close modal */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1" />
        </TouchableWithoutFeedback>

        {/* Konten Modal */}
        <View className="h-4/5 overflow-hidden rounded-t-3xl bg-white">
          {/* Header dengan drag indicator */}
          <View className="items-center py-3">
            <View className="h-1 w-12 rounded-full bg-gray-300" />
          </View>

          {/* Content area yang fleksibel */}
          <View className="flex-1 p-4">
            {file?.mimeType?.startsWith('image/') ? (
              // 🖼️ Image preview
              <Image
                source={{ uri: file.uri }}
                className="w-full flex-1 rounded-[12px]"
                resizeMode="contain"
              />
            ) : file?.mimeType === 'application/pdf' && pdfViewerHtml ? (
              // 📄 PDF preview
              <View className="w-full flex-1 overflow-hidden rounded-[12px] bg-white">
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
              <View className="w-full flex-1 items-center justify-center rounded-[12px] bg-gray-50 p-5">
                <Text className="mb-3 text-center font-bold text-gray-700">
                  Tidak dapat menampilkan video langsung.
                </Text>
                <TouchableOpacity
                  onPress={onOpenExternal}
                  className="rounded-lg bg-[#1475BA] px-4 py-3"
                >
                  <Text className="font-semibold text-white">
                    Buka Video di Aplikasi Lain
                  </Text>
                </TouchableOpacity>
              </View>
            ) : file?.mimeType ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
              file?.mimeType === 'application/msword' ? (
              // 📝 Word file
              <View className="w-full flex-1 items-center justify-center rounded-[12px] bg-gray-50 p-5">
                <Text className="mb-3 text-center font-bold text-gray-700">
                  Tidak dapat menampilkan dokumen Word langsung.
                </Text>
                <TouchableOpacity
                  onPress={onOpenExternal}
                  className="rounded-lg bg-[#1475BA] px-4 py-3"
                >
                  <Text className="font-semibold text-white">
                    Buka Dokumen Word
                  </Text>
                </TouchableOpacity>
              </View>
            ) : file?.mimeType ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
              file?.mimeType === 'application/vnd.ms-excel' ? (
              // 📊 Excel file
              <View className="w-full flex-1 items-center justify-center rounded-[12px] bg-gray-50 p-5">
                <Text className="mb-3 text-center font-bold text-gray-700">
                  Tidak dapat menampilkan Excel langsung.
                </Text>
                <TouchableOpacity
                  onPress={onOpenExternal}
                  className="rounded-lg bg-[#1475BA] px-4 py-3"
                >
                  <Text className="font-semibold text-white">
                    Buka Excel di Aplikasi Lain
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              // 🗃️ Unknown or unsupported file
              <View className="w-full flex-1 items-center justify-center rounded-[12px] bg-gray-50 p-5">
                <Text className="mb-3 text-center font-bold text-gray-700">
                  Preview tidak tersedia untuk jenis file ini.
                </Text>
                <TouchableOpacity
                  onPress={onOpenExternal}
                  className="rounded-lg bg-[#1475BA] px-4 py-3"
                >
                  <Text className="font-semibold text-white">
                    Buka File dengan Aplikasi Lain
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilePreviewModal;
