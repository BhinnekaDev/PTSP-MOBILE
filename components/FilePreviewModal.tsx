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
        className="flex-1 items-center justify-center bg-black/60 px-4"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="relative max-h-[85%] w-full rounded-xl bg-white p-3 shadow-md"
        >
          {file?.mimeType?.startsWith('image/') ? (
            <Image
              source={{ uri: file.uri }}
              className="h-[80%] w-full rounded-[12px]"
              resizeMode="contain"
            />
          ) : file?.mimeType === 'application/pdf' && pdfViewerHtml ? (
            <View className="h-[500px] w-full bg-red-500">
              <WebView
                originWhitelist={['*']} //
                source={{ html: pdfViewerHtml }}
                javaScriptEnabled={true}
                scrollEnabled={true} // ✅ scroll iOS
                nestedScrollEnabled={true} // ✅ scroll Android
                startInLoadingState={true}
                style={{ flex: 1 }}
                onError={() => Alert.alert('Error', 'Gagal memuat PDF')}
              />
            </View>
          ) : (
            <View className="flex-1 items-center justify-center p-5">
              <Text className="mb-2 font-bold">
                Preview tidak tersedia untuk jenis file ini.
              </Text>
              <TouchableOpacity
                onPress={onOpenExternal}
                className="rounded-lg bg-[#1475BA] px-3 py-3"
              >
                <Text className="text-white">
                  Buka File dengan Aplikasi Lain
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Text
            className="absolute bottom-[-50] left-0 right-0 text-center text-black"
            style={{ fontFamily: 'LexRegular' }}
          >
            Tap manapun untuk tutup
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilePreviewModal;
