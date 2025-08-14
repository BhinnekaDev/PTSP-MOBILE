import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

// OUR CONSTANS
import { submissionOptions } from '@/constants/submissionOptions';

// COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';
import FormDropdownSelect from '@/components/formDropdownSelect';
import FilePreviewModal from '@/components/filePreviewModal';

// HOOK
import { useFilePreview } from '@/hooks/Frontend/filePreviewModalScreen/useFilePreview';
import { useSelectDocument } from '@/hooks/Frontend/filePreviewModalScreen/useSelectDocument';
import { useSubmitSubmission } from '@/hooks/Backend/useSubmitSubmission';

// OUR ICON
import { Ionicons } from '@expo/vector-icons';

// OUR UTILS
import getFileIcon from '@/utils/getFileIcon';

export default function SubmissionScreen() {
  const router = useRouter();
  const [selectedJenisKegiatan, setSelectedJenisKegiatan] = useState('');
  const [fileMap, setFileMap] = useState<Record<string, any>>({});
  const { pickDocument } = useSelectDocument();
  const {
    modalVisible,
    setModalVisible,
    openPreview,
    currentFile,
    pdfViewerHtml,
    openFileExternal,
  } = useFilePreview();
  const { submit } = useSubmitSubmission();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedData = submissionOptions.find(
    (item) => `${item.label} (${item.jenisAjukan})` === selectedJenisKegiatan
  );

  const isAllUploadComplete = selectedData?.files.every(
    (fileName) => fileMap[fileName]?.progress === 100
  );

  // HANDLE UPLOAD
  const handleUpload = async (field: string) => {
    const result = await pickDocument(field);

    if (result?.success && result.file) {
      const fileWithProgress = {
        ...result.file,
        progress: 0,
      };

      setFileMap((prev) => ({
        ...prev,
        [field]: fileWithProgress,
      }));

      simulateUploadProgress(field);
    }
  };

  const handleRemoveFile = (field: string) => {
    setFileMap((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const simulateUploadProgress = (field: string) => {
    const steps = [0, 20, 35, 50, 70, 85, 100];
    let index = 0;

    const nextStep = () => {
      if (index >= steps.length) return;

      const progress = steps[index];
      setFileMap((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          progress,
        },
      }));

      index++;

      if (index < steps.length) {
        const delay = Math.floor(Math.random() * 200) + 150;
        setTimeout(nextStep, delay);
      }
    };

    nextStep();
  };

  return (
    <View className="flex-1 bg-[#A7CBE5]">
      <NavCartOrder
        text="Keranjang Saya"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      <ScrollView
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Dropdown Jenis Kegiatan */}
        <View className="mb-6 rounded-[10px] bg-white">
          <View className="items-center rounded-t-[10px] bg-[#1475BA] p-6">
            <Text
              className="text-[16px] text-white"
              style={{ fontFamily: 'LexMedium' }}
            >
              Form Pengajuan Kegiatan
            </Text>
          </View>
          <View className="px-6 py-8">
            <FormDropdownSelect
              showLabel={false}
              toggleDropdownClassName="w-full border-[#D9D9D9] rounded-[5px]"
              label="Jenis Kegiatan"
              DropdownSelectClassName="w-full border-[#D9D9D9] rounded-[5px]"
              options={submissionOptions.map(
                (item) => `${item.label} (${item.jenisAjukan})`
              )}
              selected={selectedJenisKegiatan}
              onSelect={setSelectedJenisKegiatan}
            />
          </View>
        </View>

        {/* Upload Berkas */}
        {selectedData && (
          <View className="rounded-[10px] bg-white pb-8">
            <View className="items-center rounded-t-[10px] bg-[#1475BA] p-6">
              <Text
                className="text-[16px] text-white"
                style={{ fontFamily: 'LexMedium' }}
              >
                Form Pengajuan Kegiatan
              </Text>
            </View>
            <View className="px-7 pt-2">
              {selectedData.files.map((field, idx) => (
                <View key={idx} className="gap-2">
                  <Text
                    className="self-start text-[15px]"
                    style={{ fontFamily: 'LexSemiBold' }}
                  >
                    {field}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handleUpload(field)}
                    className="items-center rounded-[8px] bg-[#1475BA] py-2"
                    activeOpacity={0.8}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'LexSemiBold',
                      }}
                    >
                      Upload File
                    </Text>
                  </TouchableOpacity>

                  {fileMap[field] && (
                    <View className="mt-2 flex-row items-center gap-4 rounded-[10px] border border-gray-300 px-4 py-2">
                      {getFileIcon(fileMap[field].name)}
                      <View className="flex-1 flex-col">
                        <Text style={{ fontFamily: 'LexMedium' }}>
                          {(() => {
                            const name = fileMap[field].name;
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
                          {(fileMap[field].size / 1024).toFixed(2)} KB
                        </Text>
                        <View className="mb-3 mt-2 h-[8px] w-full overflow-hidden rounded-md bg-gray-300">
                          <View
                            className="h-full bg-green-500"
                            style={{
                              width: `${fileMap[field].progress}%`,
                            }}
                          />
                        </View>

                        <View className="flex-row items-center justify-between">
                          {fileMap[field].progress >= 100 ? (
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
                            {/* Tombol Hapus */}
                            <TouchableOpacity
                              onPress={() => handleRemoveFile(field)}
                              disabled={fileMap[field].progress < 100}
                              className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                                fileMap[field].progress < 100
                                  ? 'bg-gray-400'
                                  : 'bg-red-500'
                              }`}
                            >
                              <Ionicons name="trash" size={18} color="white" />
                            </TouchableOpacity>

                            {/* Tombol Preview */}
                            <TouchableOpacity
                              onPress={() => {
                                if (fileMap[field].progress >= 100) {
                                  openPreview(fileMap[field]);
                                }
                              }}
                              disabled={fileMap[field].progress < 100}
                              className={`items-center justify-center rounded-[5px] px-3 py-2 ${
                                fileMap[field].progress < 100
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
            </View>
          </View>
        )}
      </ScrollView>
      {/* Tombol Ajukan */}
      <View className="w-[80%] self-center py-6">
        <ButtonCustom
          classNameContainer={`py-3 rounded-[10px] ${
            !isAllUploadComplete || isSubmitting
              ? 'bg-gray-400'
              : 'bg-[#1475BA]'
          }`}
          text={isSubmitting ? '' : 'AJUKAN SEKARANG'}
          textClassName="text-[14px] text-center text-white"
          onPress={async () => {
            if (isSubmitting) return; // ❗ Proteksi dobel klik
            if (!selectedJenisKegiatan || !selectedData) return;

            const isAllFilesUploaded = selectedData.files.every(
              (fileName) => !!fileMap[fileName]
            );

            if (!isAllFilesUploaded) {
              alert('Harap unggah semua file persyaratan.');
              return;
            }

            setIsSubmitting(true); // ✅ Aktifkan loading
            try {
              await submit({
                selectedJenis: selectedJenisKegiatan,
                jenisAjukan: selectedData.jenisAjukan as 'Gratis' | 'Berbayar',
                uploadedFiles: fileMap,
              });

              router.replace('/screens/successOrderScreen');
            } catch (err) {
              console.error('❌ Gagal mengajukan:', err);
            } finally {
              setIsSubmitting(false); // ✅ Matikan loading
            }
          }}
          isTouchable={
            !isSubmitting && !!selectedJenisKegiatan && isAllUploadComplete
          }
          textStyle={{ fontFamily: 'LexSemiBold' }}
          containerStyle={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 4,
          }}
        />
        {isSubmitting && (
          <View className="absolute inset-0 items-center justify-center">
            <ActivityIndicator color="#fff" size="small" />
          </View>
        )}
      </View>

      <FilePreviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        file={currentFile}
        pdfViewerHtml={pdfViewerHtml}
        onOpenExternal={openFileExternal}
      />

      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
