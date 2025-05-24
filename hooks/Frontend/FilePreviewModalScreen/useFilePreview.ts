// hooks/useFilePreview.ts
import { useState, useMemo } from "react";
import * as Linking from "expo-linking";

// OUR INTERFACES
import { UploadFileProps } from "@/interfaces/uploadFileProps";

// OUR UTILS
import { generatePdfViewerHtmlAllPages } from "@/utils/generatePdfViewerHtmlAllPages";

export function useFilePreview(file: UploadFileProps | null) {
  const [modalVisible, setModalVisible] = useState(false);

  const openFileExternal = async () => {
    if (file?.uri) {
      const supported = await Linking.canOpenURL(file.uri);
      if (supported) {
        await Linking.openURL(file.uri);
      } else {
        alert("Tidak dapat membuka file ini.");
      }
    }
  };

  const pdfViewerHtml = useMemo(() => {
    if (file?.mimeType === "application/pdf" && file.base64) {
      return generatePdfViewerHtmlAllPages(file.base64.replace(/\n/g, ""));
    }
    return null;
  }, [file]);

  return {
    modalVisible,
    setModalVisible,
    pdfViewerHtml,
    openFileExternal,
  };
}
