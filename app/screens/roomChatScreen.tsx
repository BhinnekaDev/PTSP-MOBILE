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
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// OUR CONSTANT
import { dataEmojis } from '@/constants/dataEmojis';

// OUR COMPONENTS
import ChatMessage from '@/components/chatMessage';

type Message = {
  id: number;
  text: string;
  time: string;
  sender: 'me' | 'other';
};

export default function RoomChat() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [expandedIdR, setExpandedIdR] = useState<number | null>(null);
  const [expandedIdL, setExpandedIdL] = useState<number | null>(null);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);

  const confirmDeleteMessage = (message: Message) => {
    setMessageToDelete(message);
    setCustomAlertVisible(true);
  };

  const [messagesToday, setMessagesToday] = useState<Message[]>([
    {
      id: 1,
      text: 'Ini adalah pesan pendek.',
      time: '10:00',
      sender: 'me',
    },
    {
      id: 2,
      text: 'Ini adalah pesan yang lebih panjang untuk melihat apakah box akan mengikuti panjang teks namun tetap memiliki batas maksimal lebar tertentu seperti yang diminta. Ini adalah pesan yang lebih panjang untuk melihat apakah box akan mengikuti panjang teks namun tetap memiliki batas maksimal lebar tertentu seperti yang diminta.',
      time: '10:05',
      sender: 'other',
    },
    {
      id: 3,
      text: 'Pesan lainnya yang sedang diuji.',
      time: '10:10',
      sender: 'me',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const toggleExpandedR = (id: number) => {
    setExpandedIdR((prev: number | null) => (prev === id ? null : id));
  };

  const toggleExpandedL = (id: number) => {
    setExpandedIdL((prev: number | null) => (prev === id ? null : id));
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const myMessage: Message = {
      id: Date.now(),
      text: inputText,
      time: timeStr,
      sender: 'me',
    };

    const replyMessage: Message = {
      id: Date.now() + 1,
      text: 'Terima kasih atas pesan Anda. Kami akan segera menindaklanjuti.',
      time: timeStr,
      sender: 'other',
    };

    setMessagesToday((prev) => [...prev, myMessage, replyMessage]);
    setInputText('');
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messagesToday]);

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
          <Text
            style={{ fontFamily: 'LexRegular' }}
            className="mb-2 self-center rounded-lg bg-gray-300 px-2 py-1 text-gray-700"
          >
            Kemarin
          </Text>
          {/* MESSAGE */}
          {messagesToday.map((msg) => (
            <ChatMessage
              key={msg.id}
              msg={msg}
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
              onPress={() => {
                if (messageToDelete) {
                  setMessagesToday((prev) =>
                    prev.filter((m) => m.id !== messageToDelete.id)
                  );
                }
                setCustomAlertVisible(false);
                setMessageToDelete(null);
              }}
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
