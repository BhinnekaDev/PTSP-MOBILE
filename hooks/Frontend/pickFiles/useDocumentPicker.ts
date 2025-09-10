import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

// OUR INTERFACES
import { UploadFileProps } from '@/interfaces/uploadFileProps';

// 🔹 Hook reusable
export const useDocumentPicker = () => {
  const [file, setFile] = useState<UploadFileProps | null>(null);

  // Helper convert Blob ke Base64
  const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        let result = reader.result as string;
        if (result.startsWith('data:')) {
          resolve(result.split(',')[1]); // ambil setelah koma
        } else {
          resolve(result);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // 🔹 Pick Document
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (res.canceled || !res.assets?.[0]) return null;

      const asset = res.assets[0];

      const fileBase64 = await fetch(asset.uri)
        .then((r) => r.blob())
        .then(blobToBase64);

      const pickedFile: UploadFileProps = {
        uri: asset.uri,
        name: asset.name || 'dokumen',
        type: asset.mimeType || 'application/octet-stream',
        size: asset.size || 0,
        base64: fileBase64,
        mimeType: asset.mimeType || 'application/octet-stream',
        loading: false,
        progress: 0,
      };

      setFile(pickedFile);
      return pickedFile;
    } catch (err) {
      console.error('Error pick document:', err);
      return null;
    }
  };

  return { file, setFile, pickDocument };
};
