import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { UploadFileProps } from '@/interfaces/uploadFileProps';

export function useSelectDocumentMulti() {
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, UploadFileProps | null>
  >({});

  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  ];

  const isAllowedType = (mimeType: string | undefined) => {
    if (!mimeType) return false;
    return (
      allowedTypes.includes(mimeType) ||
      allowedTypes.some((type) => mimeType.startsWith(type))
    );
  };

  const simulateProgress = async (
    fieldName: string,
    base64Data: string,
    fileInfo: DocumentPicker.DocumentPickerAsset
  ) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      if (progress >= 100) {
        clearInterval(interval);
        setUploadedFiles((prev) => ({
          ...prev,
          [fieldName]: {
            uri: fileInfo.uri,
            mimeType: fileInfo.mimeType || 'application/octet-stream',
            base64: base64Data,
            size: fileInfo.size || 0,
            name: fileInfo.name || 'file',
            loading: false,
            progress: 100,
          },
        }));

        // ✅ Play sound ONCE after finish
        Audio.Sound.createAsync(
          require('@/assets/audios/alert-audio.mp3')
        ).then(({ sound }) => sound.playAsync());
      } else {
        setUploadedFiles((prev) => ({
          ...prev,
          [fieldName]: {
            ...(prev[fieldName] as UploadFileProps),
            progress,
          },
        }));
      }
    }, 100);
  };

  const pickDocument = async (fieldName: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: allowedTypes,
        multiple: false,
      });

      if (result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];

        if (!isAllowedType(pickedFile.mimeType)) {
          return { success: false, file: null };
        }

        setUploadedFiles((prev) => ({
          ...prev,
          [fieldName]: {
            uri: pickedFile.uri,
            mimeType: pickedFile.mimeType || 'application/octet-stream',
            base64: null,
            size: pickedFile.size || 0,
            name: pickedFile.name || 'file',
            loading: true,
            progress: 0,
          },
        }));

        const base64Data = await FileSystem.readAsStringAsync(pickedFile.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await simulateProgress(fieldName, base64Data, pickedFile);

        return {
          success: true,
          file: {
            uri: pickedFile.uri,
            mimeType: pickedFile.mimeType || 'application/octet-stream',
            base64: base64Data,
            size: pickedFile.size || 0,
            name: pickedFile.name || 'file',
            loading: false,
            progress: 100,
          },
        };
      }

      return { success: false, file: null };
    } catch (err) {
      console.error('Gagal mengambil dokumen:', err);
      return { success: false, file: null };
    }
  };

  return {
    uploadedFiles,
    pickDocument,
  };
}
