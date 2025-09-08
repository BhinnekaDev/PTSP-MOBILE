import React from 'react';
import { Text, TouchableOpacity, Modal, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export type FilePreviewModalProps = {
  visible: boolean;
  onClose: () => void;
  source: string | null; // bisa URL/filePath/HTML string
  mimeType?: string | null; // application/pdf, text/html, dll
};

export function FilePreviewModal({
  visible,
  onClose,
  source,
  mimeType,
}: FilePreviewModalProps) {
  if (!source) return null;

  // IMAGE
  if (mimeType?.startsWith('image/')) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: source }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={onClose}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-xl bg-red-500 px-6 py-3"
          >
            <Text className="font-bold text-white">Tutup</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  // PDF / Word / Excel
  let webSource: any = null;

  if (mimeType === 'text/html') webSource = { html: source };
  else if (mimeType === 'application/pdf') webSource = { uri: source };
  else if (
    mimeType?.includes('word') ||
    mimeType?.includes('excel') ||
    mimeType?.includes('powerpoint')
  )
    webSource = {
      uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(source)}`,
    };
  else webSource = { uri: source };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <WebView originWhitelist={['*']} source={webSource} />
        <TouchableOpacity
          onPress={onClose}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-xl bg-red-500 px-6 py-3"
        >
          <Text className="font-bold text-white">Tutup</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
