import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NavCartOrder from '@/components/navCartOrder';
import FormDropdownSelect from '@/components/formDropdownSelect';
import FilePreviewModal from '@/components/filePreviewModal';

// HOOK
import { useFilePreview } from '@/hooks/Frontend/filePreviewModalScreen/useFilePreview';
import { useSelectDocumentMulti } from '@/hooks/Frontend/filePreviewModalScreen/useSelectDocument';

// DATA
const submissionOptions = [
  {
    label: 'Penanggulangan Bencana',
    jenisAjukan: 'Gratis',
    files: ['Surat Pengantar Permintaan Data'],
  },
  {
    label: 'Kegiatan Keagamaan',
    jenisAjukan: 'Gratis',
    files: ['Surat Permintaan Ditandatangani Camat'],
  },
  {
    label: 'Kegiatan Sosial',
    jenisAjukan: 'Gratis',
    files: ['Surat Permintaan Ditandatangani Camat'],
  },
  {
    label: 'Kegiatan Pertahanan dan Keamanan',
    jenisAjukan: 'Gratis',
    files: ['Surat Permintaan Ditandatangani Camat'],
  },
  {
    label: 'Kegiatan Pemerintahan Pusat atau Daerah',
    jenisAjukan: 'Gratis',
    files: ['Perjanjian Kerjasama dengan BMKG', 'Surat Pengantar'],
  },
  {
    label: 'Kegiatan Pendidikan dan Penelitian Non Komersil',
    jenisAjukan: 'Gratis',
    files: [
      'Identitas Diri',
      'Surat Pengantar dari Sekolah',
      'Surat Pernyataan',
      'Proposal Penelitian',
    ],
  },
  {
    label: 'Pelayanan Informasi dengan Tarif PNBP',
    jenisAjukan: 'Berbayar',
    files: ['Identitas KTP', 'Surat Pengantar'],
  },
];

export default function SubmissionScreen() {
  const router = useRouter();
  const [selectedJenisKegiatan, setSelectedJenisKegiatan] = useState('');
  const [fileMap, setFileMap] = useState<Record<string, any>>({});
  const { pickDocument } = useSelectDocumentMulti();
  const {
    modalVisible,
    setModalVisible,
    openPreview,
    currentFile,
    pdfViewerHtml,
    openFileExternal,
  } = useFilePreview();

  const selectedData = submissionOptions.find(
    (item) => `${item.label} (${item.jenisAjukan})` === selectedJenisKegiatan
  );

  const handleUpload = async (field: string) => {
    const result = await pickDocument(field);

    if (result?.success && result.file) {
      setFileMap((prev) => ({
        ...prev,
        [field]: result.file,
        preview: result.file, // untuk modal preview
      }));
    }
  };

  return (
    <View className="flex-1 bg-white">
      <NavCartOrder
        text="Keranjang Saya"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />

      <View className="flex-1 px-4">
        <LinearGradient
          colors={['#1475BA', '#FFFFFF', '#6BBC3F']}
          style={{ flex: 1, borderRadius: 12 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="w-full flex-1 py-6">
            <Text
              className="self-center text-[20px] font-bold"
              style={{ fontFamily: 'LexBold' }}
            >
              Pengajuan Anda
            </Text>

            <ScrollView
              contentContainerStyle={{ padding: 24 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Dropdown Jenis Kegiatan */}
              <View className="mb-10 rounded-[10px] border-2 border-[#1475BA] bg-white">
                <View className="items-center rounded-t-[4px] bg-[#1475BA] py-2">
                  <Text
                    className="py-4 text-[18px] text-white"
                    style={{ fontFamily: 'LexMedium' }}
                  >
                    Form Pengajuan Kegiatan
                  </Text>
                </View>
                <View className="px-4 pb-4 pt-4">
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
                <View className="rounded-[10px] border-2 border-[#1475BA] bg-white">
                  <View className="items-center rounded-t-[4px] bg-[#1475BA] py-2">
                    <Text
                      className="py-4 text-[18px] text-white"
                      style={{ fontFamily: 'LexMedium' }}
                    >
                      Upload File Persyaratan
                    </Text>
                  </View>
                  <View className="px-4 pb-4 pt-6">
                    {selectedData.files.map((field, idx) => (
                      <View key={idx} className="mb-6">
                        <Text
                          style={{
                            fontFamily: 'LexSemiBold',
                            marginBottom: 12,
                          }}
                        >
                          {field}
                        </Text>

                        <TouchableOpacity
                          onPress={() => handleUpload(field)}
                          className="items-center rounded-[8px] bg-[#1475BA] py-3"
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
                          <View className="mt-3 rounded-[8px] border border-[#6BBC3F] bg-[#E6F4EA] p-3">
                            <Text
                              className="mb-1 text-[#4CAF50]"
                              style={{ fontFamily: 'LexMedium' }}
                            >
                              ✅ Upload berhasil!
                            </Text>
                            <Text style={{ fontFamily: 'LexRegular' }}>
                              <Text style={{ fontWeight: 'bold' }}>
                                Nama File:
                              </Text>{' '}
                              {fileMap[field].name}
                            </Text>
                            <Text style={{ fontFamily: 'LexRegular' }}>
                              <Text style={{ fontWeight: 'bold' }}>
                                Ukuran:
                              </Text>{' '}
                              {(fileMap[field].size / 1024).toFixed(2)} KB
                            </Text>
                            <TouchableOpacity
                              onPress={() => openPreview(fileMap[field])}
                              className="mt-2 items-center rounded-[8px] bg-[#1475BA] p-2"
                            >
                              <Text
                                style={{
                                  color: 'white',
                                  fontFamily: 'LexSemiBold',
                                }}
                              >
                                Lihat Preview
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Tombol Ajukan */}
            <View className="mt-6 w-[80%] self-center">
              <ButtonCustom
                classNameContainer="bg-[#1475BA] py-3 rounded-[10px]"
                text="AJUKAN SEKARANG"
                textClassName="text-[14px] text-center text-white"
                onPress={() =>
                  router.push({
                    pathname: '/screens/orderScreen',
                    params: { triggerSubmission: 'true' },
                  })
                }
                textStyle={{ fontFamily: 'LexSemiBold' }}
                isTouchable={!!selectedJenisKegiatan}
                containerStyle={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                }}
              />
            </View>
          </View>
        </LinearGradient>
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
