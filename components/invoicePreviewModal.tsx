import React from 'react';
import { Text, TouchableOpacity, Modal, View } from 'react-native';
import { WebView } from 'react-native-webview';

export function InvoicePreviewModal({
  visible,
  onClose,
  html,
}: {
  visible: boolean;
  onClose: () => void;
  html: string | null;
}) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <WebView originWhitelist={['*']} source={{ html: html || '' }} />
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
