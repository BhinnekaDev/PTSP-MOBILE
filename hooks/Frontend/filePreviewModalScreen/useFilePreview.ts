import { useState, useMemo } from 'react';
import * as Linking from 'expo-linking';
import { UploadFileProps } from '@/interfaces/uploadFileProps';
import { generatePdfViewerHtmlAllPages } from '@/utils/generatePdfViewerHtmlAllPages';

export function useFilePreview() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState<UploadFileProps | null>(null);

  const openFileExternal = async () => {
    if (currentFile?.uri) {
      const supported = await Linking.canOpenURL(currentFile.uri);
      if (supported) {
        await Linking.openURL(currentFile.uri);
      } else {
        alert('Tidak dapat membuka file ini.');
      }
    }
  };

  const openPreview = (file: UploadFileProps) => {
    setCurrentFile(file);
    setModalVisible(true);
  };

  const pdfViewerHtml = useMemo(() => {
    if (currentFile?.mimeType === 'application/pdf' && currentFile.base64) {
      return generatePdfViewerHtmlAllPages(
        currentFile.base64.replace(/\n/g, '')
      );
    }
    return null;
  }, [currentFile]);

  return {
    modalVisible,
    setModalVisible,
    openPreview,
    currentFile,
    pdfViewerHtml,
    openFileExternal,
  };
}
