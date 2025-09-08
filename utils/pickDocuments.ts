import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ],
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;

  const file = result.assets[0];

  const base64 = await FileSystem.readAsStringAsync(file.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return {
    base64,
    name: file.name,
    mimeType: file.mimeType || 'application/octet-stream',
  };
};
