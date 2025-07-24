import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

// OUR CONSTANS
import { submissionOptions } from '@/constants/submissionOptions';

// CUSTOM COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';

// HOOKS
import { useFixSubmissionScreen } from '@/hooks/Backend/useFixSubmitSubmissionScreen';
import { useSelectDocumentMulti } from '@/hooks/Frontend/filePreviewModalScreen/useSelectDocument';
import { UploadFileProps } from '@/interfaces/uploadFileProps';

export default function FixSubmissionScreen() {
  const { handleFixSubmission } = useFixSubmissionScreen();
  const { pickDocument, uploadedFiles } = useSelectDocumentMulti();

  const { namaAjukan, ajukanID } = useLocalSearchParams<{
    namaAjukan: string;
    ajukanID: string;
  }>();

  const selectedJenisKegiatan = decodeURIComponent(namaAjukan || '').trim();

  // Sesuaikan dengan submissionOptions kalau perlu import submissionOptions juga
  const selectedOption = submissionOptions.find(
    (opt) =>
      opt.label.trim().toLowerCase() === selectedJenisKegiatan.toLowerCase()
  );

  const jenisAjukan = selectedOption?.jenisAjukan ?? '';

  const handlePickFile = async (fieldName: string) => {
    const result = await pickDocument(fieldName);

    if (!result.success) {
      Alert.alert('Gagal', 'Gagal memilih file.');
    }
  };

  const handleFixSubmit = async () => {
    const filteredUploadedFiles: Record<string, UploadFileProps> =
      Object.entries(uploadedFiles)
        .filter(([_, file]) => file !== null && file.base64 !== null)
        .reduce(
          (acc, [key, file]) => {
            acc[key] = {
              uri: file!.uri,
              name: file!.name,
              type: file!.type,
              base64: file!.base64 as string,
              mimeType: file!.mimeType, // tambahkan sesuai struktur UploadFileProps
              size: file!.size, // tambahkan sesuai struktur UploadFileProps
            };
            return acc;
          },
          {} as Record<string, UploadFileProps>
        );

    if (!ajukanID || !jenisAjukan || !selectedJenisKegiatan) {
      Alert.alert('Data tidak lengkap', 'Silakan periksa data pengajuan Anda.');
      return;
    }

    const isAllRequiredFilesUploaded = selectedOption?.files?.every(
      (label) => uploadedFiles[label]
    );

    if (!isAllRequiredFilesUploaded) {
      Alert.alert('Lengkapi File', 'Semua dokumen wajib diunggah.');
      return;
    }

    try {
      await handleFixSubmission({
        ajukanID,
        jenisAjukan,
        namaAjukan: selectedJenisKegiatan,
        uploadedFiles: filteredUploadedFiles,
      });

      Alert.alert('Sukses', 'Dokumen berhasil diperbaiki.');
      router.back();
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat memperbaiki dokumen.');
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <NavCartOrder
        text="Perbaikan Dokumen"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View
          className="mb-6 flex-row items-start rounded-lg border border-red-600 bg-red-300 p-4"
          style={{ gap: 10 }}
        >
          <AntDesign name="warning" size={24} color="darkred" />
          <View className="flex-1">
            <Text
              className="mb-1 text-red-900"
              style={{ fontFamily: 'LexSemiBold', fontSize: 14 }}
            >
              Upload Dokumen Hasil Perbaikan
            </Text>
            <View
              style={{ height: 1, backgroundColor: '#b71c1c', marginBottom: 4 }}
            />
            <Text style={{ fontFamily: 'LexSemiBold', color: 'black' }}>
              Dokumen Anda ditolak. Silakan unggah ulang dokumen yang diminta.
            </Text>
          </View>
        </View>

        {selectedOption?.files?.map((fileLabel) => (
          <View key={fileLabel} className="mb-4">
            <Text
              className="mb-2 text-black"
              style={{ fontFamily: 'LexSemiBold' }}
            >
              {fileLabel}
            </Text>

            <ButtonCustom
              text={uploadedFiles[fileLabel]?.name || 'Pilih File'}
              classNameContainer="border border-gray-300 py-3 rounded-[10px]"
              textClassName="text-black text-[14px]"
              textStyle={{ fontFamily: 'LexRegular' }}
              isTouchable
              onPress={() => handlePickFile(fileLabel)}
            />
          </View>
        ))}

        <ButtonCustom
          text="Upload Dokumen Perbaikan"
          classNameContainer="bg-[#72C02C] py-3 mt-6 rounded-[10px]"
          textClassName="text-white text-[14px]"
          textStyle={{ fontFamily: 'LexSemiBold' }}
          isTouchable
          onPress={handleFixSubmit}
        />
      </ScrollView>
    </View>
  );
}
