import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Animatable from 'react-native-animatable';

// OUR ICON
import { AntDesign, Ionicons } from '@expo/vector-icons';

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
  const [fileMap, setFileMap] = useState<Record<string, any>>({});

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

  const handleUploadFile = async (fieldName: string) => {
    const result = await pickDocument(fieldName);

    if (result.success && result.file) {
      openPreview({
        ...result.file,
        type: result.file.mimeType,
      });

      // Update fileMap lebih dulu
      setFileMap((prev) => ({
        ...prev,
        [fieldName]: {
          ...result.file,
          progress: 0,
        },
      }));

      // Mulai simulasi progres
      simulateUploadProgress(fieldName);
    } else {
      Alert.alert('Gagal', 'Gagal memilih file.');
    }
  };

  const simulateUploadProgress = (field: string) => {
    const steps = [0, 20, 35, 50, 70, 85, 100];
    let index = 0;

    const nextStep = () => {
      if (index >= steps.length) return;

      const progress = steps[index];
      setFileMap((prev) => {
        if (!prev[field]) return prev; // ❗stop jika sudah dihapus
        return {
          ...prev,
          [field]: {
            ...prev[field],
            progress,
          },
        };
      });

      index++;

      if (index < steps.length) {
        const delay = Math.floor(Math.random() * 200) + 150;
        setTimeout(nextStep, delay);
      }
    };

    nextStep();
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
              loading: file.loading ?? false,
              progress: file.progress ?? 0,
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

  const handleRemoveFile = (field: string) => {
    console.log('Menghapus:', field);

    setFileMap((prev) => {
      const newMap = { ...prev };
      delete newMap[field];
      console.log('Hasil setelah hapus fileMap:', newMap);
      return newMap;
    });
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
              onPress={() => handleUploadFile(fileLabel)}
            />
            {fileMap[fileLabel] && (
              <View className="mt-2 flex-row items-center gap-4 rounded-[10px] border border-gray-300 px-4 py-2">
                {getFileIcon(fileMap[fileLabel].name)}
                <View className="flex-1 flex-col">
                  <Text style={{ fontFamily: 'LexMedium' }}>
                    {(() => {
                      const name = fileMap[fileLabel].name;
                      const lastDot = name.lastIndexOf('.');
                      const baseName = name.substring(0, lastDot);
                      const extension = name.substring(lastDot);
                      const slicedName =
                        baseName.length > 20
                          ? baseName.slice(0, 20) + '...'
                          : baseName;
                      return slicedName + extension;
                    })()}
                  </Text>

                  <Text style={{ fontFamily: 'LexMedium' }}>
                    {(fileMap[fileLabel].size / 1024).toFixed(2)} KB
                  </Text>

                  <View className="mb-3 mt-2 h-[8px] w-full overflow-hidden rounded-md bg-gray-300">
                    <View
                      className="h-full bg-green-500"
                      style={{ width: `${fileMap[fileLabel].progress}%` }}
                    />
                  </View>

                  <View className="flex-row items-center justify-between">
                    {fileMap[fileLabel].progress >= 100 ? (
                      <View className="flex-row items-center gap-1">
                        <Animatable.View
                          animation="bounceIn"
                          duration={2000}
                          useNativeDriver
                        >
                          <Ionicons
                            name="checkmark-circle-sharp"
                            size={18}
                            color="green"
                          />
                        </Animatable.View>

                        <Animatable.Text
                          animation={{
                            from: {
                              opacity: 0,
                              translateX: -10,
                            },
                            to: {
                              opacity: 1,
                              translateX: 0,
                            },
                          }}
                          delay={500}
                          duration={600}
                          style={{ fontFamily: 'LexMedium' }}
                          className="text-[11px]"
                        >
                          Upload Berhasil !
                        </Animatable.Text>
                      </View>
                    ) : (
                      <View />
                    )}

                    <View className="mt-1 flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => handleRemoveFile(fileLabel)}
                        disabled={fileMap[fileLabel].progress < 100}
                        className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                          fileMap[fileLabel].progress < 100
                            ? 'bg-gray-400'
                            : 'bg-red-500'
                        }`}
                      >
                        <Ionicons name="trash" size={18} color="white" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          if (fileMap[fileLabel].progress >= 100) {
                            openPreview(fileMap[fileLabel]);
                          }
                        }}
                        disabled={fileMap[fileLabel].progress < 100}
                        className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                          fileMap[fileLabel].progress < 100
                            ? 'bg-gray-400'
                            : 'bg-[#1475BA]'
                        }`}
                      >
                        <Ionicons name="eye" size={18} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
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
