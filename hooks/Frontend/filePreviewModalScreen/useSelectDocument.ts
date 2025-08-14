import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { Alert } from 'react-native';

// OUR INTERFACES
import { UploadFileProps } from '@/interfaces/uploadFileProps';

export function useSelectDocument() {
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, UploadFileProps | null>
  >({});

  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
  ];

  const isAllowedType = (mimeType: string | undefined) => {
    if (!mimeType) return false;
    return (
      allowedTypes.includes(mimeType) ||
      allowedTypes.some((type) => mimeType.startsWith(type))
    );
  };

  // SIMULASI PROGRESS
  const simulateProgress = (fieldName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      setUploadedFiles((prev) => {
        const file = prev[fieldName];
        if (!file) {
          clearInterval(interval);
          return prev;
        }

        // Jika sudah 100, hentikan interval dan mainkan suara
        if (progress >= 100) {
          clearInterval(interval);

          Audio.Sound.createAsync(
            require('@/assets/audios/alert-audio.mp3')
          ).then(({ sound }) => sound.playAsync());

          return {
            ...prev,
            [fieldName]: {
              ...file,
              progress: 100,
              loading: false,
            },
          };
        }

        // Update progress di bawah 100
        return {
          ...prev,
          [fieldName]: {
            ...file,
            progress,
            loading: true,
          },
        };
      });
    }, 100);
  };

  // PILIH TIPE FILE
  const pickDocument = async (fieldName: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: allowedTypes,
        multiple: false,
      });

      if (!result.assets || result.assets.length === 0) {
        return { success: false, file: null };
      }

      const picked = result.assets[0];
      if (!isAllowedType(picked.mimeType)) {
        return { success: false, file: null };
      }

      const existingUploadFileProps = uploadedFiles?.[
        fieldName
      ] as UploadFileProps;

      const base64Data = await FileSystem.readAsStringAsync(picked.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: {
          ...existingUploadFileProps,
          uri: picked.uri,
          base64: base64Data,
          mimeType:
            picked.mimeType ||
            existingUploadFileProps.mimeType ||
            'application/octet-stream',
          name: picked.name || existingUploadFileProps.name || 'file',
          size: picked.size || existingUploadFileProps.size || 0,
          loading: false,
          progress: 100,
          type:
            picked.mimeType ||
            existingUploadFileProps.mimeType ||
            'application/octet-stream',
        },
      }));

      await simulateProgress(fieldName);

      return {
        success: true,
        file: {
          ...existingUploadFileProps,
          uri: picked.uri,
          base64: base64Data,
          mimeType:
            picked.mimeType ||
            existingUploadFileProps.mimeType ||
            'application/octet-stream',
          name: picked.name || existingUploadFileProps.name || 'file',
          size: picked.size || existingUploadFileProps.size || 0,
          loading: false,
          progress: 100,
          type:
            picked.mimeType ||
            existingUploadFileProps.mimeType ||
            'application/octet-stream',
        },
      };
    } catch (err) {
      console.error('Gagal mengambil dokumen:', err);
      return { success: false, file: null };
    }
  };

  // HAPUS FILE
  const removeFile = (fieldName: string) => {
    Alert.alert('Hapus File', 'Yakin ingin menghapus file ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          setUploadedFiles((prev) => {
            const newFiles = { ...prev };
            delete newFiles[fieldName];
            return newFiles;
          });
        },
      },
    ]);
  };

  return {
    uploadedFiles,
    pickDocument,
    simulateProgress,
    removeFile,
  };
}
