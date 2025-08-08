import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { AntDesign, Ionicons } from '@expo/vector-icons';

// COMPONENT
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';
import FilePreviewModal from '@/components/filePreviewModal';

// HOOKS
import { useSelectDocumentMulti } from '@/hooks/Frontend/filePreviewModalScreen/useSelectDocument';
import { useFilePreview } from '@/hooks/Frontend/filePreviewModalScreen/useFilePreview';
import { useSendProofOfPayment } from '@/hooks/Backend/useSendProofOfPayment';

// UTILS
import getFileIcon from '@/utils/getFileIcon';

export default function SendProofOfPayment() {
  const { paymentID } = useLocalSearchParams<{ paymentID: string }>();
  const [fileMap, setFileMap] = useState<Record<string, any[]>>({});

  const { pickDocument } = useSelectDocumentMulti();
  const {
    modalVisible,
    setModalVisible,
    openPreview,
    currentFile,
    pdfViewerHtml,
    openFileExternal,
  } = useFilePreview();
  const { handleSendProof } = useSendProofOfPayment();
  // Default field upload
  useEffect(() => {
    setFileMap({ 'Bukti Pembayaran': [] });
  }, []);

  const handleUploadFile = async (fieldName: string) => {
    const result = await pickDocument(fieldName);

    if (result.success && result.file) {
      const fileWithProgress = {
        ...result.file,
        type: result.file.mimeType,
        progress: 0,
      };

      setFileMap((prev) => ({
        ...prev,
        [fieldName]: [...(prev[fieldName] || []), fileWithProgress],
      }));

      simulateUploadProgress(fieldName, fileWithProgress.name); // tambahkan nama sebagai ID
    } else {
      Alert.alert('Gagal', 'Gagal memilih file.');
    }
  };

  const simulateUploadProgress = (field: string, fileName: string) => {
    const steps = [0, 20, 35, 50, 70, 85, 100];
    let index = 0;

    const nextStep = () => {
      if (index >= steps.length) return;

      const progress = steps[index];
      setFileMap((prev) => {
        const files = prev[field]?.map((file: any) => {
          if (file.name === fileName) {
            return { ...file, progress };
          }
          return file;
        });

        return {
          ...prev,
          [field]: files,
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

  const handleRemoveFile = (field: string, fileName: string) => {
    setFileMap((prev) => {
      const newFiles = prev[field]?.filter((file) => file.name !== fileName);
      return {
        ...prev,
        [field]: newFiles,
      };
    });
  };

  const handleFixSubmit = async () => {
    try {
      await handleSendProof({
        paymentID: paymentID!,
        uploadedFiles: fileMap,
      });

      Alert.alert('Sukses', 'Bukti pembayaran berhasil dikirim.');
      router.back();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Gagal', error.message || 'Terjadi kesalahan.');
    }
  };

  useEffect(() => {
    console.log('[DEBUG] paymentID param:', paymentID);
  }, [paymentID]);

  return (
    <View className="flex-1 bg-white">
      <NavCartOrder
        text="Upload Bukti Pembayaran"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      <ScrollView
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ALERT */}
        <View className="mb-6 rounded-xl border border-red-600 bg-red-100 p-4">
          <View className="flex-row items-start gap-3">
            <AntDesign name="warning" size={22} color="darkred" />
            <View className="flex-1">
              <Text
                className="mb-1 font-semibold text-red-700"
                style={{ fontFamily: 'LexSemiBold' }}
              >
                Upload Bukti Pembayaran
              </Text>
              <Text className="text-black" style={{ fontFamily: 'LexRegular' }}>
                Simulasi unggah dokumen bukti pembayaran.
                {paymentID}
              </Text>
            </View>
          </View>
        </View>

        {Object.keys(fileMap).map((fileLabel) => (
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

            {fileMap[fileLabel]?.map((file, index) => (
              <View
                key={file.name + index}
                className="mt-2 flex-row items-center gap-4 rounded-[10px] border border-gray-300 px-4 py-2"
              >
                {getFileIcon(file.name)}

                <View className="flex-1">
                  <Text style={{ fontFamily: 'LexMedium' }}>
                    {(() => {
                      const name = file.name;
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
                    {(file.size / 1024).toFixed(2)} KB
                  </Text>

                  <View className="mb-3 mt-2 h-[8px] w-full overflow-hidden rounded-md bg-gray-300">
                    <View
                      className="h-full bg-green-500"
                      style={{ width: `${file.progress}%` }}
                    />
                  </View>

                  <View className="flex-row items-center justify-between">
                    {file.progress >= 100 ? (
                      <View className="flex-row items-center gap-1">
                        <Animatable.View animation="bounceIn" duration={2000}>
                          <Ionicons
                            name="checkmark-circle-sharp"
                            size={18}
                            color="green"
                          />
                        </Animatable.View>
                        <Animatable.Text
                          animation={{
                            from: { opacity: 0, translateX: -10 },
                            to: { opacity: 1, translateX: 0 },
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
                        onPress={() => handleRemoveFile(fileLabel, file.name)}
                        disabled={file.progress < 100}
                        className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                          file.progress < 100 ? 'bg-gray-400' : 'bg-red-500'
                        }`}
                      >
                        <Ionicons name="trash" size={18} color="white" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          if (file.progress >= 100) {
                            openPreview(file);
                          }
                        }}
                        disabled={file.progress < 100}
                        className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                          file.progress < 100 ? 'bg-gray-400' : 'bg-[#1475BA]'
                        }`}
                      >
                        <Ionicons name="eye" size={18} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
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
