import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
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
          Alert.alert('Format file tidak didukung.');
          return { success: false, file: null };
        }

        const base64Data = await FileSystem.readAsStringAsync(pickedFile.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const fileData: UploadFileProps = {
          uri: pickedFile.uri,
          mimeType: pickedFile.mimeType || 'application/octet-stream',
          base64: base64Data,
          size: pickedFile.size || 0,
          name: pickedFile.name || 'file',
        };

        setUploadedFiles((prev) => ({
          ...prev,
          [fieldName]: fileData,
        }));

        // 🔊 Play sound
        try {
          const { sound } = await Audio.Sound.createAsync(
            require('@/assets/audios/alert-audio.mp3')
          );
          await sound.playAsync();
        } catch (err) {
          console.warn('Gagal memainkan suara:', err);
        }

        Alert.alert('Berhasil', `File untuk "${fieldName}" berhasil diupload!`);

        return { success: true, file: fileData };
      }

      return { success: false, file: null };
    } catch (err) {
      console.error('Gagal mengambil dokumen:', err);
      Alert.alert('Gagal', 'Tidak bisa mengambil file.');
      return { success: false, file: null };
    }
  };

  return {
    uploadedFiles,
    pickDocument,
  };
}
