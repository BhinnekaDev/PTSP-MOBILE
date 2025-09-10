import React from 'react';
import { Text, TouchableOpacity, Modal, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export type FilePreviewModalPropsAll = {
  visible: boolean;
  onClose: () => void;
  source: string | null;
  mimeType?: string | null;
  pdfHtml?: string | null;
  onOpenExternal?: () => void;
};

export function FilePreviewModalAll({
  visible,
  onClose,
  source,
  mimeType,
  pdfHtml,
}: FilePreviewModalPropsAll) {
  if (!source && !pdfHtml) return null;

  // IMAGE
  if (mimeType?.startsWith('image/')) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: source! }}
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

  if (mimeType === 'text/html') {
    webSource = { html: source };
  } else if (mimeType === 'application/pdf') {
    if (pdfHtml) {
      webSource = { html: pdfHtml }; // pakai HTML base64 pdf viewer
    } else {
      webSource = { uri: source };
    }
  } else if (
    mimeType?.includes('word') ||
    mimeType?.includes('excel') ||
    mimeType?.includes('powerpoint')
  ) {
    webSource = {
      uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
        source!
      )}`,
    };
  } else {
    webSource = { uri: source };
  }

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
