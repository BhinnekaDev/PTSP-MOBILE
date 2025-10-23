import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ToastAndroid,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { firebaseAuth } from '@/lib/firebase';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// OUR CONSTANT
import { dataEmojis } from '@/constants/dataEmojis';

// OUR COMPONENTS
import ChatMessage from '@/components/chatMessage';

// OUR HOOKS
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import { useHandleDeleteMessages } from '@/hooks/Backend/useHandleDeleteMessages';
import { useDocumentPicker } from '@/hooks/Frontend/pickFiles/useDocumentPicker';
import { useImagePicker } from '@/hooks/Frontend/pickFiles/useImagePicker';
import { useMessagesWithPreview } from '@/hooks/Backend/useMessageWithPreview';
import { useToggleExpandMessage } from '@/hooks/Frontend/expandMessages/useToggleExpand';

// OUR INTERFACES
import { UIMessage } from '@/interfaces/uiMessagesProps';
import { UploadFileProps } from '@/interfaces/uploadFileProps';

// UTILS
import { formatDateLabel } from '@/utils/formatDateLabel';
import { FilePreviewModalAll } from '@/components/filePreviewModalAll';

export default function RoomChatScreen() {
  const currentUserId = firebaseAuth.currentUser?.uid;
  const { roomId, stationName } = useLocalSearchParams();
  const { profile } = useGetUserProfile();
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState('');

  // EXPAND MESSAGE KIRI (BACA SELENGKAPNYA UNTUK ADMIN / USER LAIN)
  const {
    expandedMessageId: expandedMessageIdRight,
    toggleExpandMessage: toggleExpandedMessageRight,
  } = useToggleExpandMessage();

  // EXPAND MESSAGE KANAN (BACA SELENGKAPNYA UNTUK ADMIN / USER LAIN)
  const {
    expandedMessageId: expandedMessageIdLeft,
    toggleExpandMessage: toggleExpandedMessageLeft,
  } = useToggleExpandMessage();

  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<UIMessage | null>(
    null
  );
  const [pendingFile, setPendingFile] = useState<UploadFileProps | null>(null);
  const { pickDocument } = useDocumentPicker();
  const { pickImage } = useImagePicker();
  const {
    messages,
    sendMessage,
    sendMessageWithFile,
    modalVisible,
    setModalVisible,
    currentFile,
    pdfViewerHtml,
    openPreview,
    openFileExternal,
  } = useMessagesWithPreview(roomId as string);

  // MAPPING ke format ChatMessage
  const mappedMessages: UIMessage[] = messages.map((m) => ({
    id: m.id,
    text: m.isi,
    time: m.waktu?.toDate ? m.waktu.toDate() : new Date(),
    sender: m.idPengirim === currentUserId ? 'me' : 'other',
    sudahDibaca: m.sudahDibaca,
    namaFile: m.namaFile || null,
    urlFile: m.urlFile || null,
  }));

  const groupedMessages = mappedMessages.reduce(
    (groups, msg) => {
      const dateKey = formatDateLabel(msg.time);
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
      return groups;
    },
    {} as Record<string, UIMessage[]>
  );

  // Dokumen
  const handlePickDocument = async () => {
    const file = await pickDocument();
    if (file) {
      setPendingFile(file);
      setShowAttachmentOptions(false);
    }
  };

  // Gambar
  const handlePickImage = async () => {
    const file = await pickImage();
    if (file) {
      setPendingFile(file);
      setShowAttachmentOptions(false);
    }
  };

  // HANDLE SEND MESSAGE
  const handleSendMessage = async () => {
    if (!roomId || !currentUserId || !profile) return;
    const tipePengirim = profile.tipe;

    if (pendingFile) {
      // Kirim file + teks
      await sendMessageWithFile(pendingFile, inputText || '', tipePengirim);
      setPendingFile(null); // reset file setelah dikirim
    } else if (inputText.trim()) {
      // Kirim teks saja
      await sendMessage(inputText, tipePengirim);
    }

    setInputText('');
  };

  // HANDLE DELETE MESSAGE
  const {
    customAlertVisible,
    confirmDeleteMessage,
    handleDeleteMessage,
    setCustomAlertVisible,
    setMessageToDelete,
  } = useHandleDeleteMessages(roomId as string);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [mappedMessages]);
  return (
    <View className="flex-1">
  

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4">
          {/* MESSAGE */}
          {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
            <View key={dateLabel} className="mt-4">
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="mb-2 self-center rounded-lg bg-gray-300 px-2 py-1 text-gray-700"
              >
                {dateLabel} {/* Hari ini / Kemarin / dd MMM yyyy */}
              </Text>

              {msgs.map((msg) => (
                <ChatMessage
                  key={`${msg.id}-${msg.time.getTime()}`}
                  msg={msg}
                  expandedMessageIdRight={expandedMessageIdRight}
                  expandedMessageIdLeft={expandedMessageIdLeft}
                  toggleExpandedMessageRight={toggleExpandedMessageRight}
                  toggleExpandedMessageLeft={toggleExpandedMessageLeft}
                  setSelectedMessage={setSelectedMessage}
                  setShowOptionMessage={setShowOptionMessage}
                  setShowEmojiPicker={setShowEmojiPicker}
                  setShowAttachmentOptions={setShowAttachmentOptions}
                  openPreview={openPreview}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      {/* INPUT KETIK PESAN, EMOJI, ATTACHMENT, SEND */}
      <View className="mb-5 px-5 pt-2">
        {/* PREVIEW FILE SEBELUM KIRIM */}
        {pendingFile && (
          <View className="mb-2 flex-row flex-wrap items-center justify-between rounded border border-gray-300 p-2">
            <Text
              style={{ fontFamily: 'LexMedium', maxWidth: '80%' }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              📎{' '}
              {pendingFile.name.length > 30
                ? pendingFile.name.slice(0, 27) + '...'
                : pendingFile.name}
            </Text>

            <TouchableOpacity onPress={() => setPendingFile(null)}>
              <Text style={{ color: 'red', fontFamily: 'LexRegular' }}>
                Hapus
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="flex-row items-center justify-center rounded-xl border border-gray-300 p-2">
          {/* BUTTON EMOJI */}
          <TouchableOpacity
            onPress={() => {
              setShowEmojiPicker((prev) => !prev);
              setShowAttachmentOptions(false);
              setSelectedMessage(null);
            }}
          >
            <Entypo
              name="emoji-happy"
              size={24}
              className="rounded-full bg-gray-300 p-2"
              color="black"
            />
          </TouchableOpacity>

          {/* TEXT INPUT */}
          <TextInput
            className="mx-2 flex-1"
            placeholder="Ketik Pesan"
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
            style={{
              fontFamily: 'LexRegular',
            }}
          />

          {/* BUTTON ATTACHMENT */}
          <TouchableOpacity
            onPress={() => {
              setShowAttachmentOptions((prev) => !prev);
              setShowEmojiPicker(false);
              setSelectedMessage(null);
            }}
          >
            <Entypo
              name="attachment"
              className="mr-4 rounded-full bg-gray-300 p-2"
              size={20}
              color="black"
            />
          </TouchableOpacity>

          {/* BUTTON SENDING */}
          <TouchableOpacity onPress={handleSendMessage}>
            <Ionicons
              name="send"
              className="rounded-full bg-gray-300 p-2"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* SHOW ISI EMOJI */}
        {showEmojiPicker && (
          <View className="pt-2">
            <ScrollView
              style={{ maxHeight: 205 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              {dataEmojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInputText((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="rounded-full bg-gray-200 p-2"
                >
                  <Text className="text-2xl">{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* SHOW ISI FILE */}
        {showAttachmentOptions && (
          <View className="flex-row items-center justify-between p-4">
            {/* Dokumen */}
            <TouchableOpacity className="gap-1" onPress={handlePickDocument}>
              <View className="items-center rounded-full border border-gray-300 bg-gray-200 p-4">
                <MaterialCommunityIcons
                  name="file-document"
                  size={30}
                  color="#4B0082"
                />
              </View>
              <Text
                className="text-center text-sm text-black"
                style={{ fontFamily: 'LexMedium' }}
              >
                Dokumen
              </Text>
            </TouchableOpacity>

            {/* Galeri */}
            <TouchableOpacity className="gap-1" onPress={handlePickImage}>
              <View className="items-center rounded-full border border-gray-300 bg-gray-200 p-4">
                <MaterialCommunityIcons
                  name="image-multiple"
                  size={30}
                  color="#10B981"
                />
              </View>
              <Text
                className="text-center text-sm text-black"
                style={{ fontFamily: 'LexMedium' }}
              >
                Galeri
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SHOW ISI TOMBOL KETIKA MESSAGE DI TEKAN */}
        {/* OPTION MESSAGE */}
        {selectedMessage && showOptionMessage && (
          <View className="flex-row items-center justify-center gap-12 p-4">
            {/* SALIN */}
            <TouchableOpacity
              className="items-center gap-1"
              onPress={() => {
                Clipboard.setStringAsync(selectedMessage.text);
                setSelectedMessage(null);
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Pesan disalin', ToastAndroid.SHORT);
                }
              }}
            >
              <View className="items-center rounded-full border border-gray-300 bg-gray-200 p-4">
                <Ionicons name="copy-outline" size={30} color="#1475BA" />
              </View>
              <Text className="text-sm" style={{ fontFamily: 'LexRegular' }}>
                Salin Teks
              </Text>
            </TouchableOpacity>

            {/* HAPUS */}
            {selectedMessage.sender === 'me' && (
              <TouchableOpacity
                className="items-center gap-1"
                onPress={() => {
                  setSelectedMessage(null);
                  confirmDeleteMessage(selectedMessage);
                }}
              >
                <View className="items-center rounded-full border border-gray-300 bg-gray-200 p-4">
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={30}
                    color="#EF4444"
                  />
                </View>
                <Text className="text-sm" style={{ fontFamily: 'LexRegular' }}>
                  Hapus Pesan
                </Text>
              </TouchableOpacity>
            )}

            {/* BATAL */}
            <TouchableOpacity
              onPress={() => setSelectedMessage(null)}
              className="items-center gap-1"
            >
              <View className="items-center rounded-full border border-gray-300 bg-gray-200 p-4">
                <Ionicons name="close" size={30} color="gray" />
              </View>
              <Text className="text-sm" style={{ fontFamily: 'LexRegular' }}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* MODAL HAPUS */}
      <Modal transparent visible={customAlertVisible} animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/30 px-6">
          <View className="w-full max-w-md rounded-xl bg-white p-5">
            <Text
              className="mb-2 text-lg text-black"
              style={{ fontFamily: 'LexBold' }}
            >
              Hapus Pesan?
            </Text>
            <Text
              className="mb-4 text-gray-700"
              style={{ fontFamily: 'LexRegular' }}
            >
              Apakah Anda yakin ingin menghapus pesan ini?
            </Text>

            <TouchableOpacity
              onPress={handleDeleteMessage}
              className="mt-2 rounded-lg bg-red-500 px-4 py-2"
            >
              <Text
                className="text-center text-white"
                style={{ fontFamily: 'LexBold' }}
              >
                Hapus
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCustomAlertVisible(false);
                setMessageToDelete(null);
              }}
              className="mt-2 rounded-lg bg-gray-300 px-4 py-2"
            >
              <Text
                className="text-center text-black"
                style={{ fontFamily: 'LexBold' }}
              >
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="h-7 w-full items-center justify-center bg-[#1475BA]">
        <View className="h-1.5 w-32 rounded-full bg-white" />
      </View>

      {/* MODAL PREVIEW */}
      <FilePreviewModalAll
        visible={modalVisible}
        source={currentFile?.uri || null}
        mimeType={currentFile?.mimeType || null}
        pdfHtml={pdfViewerHtml}
        onClose={() => setModalVisible(false)}
        onOpenExternal={openFileExternal}
      />
    </View>
  );
}
