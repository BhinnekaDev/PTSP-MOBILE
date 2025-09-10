import { useMemo, useState } from 'react';
import * as Linking from 'expo-linking';

// OUR HOOKS
import { useHandleMessages } from '@/hooks/Backend/useHandleMessages';

// OUR INTERFACES
import { UploadFileProps } from '@/interfaces/uploadFileProps';

// OUR UTILS
import { generatePdfViewerHtmlAllPages } from '@/utils/generatePdfViewerHtmlAllPages';

export const useMessagesWithPreview = (roomId: string | undefined) => {
  const messagesHook = useHandleMessages(roomId);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState<UploadFileProps | null>(null);

  // Buka preview inline (modal)
  const openPreview = (file: UploadFileProps) => {
    setCurrentFile(file);
    setModalVisible(true);
  };

  // Buka file eksternal (browser / app lain)
  const openFileExternal = async () => {
    if (!currentFile?.uri) return;
    const supported = await Linking.canOpenURL(currentFile.uri);
    if (supported) await Linking.openURL(currentFile.uri);
    else alert('Tidak dapat membuka file ini.');
  };

  // Generate HTML viewer untuk PDF base64
  const pdfViewerHtml = useMemo(() => {
    if (currentFile?.mimeType === 'application/pdf' && currentFile.base64) {
      return generatePdfViewerHtmlAllPages(
        currentFile.base64.replace(/\n/g, '')
      );
    }
    return null;
  }, [currentFile]);

  return {
    ...messagesHook,
    modalVisible,
    setModalVisible,
    currentFile,
    pdfViewerHtml,
    openPreview,
    openFileExternal,
  };
};
