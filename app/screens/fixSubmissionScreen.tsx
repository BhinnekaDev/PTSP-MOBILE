import React from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

// OUR ICON
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';

// OUR COMPONENT
import { submissionOptions } from '@/constants/submissionOptions';
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';
import FilePreviewModal from '@/components/filePreviewModal';

// OUR HOOK
import { useFixSubmissionScreen } from '@/hooks/Backend/useFixSubmitSubmissionScreen';
import { useSelectDocumentMulti } from '@/hooks/Frontend/filePreviewModalScreen/useSelectDocument';
import { useFilePreview } from '@/hooks/Frontend/filePreviewModalScreen/useFilePreview';

// OUR INTERFACE
import { UploadFileProps } from '@/interfaces/uploadFileProps';

// OUR UTILS
import getFileIcon from '@/utils/getFileIcon';

export default function FixSubmissionScreen() {
  const { handleFixSubmission } = useFixSubmissionScreen();
  const { pickDocument, uploadedFiles } = useSelectDocumentMulti();
  const {
    modalVisible,
    setModalVisible,
    openPreview,
    currentFile,
    pdfViewerHtml,
    openFileExternal,
  } = useFilePreview();

  const { namaAjukan, ajukanID } = useLocalSearchParams<{
    namaAjukan: string;
    ajukanID: string;
  }>();

  const selectedJenisKegiatan = decodeURIComponent(namaAjukan || '').trim();
  const selectedOption = submissionOptions.find(
    (opt) =>
      opt.label.trim().toLowerCase() === selectedJenisKegiatan.toLowerCase()
  );
  const jenisAjukan = selectedOption?.jenisAjukan ?? '';

  const handlePickFile = async (fieldName: string) => {
    const result = await pickDocument(fieldName);
    if (result.success && result.file) {
      openPreview(result.file);
    } else {
      Alert.alert('Gagal', 'Gagal memilih file.');
    }
  };

  const handleFixSubmit = async () => {
    if (!ajukanID || !jenisAjukan || !selectedJenisKegiatan) {
      Alert.alert(
        'Data tidak lengkap',
        'Silakan periksa kembali data pengajuan Anda.'
      );
      return;
    }

    const isAllRequiredFilesUploaded = selectedOption?.files?.every(
      (label) => uploadedFiles[label]?.base64
    );

    if (!isAllRequiredFilesUploaded) {
      Alert.alert('Lengkapi File', 'Semua dokumen wajib diunggah.');
      return;
    }

    const filteredUploadedFiles: Record<string, UploadFileProps> =
      Object.entries(uploadedFiles).reduce(
        (acc, [key, file]) => {
          if (file?.base64) {
            acc[key] = {
              uri: file.uri,
              name: file.name,
              type: file.type,
              base64: file.base64,
              mimeType: file.mimeType,
              size: file.size,
            };
          }
          return acc;
        },
        {} as Record<string, UploadFileProps>
      );

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
      console.error('❌ Gagal memperbaiki dokumen:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat memperbaiki dokumen.');
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

      <ScrollView
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ALERT PERBAIKAN DOKUMEN */}
        <View className="mb-6 rounded-xl border border-red-600 bg-red-100 p-4">
          <View className="flex-row items-start gap-3">
            <AntDesign name="warning" size={22} color="darkred" />
            <View className="flex-1">
              <Text
                className="mb-1 font-semibold text-red-700"
                style={{ fontFamily: 'LexSemiBold' }}
              >
                Upload Dokumen Hasil Perbaikan
              </Text>
              <Text
                className="text-sm text-black"
                style={{ fontFamily: 'LexRegular' }}
              >
                Dokumen Anda ditolak. Silakan unggah ulang dokumen yang diminta.
              </Text>
            </View>
          </View>
        </View>

        {selectedOption?.files?.map((fileLabel) => (
          <View key={fileLabel} className="mb-6">
            <Text
              className="mb-2 text-black"
              style={{ fontFamily: 'LexSemiBold' }}
            >
              {fileLabel}
            </Text>

            <ButtonCustom
              text={'Pilih File'}
              classNameContainer="border border-gray-300 py-3 rounded-xl"
              textClassName="text-black text-[14px]"
              textStyle={{ fontFamily: 'LexRegular' }}
              isTouchable
              onPress={() => handlePickFile(fileLabel)}
            />
            <Text>{uploadedFiles[fileLabel]?.name}</Text>
            {uploadedFiles[fileLabel]?.uri && (
              <TouchableOpacity
                className="mt-2"
                onPress={() => openPreview(uploadedFiles[fileLabel])}
              >
                <Text
                  className="text-blue-600 underline"
                  style={{ fontFamily: 'LexRegular' }}
                >
                  Lihat File
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View className="w-[80%] self-center py-6">
          <ButtonCustom
            text="Upload Dokumen Perbaikan"
            classNameContainer="bg-[#72C02C] py-3 rounded-xl"
            textClassName="text-white text-[15px]"
            textStyle={{ fontFamily: 'LexSemiBold' }}
            isTouchable
            onPress={handleFixSubmit}
          />
        </View>
      </ScrollView>

      <FilePreviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        file={currentFile}
        pdfViewerHtml={pdfViewerHtml}
        onOpenExternal={openFileExternal}
      />
    </View>
  );
}
