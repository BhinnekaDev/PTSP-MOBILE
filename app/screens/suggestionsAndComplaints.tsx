import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// OUR COMPONENTS
import NavCartOrder from '@/components/navCartOrder';
import FilePreviewModal from '@/components/filePreviewModal';
import SuggestionForm from '@/components/suggestionForm';
import ComplaintForm from '@/components/complaintForm';

// OUR HOOKS
import { useFilePreview } from '@/hooks/Frontend/filePreviewModalScreen/useFilePreview';
import { useSelectDocument } from '@/hooks/Frontend/filePreviewModalScreen/useSelectDocument';

export default function SuggestionsAndComplaints() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Saran' | 'Pengaduan'>('Saran');

  // FORM STATE
  const [saranFullName, setSaranFullName] = useState('');
  const [saranEmail, setSaranEmail] = useState('');
  const [saranText, setSaranText] = useState('');
  const [pengaduanFullName, setPengaduanFullName] = useState('');
  const [pengaduanEmail, setPengaduanEmail] = useState('');
  const [pengaduanText, setPengaduanText] = useState('');

  // Ambil state file dari hook, jangan pakai fileMap lokal
  const { uploadedFiles, pickDocument, simulateProgress, removeFile } =
    useSelectDocument();

  const {
    modalVisible,
    setModalVisible,
    openPreview,
    currentFile,
    pdfViewerHtml,
    openFileExternal,
  } = useFilePreview();

  // HANDLE PICK FILE
  const handlePickFile = async (fieldKey: string) => {
    try {
      const result = await pickDocument(fieldKey);
      if (result?.success && result.file) {
        simulateProgress(fieldKey);
      } else {
        Alert.alert('Gagal', 'Gagal memilih file.');
      }
    } catch (err) {
      console.error('pickDocument error', err);
      Alert.alert('Gagal', 'Terjadi kesalahan saat memilih file.');
    }
  };

  // HANDLE REMOVE FILE
  const handleRemoveFile = (fieldKey: string) => {
    removeFile(fieldKey);
  };

  // SUBMIT HANDLER
  const handleSubmitSuggestion = () => {
    if (!saranFullName.trim() || !saranEmail.trim() || !saranText.trim()) {
      alert('Semua field wajib diisi untuk Saran.');
      return;
    }
    alert('Saran terkirim!');
  };

  const handleSubmitComplaint = () => {
    if (
      !pengaduanFullName.trim() ||
      !pengaduanEmail.trim() ||
      !pengaduanText.trim()
    ) {
      alert('Semua field wajib diisi untuk Pengaduan.');
      return;
    }
    alert('Pengaduan terkirim!');
  };

  return (
    <View className="flex-1">
      <NavCartOrder
        text="Saran Dan Pengaduan"
        textClassName="ml-4 text-left"
        onPressLeftIcon={() => router.back()}
        isTouchable={false}
      />
      {/* Tab Button */}
      <View className="mt-4 flex-row justify-center gap-4 px-4">
        {['Saran', 'Pengaduan'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as 'Saran' | 'Pengaduan')}
            className={`rounded-full px-4 py-2 ${activeTab === tab ? 'bg-[#1475BA]' : 'bg-gray-200'}`}
          >
            <Text
              style={{
                fontFamily: 'LexBold',
                color: activeTab === tab ? 'white' : 'black',
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'Saran' ? (
        <SuggestionForm
          fullName={saranFullName}
          setFullName={setSaranFullName}
          email={saranEmail}
          setEmail={setSaranEmail}
          text={saranText}
          setText={setSaranText}
          file={uploadedFiles['saranFile']} // Ganti dari fileMap ke uploadedFiles
          handlePickFile={() => handlePickFile('saranFile')}
          handleRemoveFile={() => handleRemoveFile('saranFile')}
          openPreview={() => {
            const file = uploadedFiles['saranFile'];
            if (file) openPreview(file);
          }}
          onSubmit={handleSubmitSuggestion}
        />
      ) : (
        <ComplaintForm
          fullName={pengaduanFullName}
          setFullName={setPengaduanFullName}
          email={pengaduanEmail}
          setEmail={setPengaduanEmail}
          text={pengaduanText}
          setText={setPengaduanText}
          file={uploadedFiles['pengaduanFile']} // Ganti dari fileMap ke uploadedFiles
          handlePickFile={() => handlePickFile('pengaduanFile')}
          handleRemoveFile={() => handleRemoveFile('pengaduanFile')}
          openPreview={() => {
            const file = uploadedFiles['pengaduanFile'];
            if (file) openPreview(file);
          }}
          onSubmit={handleSubmitComplaint}
        />
      )}

      {/* File preview modal */}
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
