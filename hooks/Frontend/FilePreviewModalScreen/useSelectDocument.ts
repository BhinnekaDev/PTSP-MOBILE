import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { Audio } from "expo-av";

// OUR INTERFACES
import { UploadFileProps } from "@/interfaces/uploadFileProps";

export function useSelectDocument() {
  const [file, setFile] = useState<UploadFileProps | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const allowedTypes = [
    "image/", //
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const isAllowedType = (mimeType: string | undefined) => {
    if (!mimeType) return false;
    return allowedTypes.includes(mimeType) || allowedTypes.some((type) => mimeType.startsWith(type));
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: allowedTypes,
        multiple: false,
      });

      if (result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];

        if (!isAllowedType(pickedFile.mimeType)) {
          Alert.alert("Format file tidak didukung.");
          return;
        }

        const base64Data = await FileSystem.readAsStringAsync(pickedFile.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setFile({
          uri: pickedFile.uri,
          mimeType: pickedFile.mimeType || "application/octet-stream",
          base64: base64Data,
          size: pickedFile.size || 0,
          name: pickedFile.name || "file",
        });

        setUploadSuccess(true);

        // ✅ Bunyi dan Alert
        try {
          const { sound } = await Audio.Sound.createAsync(
            require("@/assets/audios/alert-audio.mp3") // ganti sesuai lokasi file kamu
          );
          await sound.playAsync();

          Alert.alert("Berhasil", "File berhasil diupload!");
        } catch (soundErr) {
          console.warn("Gagal memainkan suara:", soundErr);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil dokumen:", err);
      Alert.alert("Gagal", "Tidak bisa mengambil file.");
    }
  };

  return {
    file,
    uploadSuccess,
    pickDocument,
    setFile,
    setUploadSuccess,
  };
}
