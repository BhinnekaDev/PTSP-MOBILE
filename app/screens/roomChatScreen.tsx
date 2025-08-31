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
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { firebaseAuth } from '@/lib/firebase';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// OUR CONSTANT
import { dataEmojis } from '@/constants/dataEmojis';

// OUR COMPONENTS
import ChatMessage from '@/components/chatMessage';

// OUR HOOKS
import { useMessages } from '@/hooks/Backend/useMessages';
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
// UTILS
import { formatDateLabel } from '@/utils/formalDateLabel';

// OUR INTERFACES
import { Message } from '@/interfaces/messagesProps';

export default function RoomChat() {
  const router = useRouter();
  const { roomId } = useLocalSearchParams();
  const { profile } = useGetUserProfile();
  const scrollViewRef = useRef<ScrollView>(null);
  const [expandedIdR, setExpandedIdR] = useState<string | null>(null);
  const [expandedIdL, setExpandedIdL] = useState<string | null>(null);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);

  // HOOK FIRESTORE
  const { messages, sendMessage } = useMessages(roomId as string);
  const currentUserId = firebaseAuth.currentUser?.uid;
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async () => {
    if (!inputText.trim() || !roomId || !currentUserId || !profile) return;

    const tipePengirim = profile.tipe; // "perusahaan" | "perorangan" | "admin"
    await sendMessage(inputText, currentUserId, tipePengirim);
    setInputText('');
  };
  // MAPPING ke format ChatMessage
  const mappedMessages: Message[] = messages.map((m) => ({
    id: m.id,
    text: m.isi,
    time: m.waktu?.toDate() || new Date(),
    sender: m.idPengirim === currentUserId ? 'me' : 'other',
  }));

  const groupedMessages = mappedMessages.reduce(
    (groups, msg) => {
      const dateKey = formatDateLabel(msg.time); // msg.time sudah Date
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
      return groups;
    },
    {} as Record<string, Message[]>
  );

  const confirmDeleteMessage = (message: Message) => {
    setMessageToDelete(message);
    setCustomAlertVisible(true);
  };

  const toggleExpandedR = (id: string) => {
    setExpandedIdR((prev: string | null) => (prev === id ? null : id));
  };

  const toggleExpandedL = (id: string) => {
    setExpandedIdL((prev: string | null) => (prev === id ? null : id));
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [mappedMessages]);

  return (
    <View className="flex-1">
      <View className="w-full flex-row items-center gap-4 rounded-b-[10px] bg-[#1475BA] px-4 py-4 shadow-md">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full p-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="rounded-full bg-gray-300 p-2">
          <FontAwesome6 name="mountain" size={24} color="#3498DB" />
        </View>
        <View className="flex-1">
          <Text
            style={{ fontFamily: 'LexBold' }}
            className="text-lg text-white"
          >
            Stasiun Meteorologi
          </Text>
          <Text style={{ fontFamily: 'LexRegular' }} className="text-white">
            Online
          </Text>
        </View>
      </View>
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
                  key={msg.id}
                  msg={msg} // time tetap Date
                  expandedIdR={expandedIdR}
                  expandedIdL={expandedIdL}
                  toggleExpandedR={toggleExpandedR}
                  toggleExpandedL={toggleExpandedL}
                  setSelectedMessage={setSelectedMessage}
                  setShowOptionMessage={setShowOptionMessage}
                  setShowEmojiPicker={setShowEmojiPicker}
                  setShowAttachmentOptions={setShowAttachmentOptions}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      {/* INPUT KETIK PESAN, EMOJI, ATTACHMENT, SEND */}
      <View className="mb-5 px-5 pt-2">
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
            onSubmitEditing={() => Alert.alert('Fitur kirim belum tersedia')}
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
            <TouchableOpacity className="gap-1">
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

            <TouchableOpacity className="gap-1">
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

            <TouchableOpacity className="gap-1">
              <View className="items-center rounded-full border border-gray-300 bg-gray-200 p-4">
                <MaterialCommunityIcons
                  name="camera"
                  size={30}
                  color="#EF4444"
                />
              </View>
              <Text
                className="text-center text-sm text-black"
                style={{ fontFamily: 'LexMedium' }}
              >
                Kamera
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SHOW ISI TOMBOL KETIKA MESSAGE DI TEKAN */}
        {selectedMessage && showOptionMessage && (
          <View className="flex-row items-center justify-center gap-12 p-4">
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
              onPress={() => Alert.alert('Fitur hapus belum tersedia')}
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
    </View>
  );
}
